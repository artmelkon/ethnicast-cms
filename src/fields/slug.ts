import { Field } from "payload/types";

import formatSlug from "../utilities/formatSlug";

export const slug: Field = {
  name: 'slug',
  type: 'text',
  label: 'Page Slug',
  admin: {
    position: 'sidebar'
  },
  hooks: {
    beforeValidate: [
      formatSlug('title')
    ]
  }
}
