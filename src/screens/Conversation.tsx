import { DialogWrapper } from "@/components/DialogWrapper";
import {
  DailyAudio,
  useDaily,
  useLocalSessionId,
  useParticipantIds,
  useVideoTrack,
  useAudioTrack,
} from "@daily-co/daily-react";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Video from "@/components/Video";
import { conversationAtom } from "@/store/conversation";
import { useAtom, useAtomValue } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { endConversation } from "@/api/endConversation";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  PhoneIcon,
} from "lucide-react";
import {
  clearSessionTime,
  getSessionTime,
  setSessionStartTime,
  updateSessionEndTime,
} from "@/utils";
import { Timer } from "@/components/Timer";
import { TIME_LIMIT } from "@/config";
import { niceScoreAtom } from "@/store/game";
import { naughtyScoreAtom } from "@/store/game";
import { apiTokenAtom } from "@/store/tokens";
import { createConversation } from "@/api";
import { endAllConversations } from "@/api/endAllConversations";
import { ConversationLoading } from "./ConversationLoading";
import { ConversationError } from "./ConversationError";

const timeToGoPhrases = [
  "I'll need to fade away soon—my magical energy is waning. But let's make these last moments count.",
  "The mirror realm is calling me back soon, but I've got a little more time for you!",
  "I'll be disappearing soon—the magic is fading—but I'd love to hear one more thing before I go!",
];

const outroPhrases = [
  "It's time for me to go now—mirror magic doesn't maintain itself! Take care, and I'll see you soon!",
  "I've got to return to the mirror realm—the magic needs me! Be well, and until we meet again!",
  "I must say goodbye for now—the magic of the mirror calls! Stay curious, and I'll see you soon!",
];

export const Conversation: React.FC = () => {
  const [conversation, setConversation] = useAtom(conversationAtom);
  const [{ sessionType }, setScreenState] = useAtom(screenAtom);
  const [naughtyScore] = useAtom(naughtyScoreAtom);
  const [niceScore] = useAtom(niceScoreAtom);
  const token = useAtomValue(apiTokenAtom);
  const [isCreatingConversation, setIsCreatingConversation] = useState(true);
  const [conversationError, setConversationError] = useState<string | null>(null);

  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const isCameraEnabled = !localVideo.isOff;
  const isMicEnabled = !localAudio.isOff;
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });
  const [start, setStart] = useState(false);
  const hasJoinedRef = useRef(false);
  const joinAttemptInProgressRef = useRef(false);

  // Debug logging for participants
  useEffect(() => {
    console.log("Remote participants:", remoteParticipantIds);
    if (remoteParticipantIds.length > 0) {
      console.log(`First remote participant ID: ${remoteParticipantIds[0]}`);
    } else {
      console.log("No remote participants detected yet");
    }
  }, [remoteParticipantIds]);

  // Debug logging for conversation details
  useEffect(() => {
    console.log("Current conversation data:", conversation);
    if (conversation?.conversation_url) {
      console.log(`Using conversation URL: ${conversation.conversation_url}`);
    }
  }, [conversation]);

  // Debug logging for daily instance
  useEffect(() => {
    if (daily) {
      console.log("Daily instance available:", daily);
      const meetingState = daily.meetingState();
      console.log("Current meeting state:", meetingState);
    } else {
      console.log("Daily instance not yet available");
    }
  }, [daily]);

  useEffect(() => {
    if (remoteParticipantIds.length && !start) {
      setStart(true);
      setTimeout(() => daily?.setLocalAudio(true), 4000);
    }
  }, [remoteParticipantIds, start]);

  useEffect(() => {
    if (!remoteParticipantIds.length || !start) return;

    setSessionStartTime();
    const interval = setInterval(() => {
      const time = getSessionTime();
      if (time === TIME_LIMIT - 60) {
        daily?.sendAppMessage({
          message_type: "conversation",
          event_type: "conversation.echo",
          conversation_id: conversation?.conversation_id,
          properties: {
            modality: "text",
            text:
              timeToGoPhrases[Math.floor(Math.random() * 3)] ??
              timeToGoPhrases[0],
          },
        });
      }
      if (time === TIME_LIMIT - 10) {
        daily?.sendAppMessage({
          message_type: "conversation",
          event_type: "conversation.echo",
          conversation_id: conversation?.conversation_id,
          properties: {
            modality: "text",
            text:
              outroPhrases[Math.floor(Math.random() * 3)] ?? outroPhrases[0],
          },
        });
      }
      if (time >= TIME_LIMIT) {
        leaveConversation();
        clearInterval(interval);
      } else {
        updateSessionEndTime();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [remoteParticipantIds, start]);

  const cleanupDaily = useCallback(async () => {
    if (!daily) return;
    
    console.log("Cleaning up Daily instance");
    
    try {
      const meetingState = daily.meetingState();
      console.log("Current meeting state:", meetingState);
      
      if (meetingState === "joined-meeting") {
        console.log("Currently in a meeting, leaving first");
        await daily.leave();
        hasJoinedRef.current = false;
        console.log("Successfully left Daily room");
      }
    } catch (e) {
      console.error("Error checking meeting state or leaving Daily room:", e);
    }
  }, [daily]);

  useEffect(() => {
    return () => {
      cleanupDaily();
    };
  }, [cleanupDaily]);

  useEffect(() => {
    if (!conversation?.conversation_url || !daily) {
      return;
    }
    
    const joinRoom = async () => {
      // Prevent multiple join attempts
      if (joinAttemptInProgressRef.current) {
        console.log("Join attempt already in progress, skipping");
        return;
      }
      
      joinAttemptInProgressRef.current = true;
      
      try {
        // Check current meeting state
        const meetingState = daily.meetingState();
        console.log("Current meeting state before joining:", meetingState);
        
        // If already in a meeting, leave first
        if (meetingState === "joined-meeting") {
          console.log("Already in a meeting, leaving first");
          await daily.leave();
          // Small delay to ensure leave completes
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Prioritize the conversation_url from the Tavus API, fallback to env var
        // The Tavus-provided URL is more likely to be correct
        const url = conversation.conversation_url || import.meta.env.VITE_DAILY_ROOM_URL;
        
        console.log("Joining Daily room with URL:", url);
        
        // Use the recommended join options format with improved settings
        await daily.join({
          url,
          // Audio/video settings
          audioSource: true, // Enable audio
          videoSource: true, // Enable video
          // Initial state
          startVideoOff: false,
          startAudioOff: true,
          // Allow full screen for better visibility
          showFullscreenButton: true
        });
        
        hasJoinedRef.current = true;
        console.log("Successfully joined Daily room");
        
        // Set audio off after joining
        daily.setLocalAudio(false);
      } catch (error) {
        console.error("Error joining Daily room:", error);
        hasJoinedRef.current = false;
      } finally {
        joinAttemptInProgressRef.current = false;
      }
    };
    
    joinRoom();
  }, [conversation?.conversation_url, daily]);

  const toggleVideo = useCallback(() => {
    daily?.setLocalVideo(!isCameraEnabled);
  }, [daily, isCameraEnabled]);

  const toggleAudio = useCallback(() => {
    daily?.setLocalAudio(!isMicEnabled);
  }, [daily, isMicEnabled]);

  const leaveConversation = useCallback(async () => {
    console.log("Leaving conversation");
    
    try {
      // Clean up Daily instance
      await cleanupDaily();
      
      // End the conversation on the server
      if (conversation?.conversation_id && token) {
        try {
          await endConversation(token, conversation.conversation_id);
          console.log("Successfully ended conversation on server");
          
          // End all active conversations to ensure clean state
          try {
            await endAllConversations(token);
            console.log("Successfully ended all remaining active conversations");
          } catch (error) {
            console.warn("Error ending other active conversations:", error);
          }
        } catch (e) {
          console.error("Error ending conversation on server:", e);
        }
      }
      
      // Ensure conversation state is reset
      setConversation(null);
      clearSessionTime();

      // Small delay to ensure state updates before screen transition
      setTimeout(() => {
        const naughtyScorePositive = Math.abs(naughtyScore);
        if (naughtyScorePositive > niceScore) {
          setScreenState({ currentScreen: "naughtyForm" });
        } else {
          setScreenState({ currentScreen: "niceForm" });
        }
      }, 100);
    } catch (error) {
      console.error("Error in leaveConversation:", error);
      // Reset conversation state even if there's an error
      setConversation(null);
      
      // Still try to navigate away even if there was an error
      setTimeout(() => {
        setScreenState({ currentScreen: "niceForm" });
      }, 100);
    }
  }, [cleanupDaily, token, conversation, setConversation, naughtyScore, niceScore, setScreenState]);

  // Create conversation with selected session type when component mounts
  useEffect(() => {
    const initializeConversation = async () => {
      if (conversation && conversation.conversation_url) {
        // Conversation already exists
        setIsCreatingConversation(false);
        return;
      }

      try {
        setIsCreatingConversation(true);
        
        // Make sure conversation state is null at the start
        if (conversation) {
          setConversation(null);
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        // End all active conversations to avoid the "maximum concurrent conversations" error
        console.log("Ending all active conversations before creating a new one");
        if (token) {
          try {
            await endAllConversations(token);
            console.log("Successfully ended all active conversations");
          } catch (error: any) {
            console.warn("Error ending active conversations:", error);
            console.log("Continuing anyway to create a new conversation...");
          }
          
          // Add a larger delay to ensure all conversations are fully ended on the server side
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          console.log(`Creating conversation with session type: ${sessionType}`);
          try {
            const newConversation = await createConversation(token, sessionType || 'general');
            console.log("Conversation created successfully:", newConversation);
            
            if (!newConversation || !newConversation.conversation_url) {
              throw new Error("Created conversation is missing required data");
            }
            
            setConversation(newConversation);
            setIsCreatingConversation(false);
          } catch (error: any) {
            console.error("Error creating conversation:", error);
            
            // If we get a 400 error, try once more after a longer delay
            if (error.message && error.message.includes("400")) {
              console.log("Received 400 error, waiting and retrying...");
              await new Promise(resolve => setTimeout(resolve, 3000));
              
              try {
                // Try ending all conversations again
                await endAllConversations(token);
                
                // Retry creating the conversation
                const retryConversation = await createConversation(token, sessionType || 'general');
                
                if (!retryConversation || !retryConversation.conversation_url) {
                  throw new Error("Retry conversation is missing required data");
                }
                
                setConversation(retryConversation);
                setIsCreatingConversation(false);
              } catch (retryError: any) {
                console.error("Error on retry:", retryError);
                setConversationError(retryError?.message || "Failed to create conversation after retry");
                setIsCreatingConversation(false);
              }
            } else {
              setConversationError(error?.message || "Failed to create conversation");
              setIsCreatingConversation(false);
            }
          }
        } else {
          throw new Error("API token is missing");
        }
      } catch (error: any) {
        console.error("Error creating conversation:", error);
        setConversationError(error?.message || "Failed to create conversation");
        setIsCreatingConversation(false);
      }
    };

    initializeConversation();
  }, [token, sessionType, setConversation, conversation]);

  // If still creating conversation, show loading
  if (isCreatingConversation) {
    return <ConversationLoading />;
  }

  // If there was an error creating the conversation
  if (conversationError) {
    return <ConversationError 
      error={conversationError} 
      onClick={() => {
        setConversationError(null);
        setScreenState(prev => ({ ...prev, currentScreen: "sessionSelector" }));
      }} 
    />;
  }

  return (
    <DialogWrapper>
      <div className="absolute inset-0 size-full">
        <Timer />
        {remoteParticipantIds?.length > 0 && (
          <div className="relative size-full">
            <Video
              id={remoteParticipantIds[0]}
              className="size-full"
              tileClassName="!object-cover"
              key={`remote-${remoteParticipantIds[0]}`}
            />
            {!start && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center text-white">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-t-transparent mx-auto"></div>
                  <p>Connecting to your Magic Mirror...</p>
                </div>
              </div>
            )}
          </div>
        )}
        {localSessionId && (
          <Video
            id={localSessionId}
            tileClassName="!object-cover"
            className="absolute bottom-20 right-4 aspect-video h-40 w-24 overflow-hidden rounded-lg border-2 border-primary sm:bottom-12 lg:h-auto lg:w-52"
            key={`local-${localSessionId}`}
          />
        )}
        <div className="absolute bottom-8 right-1/2 z-10 flex translate-x-1/2 justify-center gap-4">
          <Button
            size="icon"
            className=""
            variant="secondary"
            onClick={toggleAudio}
          >
            {!isMicEnabled ? (
              <MicOffIcon className="size-6" />
            ) : (
              <MicIcon className="size-6" />
            )}
          </Button>
          <Button
            size="icon"
            className=""
            variant="secondary"
            onClick={toggleVideo}
          >
            {!isCameraEnabled ? (
              <VideoOffIcon className="size-6" />
            ) : (
              <VideoIcon className="size-6" />
            )}
          </Button>
          <Button
            size="icon"
            className="bg-[rgba(251,36,71,0.80)] backdrop-blur hover:bg-[rgba(251,36,71,0.60)]"
            variant="secondary"
            onClick={leaveConversation}
          >
            <PhoneIcon className="size-6 rotate-[135deg]" />
          </Button>
        </div>
        <DailyAudio />
      </div>
    </DialogWrapper>
  );
};
