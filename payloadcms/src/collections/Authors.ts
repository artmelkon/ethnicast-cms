import { slateEditor } from "@payloadcms/richtext-slate";
import { CollectionConfig } from "payload/types";

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'id']
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
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
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.profiles?.[0]) return user.profiles[0]
      }
    }
  ],
  timestamps: false
}

export default Authors;
