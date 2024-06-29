import { Router } from "express";
import { asyncHandler } from "../utilities/asyncHandler.utility";
import AuthControllers from "../controllers/auth.controllers";

const router = Router();
const authControllers = new AuthControllers();

router.route("/signup").post(asyncHandler(authControllers.signUp));
router.route("/login").post(asyncHandler(authControllers.logIn));
router.route("/verifyEmail").get(asyncHandler(authControllers.verifyEmail));
router.route("/verifyUser").get(asyncHandler(authControllers.verifyUser));

export default router;
