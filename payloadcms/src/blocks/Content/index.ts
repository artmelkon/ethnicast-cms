import { Block } from "payload/types";
import { slateEditor } from "@payloadcms/richtext-slate";

export const Content: Block = {
  slug: "content",
  labels: {
    singular: "Content Block",
    plural: "Content Blocks,",
  },
  fields: [
    {
      name: "content",
      type: "richText",
      editor: slateEditor({
        admin: {
          elements: ["h2", "h3", "h4", "h5"],
        },
      }),
    },
  ],
};
