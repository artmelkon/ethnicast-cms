import path from "path";
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv';
// import formBuilder from '@payloadcms/plugin-form-builder';

import Users from "./collections/Users";
import Media from "./collections/Media";
import Category from "./collections/Categories";

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './env/.env.dev' })
} else {
  dotenv.config({ path: './env/.env.prod' })
}

export default buildConfig({
  serverURL: process.env.CMS_URI,
  admin: {
    user: Users.slug,
    bundler: webpackBundler()
  },
  db: mongooseAdapter({
    url: `${process.env.MONGODB_URI}`
  }),
  editor: slateEditor({}),
  collections: [
    Category,
    Media,
    Users,
  ],
  cors: [`${process.env.NEXT_URI}`],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  // plugins: [
  //   formBuilder(
  //     {
  //       fields: {
  //         text: true,
  //         textarea: true,
  //         select: true,
  //         email: true,
  //         state: true,
  //         country: true,
  //         checkbox: true,
  //         number: true,
  //         message: true,
  //         payment: false
  //       }
  //     }
  //   )
  // ]
});
