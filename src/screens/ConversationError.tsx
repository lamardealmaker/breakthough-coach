import AudioButton from "@/components/AudioButton";
import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import { AlertCircle, RefreshCcw } from "lucide-react";
import React from "react";

interface ConversationErrorProps {
  onClick: () => void;
  error?: string;
}

export const ConversationError: React.FC<ConversationErrorProps> = ({
  onClick,
  error,
}) => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex flex-col items-center text-center p-8 max-w-2xl backdrop-blur-sm bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-xl">
          <div className="mb-6 w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <AlertCircle className="text-blue-400 w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent">
            Connection Issue
          </h2>
          
          <p className="text-lg text-slate-300 mb-8">
            {error || "We're having trouble establishing a connection to our coaching services. Please try again in a moment."}
          </p>
          
          <AudioButton 
            onClick={onClick} 
            className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white border-none shadow-lg px-6 py-2"
          >
            <RefreshCcw className="size-5 mr-2" /> Try Again
          </AudioButton>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
