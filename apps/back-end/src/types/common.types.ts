import zod from "zod";
import AuthValidations from "../validations/auth.validations";
import { JwtPayload } from "jsonwebtoken";

export type TSignUp = zod.infer<typeof AuthValidations.SignUp>;
export type TLogin = zod.infer<typeof AuthValidations.Login>;
export type TVerifyEmail = zod.infer<typeof AuthValidations.VerifyEmail>;

// Jwt Playload interface
export type TJsonPayload = JwtPayload & {
  id: string;
  iat: number;
  exp: number;
};
