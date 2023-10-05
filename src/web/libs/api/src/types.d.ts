declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GRPC_API_DNS: string;
      DEFAULT_PAGE_SIZE: number;
    }
  }
}

export {};
