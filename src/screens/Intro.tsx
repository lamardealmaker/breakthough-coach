import { AnimatedWrapper } from "@/components/DialogWrapper";
import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { BookOpen } from "lucide-react";
import AudioButton from "@/components/AudioButton";
import coachingVideo from "@/assets/video/coaching-background.mp4";
import { musicVolumeAtom } from "@/store/musicVolume";
import { apiTokenAtom } from "@/store/tokens";
import { Input } from "@/components/ui/input";

export const Intro: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [musicVolume, setMusicVolume] = useAtom(musicVolumeAtom);
  const [token, setToken] = useAtom(apiTokenAtom);

  // Set the API token from environment variable on component mount
  useEffect(() => {
    if (import.meta.env.VITE_TAVUS_API_KEY && !token) {
      setToken(import.meta.env.VITE_TAVUS_API_KEY);
    }
  }, [setToken, token]);

  const handleClick = () => {
    if (musicVolume === 0) {
      setMusicVolume(0.3);
    }
    setScreenState({ currentScreen: "instructions" });
  };

  return (
    <AnimatedWrapper>
      <div className="flex size-full flex-col items-center justify-center">
        <video
          src={coachingVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          style={{ filter: "brightness(0.4) saturate(1.1) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
        
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-lg text-center">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent mb-2">
            Breakthrough Coach
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-200 mb-2">
            Personalized coaching powered by insights from the world's top performance experts.
          </p>
          
          <div className="flex flex-col gap-4 items-center backdrop-blur-sm bg-slate-900/60 rounded-xl p-8 border border-slate-700/50 shadow-xl w-full">
            <p className="text-slate-300 mb-2">Enter your API token to begin your coaching session</p>
            
            <Input
              type="password"
              value={token || ""}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter API Token"
              className="w-full bg-slate-800/90 border-slate-700 text-white focus:ring-teal-500"
            />

            <p className="text-sm text-slate-400 mt-2">
              Don't have a token?{" "}
              <a
                href="https://platform.tavus.io/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 underline"
              >
                Sign up for a Tavus API Key
              </a>
            </p>
          </div>
          
          <AudioButton
            onClick={handleClick}
            className="relative z-10 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 border-none text-white shadow-lg"
            disabled={!token}
          >
            <BookOpen className="size-5 mr-2" />
            Begin Your Session
          </AudioButton>
        </div>
      </div>
    </AnimatedWrapper>
  );
};
