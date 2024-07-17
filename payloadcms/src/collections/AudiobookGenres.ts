import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { anyone } from "../access/anyone";
import { slug } from "../fields/slug";

const AudiobookGenres: CollectionConfig = {
  slug: "audiobook-genres",
  admin: {
    useAsTitle: "title",
    defaultColumns: ['title', 'id', 'slug']
  },
  access: {
    create: isAdmin,
    read: anyone,
    update: isAdmin,
    delete: isAdmin
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    slug
  ],
  timestamps: false,
};

export default AudiobookGenres;
