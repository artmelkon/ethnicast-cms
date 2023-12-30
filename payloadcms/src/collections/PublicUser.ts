import { CollectionConfig } from "payload/types";

const PublicUser: CollectionConfig = {
  slug: 'public-user',
  auth: true,
  fields: [
    {
      name: 'emai',
      type: 'email',
      required: true
    },
    {
      name: 'password',
      type: 'text',
      required: true
    }
  ]
}

export default PublicUser;
