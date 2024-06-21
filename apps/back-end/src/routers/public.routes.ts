import { Router } from "express";
import PublicControllers from "../controllers/public.controllers";
import { asyncHandler } from "../utilities/asyncHandler.utility";

const router = Router();
const publicControllers = new PublicControllers();

router.route("/home").get(asyncHandler(publicControllers.homePageData));
router.route("/story/:storyId").get(asyncHandler(publicControllers.fetchStory));

export default router;
