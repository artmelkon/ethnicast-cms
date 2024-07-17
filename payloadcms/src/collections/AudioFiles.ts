import { CollectionConfig } from 'payload/types';
import { isLoggedIn } from '../access/isLoggedIn';
import { isAdminOrContributor } from '../access/isAdminOrContributor';
import { anyone } from '../access/anyone';

const AudioFiles: CollectionConfig = {
  slug: 'audiofiles',
  admin: {
    useAsTitle: 'filename',
  },
  upload: {
    staticURL: '/audio',
    staticDir: 'media/audio',
    mimeTypes: ['audio/*', 'video/*']
  },
  access: {
    create: isAdminOrContributor(),
    update: isAdminOrContributor(),
    read: isLoggedIn,
    delete: isAdminOrContributor(),
  },
  fields: [
    {
      name: 'title',
      label: 'Track Title',
      type: 'text',
      required: true,
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.profiles?.[0]) return user.profiles[0]
      }
    }
  ]
}

export default AudioFiles;
