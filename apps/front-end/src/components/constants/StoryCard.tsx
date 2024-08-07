import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import defaultPosterLight from "@/assets/defaultPosterLight.svg";
import defaultPosterDark from "@/assets/defaultPosterDark.svg";

type TProps = {
  title: string;
  id: string;
  category: string;
  profile: string;
  username: string;
};

const StoryCard = ({ title, id, category, profile, username }: TProps) => {
  const navigate = useNavigate();

  const HandleClick = () => {
    navigate(`/stories/${id}`, { state: { author: username, img: profile } });
  };

  return (
    <div
      className="min-w-72 max-w-[400px] w-full rounded-lg p-2 transition-all flex gap-2 flex-col"
      onClick={HandleClick}
    >
      <img
        src={defaultPosterDark}
        alt="Default Poster"
        className="rounded-lg min-w-72 aspect-video hidden dark:block bg-secondary"
      />
      <img
        src={defaultPosterLight}
        alt="Default Poster"
        className="rounded-lg min-w-72 aspect-video dark:hidden bg-secondary"
      />
      <div className="flex items-start gap-3 h-[72px]">
        <Avatar className="mt-1">
          <AvatarImage src={profile} alt="@shadcn" />
          <AvatarFallback>Name of the authore</AvatarFallback>
        </Avatar>
        <div>
          <div
            className="break-words overflow-hidden"
            style={{
              maxWidth: "190px",
              overflow: "hidden",
              lineBreak: "strict",
            }}
          >
            {title}
          </div>
          <div className="flex flex-row items-center gap-1 text-sm opacity-80">
            <span>{username}</span>&#x2022;<span className="text-sm">3h</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="rounded-sm py-1 px-2 font-medium text-sm bg-secondary opacity-70">
          {category}
        </span>
      </div>
    </div>
  );
};

export const StoryCardSkeleton = () => {
  return (
    <div className="min-w-72 max-w-[400px] w-full rounded-lg p-2 transition-all flex gap-2 flex-col animate-pulse">
      <div className="rounded-lg min-w-72 aspect-video bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex items-start gap-3 h-[72px]">
        <div className="rounded-full bg-gray-300 dark:bg-gray-700 w-10 h-10 mt-1"></div>
        <div>
          <div
            className="bg-gray-300 dark:bg-gray-700 rounded h-6 mb-2"
            style={{ width: "190px" }}
          ></div>
          <div className="flex flex-row items-center gap-1 text-sm opacity-80">
            <span className="bg-gray-300 dark:bg-gray-700 rounded w-16 h-4"></span>
            &#x2022;
            <span className="bg-gray-300 dark:bg-gray-700 rounded w-8 h-4"></span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="rounded-sm py-1 px-2 bg-gray-300 dark:bg-gray-700 opacity-70 w-20 h-6"></span>
        </div>
        <div className="px-2 flex flex-row items-center gap-2 opacity-80">
          <span className="bg-gray-300 dark:bg-gray-700 rounded w-12 h-4"></span>
          &#x2022;
          <span className="bg-gray-300 dark:bg-gray-700 rounded w-12 h-4"></span>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
