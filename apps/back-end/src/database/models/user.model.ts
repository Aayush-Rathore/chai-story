import { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  isVerified: boolean;
  img: string;
  matchPassword(password: string): Promise<boolean>;
  generateAccessToken(): Promise<string>;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    img: {
      type: String,
      default: "https://s3.tebi.io/chai-story/defaultImg.jpg",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 9);
  next();
});

UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      id: this._id,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export default model<IUser>("user", UserSchema);
