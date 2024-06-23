declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      DATABASE_NAME: string;
      CORS_ORIGIN: string;
      DATABASE_NAME: string;

      ACCESS_TOKEN_KEY: string;
      ACCESS_TOKEN_EXPIRY: string;

      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASS: string;
      REDIS_USERNAME: string;

      CLIENT: string;
    }
  }
}

export {};
