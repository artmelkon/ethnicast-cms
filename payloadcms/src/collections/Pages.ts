import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { slug } from "../fields/slug";
import { FormBlock } from "../blocks/Forms";
import { Content } from "../blocks/Content";
import { isAdminOrContributor } from "../access/isAdminOrContributor";
import { isAdminOrContributorOrPublished } from "../access/isAdminContributorOrPublished";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  versions: {
    drafts: true
  },
  access: {
    create: isAdminOrContributor(),
    read: isAdminOrContributorOrPublished,
    update: isAdminOrContributor(),
    delete: isAdminOrContributor(),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "layout",
      type: "blocks",
      minRows: 1,
      // required: true,
      blocks: [FormBlock, Content],
    },
    slug,
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.profiles?.[0]) return user.profiles[0]
      }
    }
  ],
};

export default Pages;
