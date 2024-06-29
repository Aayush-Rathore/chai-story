import { Router } from "express";
import { asyncHandler } from "../utilities/asyncHandler.utility";
import UserControllers from "../controllers/user.controllers";

const router = Router();
const userControllers = new UserControllers();

router.route("/follow").put(asyncHandler(userControllers.follow));
router.route("/unfollow").put(asyncHandler(userControllers.unfollow));

export default router;
