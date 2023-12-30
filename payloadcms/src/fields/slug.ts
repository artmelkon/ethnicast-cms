import { Field } from "payload/types";

import formatSlug from "../utilities/formatSlug";
import deepMerge from '../utilities/deepMerge';

export const slug: Field = {
  name: 'slug',
  type: 'text',
  label: 'Slug',
  index: true,
  admin: {
    position: 'sidebar'
  },
  hooks: {
    beforeValidate: [
      formatSlug('title')
    ]
  }
}
