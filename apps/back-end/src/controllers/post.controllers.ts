import { Request, Response } from "express";
import postServices from "../services/post.services";
import validate from "../utilities/validations.utility";
import ApiResponse from "../utilities/apiResponse.utility";

class PostControllers {
  public async LikePost(req: Request, res: Response) {
    validate.ObjectId({ objectId: req.body.postId });
    const likedPost = await postServices.Like({ objectId: req.body.postId });
    await postServices.LikeUnlikeDoc({
      userId: req.user.id,
      postId: likedPost.id,
    });
    new ApiResponse(
      200,
      "SUCCESS",
      "Post liked",
      { totalLikes: likedPost.likes },
      res
    );
  }

  public async UnlikePost(req: Request, res: Response) {
    validate.ObjectId({ objectId: req.body.postId });
    const unlikedPost = await postServices.Unlike({
      objectId: req.body.postId,
    });
    await postServices.LikeUnlikeDoc({
      userId: req.user.id,
      postId: unlikedPost.id,
    });
    new ApiResponse(
      200,
      "SUCCESS",
      "Post unliked",
      { totalLikes: unlikedPost.likes },
      res
    );
  }
}

export default PostControllers;
