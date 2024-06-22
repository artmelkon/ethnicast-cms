import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";
import { anyone } from "../access/anyone";
import { customLanguageSelectField } from '../fields/customSelectLanguages/field';
import payload from "payload";
import { isAdminOrContributor } from "../access/isAdminOrContributor";

const Podcasts: CollectionConfig = {
  slug: "podcasts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "creater", "language", "genre"],
  },
  access: {
    create: isAdmin,
    read: anyone,
    update: isAdmin,
    delete: isAdminOrContributor(),
  },
  fields: [
    {
      name: "title",
      type: "text",
      index: true,
    },
    {
      name: "creator",
      type: "text",
      index: true,
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
      index: true,
    },
    {
      name: "description",
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
    customLanguageSelectField,
    {
      name: 'genres',
      label: 'Selecte Genres',
      type: 'relationship',
      relationTo: 'podcast-genres',
      hasMany: true
    }

  ],
  timestamps: false,
  endpoints: [
    {
      path: "/search",
      method: "get",
      handler: async (req, res, next) => {
        console.log("param q: ", req.query.q);
        const searchQry = req.query.q;
        const Podcast = payload.db.collections['podcasts'];
        const searchData = await Podcast.find({ $text: { $search: searchQry } });
        console.log('search: ', searchData)
        res.json(searchData);
      },
    },
  ],
};

export default Podcasts;
