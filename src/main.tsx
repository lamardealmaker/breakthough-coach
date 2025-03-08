import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { DailyProvider } from "@daily-co/daily-react";

import "./fonts/Christmas and Santona.ttf";
import "./index.css";

// Configure Daily with options to limit WebGL contexts
const dailyConfig = {
  dailyConfig: {
    // Optimize video settings to reduce WebGL usage
    userMediaVideoConstraints: {
      width: { ideal: 640, max: 1280 },
      height: { ideal: 360, max: 720 },
      frameRate: { ideal: 15, max: 24 }
    },
    // Use sendSettings instead of deprecated camSimulcastEncodings
    sendSettings: {
      video: {
        encodings: [
          { maxBitrate: 300000, maxFramerate: 15, scaleResolutionDownBy: 4 },
          { maxBitrate: 600000, maxFramerate: 24, scaleResolutionDownBy: 2 },
          { maxBitrate: 1200000, maxFramerate: 24, scaleResolutionDownBy: 1 }
        ]
      }
    },
    // Disable background blur to save WebGL resources
    disableBackgroundBlur: true,
    // Disable video processor effects to save WebGL resources
    disableVideoProcessorEffects: true
  }
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DailyProvider {...dailyConfig}>
      <App />
    </DailyProvider>
  </React.StrictMode>,
);
