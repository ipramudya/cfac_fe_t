/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string
  readonly VITE_WS_ENDPOINT: string

  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
