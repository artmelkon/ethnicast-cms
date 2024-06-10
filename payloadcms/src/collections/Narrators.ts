import { CollectionConfig } from "payload/types";

const Narrators: CollectionConfig = {
  slug: "narrators",
  admin: {
    useAsTitle: "firstname",
    defaultColumns: ['firstname', 'lastname']
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'firstname',
      type: 'text',
      required: true
    },
    {
      name: 'lastname',
      type: 'text',
    }
  ]
}

export default Narrators;
