import zod from "zod";
import formValidations from "@/validations/form.validations";

export type TSignUp = zod.infer<typeof formValidations.SignUp>;

export type TSignIn = zod.infer<typeof formValidations.SignIn>;

export type TStoryContent = zod.infer<typeof formValidations.publisStory>;

export type TPublishStory = zod.infer<typeof formValidations.publisStory>;
