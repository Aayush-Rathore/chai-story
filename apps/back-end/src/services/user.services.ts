import followDb from "../database/functions/follow.db";

class UserService {
  public async Follow({ to, by }: { to: string; by: string }) {
    const followDoc = await followDb.createFollowDoc({ to, by });
    return followDoc;
  }

  public async UnFollow({ to, by }: { to: string; by: string }) {
    const unfollowDoc = await followDb.deleteFollowDoc({ to, by });
    return unfollowDoc;
  }
}

export default new UserService();
