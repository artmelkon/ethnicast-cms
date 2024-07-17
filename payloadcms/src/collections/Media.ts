import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrContributor } from "../access/isAdminOrContributor";
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAcess";
import { isLoggedIn } from "../access/isLoggedIn";
import { anyone } from "../access/anyone";
import { isAdminOrSelf } from "../access/isAdminOrSelf";


export type Type = {
  filename: string
  slug: string
  alt?: string
  mimeType: string
  width: number
  height: number
  filesize: number
  url: string
}

const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "id"],
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  access: {
    create: isLoggedIn,
    read: anyone,
    update: isAdminOrContributor(),
    delete: isAdminOrContributor(),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "profile",
      type: "relationship",
      relationTo: "profiles",
      // If user is not admin, set the site by default
      // to the first site that they have access to
      defaultValue: ({ user }) => {
        if (!user.roles.includes("admin") && user.profiles?.[0]) {
          return user.profiles[0];
        }
      },
    },
  ],
};

export default Media;
