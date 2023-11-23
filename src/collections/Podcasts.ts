import { CollectionConfig } from 'payload/types';

const Podcasts: CollectionConfig = {
  slug: 'podcasts',
  admin: {
    useAsTitle: 'creator',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'creator',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      type: 'email',
      required: true
    },
    {
      name: 'feed_url',
      type: 'text',
      required: true
    },
  ],
  timestamps: false,
}

export default Podcasts;
