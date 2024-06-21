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

  public VerifyEmail = zod.object({
    token: this.jwtTokenSchema,
  });
}

export default new AuthValidations();
