import { Field } from "payload/types";

export const selectedGenres: Field = {
  name: 'selectedGenres',
  label: 'Genres',
  type: 'select',
  hasMany: true,
  index: true,
  admin: {
    isClearable: true,
    isSortable: true
  },
  options: [
    {
      label: 'Business',
      value: 'business'
    },
    {
      label: 'News',
      value: 'news',
    }
  ]
}
