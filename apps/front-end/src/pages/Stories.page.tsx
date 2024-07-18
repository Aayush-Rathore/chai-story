import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import StoryCard, { StoryCardSkeleton } from "@/components/constants/StoryCard";
import { useStories } from "@/api/storyFunction";
import Alert from "@/components/constants/Progress";
import { Categories } from "@/constantsVariables/fixedVariables";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebounceFunction = (...args: any[]) => void;

const debounce = (func: DebounceFunction, delay: number): DebounceFunction => {
  let timeoutId: NodeJS.Timeout;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Stories = () => {
  const [categories, setCategories] = useState("All");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stories, setStories] = useState<any[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const { data, isLoading, error, refetch } = useStories(
    search,
    page,
    10,
    categories
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchChange = useCallback(
    debounce(() => {
      setPage(1);
      setStories([]);
      refetch();
    }, 400),
    []
  );

  useEffect(() => {
    if (data && page === 1) {
      setStories(data.data);
    } else if (data && page > 1) {
      setStories((prevStories) => [...prevStories, ...data.data]);
    }
  }, [data, page]);

  useEffect(() => {
    handleSearchChange(search);
  }, [search, handleSearchChange]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isFetchingMore
      )
        return;
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetchingMore]);

  useEffect(() => {
    if (isFetchingMore) {
      refetch().finally(() => setIsFetchingMore(false));
    }
  }, [isFetchingMore, refetch]);

  return (
    <div>
      <section className="flex items-center py-6 flex-col">
        <Input
          type="text"
          placeholder="Search"
          className="focus-visible:ring-0 max-w-72 sm:max-w-96 h-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
          {isLoading || !stories
            ? Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="w-full p-4">
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                  <StoryCardSkeleton />
                </div>
              ))
            : stories.map(({ title, _id, category, profile, username }) => (
                <StoryCard
                  title={title}
                  id={_id}
                  key={_id}
                  category={category === "default" ? "Not Mentioned" : category}
                  profile={profile}
                  username={username}
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
