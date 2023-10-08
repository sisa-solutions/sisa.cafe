declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GRPC_API_HOST: string;
      DEFAULT_PAGE_SIZE: number;
    }
  }
}

export {};
