import { CollectionConfig } from "payload/types";

import { isAdmin } from "../access/isAdmin";
import { slug } from '../fields/slug';

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
      name: "title",
      type: "text",
      required: true
    },
    {
      name: 'subcategory',
      type: 'relationship',
      hasMany: true,
      relationTo: 'subcategories'
    },
    slug,

  ],
  timestamps: false,
};

export default Categories;
