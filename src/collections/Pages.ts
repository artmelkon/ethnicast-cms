import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { slug } from "../fields/slug";
import { FormBlock } from "../blocks/Forms";

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                FormBlock
              ]
            }
          ]
        }
      ]
    },
    slug
  ]
}

export default Pages;
