import { withProps } from "@udecode/cn";
import {
  createPlugins,
  Plate,
  PlateContent,
  RenderAfterEditable,
  PlateLeaf,
} from "@udecode/plate-common";
import { createLinkPlugin, ELEMENT_LINK } from "@udecode/plate-link";
import { createImagePlugin, ELEMENT_IMAGE } from "@udecode/plate-media";
import {
  createBoldPlugin,
  MARK_BOLD,
  createItalicPlugin,
  MARK_ITALIC,
  createUnderlinePlugin,
  MARK_UNDERLINE,
} from "@udecode/plate-basic-marks";
import {
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createFontSizePlugin,
} from "@udecode/plate-font";
import {
  createHighlightPlugin,
  MARK_HIGHLIGHT,
} from "@udecode/plate-highlight";
import { createEmojiPlugin } from "@udecode/plate-emoji";

import { ImageElement } from "@/components/plate-ui/image-element";
import { LinkElement } from "@/components/plate-ui/link-element";
import { LinkFloatingToolbar } from "@/components/plate-ui/link-floating-toolbar";
import { HighlightLeaf } from "@/components/plate-ui/highlight-leaf";

const plugins = createPlugins(
  [
    createLinkPlugin({
      renderAfterEditable: LinkFloatingToolbar as RenderAfterEditable,
    }),
    createImagePlugin(),
    createBoldPlugin(),
    createItalicPlugin(),
    createUnderlinePlugin(),
    createFontColorPlugin(),
    createFontBackgroundColorPlugin(),
    createFontSizePlugin(),
    createHighlightPlugin(),
    createEmojiPlugin(),
  ],
  {
    components: {
      [ELEMENT_IMAGE]: ImageElement,
      [ELEMENT_LINK]: LinkElement,
      [MARK_BOLD]: withProps(PlateLeaf, { as: "strong" }),
      [MARK_HIGHLIGHT]: HighlightLeaf,
      [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
      [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
    },
  }
);

const initialValue = [
  {
    id: "1",
    type: "p",
    children: [{ text: "Hello, World!" }],
  },
];

export function PlateEditor() {
  return (
    <Plate plugins={plugins} initialValue={initialValue}>
      <PlateContent />
    </Plate>
  );
}
