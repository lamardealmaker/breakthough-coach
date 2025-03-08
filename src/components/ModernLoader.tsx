import React from 'react';

export const ModernLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* Circle spinning loader */}
      <div className="relative w-16 h-16">
        {/* Outer circle */}
        <div className="absolute inset-0 rounded-full border-2 border-slate-700/50"></div>
        
        {/* Animated spinner */}
        <div className="absolute inset-0 rounded-full border-2 border-t-2 border-t-teal-400 border-r-2 border-r-blue-400 border-b-2 border-b-transparent border-l-2 border-l-transparent animate-spin" 
             style={{ animationDuration: '1.5s' }}></div>
             
        {/* Inner dot */}
        <div className="absolute inset-[40%] rounded-full bg-gradient-to-tr from-teal-400 to-blue-400"></div>
      </div>
      
      <p className="text-lg font-medium bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
        Initializing...
      </p>
    </div>
  );
}; 