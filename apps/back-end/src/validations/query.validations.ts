import BaseValidations from "./base.validations";
import zod from "zod";

class Query extends BaseValidations {
  public Filter = zod.object({
    storyId: this.queryParams,
  });
}

export default new Query();
