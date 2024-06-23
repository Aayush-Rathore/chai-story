import { Request, Response } from "express";
import validate from "../utilities/validations.utility";
import authServices from "../services/auth.services";
import ApiResponse from "../utilities/apiResponse.utility";
import sendMail from "../utilities/mail.utility";

class AuthControllers {
  public async signUp(req: Request, res: Response) {
    validate.SingUp(req.body);
    const { email, id, username, token, img } = await authServices.SignUp(
      req.body
    );

    sendMail(username, "verifyEmail", id, email);

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
        token,
        id,
        img,
        username,
      },
      res
    );
  }

  public async logIn(req: Request, res: Response) {
    validate.Login(req.body);
    const { token, id, img, username } = await authServices.Login(req.body);
    res.cookie("accessToken", token, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });

    new ApiResponse(
      201,
      "SUCCESS!",
      "Loged In",
      {
        token,
        id,
        img,
        username,
      },
      res
    );
  }

  public async verifyEmail(req: Request, res: Response) {
    const queries = req.query as { token: string };
    validate.VelidateToken(queries);
    const { token, img, id, username } =
      await authServices.VerifyEmail(queries);
    res.cookie("accessToken", token, {
      sameSite: "strict",
      httpOnly: true,
      secure: true,
    });

    new ApiResponse(
      201,
      "SUCCESS!",
      "Verification completed, Enjoy your 'Chai with Stories'",
      {
        token,
        id,
        img,
        username,
      },
      res
    );
  }
}

export default AuthControllers;
