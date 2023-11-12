import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { slug } from "../fields/slug";

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title'
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true
    },
    slug
  ]
}

export default Pages;
