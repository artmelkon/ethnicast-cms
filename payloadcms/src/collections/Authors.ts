import { slateEditor } from "@payloadcms/richtext-slate";
import { CollectionConfig } from "payload/types";

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'firstname'
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'firstname',
      type: 'text',
      required: true
    },
    {
      name: 'lastname',
      type: 'text',
    },
    {
      name: 'authorImage',
      type: 'relationship',
      relationTo: 'media'
    },
    {
      name: 'biography',
      type: 'richText',
      editor: slateEditor({
        admin: {
          elements: [
            'h2',
            'h3',
            'h4',
            'h5',
            'link',
            'blockquote'],
          leaves: [
            'bold',
            'italic'
          ]
        }
      })
    },
  ],
  timestamps: false
}

export default Authors;
