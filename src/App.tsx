import { useAtom } from "jotai";
import { screenAtom } from "./store/screens";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import {
  IntroLoading,
  Outage,
  OutOfMinutes,
  Intro,
  Instructions,
  SessionSelector,
  Conversation,
  NiceForm,
  FinalScreen,
  SeasonEnded,
  NaughtyForm,
} from "./screens";
import BackgroundAudio from "./components/BackgroundAudio";

function App() {
  const [{ currentScreen }] = useAtom(screenAtom);

  const renderScreen = () => {
    switch (currentScreen) {
      case "introLoading":
        return <IntroLoading />;
      case "outage":
        return <Outage />;
      case "outOfMinutes":
        return <OutOfMinutes />;
      case "intro":
        return <Intro />;
      case "instructions":
        return <Instructions />;
      case "sessionSelector":
        return <SessionSelector />;
      case "conversation":
        return <Conversation />;
      case "niceForm":
        return <NiceForm />;
      case "naughtyForm":
        return <NaughtyForm />;
      case "finalScreen":
        return <FinalScreen />;
      case "seasonEnded":
        return <SeasonEnded />;
      default:
        return <IntroLoading />;
    }
  };

  return (
    <main className="breakthrough-background flex h-svh flex-col items-center justify-between gap-3 p-5 sm:gap-4 lg:p-8">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950"></div>
      
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-teal-900/10"></div>
      
      {/* Mesh/grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-5" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px' 
        }}
      ></div>
      
      {currentScreen !== "introLoading" && <Header />}
      <div className="z-10 w-full flex-1 flex items-center justify-center">
        {renderScreen()}
      </div>
      {currentScreen !== "introLoading" && <Footer />}
      <BackgroundAudio />
    </main>
  );
}

export default App;
