import BaseValidations from "./base.validations";
import zod from "zod";

class CommonValidation extends BaseValidations {
  public id = zod
    .object({
      objectId: this.objectId,
    })
    .strict();

  public mdx = zod
    .object({
      storyContent: this.mdxContent,
    })
    .strict();
}

export default new CommonValidation();
