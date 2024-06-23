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

  public async userProfile(username: string) {
    const pipeline = [
      {
        $match: { username: username },
      },
      {
        $lookup: {
          from: "follows", // Name of the follows collection in your database
          localField: "_id",
          foreignField: "to",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "follows", // Name of the follows collection in your database
          localField: "_id",
          foreignField: "by",
          as: "following",
        },
      },
      {
        $addFields: {
          followerCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          isVerified: 1,
          img: 1,
          followerCount: 1,
          followingCount: 1,
        },
      },
    ];

    const usersDetails = await Users.aggregate(pipeline);
    return usersDetails;
  }

  public async updateUser(id: string, update: Partial<IUser>) {
    const updatedUser = await Users.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true, context: "query" }
    );
    return updatedUser;
  }
}

export default new UsersDB();
