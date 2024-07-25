import path from "path";
import { buildConfig } from "payload/config";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import dotenv from "dotenv";
import FormBuilder, { fields } from "@payloadcms/plugin-form-builder";

import Users from "./collections/Users";
import Media from "./collections/Media";
import AudioFiles from "./collections/AudioFiles";
import Pages from "./collections/Pages";
import AudiobookGenres from "./collections/AudiobookGenres";
import PodcastGenres from "./collections/PodcastGenres";
import Languages from "./collections/Languages";
import Podcasts from "./collections/Podcasts";
import AudioBooks from "./collections/Audiobooks";
// import Ratings from "./collections/Rating";
import Profiles from "./collections/Profiles";
import { MainMenu } from "./globals/MainMenu";
import { Footer } from "./globals/Footer";
import search from "@payloadcms/plugin-search";

// import Example from "./collections/Example";

dotenv.config();
export default buildConfig({
  serverURL: process.env.CMS_URI,
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      config.resolve!.fallback = {
        util: false,
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
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: `${process.env.MONGODB_URI}`,
  }),
  collections: [
    AudiobookGenres,
    PodcastGenres,
    Languages,
    Pages,
    Media,
    AudioFiles,
    AudioBooks,
    Podcasts,
    // Ratings,
    Users,
    Profiles,
    // Example
  ],
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
      collections: ["podcasts", "audiobooks"],
      defaultPriorities: {
        podcasts: 10,
        audiobooks: 10
      },
    }),
  ],
  localization: {
    locales: [
      { label: "Arabic", code: "ar" },
      { label: "Armenian", code: "hye" },
      { label: "English", code: "en" },
      { label: "Russian", code: "ru" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
});
