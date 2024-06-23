import BaseValidations from "./base.validations";
import zod from "zod";

class FormValidation extends BaseValidations {
  public SignUp = zod.object({
    username: this.username,
    email: this.email,
    password: this.password,
  });

  public SignIn = zod.object({
    id: zod.string().refine((val) => {
      if (val.includes("@")) {
        return this.email.safeParse(val).success;
      }

      return this.username.safeParse(val).success;
    }),
    password: this.password,
  });
}

export default new FormValidation();
