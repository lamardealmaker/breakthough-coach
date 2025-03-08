/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_TAVUS_API_KEY: string;
    readonly VITE_DAILY_ROOM_URL: string;
    readonly [key: string]: string | undefined;
  };
} 