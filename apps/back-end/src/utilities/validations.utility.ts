import authValidations from "../validations/auth.validations";
import { fromZodError } from "zod-validation-error";
import ApiError from "./apiError.utility";
import {
  StatusCode,
  ResponseMessages,
  StatusMessages,
} from "../constants/messages.constants";
import { TLogin, TPostId, TSignUp, TVerifyEmail } from "../types/common.types";
import postValidations from "../validations/post.validations";

class Validate {
  private validate<T>(params: T, parseFunction: (params: T) => any): void {
    try {
      parseFunction(params);
    } catch (error: any) {
      const validationError = fromZodError(error);
      throw new ApiError(
        StatusCode.VALIDATION_ERROR,
        StatusMessages.VALIDATION_ERROR,
        ResponseMessages.VALIDATION_ERROR,
        validationError
      );
    }
  }

  public SingUp(params: TSignUp) {
    this.validate(
      params,
      authValidations.SignUp.parse.bind(authValidations.SignUp)
    );
  }

  public Login(params: TLogin) {
    this.validate(
      params,
      authValidations.Login.parse.bind(authValidations.Login)
    );
  }

  public VelidateToken(params: TVerifyEmail) {
    this.validate(
      params,
      authValidations.VerifyEmail.parse.bind(authValidations.VerifyEmail)
    );
  }

  public LikeUnlike(params: TPostId) {
    this.validate(
      params,
      postValidations.PostId.parse.bind(postValidations.PostId)
    );
  }
}

export default new Validate();
