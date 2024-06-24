import BaseValidations from "./base.validations";
import zod from "zod";

class PostValidation extends BaseValidations {
  public PostId = zod
    .object({
      postId: this.id,
    })
    .strict();
}

export default new PostValidation();
