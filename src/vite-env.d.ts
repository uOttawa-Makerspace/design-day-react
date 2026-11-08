/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_CONFIG_ENDPOINT: string;
  readonly REACT_APP_GOOGLE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
