import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isAdminOrContributor } from "../access/isAdminOrContributor";
import { isAdminOrHasSiteAccess } from "../access/isAdminOrHasSiteAcess";
import { isLoggedIn } from "../access/isLoggedIn";
import { anyone } from "../access/anyone";
import { isAdminOrSelf } from "../access/isAdminOrSelf";

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
    update: isAdminOrContributor(),
    read: isAdminOrContributor(),
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
