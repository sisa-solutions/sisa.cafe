declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GRPC_API_DNS: string;
    }
  }
}

export { }
