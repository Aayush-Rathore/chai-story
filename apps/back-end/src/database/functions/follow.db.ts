import ApiError from "../../utilities/apiError.utility";
import Follow from "../models/follow.model";

class FollowDb {
  public async createFollowDoc({ by, to }: { by: string; to: string }) {
    const doc = await Follow.findOne({ by, to });
    if (doc) {
      throw new ApiError(
        403,
        "Somethig went wrong",
        "Already following the user!"
      );
    }
    const followDoc = await Follow.create({ by, to });
    return followDoc;
  }

  public async deleteFollowDoc({ by, to }: { by: string; to: string }) {
    const unfollowDoc = await Follow.deleteOne({ by, to });
    if (!unfollowDoc) {
      throw new ApiError(
        403,
        "Somethig went wrong",
        "Already you are not following the user!"
      );
    }
    return unfollowDoc;
  }
}

export default new FollowDb();
