import mongoose, { Document, Schema, model } from "mongoose";
import { IUser } from "./user.model";
import { IStory } from "./stories.model";

export interface ILike extends Document {
  by: mongoose.Types.ObjectId | IUser;
  at: mongoose.Types.ObjectId | IStory;
}

const LikeSchema = new Schema(
  {
    by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    at: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<ILike>("like", LikeSchema);
