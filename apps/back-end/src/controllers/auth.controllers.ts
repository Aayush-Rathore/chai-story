import { Request, Response } from "express";
import validate from "../utilities/validations.utility";
import authServices from "../services/auth.services";
import ApiResponse from "../utilities/apiResponse.utility";
import sendMail from "../utilities/mail.utility";

class AuthControllers {
  public async signUp(req: Request, res: Response) {
    validate.SingUp(req.body);
    const { newUser, token } = await authServices.SignUp(req.body);

    sendMail(newUser.username, "verifyEmail", newUser.id, newUser.email);

    res.cookie("accessToken", token, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });

    new ApiResponse(
      201,
      "SUCCESS!",
      "Successfully created new account, Enjoy",
      {
        message:
          "Check your inbox and click the provided link to verify you email address!",
        token: token,
        user: newUser,
      },
      res
    );
  }

  public async verifyEmail(req: Request, res: Response) {
    const queries = req.query as { token: string };
    validate.VelidateToken(queries);
    const verificationInfo = await authServices.VerifyEmail(queries);
    res.send("Hello");
  }
}

export default AuthControllers;
