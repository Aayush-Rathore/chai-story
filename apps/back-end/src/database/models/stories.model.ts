import mongoose, { Document, Schema, model } from "mongoose";

export enum StoryCategory {
  Motivational = "motivational",
  Romance = "romance",
  Default = "default",
}

export interface IStory extends Document {
  title: string;
  thumbnail?: string;
  mdx: string;
  likes: number;
  category: StoryCategory;
  owner: mongoose.Types.ObjectId;
}

const StoriesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      enum: Object.values(StoryCategory),
      dafault: StoryCategory.Default,
    },

    thumbnail: {
      type: String,
    },

    mdx: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<IStory>("story", StoriesSchema);
