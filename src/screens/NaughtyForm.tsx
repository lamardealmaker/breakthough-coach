import {
  AnimatedTextBlockWrapper,
  DialogWrapper,
  StaticTextBlockWrapper,
} from "@/components/DialogWrapper";
import React from "react";

export const NaughtyForm: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <StaticTextBlockWrapper
          imgSrc="/images/snowman.png"
          title="The Mirror is Concerned"
          description="The mirror has sensed some disharmony in your energy. Perhaps next time, approach with more clarity and positive intent."
        />
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
