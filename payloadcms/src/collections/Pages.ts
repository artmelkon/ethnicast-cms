import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { slug } from "../fields/slug";
import { FormBlock } from "../blocks/Forms";
import { Content } from "../blocks/Content";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      type: "blocks",
      minRows: 1,
      // required: true,
      blocks: [FormBlock, Content],
    },
    slug,
  ],
};

export default Pages;
