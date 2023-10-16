import { CollectionConfig } from "payload/types";

import { slug } from "../fields/slug";
import { isAdmin } from "../access/isAdmin";

const Category: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["title", "id"],
  },
  access: {
    create: isAdmin,
    read: (): boolean => true,
    //     read: customerAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
  ],
  timestamps: false,
};

export default Category;
