import mongoose from "mongoose";
import { TSignUp } from "../../types/common.types";
import ApiError from "../../utilities/apiError.utility";
import Users, { IUser } from "../models/user.model";

class UsersDB {
  public async getUser({
    email,
    username,
    _id,
  }: {
    email?: string;
    username?: string;
    _id?: string;
  }): Promise<IUser | null> {
    const userDetails = await Users.findOne({
      $or: [{ username }, { email }, { _id }],
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

  async userProfile(username: string, userId?: string) {
    const pipeline: any[] = [
      {
        $match: { username },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "to",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "by",
          as: "following",
        },
      },
      {
        $addFields: {
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
        },
      },
      {
        $project: {
          username: 1,
          _id: 1,
          email: 1,
          img: 1,
          isVerified: 1,
          followersCount: 1,
          followingCount: 1,
        },
      },
    ];

    if (userId) {
      const userIdObj = new mongoose.Types.ObjectId(userId);
      pipeline.push({
        $lookup: {
          from: "follows",
          let: { userId: "$_id", currentUserId: userIdObj },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$to", "$$userId"] },
                    { $eq: ["$by", "$$currentUserId"] },
                  ],
                },
              },
            },
            { $limit: 1 },
          ],
          as: "followingCheck",
        },
      });
      pipeline.push({
        $addFields: {
          isFollowing: {
            $cond: {
              if: { $gt: [{ $size: "$followingCheck" }, 0] },
              then: true,
              else: false,
            },
          },
        },
      });
      pipeline.push({
        $project: {
          followingCheck: 0,
        },
      });
    }

    const usersDetails = await Users.aggregate<IUser>(pipeline);
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
