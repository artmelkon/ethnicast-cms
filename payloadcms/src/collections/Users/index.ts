import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from "../../access/isAdmin";
import { isAdminOrSelf } from "../../access/isAdminOrSelf";

// import { ensureFirstUserIsAdmin } from "./hooks/ensureFirstUserIsAdmin";

const Users: CollectionConfig = {
  slug: "users",
  auth: {
    useAPIKey: true,
    depth: 0,
    forgotPassword: {
      generateEmailHTML: ({ req: { token, user } }: any) => {
        // Use the token provided to allow your user to reset their password
        // We will send them to the frontend NextJS app instead of sending
        // them to the Payload admin by default
        const resetPasswordURL = `${process.env.CMS_URI}/reset-password?token=${token}`;

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Click below to reset your password.</h1>
              <p>
                <a href="${resetPasswordURL}">${resetPasswordURL}</a>
              </p>
            </body>
          </html>
        `;
      },
    },
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["firstName", "email"],
  },
  access: {
    // Anyone can create a user
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
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
          saveToJWT: true,
        },
        {
          name: "lastName",
          type: "text",
          required: true,
          saveToJWT: true,
        },
      ],
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      access: {
        create: isAdmin,
        update: isAdmin,
      },
      defaultValue: ["user"],
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
  ],
  timestamps: true,
};

export default Users;
