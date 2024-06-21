import { TSignUp } from "../../types/common.types";
import ApiError from "../../utilities/apiError.utility";
import Users, { IUser } from "../models/user.model";

class UsersDB {
  public async getUser({
    email,
    username,
  }: {
    email?: string;
    username?: string;
  }): Promise<IUser | null> {
    const userDetails = await Users.findOne({
      $or: [{ username }, { email }],
    }).select("+password");
    return userDetails;
  }

  public async createUser(user: TSignUp): Promise<IUser> {
    try {
      const newUser = await Users.create(user);
      if (!newUser)
        throw new ApiError(
          500,
          "Something went wrong while creating a User",
          ``
        );
      newUser.password = "";
      return newUser;
    } catch (error: any) {
      console.log(error);
      throw new ApiError(
        500,
        "Something went wrong",
        "Something went wrong while creating a new user",
        error
      );
    }
  }
}

export default new UsersDB();
