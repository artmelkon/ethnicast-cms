import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { anyone } from "../access/anyone";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { slug } from "../fields/slug";

const Languages: CollectionConfig = {
  slug: "languages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ['title', 'slug', 'id']
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
    },
    {
      name: 'slug',
      type: 'text',
      required: true
    }
  ],
  timestamps: false,
};

export default Languages;
