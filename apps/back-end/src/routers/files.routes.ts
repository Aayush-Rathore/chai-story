import { Router } from "express";
import FilesConctrollers from "../controllers/files.controllers";
import { asyncHandler } from "../utilities/asyncHandler.utility";

const router = Router();
const filesControllers = new FilesConctrollers();

router.route("/autosave").put(asyncHandler(filesControllers.autoSave));

export default router;
