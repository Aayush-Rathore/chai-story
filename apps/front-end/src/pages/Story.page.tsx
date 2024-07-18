import { MDXProvider } from "@mdx-js/react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultPosterLight from "@/assets/defaultPosterLight.svg";
import defaultPosterDark from "@/assets/defaultPosterDark.svg";
import useStore from "@/store/zustand.store";
import DialogBox from "@/components/constants/Dialog";
import { useLike, useStoryWithId, useUnlike } from "@/api/storyFunction";
import NotFound from "@/components/constants/NotFound";

const Story = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useStore((e: any) => e.user);
  const { id: storyId } = useParams<{ id: string }>();

  if (!storyId) {
    return <div>Error: No story ID found in URL</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data: storyData, isLoading, error } = useStoryWithId(storyId);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: likeStory, error: likeError, reset, isPending } = useLike();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const unLike = useUnlike();
  const data = storyData?.data[0];

  if (isLoading) {
    return <SkeletonStory />;
  }

  if (error || !data) {
    return (
      <div className="size-full flex justify-center items-center">
        <NotFound />
      </div>
    );
  }

  if (likeError) {
    data.liked = false;
    data.likes--;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center">
        <div className="max-w-md md:mr-5 mb-5">
          <img
            src={defaultPosterDark}
            alt="Default Poster"
            className="rounded-lg aspect-video hidden dark:block bg-secondary"
          />
          <img
            src={defaultPosterLight}
            alt="Default Poster"
            className="rounded-lg aspect-video dark:hidden bg-secondary"
          />
        </div>
        <div className="w-full">
          <div
            className="flex items-start gap-3 h-[72px]"
            onClick={() =>
              navigate(`/profile/${storyData?.authorDetails.username}`)
            }
          >
            <Avatar className="mt-1">
              <AvatarImage src={state.img} alt="@shadcn" />
              <AvatarFallback>
                {storyData?.authorDetails.username}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="break-words overflow-hidden">{data.title}</div>
              <div className="flex flex-row items-center gap-1 text-sm opacity-80">
                <span>{state.author}</span>&#x2022;
                <span className="text-sm">3h</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <span className="rounded-sm py-1 px-2 font-medium text-sm bg-secondary opacity-70">
                {data.category}
              </span>
            </div>
            <div className="px-2 flex flex-row items-center gap-2 opacity-80">
              <span>{data.likes} likes</span>
              &#x2022;
            </div>
            <div className="flex gap-5 mb-3">
              {user ? (
                <Button
                  className={`flex gap-3 ${data.liked ? "bg-primary" : "bg-secondary"}`}
                  onClick={() => {
                    if (data.liked) {
                      data.liked = false;
                      data.likes--;
                      unLike.mutate({ postId: data._id });
                    } else {
                      if (isPending) {
                        data.liked = false;
                        data.likes--;
                        reset();
                      } else {
                        data.liked = true;
                        data.likes++;
                        likeStory({ postId: storyId });
                      }
                    }
                  }}
                >
                  {data.liked && "Liked"}
                  <FaHeart size={17} />
                </Button>
              ) : (
                <DialogBox>
                  <Button className="flex gap-3 bg-secondary">
                    <FaHeart size={17} />
                  </Button>
                </DialogBox>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        {data.mdx && (
          <MDXProvider>
            <div
              dangerouslySetInnerHTML={{
                __html: data.mdx,
              }}
            />
          </MDXProvider>
        )}
        {/* <div className="hidden md:block">
          <h1>More Stories from username</h1>
          <div>
            <StoryCard title="Story Title" id="story" category={"motivation"} />
            <StoryCard title="Story Title" id="story" category={"motivation"} />
            <StoryCard title="Story Title" id="story" category={"motivation"} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

const SkeletonStory = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row items-center">
        <div className="max-w-md md:mr-5 mb-5">
          <div className="rounded-lg aspect-video bg-secondary h-48 w-full" />
        </div>
        <div className="w-full">
          <div className="flex items-start gap-3 h-[72px]">
            <div className="mt-1">
              <div className="rounded-full bg-secondary h-10 w-10" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-4 bg-secondary rounded w-1/4" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <div className="rounded-sm py-1 px-2 font-medium text-sm bg-secondary opacity-70 h-6 w-20" />
            </div>
            <div className="px-2 flex flex-row items-center gap-2 opacity-80">
              <div className="h-4 bg-secondary rounded w-12" />
              &#x2022;
              <div className="h-4 bg-secondary rounded w-12" />
            </div>
            <div className="flex gap-5">
              <div className="flex gap-3 bg-secondary rounded h-10 w-20" />
              <div className="flex gap-3 bg-secondary rounded h-10 w-20" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="p-4 md:w-3/5 lg:w-[70%]">
          <div className="h-8 bg-secondary rounded mb-4 w-1/3" />
          <div className="space-y-2">
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-full" />
            <div className="h-4 bg-secondary rounded w-full" />
          </div>
        </div>
        <div className="hidden md:block">
          <h1 className="h-6 bg-secondary rounded w-1/3 mb-4" />
          <div className="space-y-4">
            <div className="h-20 bg-secondary rounded" />
            <div className="h-20 bg-secondary rounded" />
            <div className="h-20 bg-secondary rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
