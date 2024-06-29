import ApiError from "../utilities/apiError.utility";
import { TJsonPayload } from "../types/common.types";
import VeirfyToken from "../utilities/verifyToken.utility";
import { NextFunction, Request, Response } from "express";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalUrl = req.originalUrl;
  const { accessToken } = req.cookies as TJsonPayload;
  if (originalUrl.includes("/v1/public") && !accessToken) {
    next();
  } else {
    if (!accessToken) {
      throw new ApiError(
        401,
        "Unauthorized",
        "You need to login before using this functionality."
      );
    }
    req.user = VeirfyToken(accessToken);
    next();
  }
};
