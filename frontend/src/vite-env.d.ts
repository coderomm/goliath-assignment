/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GQL_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
