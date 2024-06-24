import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import StoryCard, { StoryCardSkeleton } from "@/components/constants/StoryCard";
import { useStories } from "@/api/storyFunction";
import Alert from "@/components/constants/Progress";
import { Categories } from "@/constantsVariables/fixedVariables";

const Stories = () => {
  const [categories, setCategories] = useState("All");

  const { data, isLoading, error } = useStories(1, 10, categories);
  return (
    <div>
      <section className="flex items-center py-6 flex-col">
        <Input
          type="text"
          placeholder="Search"
          className="focus-visible:ring-0 max-w-72 sm:max-w-96 h-10"
        />
        <Separator className="my-4" />
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
      <section className="my-4">
        <h1 className="text-3xl philosopher-bold my-2 mb-10">{categories}</h1>
        <div className="grid justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-1 gap-y-5">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="w-full p-4">
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                </div>
              ))
            : data?.data.map(({ title, _id, category }) => (
                <StoryCard
                  title={title}
                  id={_id}
                  key={_id}
                  category={category === "default" ? "Not Mentioned" : category}
                />
              ))}
        </div>
        {error && (
          <Alert
            title={error.name}
            description={error.message}
            className="py-14"
            type="alert"
          />
        )}
      </section>
    </div>
  );
};

export default Stories;
