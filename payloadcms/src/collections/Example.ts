import { CollectionConfig } from "payload/types";
import { customSelectedGenres } from "../fields/customSelectedGenres/field";
import { CustomHasManySelectField } from '../fields/customSelectHasMany/field'
import { isAdmin } from "../access/isAdmin";

const Example: CollectionConfig = {
  slug: 'example',
  access: {
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    // customSelectedGenres,
    // CustomHasManySelectField,
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'languages',
      filterOptions: ({ relationTo, data, siblingData }) => {
        console.log("relatioin to: ", relationTo)
        console.log("Data: ", data.categories)
        console.log("sibling Data: ", siblingData)
      }
    }
  ]
}

export default Example;


