// import { useState } from "react";
// import useStore from "@/store/zustand.store";
// import { useAutoSave } from "@/api/storyFunction";

// const usePeriodicPut = (initialStory: string) => {
//   const [dirty, setDirty] = useState(false);
//   const user = useStore((e) => e.user);
//   const [story, setStory] = useState(initialStory);
//   if (dirty && user) {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const { data: autoSavedStory } = useAutoSave(story, user.id);
//     console.log(autoSavedStory);
//     setDirty(false);
//   }
//   return { story, setDirty, setStory };
// };
// export default usePeriodicPut;
