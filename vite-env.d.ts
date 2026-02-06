/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOT_TOKEN: string
  readonly VITE_BOT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
