import { Router } from "express";
import { asyncHandler } from "../utilities/asyncHandler.utility";
import PostControllers from "../controllers/post.controllers";

const router = Router();
const postControllers = new PostControllers();

router.route("/like").put(asyncHandler(postControllers.LikePost));
router.route("/unlike").put(asyncHandler(postControllers.UnlikePost));

export default router;
