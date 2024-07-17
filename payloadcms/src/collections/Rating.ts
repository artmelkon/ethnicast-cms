import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin';
import { isLoggedIn } from '../access/isLoggedIn';
import { isAdminOrContributor } from '../access/isAdminOrContributor';

const Ratings: CollectionConfig = {
  slug: 'ratings',
  admin: {
    useAsTitle: 'user',
    defaultColumns: ['audiobook', 'user', 'value']
  },
  access: {
    create: isLoggedIn,
    read: isAdminOrContributor(),
    update: isLoggedIn,
    delete: isAdminOrContributor()
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
    // {
    //   name: 'audiobook',
    //   type: 'relationship',
    //   relationTo: 'audiobooks'
    // },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      defaultValue: ({ user }) => {
        if (!user.rolse?.includes('admin') && user.profiles?.[0]) return user.profiles[0]
      }
    }
  ]
}

export default Ratings;
