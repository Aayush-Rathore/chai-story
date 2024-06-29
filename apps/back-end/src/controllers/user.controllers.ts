import { Request, Response } from "express";
import userServices from "../services/user.services";
import validations from "../utilities/validations.utility";
import ApiResponse from "../utilities/apiResponse.utility";

class UserControllers {
  public async follow(req: Request, res: Response) {
    validations.ObjectId({ objectId: req.body.id });
    const followDoc = await userServices.Follow({
      by: req.user.id,
      to: req.body.id,
    });
    new ApiResponse(200, "Success", "Success", followDoc, res);
  }

  public async unfollow(req: Request, res: Response) {
    validations.ObjectId({ objectId: req.body.id });
    const unfollowDoc = await userServices.UnFollow({
      by: req.user.id,
      to: req.body.id,
    });
    new ApiResponse(200, "Success", "Success", unfollowDoc, res);
  }
}

export default UserControllers;
