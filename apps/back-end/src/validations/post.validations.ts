import BaseValidations from "./base.validations";
import zod from "zod";

class PostValidation extends BaseValidations {
  public publishStory = zod
    .object({
      title: this.storyTitle,
      category: this.storyCategories,
      content: this.storyContent,
      thumbnail: this.fileUrl,
    })
    .strict();
}

export default new PostValidation();
