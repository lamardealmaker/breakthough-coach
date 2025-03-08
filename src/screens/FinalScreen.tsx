import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
  StaticTextBlockWrapper,
} from "@/components/DialogWrapper";
import React from "react";
import { BarChart } from "lucide-react";

export const FinalScreen: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex flex-col items-center text-center p-8 max-w-2xl backdrop-blur-sm bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-xl">
          <div className="mb-6 w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <BarChart className="text-blue-400 w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent">
            Analyzing Your Session
          </h2>
          
          <p className="text-lg text-slate-300 mb-8">
            We're processing the insights from your coaching session.
            This reflection will help guide your next steps forward.
          </p>
          
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></div>
            <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse delay-150"></div>
            <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse delay-300"></div>
          </div>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
