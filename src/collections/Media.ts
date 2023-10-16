import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import { isAdminOrHasSiteAccess } from '../access/isAdminOrHasSiteAccess';
import { isLoggedIn } from '../access/isLoggedIn';

const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    create: isLoggedIn,
    update: isAdminOrHasSiteAccess(),
    read: isAdminOrHasSiteAccess(),
    delete: isAdminOrHasSiteAccess()
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    }
  ]
}

export default Media;
