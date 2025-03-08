import { useAtom } from "jotai";
import { screenAtom } from "../store/screens";

interface SessionCardProps {
  title: string;
  description: string;
  icon: string;
  type: string;
  onClick: (type: string) => void;
}

const SessionCard = ({ title, description, icon, type, onClick }: SessionCardProps) => {
  return (
    <div 
      className="bg-slate-800/80 rounded-xl p-6 hover:bg-slate-700/90 transition-all duration-300 cursor-pointer 
                border border-slate-600/30 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/5 
                flex flex-col items-center transform hover:translate-y-[-4px]"
      onClick={() => onClick(type)}
    >
      <div className="text-4xl mb-4 bg-slate-900/60 rounded-full p-3 border border-slate-700/30">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-teal-300">{title}</h3>
      <p className="text-slate-300 text-center">{description}</p>
    </div>
  );
};

const SessionSelector = () => {
  const [, setScreen] = useAtom(screenAtom);

  const handleSessionSelect = (sessionType: string) => {
    setScreen((prev) => ({
      ...prev,
      currentScreen: "conversation",
      sessionType
    }));
  };

  const sessions = [
    {
      title: "Confidence Booster",
      description: "Overcome self-doubt and build authentic confidence",
      icon: "✨",
      type: "confidence"
    },
    {
      title: "Goal Breakthrough",
      description: "Break through obstacles and achieve your goals",
      icon: "🎯",
      type: "goals"
    },
    {
      title: "Fear Conqueror",
      description: "Face and overcome your fears with courage",
      icon: "🦁",
      type: "fear"
    },
    {
      title: "Habit Transformer",
      description: "Build positive habits and break negative ones",
      icon: "🔄",
      type: "habits"
    },
    {
      title: "Purpose Finder",
      description: "Discover deeper meaning and direction in your life",
      icon: "🧭",
      type: "purpose"
    },
    {
      title: "Resilience Builder",
      description: "Recover from setbacks and build mental strength",
      icon: "💪",
      type: "resilience"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto z-10 py-6">
      <div className="text-center mb-10 backdrop-blur-sm bg-slate-900/40 py-6 px-4 rounded-xl border border-slate-700/30">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">
          Choose Your Session Type
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
          Select the coaching approach that best fits your current needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {sessions.map((session) => (
          <SessionCard
            key={session.type}
            title={session.title}
            description={session.description}
            icon={session.icon}
            type={session.type}
            onClick={handleSessionSelect}
          />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <button 
          className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 
                    text-white py-3 px-8 rounded-lg font-medium transition-all duration-300 
                    shadow-lg hover:shadow-blue-500/20"
          onClick={() => handleSessionSelect("general")}
        >
          Guide Me Through Options
        </button>
      </div>
    </div>
  );
};

export default SessionSelector; 