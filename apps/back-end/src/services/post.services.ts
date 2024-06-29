import { TObjectId } from "../types/common.types";
import storiesDb from "../database/functions/stories.db";
import ApiError from "../utilities/apiError.utility";

class PostServices {
  public async Like(params: TObjectId) {
    const likedPost = await storiesDb.likeStory(params.objectId);
    if (!likedPost) {
      throw new ApiError(404, "NOT_FOUND", "Post not found");
    }
    return likedPost;
  }

  public async LikeUnlikeDoc(params: { postId: string; userId: string }) {
    const postLikeDoc = await storiesDb.likeUnlikeStory(params);
    return postLikeDoc;
  }

  public async Unlike(params: TObjectId) {
    const unlikedPost = await storiesDb.unlikeStory(params.objectId);
    if (!unlikedPost) {
      throw new ApiError(404, "NOT_FOUND", "Post not found");
    }
    return unlikedPost;
  }
}

export default new PostServices();