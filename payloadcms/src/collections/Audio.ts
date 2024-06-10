import { CollectionConfig } from 'payload/types';


const Audio: CollectionConfig = {
  slug: 'audio',
  admin: {
    useAsTitle: 'filename'
  },
  upload: {
    staticURL: '/audio',
    staticDir: 'media/audio',
    mimeTypes: ['audio/*', 'video/*']
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'excerpt',
      type: 'textarea'
    },
    {
      name: 'isSample',
      type: 'checkbox',
      defaultValue: false
    }
  ]
}

export default Audio;
