import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { anyone } from "../access/anyone";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { slug } from "../fields/slug";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ['title', 'id']
  },
  access: {
    create: isAdmin,
    read: anyone,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true
    },
    // {
    //   name: 'categoryName',
    //   type: 'array',
    //   label: 'Sub-Category',
    //   fields: [
    //     {
    //       name: 'title',
    //       type: 'text',
    //     },
    //     {
    //       name: 'slug',
    //       type: 'text'
    //     }
    //   ],
    //   admin: {
    //     components: {
    //       RowLabel: ({ data, index }: RowLabelArgs) => {
    //         return data?.title || `Untitled`
    //       },
    //     },
    //   },
    // }
    slug
  ],
  timestamps: false,
};

export default Categories;
