import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../../access/isAdmin";
import { isAdminOrSelf } from "../../access/isAdminOrSelf";

import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    depth: 0,
  },
  admin: {
    useAsTitle: "firstName",
    defaultColumns: ["firstName", "email"],
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
    // admin: isSuperOrTenantAdmin,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "roles",
      saveToJWT: true,
      type: "select",
      hasMany: true,
      defaultValue: ["user"],
      access: {
        read: isAdminFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "User",
          value: "user",
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
    },
    // {
    //   name: 'dob',
    //   type: 'row',
    //   fields: [
    //     {
    //       name: 'month',
    //       type: 'text',
    //       required: true,
    //       admin: {
    //         width: '33%'
    //       }
    //     },
    //     {
    //       name: 'date',
    //       type: 'text',
    //       required: true,
    //       admin: {
    //         width: '33%'
    //       }
    //     }
    //   ]
    // },
    // {
    //   name: "myPlayList",
    //   type: "relationship",
    //   relationTo: "playlist",
    //   hasMany: true,
    // },
  ],
  timestamps: true,
};

export default Users;
