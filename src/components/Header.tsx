import { useEffect, memo } from "react";
import { atom, useAtom } from "jotai";
import { Button } from "./ui/button";
import { Music, Bookmark } from "lucide-react";
import { isMusicMutedAtom, musicVolumeAtom } from "@/store/musicVolume";

export const Header = memo(() => {
  const [musicVolume, setMusicVolume] = useAtom(musicVolumeAtom);
  const [isMuted, setIsMuted] = useAtom(isMusicMutedAtom);

  const toggleMusic = () => {
    if (!isMuted && musicVolume === 0) {
      setMusicVolume(0.3);
    } else {
      setIsMuted(!isMuted);
    }
  };

  return (
    <header className="flex w-full items-center justify-between z-10">
      <div className="flex items-center">
        <Bookmark className="text-teal-400 mr-2 h-6 w-6 sm:h-7 sm:w-7" />
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
          Breakthrough Coach
        </h1>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden sm:flex h-10 items-center rounded-xl border border-teal-500/20 bg-slate-800/40 px-3 backdrop-blur-sm sm:h-12">
          <span className="text-slate-300 text-sm font-light">Elevate Your Potential</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMusic}
          className="relative size-10 sm:size-12 border-slate-700 bg-slate-800/40 hover:bg-slate-700/50 hover:text-teal-200"
        >
          <Music className="size-4 sm:size-5 text-slate-400" />
          {(musicVolume === 0 || isMuted) && (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 text-2xl font-thin sm:text-4xl text-slate-400">
              /
            </span>
          )}
        </Button>
      </div>
    </header>
  );
});
