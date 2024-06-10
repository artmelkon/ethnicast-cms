import { CollectionConfig } from 'payload/types'

const Ratings: CollectionConfig = {
  slug: 'ratings',
  admin: {
    useAsTitle: 'user',
    defaultColumns: ['audiobook', 'user', 'value']
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'value',
      type: 'number',
      max: 5,
      min: 1
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'audiobook',
      type: 'relationship',
      relationTo: 'audiobooks'
    }
  ]
}

export default Ratings;
