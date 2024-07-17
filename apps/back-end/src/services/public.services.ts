import userDb from "../database/functions/user.db";
import storiesDb from "../database/functions/stories.db";

class PublicServices {
  public async HomePageStories(
    filter: string,
    page: number,
    limit: number,
    category: string
  ) {
    const stories = await storiesDb.getStories(
      filter,
      page,
      limit,
      category.toLocaleLowerCase()
    );
    return stories;
  }

  public async FetchStory(storyId: string, userId?: string) {
    const storyData = await storiesDb.fetchStoryData(storyId, userId);
    return storyData;
  }

  public async userProfile(username: string, userId?: string) {
    const profile = await userDb.userProfile(username, userId);
    return profile;
  }
}

export default new PublicServices();
