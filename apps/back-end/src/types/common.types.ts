import zod from "zod";
import AuthValidations from "../validations/auth.validations";

export type TSignUp = zod.infer<typeof AuthValidations.SignUp>;
export type TVerifyEmail = zod.infer<typeof AuthValidations.VerifyEmail>;
