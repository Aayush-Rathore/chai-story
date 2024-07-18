/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  headingsPlugin,
  ListsToggle,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  InsertAdmonition,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
// import WhiteLogo from "@/assets/whiteLogo.svg";
// import BlackLogo from "@/assets/blackLogo.svg";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import draftStories from "@/store/story.store";
import { Button } from "@/components/ui/button";
import {
  getAspectRatio,
  cropImage,
  resizeImage,
} from "@/utilities/Image.utilities";
import { usePublishStory } from "@/api/storyFunction";
import { useToast } from "@/components/ui/use-toast";

const StoryEditor: React.FC = () => {
  const {
    category,
    content,
    title,
    setCategory,
    setContent,
    setTitle,
    file,
    // setFile,
  } = draftStories((e: any) => e);

  const { toast } = useToast();

  const publishStory = usePublishStory();

  const [img, setImg] = useState<string | null>(null);
  console.log(img);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleUpload = async () => {
    if (!file) return;

    const aspectRatio = await getAspectRatio(file);

    const desiredAspectRatio = 16 / 9;

    if (aspectRatio !== desiredAspectRatio) {
      try {
        const croppedImageBlob = await cropImage(file, desiredAspectRatio);

        const resizedImageBlob = await resizeImage(croppedImageBlob, 1280, 720);

        setImg(URL.createObjectURL(resizedImageBlob));
      } catch (error) {
        console.log(error);
      }
    } else {
      setImg(URL.createObjectURL(file));
    }
  };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setFile(event.target.files[0]);
  //   }
  // };

  useEffect(() => {
    handleUpload();
  }, [file]);

  return (
    <div className="flex flex-col gap-3">
      {/* <div className="flex justify-center">
        {img ? (
          <img
            src={img}
            alt="thumbnail"
            className="w-64 sm:w-80 md:w-96 aspect-video rounded-md"
          />
        ) : (
          <>
            <img
              src={BlackLogo}
              alt="Mine Story"
              className="w-64 sm:w-80 md:w-96 dark:hidden aspect-video rounded-md"
            />
            <img
              src={WhiteLogo}
              alt="Mine Story"
              className="w-64 sm:w-80 md:w-96 hidden dark:block aspect-video rounded-md"
            />
          </>
        )}
      </div> */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Story Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Story Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex gap-2 sm:gap-10 flex-col sm:flex-row">
        <div className="flex flex-col gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value.toLocaleLowerCase())}
          >
            <SelectTrigger className="w-[180px]" id="category">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="mystery">Mystery</SelectItem>
                <SelectItem value="sciencefiction">Science Fiction</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="horror">Horror</SelectItem>
                <SelectItem value="historicalfiction">
                  Historical Fiction
                </SelectItem>
                <SelectItem value="drama">Drama</SelectItem>
                <SelectItem value="comedy">Comedy</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="flex flex-col gap-2">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
        </div> */}
      </div>
      <div>
        <MDXEditor
          markdown={content}
          placeholder="Start writing your story..."
          onChange={(value) => setContent(value)}
          toMarkdownOptions={{
            incrementListMarker: true,
            listItemIndent: "mixed",
          }}
          plugins={[
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle options={["bullet", "number"]} />
                  <InsertAdmonition />
                </>
              ),
            }),
            headingsPlugin({ allowedHeadingLevels: [1, 2, 3, 4, 5, 6] }),
            listsPlugin(),
            quotePlugin(),
            markdownShortcutPlugin(),
            directivesPlugin({
              directiveDescriptors: [AdmonitionDirectiveDescriptor],
            }),
          ]}
          contentEditableClassName="bg-white text-black rounded"
        />
      </div>
      <div className="flex justify-between items-center flex-row gap-3">
        <Button
          onClick={() => {
            publishStory.mutate({ category, content, title, thumbnail: file });
            toast({
              title: "Publishing",
              description: "Please wait we are publishind your story!",
            });
          }}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default StoryEditor;
