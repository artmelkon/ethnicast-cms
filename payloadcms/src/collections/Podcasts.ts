import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { isLoggedIn } from "../access/isLoggedIn";

import { CategoryType } from "./Categories";


const Podcasts: CollectionConfig = {
  slug: "podcasts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "creater"],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: isLoggedIn,
  },
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "creator",
      type: "text",
    },
    {
      name: "email",
      type: "email",
    },
    {
      name: "link",
      type: "text",
    },
    {
      name: "feedUrl",
      type: "text",
    },
    {
      name: "image",
      type: "group",
      fields: [
        {
          name: "link",
          type: "text",
        },
        {
          name: "url",
          type: "text",
        },
        {
          name: "title",
          type: "text",
        },
      ],
    },
    {
      name: "author",
      type: "text",
    },
    {
      name: "paginationLink",
      type: "group",
      fields: [
        {
          name: "self",
          type: "text",
          label: "Feed URl",
        },
      ],
    },
    {
      name: "language",
      type: "text",
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "genres",
      type: "relationship",
      hasMany: true,
      relationTo: "categories",
    },
  ],
  timestamps: false,
};

export default Podcasts;
