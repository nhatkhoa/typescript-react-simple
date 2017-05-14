declare module "react-hot-loader"

type nodeEnv = 'production' | 'development'

interface Process {
  env: {
    NODE_ENV: nodeEnv
  }
}

declare var Process: Process

declare var __DEV__: boolean
declare var __PROD__: boolean
declare var __TEST__: boolean

interface Dict<T> {
  [key: string]: T
}

interface Window {
  ga(...args: any[]): void
}

