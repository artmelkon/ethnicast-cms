import { CollectionConfig } from "payload/types";

const SubCategories: CollectionConfig = {
  slug: "subcategories",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "value",
      type: 'text'
    },
  ],
  timestamps: false,
};

export default SubCategories;
