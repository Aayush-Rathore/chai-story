import { Request, Response } from "express";
import postServices from "../services/post.services";
import validate from "../utilities/validations.utility";
import ApiResponse from "../utilities/apiResponse.utility";
import s3Helper from "../helper/s3Helper.helper";
import { v4 as uuid } from "uuid";

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

  public async PublishPost(req: Request, res: Response) {
    if (req.file) {
      req.body.thumbnail = await s3Helper.uploadThumbnail(
        req.file,
        uuid().split("-")[0].slice(0, 7)
      );
    } else {
      req.body.thumbnail = " ";
    }
    validate.PublishStory(req.body);
    const story = postServices.PublishPost(req.body, req.user.id);
    console.log(story);
    new ApiResponse(
      200,
      "SUCCESS",
      "Successfully publised",
      { message: "Keep writing" },
      res
    );
  }
}

export default PostControllers;
