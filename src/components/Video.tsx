import { cn } from "@/lib/utils";
import { DailyVideo, useVideoTrack } from "@daily-co/daily-react";
import { useEffect, useRef, useState } from "react";

export default function Video({
  id,
  className,
  tileClassName,
}: {
  id: string;
  className?: string;
  tileClassName?: string;
}) {
  const videoState = useVideoTrack(id);
  const [shouldRender, setShouldRender] = useState(false);
  const mountTimeRef = useRef<number>(Date.now());
  
  // Debug logging for video track state
  useEffect(() => {
    console.log(`Video track state for ${id}:`, videoState);
    console.log(`Video is ${videoState.isOff ? 'OFF' : 'ON'} for participant ${id}`);
    
    if (videoState.isOff) {
      console.log(`Video track is off for ${id} - track state:`, videoState.track);
    } else if (videoState.track) {
      console.log(`Video track available for ${id}:`, videoState.track);
    }
  }, [id, videoState]);
  
  // Delay rendering the video to prevent too many WebGL contexts
  useEffect(() => {
    // Only render the video if it's not off
    if (!videoState.isOff) {
      console.log(`Setting up video render timer for ${id}`);
      // Small delay to ensure we don't create too many contexts at once
      const timer = setTimeout(() => {
        console.log(`Rendering video for ${id} after delay`);
        setShouldRender(true);
      }, 300);
      
      return () => {
        console.log(`Clearing video render timer for ${id}`);
        clearTimeout(timer);
      };
    } else {
      console.log(`Video is off for ${id}, not rendering`);
      setShouldRender(false);
    }
  }, [videoState.isOff, id]);
  
  // Clean up when component unmounts or ID changes
  useEffect(() => {
    return () => {
      console.log(`Video component for ${id} unmounted after ${(Date.now() - mountTimeRef.current) / 1000}s`);
      // Force a small delay before unmounting to ensure proper cleanup
      setShouldRender(false);
    };
  }, [id]);

  if (videoState.isOff) {
    console.log(`Video is off for ${id}, returning null`);
    return null;
  }

  return (
    <div
      className={cn("bg-[rgba(248,250,252,0.08)]", className, {
        "hidden size-0": !shouldRender,
      })}
    >
      {shouldRender && (
        <DailyVideo
          automirror
          sessionId={id}
          type="video"
          className={cn("size-full object-cover", tileClassName)}
        />
      )}
    </div>
  );
}
