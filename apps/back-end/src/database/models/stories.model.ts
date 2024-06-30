import mongoose, { Document, Schema, model } from "mongoose";

export interface IStory extends Document {
  title: string;
  thumbnail?: string;
  mdx: string;
  likes: number;
  category: string;
  owner: mongoose.Types.ObjectId;
  status?: "draft" | "public" | "private";
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
      dafault: "",
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

    status: {
      type: String,
      default: "public",
    },
  },
  { timestamps: true }
);

export default model<IStory>("story", StoriesSchema);
