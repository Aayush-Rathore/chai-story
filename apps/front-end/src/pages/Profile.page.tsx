import { Button } from "@/components/ui/button";
import { Categories } from "@/constantsVariables/fixedVariables";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useParams } from "react-router-dom";
import { useProfile, useUnFollow } from "@/api/userFunctions";
import useStore from "@/store/zustand.store";
import { useFollow } from "@/api/userFunctions";

const Profile = () => {
  const { username = "" } = useParams();
  const user = useStore((e) => e.user);
  const follow = useFollow();
  const unfollow = useUnFollow();
  const navigate = useNavigate();
  const [categories, setCategories] = useState("All");
  const { data: userProfile, isLoading } = useProfile(username); // Add isLoading from useProfile hook
  const userData = userProfile?.data[0];
  if (!userData) {
    return;
  }

  if (isLoading) {
    // Skeleton loading UI while fetching data
    return (
      <div className="flex flex-col items-center gap-10 px-10 py-16 sticky">
        <div className="flex flex-col items-center gap-5">
          <div className="animate-pulse w-20 h-20 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col items-center">
            <div className="animate-pulse w-32 h-5 bg-gray-300 rounded"></div>
            <div className="animate-pulse w-24 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col items-center">
            <div className="animate-pulse w-24 h-12 bg-gray-300 rounded"></div>
            <div className="animate-pulse w-20 h-3 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="animate-pulse w-24 h-12 bg-gray-300 rounded"></div>
            <div className="animate-pulse w-20 h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex justify-center mt-5">
          <div className="animate-pulse w-24 h-10 bg-gray-300 rounded-full"></div>
        </div>
        <Separator className="my-2" />
        <div className="flex overflow-x-scroll w-full scroll-m-4 pb-5">
          {Categories.map((category, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-300 text-gray-300 mx-1 rounded-md px-4 py-2"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Render actual profile data once loaded
  return (
    <div>
      <section className="flex flex-col gap-10 px-10 py-16 sticky items-center">
        <div className="flex flex-col items-center gap-5">
          <img src={userData.img} alt="profile" className="w-20 rounded-full" />
          <div className="flex flex-col items-center">
            <span className="font-medium">{userData.username}</span>
            <span className="font-light">{userData.email}</span>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {userData.followersCount}
            </span>
            <span className="font-medium text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">
              {userData.followingCount}
            </span>
            <span className="font-medium text-sm">Following</span>
          </div>
        </div>
        <div className="flex justify-center">
          {userData._id === user?.id ? (
            <div className="flex gap-6">
              <Button>Edit Profile</Button>
              <Button
                className="bg-secondary hover:scale-105 transition-all hover:bg-secondary"
                onClick={() => navigate("/editor")}
              >
                Publish Story
              </Button>
            </div>
          ) : (
            <Button
              className={`${userData.isFollowing && "bg-secondary"}`}
              onClick={() => {
                if (!userData.isFollowing) {
                  userData.followersCount++;
                  userData.isFollowing = true;
                  follow.mutate({ id: userData._id });
                } else if (userData.isFollowing) {
                  userData.followersCount--;
                  userData.isFollowing = false;
                  unfollow.mutate({ id: userData._id });
                }
              }}
            >
              {userData.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </section>
      <Separator className="my-2" />
      <section className="flex">
        <div className="flex overflow-x-scroll w-full scroll-m-4 pb-5">
          {Categories.map((category, index) => (
            <Button
              className="bg-secondary text-foreground mx-1 hover:text-white"
              key={index}
              onClick={() => setCategories(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
