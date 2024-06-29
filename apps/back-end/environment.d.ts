import { TJsonPayload } from "./src/types/common.types";
import { JwtPayload } from "jsonwebtoken";

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

      AWS_S3_ACCEESS_KEY: string;
      AWS_S3_SECRET_KEY: string;
      AWS_S3_END_POINT: string;
      AWS_S3_REGION: string;
      AWS_S3_BUCKET_NAME: string;

      SOCKET_SERVER_PORT: number;

      REDIS_SECRET_KEY: string;
    }
  }

  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export {};
