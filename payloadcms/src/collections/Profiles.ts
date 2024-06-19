import { CollectionConfig } from "payload/types";
import { isAdmin } from '../access/isAdmin';
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAcess";
import { v4 as uuidv4 } from 'uuid';


const Profiles: CollectionConfig = {
  slug: 'profiles',
  admin: {
    useAsTitle: 'username',
    defaultColumns: ['username', 'id']
  },
  access: {
    create: isAdmin,
    read: isAdminOrHasSiteAccess('id'),
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
      defaultValue: `${uuidv4()}`
    }
  ]
}

export default Profiles;
