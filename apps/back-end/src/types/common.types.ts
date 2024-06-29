import zod from "zod";
import authValidations from "../validations/auth.validations";
import { JwtPayload } from "jsonwebtoken";
import commonValidations from "../validations/common.validations";

export type TSignUp = zod.infer<typeof authValidations.SignUp>;
export type TLogin = zod.infer<typeof authValidations.Login>;
export type TVerifyEmail = zod.infer<typeof authValidations.VerifyEmail>;

// Jwt Playload interface
export type TJsonPayload = JwtPayload & {
  id: string;
  iat: number;
  exp: number;
};

export type TObjectId = zod.infer<typeof commonValidations.id>;
export type TStoryContent = zod.infer<typeof commonValidations.mdx>;
