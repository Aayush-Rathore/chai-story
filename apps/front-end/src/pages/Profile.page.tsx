import { Button } from "@/components/ui/button";
import useStore from "@/store/zustand.store";
import { Categories } from "@/constantsVariables/fixedVariables";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useStore((state) => ({
    user: state.user,
  }));
  const { username } = useParams();
  const [categories, setCategories] = useState("All");
  return (
    <div>
      <section className="flex flex-col gap-10 px-10 py-16 sticky items-center">
        <div className="flex flex-col items-center gap-5">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt="profile"
            className="w-20 rounded-full"
          />
          <div className="flex flex-col items-center">
            <span className="font-medium">{user?.username}</span>
            <span className="font-light">{user?.email}</span>
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">123</span>
            <span className="font-medium text-sm">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-lg">123</span>
            <span className="font-medium text-sm">Folowing</span>
          </div>
        </div>
        <div className="flex justify-center">
          <Button>Follow</Button>
        </div>
      </section>
      <Separator className="my-2" />
      <section className="flex">
        <div className="flex overflow-x-scroll w-full scroll-m-4 pb-5">
          {Categories.map((category, index) => {
            return (
              <Button
                className="bg-secondary text-foreground mx-1 hover:text-white"
                key={index}
                onClick={() => setCategories(category)}
              >
                {category}
              </Button>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Profile;
