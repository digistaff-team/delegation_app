/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROTALK_BOT_TOKEN: string
  readonly VITE_PROTALK_BOT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
