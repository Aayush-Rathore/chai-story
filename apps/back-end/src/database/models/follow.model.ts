import mongoose, { Document, Schema, model } from "mongoose";
import { IUser } from "./user.model";

export interface IFollow extends Document {
  by: mongoose.Types.ObjectId | IUser;
  to: mongoose.Types.ObjectId | IUser;
  status: "pending" | "accepted" | "declined";
}

const FollowSchema = new Schema(
  {
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "accepted",
    },
  },
  { timestamps: true }
);

export default model<IFollow>("follow", FollowSchema);
