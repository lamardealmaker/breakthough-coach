import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
} from "@/components/DialogWrapper";
import { CoachingLoader } from "@/components/CoachingLoader";
import React from "react";

export const ConversationLoading: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex size-full items-center justify-center">
          <CoachingLoader icon="lightbulb" text="Preparing your coaching session..." />
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
