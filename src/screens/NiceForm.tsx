import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import React from "react";
import { CheckCircle, PlusCircle } from "lucide-react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { conversationAtom } from "@/store/conversation";
import { endAllConversations } from "@/api/endAllConversations";
import { apiTokenAtom } from "@/store/tokens";

export const NiceForm: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [, setConversation] = useAtom(conversationAtom);
  const [token] = useAtom(apiTokenAtom);
  
  const handleStartNewSession = async () => {
    // Reset conversation state to null
    setConversation(null);
    
    // End all active conversations to prevent API errors
    if (token) {
      try {
        await endAllConversations(token);
        console.log("Successfully ended all active conversations");
      } catch (error) {
        console.warn("Error ending active conversations:", error);
      }
    }
    
    // Navigate to session selector after a small delay to ensure state updates
    setTimeout(() => {
      setScreenState({ currentScreen: "sessionSelector" });
    }, 100);
  };

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex flex-col items-center text-center p-8 max-w-2xl backdrop-blur-sm bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-xl">
          <div className="mb-6 w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center">
            <CheckCircle className="text-teal-400 w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
            Breakthrough Achieved
          </h2>
          
          <p className="text-lg text-slate-300 mb-6">
            You've made significant progress today. The clarity and commitment you've shown 
            will carry you forward on your journey to success.
          </p>
          
          <div className="bg-slate-800/70 p-6 rounded-lg border border-slate-700/50 w-full mb-8">
            <p className="text-teal-200 font-medium mb-2">Key Insight:</p>
            <p className="text-slate-300 italic">
              "Progress begins with clarity of purpose. Today's breakthrough has laid the foundation for 
              your continued growth and achievement."
            </p>
          </div>
          
          <Button 
            onClick={handleStartNewSession}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-2 px-6 rounded-lg flex items-center gap-2 shadow-lg"
          >
            <PlusCircle size={18} />
            Start New Session
          </Button>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
