import storiesDb from "../database/functions/stories.db";

class PublicServices {
  public async HomePageStories(page: number, limit: number, category: string) {
    const stories = await storiesDb.getStories(page, limit, category);
    return stories;
  }

  public async FetchStory(storyId: string) {
    const storyData = await storiesDb.fetchStoryData(storyId);
    return storyData;
  }
}
export default new PublicServices();
