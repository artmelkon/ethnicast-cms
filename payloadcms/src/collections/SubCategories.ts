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
    // {
    //   name: 'category',
    //   type: 'relationship',
    //   relationTo: 'categories'
    // }
  ],
  timestamps: false,
};

export default SubCategories;
