import Stories, { IStory } from "../models/stories.model";
import Like from "../models/likes.model";
import mongoose from "mongoose";

interface IStoryInterface {
  data: IStory | IStory[];
  totalCount: number;
}

class StoriesDB {
  public async getStories(
    filter: string,
    page: number,
    limit: number,
    category: string
  ): Promise<IStoryInterface> {
    const skip = (page - 1) * limit;
    const pipeline = [];

    if (category && category.length > 0 && category !== "all") {
      pipeline.push({ $match: { category } });
    }

    if (filter && filter.length > 0) {
      const regex = new RegExp(filter, "i");
      pipeline.push({
        $match: {
          title: { $regex: regex },
        },
      });
    }

    pipeline.push({
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    });

    pipeline.push({
      $unwind: "$ownerDetails",
    });

    pipeline.push({
      $facet: {
        metadata: [{ $count: "totalCount" }],
        data: [
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
          {
            $project: {
              _id: 1,
              category: 1,
              owner: 1,
              title: 1,
              username: "$ownerDetails.username",
              profile: "$ownerDetails.img",
            },
          },
        ],
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

  public async fetchStoryData(storyId: string, userId?: string) {
    const pipeline: any[] = [
      { $match: { _id: new mongoose.Types.ObjectId(storyId) } },
    ];

    if (userId) {
      pipeline.push(
        {
          $lookup: {
            from: "likes",
            let: {
              storyId: "$_id",
              userId: new mongoose.Types.ObjectId(userId),
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$at", "$$storyId"] },
                      { $eq: ["$by", "$$userId"] },
                    ],
                  },
                },
              },
              { $limit: 1 },
            ],
            as: "userLike",
          },
        },
        {
          $addFields: {
            liked: {
              $cond: {
                if: { $gt: [{ $size: "$userLike" }, 0] },
                then: true,
                else: false,
              },
            },
          },
        },
        {
          $project: {
            userLike: 0,
          },
        }
      );
    } else {
      pipeline.push({
        $addFields: {
          liked: false,
        },
      });
    }

    const storyData = await Stories.aggregate(pipeline);
    return storyData;
  }

  public async likeStory(postId: string) {
    const updatedPost = await Stories.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    return updatedPost;
  }

  public async likeUnlikeStory({
    postId,
    userId,
  }: {
    postId: string;
    userId: string;
  }) {
    let likeUnlikeDoc = await Like.findOne({ at: postId, by: userId });
    if (!likeUnlikeDoc) {
      likeUnlikeDoc = await Like.create({ by: userId, at: postId });
    } else {
      likeUnlikeDoc = await Like.findOneAndDelete({ at: postId, by: userId });
    }
    return likeUnlikeDoc;
  }

  public async unlikeStory(postId: string) {
    const updatedPost = await Stories.findByIdAndUpdate(
      postId,
      { $inc: { likes: -1 } },
      { new: true }
    );
    return updatedPost;
  }

  public async postStory(params: {
    title: string;
    thumbnail: string;
    owner: string;
    mdx: string;
    category: string;
    status?: string;
  }) {
    const story = await Stories.create(params);
    return story;
  }
}

export default new StoriesDB();
