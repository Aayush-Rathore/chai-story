import { TSignUp, TVerifyEmail } from "../types/common.types";
import userDb from "../database/functions/user.db";
import ApiError from "../utilities/apiError.utility";

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
    return { newUser, token };
  }

  public async VerifyEmail(params: TVerifyEmail) {}
}

export default new AuthServices();
