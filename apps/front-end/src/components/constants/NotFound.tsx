import NotFoundLight from "@/assets/404light.svg";
import NotFoundDark from "@/assets/404dark.svg";

const NotFound = () => {
  return (
    <div className="size-full flex justify-center items-center h-404">
      <img
        src={NotFoundLight}
        alt="Mine Story"
        className="w-full dark:hidden sm:w-1/2"
      />
      <img
        src={NotFoundDark}
        alt="Mine Story"
        className="w-full hidden dark:block sm:w-1/2"
      />
    </div>
  );
};

export default NotFound;
