import BaseValidations from "./base.validations";
import zod from "zod";

class AuthValidations extends BaseValidations {
  public SignUp = zod
    .object({
      username: this.username,
      email: this.email,
      password: this.password,
    })
    .strict();

  public Login = zod.object({
    id: zod.string().refine((val) => {
      if (val.includes("@")) {
        return this.email.safeParse(val).success;
      }

      return this.username.safeParse(val).success;
    }),
    password: this.password,
  });

  public VerifyEmail = zod.object({
    token: this.jwtTokenSchema,
  });
}

export default new AuthValidations();
