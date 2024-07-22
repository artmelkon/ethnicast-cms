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
      generateEmailHTML: ({ req, token, user }: any) => {
        // Use the token provided to allow your user to reset their password
        // We will send them to the frontend NextJS app instead of sending
        // them to the Payload admin by default
        const resetPasswordURL = `${process.env.PUBLIC_URI}/auth/reset-password?token=${token}`;

        return `
          <!doctype html>
          <html>
            <body>
              <h1>Click below to reset your password.</h1>
              <p>Hello, ${user.email}!</p>
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
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
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
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      defaultValue: ["subscriber"],
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: 'Contributor',
          value: 'contributor'
        },
        {
          label: "Subscriber",
          value: "subscriber",
        },
      ],
    },
    {
      name: 'dob',
      type: 'date',
    },
    {
      name: 'profiles',
      // Save this field to JWT so we can use from `req.user`
      saveToJWT: true,
      type: 'relationship',
      relationTo: 'profiles',
      hasMany: true,
      access: {
        // Only admins can create or update a value for this field
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: {
        condition: ({ roles }) => (roles && !roles.includes('admin')),
        description: 'This field sets which sites that this user has access to.'
      }
    }
  ],
  timestamps: true,
};

export default Users;
