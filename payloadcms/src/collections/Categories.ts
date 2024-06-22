import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { anyone } from "../access/anyone";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import { slug } from "../fields/slug";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ['name', 'id']
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: 'categoryName',
      type: 'array',
      label: 'Sub-Category',
      fields: [
        {
          name: 'label',
          type: 'text',
        },
        {
          name: 'value',
          type: 'text'
        }
      ],
      admin: {
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.label || `Untitled`
          },
        },
      },
    }
  ],
  timestamps: false,
};

export default Categories;
