import {CollectionConfig} from 'payload/types'

const Publishers: CollectionConfig = {
  slug: 'publishers',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'language',
      type: 'text',
      required: true
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMM yyy'
        }
      }
    }
  ]
}

export default Publishers;
