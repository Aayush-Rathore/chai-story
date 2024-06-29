import s3Helper from "../helper/s3Helper.helper";
import map from "../database/custom/map.config";
import { v4 as uuidv4 } from "uuid";
import ApiError from "../utilities/apiError.utility";

class FilesServices {
  public async updateFiles(userId: string, storyContent: string) {
    let storyId: string | undefined;
    if (map.has(userId)) {
      storyId = map.get(userId)?.fileId;
    } else {
      storyId = uuidv4().split("-")[0].slice(0, 6);
      // map.set(userId, { fileId, fileUrl: "" });
    }
    if (!storyId)
      throw new ApiError(
        500,
        "Server_Error",
        "Something went wrong while generating file"
      );
    const fileUpload = await s3Helper.uploadToS3(
      `${userId}/${storyId}.mdx`,
      storyContent
    );
    if (!fileUpload)
      throw new ApiError(
        500,
        "SERVER_ERROR",
        "Something went wrong while saving the file!"
      );
    map.set(userId, { fileId: storyId, fileUrl: fileUpload });
    const data = await map.get(userId);
    return data;
  }
}

export default new FilesServices();
