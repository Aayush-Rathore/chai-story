import { TLogin, TSignUp, TVerifyEmail } from "../types/common.types";
import userDb from "../database/functions/user.db";
import ApiError from "../utilities/apiError.utility";
import VeirfyToken from "../utilities/verifyToken.utility";
import { TJsonPayload } from "../types/common.types";

class AuthServices {
  public async SignUp(params: TSignUp) {
    const userDetails = await userDb.getUser({
      email: params.email,
      username: params.username,
    });

    if (userDetails)
      throw new ApiError(
        409,
        "User already exists",
        "Please try again with diffrent credentials",
        {
          message: `Email ${params.email} or Username ${params.username} already in use`,
        }
      );

    const newUser = await userDb.createUser(params);
    const token = await newUser.generateAccessToken();
    return {
      token,
      img: newUser.img,
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  public async Login(params: TLogin) {
    const userDetails = await userDb.getUser({
      email: params.id,
      username: params.id,
    });

    if (!userDetails)
      throw new ApiError(
        404,
        "User not found",
        `User is not available with ${params.id.includes("@") ? "email" : "username"} ${params.id}.`,
        {
          message: "Please signup first to login!",
        }
      );

    const isPasswordCorrect = await userDetails.matchPassword(params.password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Wrong password", `Password does not match`, {
        message: "Please try again with diffrent password!",
      });
    }

    if (!userDetails.isVerified) {
      throw new ApiError(
        401,
        "Email verification required",
        `Please verify your email before login`,
        {
          message:
            "Please check the inbox and verify the email before you login into your account",
        }
      );
    }
    const token = await userDetails.generateAccessToken();

    return {
      token,
      img: userDetails.img,
      id: userDetails.id,
      username: userDetails.username,
    };
  }

  public async VerifyEmail(params: TVerifyEmail) {
    const tokenInfo = VeirfyToken(params.token) as TJsonPayload;
    if (!tokenInfo)
      throw new ApiError(
        404,
        "Invalid token",
        "Something went wrong please request for another verification mail",
        {
          message: `This error might occure because of invalid verification link`,
        }
      );

    const updatedUser = await userDb.updateUser(tokenInfo.id, {
      isVerified: true,
    });

    if (!updatedUser)
      throw new ApiError(
        404,
        "Invalid token",
        "Something went wrong please request for another verification mail",
        {
          message: `This error might occure because of invalid verification link`,
        }
      );

    const token = await updatedUser.generateAccessToken();

    return {
      token,
      img: updatedUser.img,
      id: updatedUser.id,
      username: updatedUser.username,
    };
  }

  public async VerifyUser(_id: string) {
    const userInfo = await userDb.getUser({ _id });
    if (!userInfo) {
      throw new ApiError(
        401,
        "User not found",
        `Something went wrong, Your token might be invalid`,
        {
          message: "Please signin again!",
        }
      );
    }
    const token = await userInfo?.generateAccessToken();
    return {
      token,
      img: userInfo.img,
      id: userInfo.id,
      username: userInfo.username,
    };
  }
}

export default new AuthServices();
