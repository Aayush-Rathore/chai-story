declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASS: string;
      REDIS_USERNAME: string;

      MAIL_PASS: string;
      MAIL_ID: string;

      DOMAIL: string;
      ROUTE: string;
    }
  }
}

export {};
