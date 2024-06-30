import { Router } from "express";
import { asyncHandler } from "../utilities/asyncHandler.utility";
import PostControllers from "../controllers/post.controllers";
import fileHandler from "../middleware/fileUpload.middleware";

const router = Router();
const postControllers = new PostControllers();

router.route("/like").put(asyncHandler(postControllers.LikePost));
router.route("/unlike").put(asyncHandler(postControllers.UnlikePost));
router
  .route("/publish")
  .post(fileHandler, asyncHandler(postControllers.PublishPost));

export default router;
