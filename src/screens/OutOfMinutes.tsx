import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
  StaticTextBlockWrapper,
} from "@/components/DialogWrapper";
import React from "react";

export const OutOfMinutes: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <StaticTextBlockWrapper
          imgSrc="/images/snowman.png"
          title="You've reached your limit with the Mirror today"
          description="The mirror needs time to recharge its magical energies. Please return tomorrow for more insights and wisdom."
        />
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
