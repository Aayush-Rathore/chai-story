import BaseValidations from "./base.validations";
import zod from "zod";

class FormValidation extends BaseValidations {
  public SignUp = zod.object({
    username: this.username,
    email: this.email,
    password: this.password,
  });

  public SignIn = zod.object({
    email: this.email,
    password: this.password,
  });
}

export default new FormValidation();
