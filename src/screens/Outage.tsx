import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import { WifiOff } from "lucide-react";
import React from "react";

export const Outage: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex flex-col items-center text-center p-8 max-w-2xl backdrop-blur-sm bg-slate-900/60 rounded-xl border border-slate-700/50 shadow-xl">
          <div className="mb-6 w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center">
            <WifiOff className="text-blue-400 w-10 h-10" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-teal-400 bg-clip-text text-transparent">
            Service Temporarily Unavailable
          </h2>
          
          <p className="text-lg text-slate-300 mb-4">
            Our coaching services are currently offline for maintenance. We're working to restore access as quickly as possible.
          </p>
          
          <p className="text-slate-400 text-sm">
            Please check back in a few minutes.
          </p>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
