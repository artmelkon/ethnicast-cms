import { CollectionConfig } from "payload/types";

import { isAdmin } from "../access/isAdmin";

export type CategoryType = { name: string | undefined }

const Categories: CollectionConfig = {
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
      name: "name",
      type: "text",
    },
  ],
  timestamps: false,
};

export default Categories;
