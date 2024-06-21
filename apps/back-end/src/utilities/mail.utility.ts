import { Queue } from "bullmq";
import jwt from "jsonwebtoken";
import ApiError from "./apiError.utility";

const emailQueue = new Queue("chai-queue", {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASS,
  },
});

const tokenGenerator = async (id: string): Promise<string> => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "10m",
    }
  );
};

const sendMail = async (
  username: string,
  subject: string,
  id: string,
  email: string
): Promise<void> => {
  try {
    const token = await tokenGenerator(id);
    emailQueue.add(`${Date.now()}`, { username, subject, token, email });
  } catch (error) {
    throw new ApiError(
      500,
      "UNABLE_TO_SEND_VERIFICATION_MAIL",
      "Something went wrong while sending verification mail",
      error
    );
  }
};

export default sendMail;
