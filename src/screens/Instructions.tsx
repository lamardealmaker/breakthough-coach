import { createConversation } from "@/api";
import { endAllConversations } from "@/api/endAllConversations";
import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import React, { useCallback, useMemo, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AlertTriangle, Mic, Video } from "lucide-react";
import { useDaily, useDailyEvent, useDevices } from "@daily-co/daily-react";
import { ConversationLoading } from "./ConversationLoading";
import { ConversationError } from "./ConversationError";
import { Button } from "@/components/ui/button";
import { apiTokenAtom } from "@/store/tokens";

const useCreateConversationMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const [, setConversation] = useAtom(conversationAtom);
  const token = useAtomValue(apiTokenAtom);

  const createConversationRequest = async () => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      
      // Instead of creating a conversation right away, direct user to session selection
      setScreenState((prev) => ({
        ...prev,
        currentScreen: "sessionSelector"
      }));
      
      return; // Exit early to avoid creating conversation here
      
      /* Original code that we're skipping for now
      // First, end all active conversations to avoid the "maximum concurrent conversations" error
      console.log("Ending all active conversations before creating a new one");
      try {
        await endAllConversations(token);
        console.log("Successfully ended all active conversations");
      } catch (error) {
        console.warn("Error ending active conversations:", error);
        console.log("Continuing anyway to create a new conversation...");
      }
      
      // Add a small delay to ensure all conversations are fully ended
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Creating conversation with token:", token);
      const conversation = await createConversation(token);
      console.log("Conversation created successfully:", conversation);
      
      if (!conversation || !conversation.conversation_url) {
        throw new Error("Created conversation is missing required data");
      }
      */
    } catch (error) {
      console.error("Error creating conversation:", error);
      setError(error instanceof Error ? error.message : String(error));
      setScreenState({ currentScreen: "outage" }); // Show the outage screen on error
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createConversationRequest,
  };
};

export const Instructions: React.FC = () => {
  const daily = useDaily();
  const { currentMic, setMicrophone, setSpeaker } = useDevices();
  const { createConversationRequest } = useCreateConversationMutation();
  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [error, setError] = useState(false);

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const handleClick = async () => {
    // Prevent multiple clicks
    if (isLoading) {
      console.log("Creation already in progress, ignoring click");
      return;
    }
    
    try {
      setIsLoading(true);
      
      let micDeviceId = currentMic?.device?.deviceId;
      if (!micDeviceId) {
        const res = await daily?.startCamera({
          startVideoOff: false,
          startAudioOff: false,
          audioSource: "default",
        });
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultMic = res?.mic?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultSpeaker = res?.speaker?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        micDeviceId = res?.mic?.deviceId;

        if (isDefaultMic) {
          if (!isDefaultMic) {
            setMicrophone("default");
          }
          if (!isDefaultSpeaker) {
            setSpeaker("default");
          }
        }
      }
      
      if (micDeviceId) {
        setIsLoadingConversation(true);
        await createConversationRequest();
      } else {
        setGetUserMediaError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingConversation(false);
    }
  };

  if (isLoadingConversation) {
    return <ConversationLoading />;
  }
  if (error) {
    return <ConversationError onClick={handleClick} />;
  }

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <h1 className="mb-6 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text pt-1 text-center font-bold text-4xl text-transparent sm:text-5xl lg:text-6xl">
          Breakthrough Coach
        </h1>
        <p className="max-w-[650px] text-center text-base sm:text-xl text-slate-200">
          Your personal coaching session draws from expert techniques to help you overcome challenges
          and achieve meaningful results today.
        </p>
        
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-4 flex flex-col items-center shadow-md">
            <div className="bg-teal-500/10 rounded-full p-3 mb-3">
              <Mic className="h-6 w-6 text-teal-400" />
            </div>
            <h3 className="font-semibold text-teal-200 mb-1">Speak Naturally</h3>
            <p className="text-center text-sm text-slate-300">Share your challenges and goals in your own words. The coach listens and adapts to you.</p>
          </div>
          
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-4 flex flex-col items-center shadow-md">
            <div className="bg-teal-500/10 rounded-full p-3 mb-3">
              <Video className="h-6 w-6 text-teal-400" />
            </div>
            <h3 className="font-semibold text-teal-200 mb-1">Face-to-Face Coaching</h3>
            <p className="text-center text-sm text-slate-300">Experience the power of personal connection with your coach through video interaction.</p>
          </div>
        </div>
        
        {/* TODO: add tooltip to provide access to mic */}
        <Button
          onClick={handleClick}
          className="relative mt-4 mb-10 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 border-none text-white px-8 py-3 text-lg font-medium rounded-lg shadow-md"
          disabled={isLoading}
        >
          Choose Your Coaching Focus
          {getUserMediaError && (
            <div className="absolute -top-1 left-0 right-0 flex items-center gap-1 text-wrap rounded-lg border border-red-700 bg-red-900/80 p-2 text-white backdrop-blur-sm">
              <AlertTriangle className="text-red-400 size-4" />
              <p>
                To begin your coaching session, please allow microphone and camera access. Check your
                browser settings.
              </p>
            </div>
          )}
        </Button>
        
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-2 text-teal-200">
            <Mic className="size-5 text-teal-400" />
            Mic access required
          </div>
          <div className="flex items-center gap-2 text-teal-200">
            <Video className="size-5 text-teal-400" />
            Camera access required
          </div>
        </div>
        
        <span className="absolute bottom-6 px-4 text-sm text-slate-400 sm:bottom-8 sm:px-8">
          By starting a conversation, I accept the Terms of Use and acknowledge
          the Privacy Policy.
        </span>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
