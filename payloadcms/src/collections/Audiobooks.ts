import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrContributor } from '../access/isAdminOrContributor';
import { isLoggedIn } from '../access/isLoggedIn';
import { anyone } from '../access/anyone';
import { customLanguageSelectField } from '../fields/customSelectLanguages/field'
import { isAdminOrContributorOrPublished } from "../access/isAdminContributorOrPublished";
// import { customSelectedGenres } from "../fields/customSelectedGenres/field";
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import payload from "payload";


const AudioBooks: CollectionConfig = {
  slug: "audiobooks",
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'id']
  },
  versions: {
    drafts: true
  },
  access: {
    create: isLoggedIn,
    read: isAdminOrContributorOrPublished,
    update: isAdminOrContributor(),
    delete: isAdminOrContributor()
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    },
    {
      name: 'publishingRights',
      label: 'Publisher\'s Rights',
      type: 'radio',
      defaultValue: 'own',
      admin: {
        layout: 'horizontal',
      },
      options: [
        {
          label: `I own the copyright and I hold the necessary publishing rights.`,
          value: 'own',
        },
        {
          label: 'This is a public domain work.',
          value: 'public'
        },
      ]
    },
    {
      name: 'audience',
      type: 'group',
      fields: [
        {
          name: 'isSexual',
          type: 'radio',
          label: 'Sexually Explicit Content',
          required: true,
          options: [
            {
              label: 'Yes',
              value: 'yes'
            },
            {
              label: 'No',
              value: 'no'
            }
          ]
        }
      ]
    },
    {
      name: 'rawPlaylistTracks',
      label: 'Playlist Tracks',
      type: 'array',
      minRows: 1,
      maxRows: 60,
      labels: {
        singular: 'Track',
        plural: 'Tracks'
      },
      fields: [
        {
          name: 'audiofile',
          type: 'relationship',
          relationTo: 'audiofiles',
          // access: {
          //   read: ({ req: { user } }) => Boolean(user?.roles?.includes('subscriber') ? true : false)
          // }
        },
        {
          name: 'isSample',
          type: 'checkbox',
          defaultValue: false
        },
      ],
      // admin: {
      //   components: {
      //     RowLabel: ({ data, index }: RowLabelArgs) => {
      //       return data?.label || `Untitled`
      //     },
      //   },
      // },
    },
    customLanguageSelectField,
    {
      name: 'genres',
      label: 'Select Genre',
      type: 'relationship',
      relationTo: 'audiobook-genres',
      hasMany: true,
    },
    {
      name: 'publisher_data',
      label: 'Publisher\'s Info',
      type: 'group',
      admin: {
        description: `Publisher\'s Data`
      },
      fields: [
        {
          name: 'publisherName',
          label: 'Publisher\s Name',
          type: 'text',
          required: true
        },
        {
          name: 'bookCover',
          type: 'relationship',
          relationTo: 'media',
          required: true
        },
        {
          name: 'publishedDate',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'd MMM yyy'
            }
          }
        },
      ]
    },
    {
      name: 'narratorName',
      label: "Narrator's name",
      type: 'text',
      required: true
    },
    {
      name: 'author_data',
      type: 'group',
      label: 'Author\'s Info',
      admin: {
        description: `Author's Data`
      },
      fields: [
        {
          name: 'authorName',
          type: 'text',
          required: true
        },
        {
          name: 'authorImage',
          type: 'relationship',
          relationTo: 'media'
        },
        {
          name: 'description',
          type: 'textarea'
        },
      ]
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.profiles?.[0]) return user.profiles[0]
      }
    },
    // {
    //   name: 'rating',
    //   type: 'relationship',
    //   relationTo: 'ratings',
    //   hasMany: true,
    //   access: {
    //     create: isAdminFieldLevel,
    //     update: isAdmin,
    //   }
    // },
  ],
  timestamps: true,
  endpoints: [{
    path: "/search",
    method: "get",
    handler: async (req, res, next) => {
      const { q } = req.query;
      console.log('params q: ', q);
      const Audiobook = payload.db.collections['audiobooks']
      const data = await Audiobook.find({ $text: { $search: q } })
      console.log(data)
      res.json(data)
    }
  }]
}

export default AudioBooks;
