import filesServices from "../services/files.services";
import { Request, Response } from "express";
import validation from "../utilities/validations.utility";
import ApiResponse from "../utilities/apiResponse.utility";

class FilesConctrollers {
  public async autoSave(req: Request, res: Response) {
    validation.StoryContent(req.body);
    const userId = req.user.id;
    const file = await filesServices.updateFiles(userId, req.body.storyContent);
    new ApiResponse(200, "SAVED", "Autosaved Document", { file }, res);
  }
}

export default FilesConctrollers;
