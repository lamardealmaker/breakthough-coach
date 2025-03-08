import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

interface AudioButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const AudioButton: React.FC<AudioButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
    },
    [onClick],
  );

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export default AudioButton;
