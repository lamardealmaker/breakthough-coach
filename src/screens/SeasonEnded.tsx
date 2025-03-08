import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
  StaticTextBlockWrapper,
} from "@/components/DialogWrapper";
import React from "react";
import { CalendarClock } from "lucide-react";

export const SeasonEnded: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <StaticTextBlockWrapper
          imgSrc="/images/snowman.png"
          title="The Mirror is Resting"
          description="The magical energies need time to replenish. The mirror will return soon to share its wisdom once again. ✨"
        />
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
