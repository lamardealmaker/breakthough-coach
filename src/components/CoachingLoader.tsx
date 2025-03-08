import React from 'react';
import { Brain, Lightbulb, Target } from 'lucide-react';

// Different icons that can be used for the loader
const icons = {
  brain: <Brain className="size-12 text-teal-400 animate-pulse" />,
  lightbulb: <Lightbulb className="size-12 text-teal-400 animate-pulse" />,
  target: <Target className="size-12 text-teal-400 animate-pulse" />
};

interface CoachingLoaderProps {
  icon?: 'brain' | 'lightbulb' | 'target';
  text?: string;
}

export const CoachingLoader: React.FC<CoachingLoaderProps> = ({ 
  icon = 'lightbulb', 
  text = 'Preparing your session...' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Pulse animation circle */}
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-teal-500/10 animate-pulse" 
             style={{ animationDuration: '2s' }}></div>
        <div className="relative">
          {icons[icon]}
        </div>
      </div>
      
      <p className="text-lg font-medium bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
        {text}
      </p>
    </div>
  );
}; 