import { atom } from "jotai";

type Screen =
  | "introLoading"
  | "outage"
  | "outOfMinutes"
  | "intro"
  | "instructions"
  | "sessionSelector"
  | "conversation"
  | "conversationError"
  | "niceForm"
  | "naughtyForm"
  | "finalScreen"
  | "seasonEnded";

interface ScreenState {
  currentScreen: Screen;
  sessionType?: string;
}

const initialScreenState: ScreenState = {
  currentScreen: "introLoading",
  sessionType: "general"
};

export const screenAtom = atom<ScreenState>(initialScreenState);
