import { CollectionConfig } from "payload/types";

const AudioBooks: CollectionConfig = {
  slug: "audiobooks",
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title']
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'abook',
      type: 'relationship',
      relationTo: 'audio'
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors'
    },
    {
      name: 'narrator',
      type: 'relationship',
      relationTo: 'narrators'
    },
    {
      name: 'publisher',
      type: 'relationship',
      relationTo: 'publishers'
    },
    {
      name: 'rating',
      type: 'relationship',
      relationTo: 'ratings',
      hasMany: true
    }
  ],
  timestamps: false
}

export default AudioBooks;
