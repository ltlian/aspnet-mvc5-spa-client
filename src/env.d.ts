/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_LOGIN_URL: string
  readonly VITE_LOGOUT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
