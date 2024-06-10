import path from "path";
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import FormBuilder, { fields } from "@payloadcms/plugin-form-builder";

import Users from "./collections/Users";
import Media from "./collections/Media";
import Audio from "./collections/Audio";
import Pages from "./collections/Pages";
import Categories from "./collections/Categories";
import Podcasts from "./collections/Podcasts";
import AudioBooks from "./collections/Audobooks";
import Authors from './collections/Authors';
import Narrators from "./collections/Narrators";
import Publishers from "./collections/Publisher";
import Ratings from "./collections/Rating";
import { MainMenu } from "./globals/MainMenu";
import { Footer } from "./globals/Footer";
import SubCategories from "./collections/SubCategories";
import search from "@payloadcms/plugin-search";

dotenv.config();
// if (process.env.NODE_ENV === 'development') {
//   dotenv.config({ path: './env/.env.dev' })
// } else {
//   dotenv.config({ path: './env/.env.prod' })
// }
export default buildConfig({
  serverURL: process.env.CMS_URI,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      config.resolve!.fallback = {
        stream: false,
        url: false,
        timers: false,
        http: false,
        https: false,
        crypto: false,
      };
      return config;
    },
    meta: {
      titleSuffix: "- Ethnicast",
      favicon: "/assets/favicon.png",
      ogImage: "/assets/logo.png",
    },
  },
  db: mongooseAdapter({
    url: `${process.env.MONGODB_URI}`,
  }),
  editor: slateEditor({}),
  collections: [Categories, SubCategories, Pages, Media, Audio, AudioBooks, Authors, Narrators, Publishers, Podcasts, Ratings, Users],
  globals: [MainMenu, Footer],
  cors: [`${process.env.PUBLIC_URI}`],
  csrf: [`${process.env.PUBLIC_URI}`],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  plugins: [
    FormBuilder({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
    }),
    search({
      collections: ['podcasts'],
      defaultPriorities: {
        podcasts: 10,
      },
      searchOverrides: {
        fields: [
          { name: 'author', type: 'text' },
          { name: 'title', type: 'text' }
        ]
      }
    }),
  ],
});
