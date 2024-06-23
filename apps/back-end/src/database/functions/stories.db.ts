import Stories, { IStory } from "../models/stories.model";

interface IStoryInterface {
  data: IStory | IStory[];
  totalCount: number;
}

class StoriesDB {
  public async getStories(
    page: number,
    limit: number,
    category: string
  ): Promise<IStoryInterface> {
    const skip = (page - 1) * limit;
    const pipeline = [];

    if (category && category.length > 0 && category !== "all") {
      pipeline.push({ $match: { category } });
    }

    pipeline.push({
      $facet: {
        metadata: [{ $count: "totalCount" }],
        data: [{ $skip: skip }, { $limit: limit }],
      },
    });

    const stories = await Stories.aggregate(pipeline);

    const metadata = stories[0]?.metadata[0] || { totalCount: 0 };
    const data = stories[0]?.data || [];

    return {
      data,
      totalCount: metadata.totalCount,
    };
  }

  public async fetchStoryData(storyId: string) {
    const storyData = await Stories.findById(storyId);
    return storyData;
  }
}

export default new StoriesDB();
