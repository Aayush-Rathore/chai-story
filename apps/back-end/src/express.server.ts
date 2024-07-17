import express, { Application } from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import PublicRoutes from "./routers/public.routes";
import AuthRouters from "./routers/auth.routes";
import PostRouters from "./routers/post.routes";
import UserRouters from "./routers/user.routes";
import { verifyUser } from "./middleware/authentication.middleware";
import { asyncHandler } from "./utilities/asyncHandler.utility";
// import RedisStore from "connect-redis";
// import redis from "redis";

class ExpressServer {
  private app: Application;
  private limiter: any;
  // private redisClient: redis.RedisClientType;
  private redisStore: any;

  constructor() {
    this.app = express();
    this.limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: "draft-7",
      legacyHeaders: false,
      message: "Too Many Requests!",
    });
    this.useMiddleware();
    this.useRoutes();

    // this.redisClient = redis.createClient({
    //   url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    // });

    // const RedisStoreInstance = new RedisStore({
    //   client: this.redisClient,
    //   prefix: "chai-story",
    // });
  }

  private useRoutes() {
    this.app.use("/v1/public", asyncHandler(verifyUser), PublicRoutes);
    this.app.use("/v1/auth", AuthRouters);
    this.app.use("/v1/post", asyncHandler(verifyUser), PostRouters);
    this.app.use("/v1/user", asyncHandler(verifyUser), UserRouters);
  }

  private useMiddleware() {
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.originalUrl}`);
      next();
    });
    this.app.use(this.limiter);
    this.app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cookies", "Cookie"],
        exposedHeaders: ["Set-Cookie"],
      })
    );

    this.app.use(
      express.json({
        limit: "25kb",
      })
    );

    this.app.use(
      express.urlencoded({
        extended: true,
        limit: "15kb",
      })
    );

    this.app.use(cookieParser());
  }

  public startServer() {
    this.app.listen(process.env.PORT, () => {
      console.log(
        `Server is successfully configured | running on PORT ${process.env.PORT}`
      );
    });
  }
}

export default new ExpressServer();
