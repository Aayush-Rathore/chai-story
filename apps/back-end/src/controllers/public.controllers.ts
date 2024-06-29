import ApiResponse from "../utilities/apiResponse.utility";
import publicServices from "../services/public.services";
import { Request, Response } from "express";

class PublicControllers {
  public async homePageData(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const category = req.query.category as string;

    const stories = await publicServices.HomePageStories(page, limit, category);
    res.send(stories);
  }

  public async fetchStory(req: Request, res: Response) {
    let userId: string = "";
    if (req.user) userId = req.user.id;
    const storyId = req.params.storyId;
    const storyData = await publicServices.FetchStory(storyId, userId);
    res.status(200).json({
      data: storyData,
      authorDetails: { username: "aayush", profile: null },
    });
  }

  public async userProfile(req: Request, res: Response) {
    let userId: string = "";
    if (req.user) userId = req.user.id;
    const username = req.params.username;
    const profile = await publicServices.userProfile(username, userId);
    new ApiResponse(
      201,
      "SUCCESS!",
      "User details is available!",
      profile,
      res
    );
  }
}

export default PublicControllers;
