import { CollectionConfig } from "payload/types";
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin';
import { isAdminOrContributor } from '../access/isAdminOrContributor';
import { isLoggedIn } from '../access/isLoggedIn';
import { anyone } from '../access/anyone';
import { customLanguageSelectField } from '../fields/customSelectLanguages/field'

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
    update: isAdminOrContributor(),
    read: isAdminOrContributor(),
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
      name: 'audiofile',
      type: 'relationship',
      relationTo: 'audiofiles'
    },
    {
      name: 'puglisher_data',
      type: 'group',

      admin: {
        description: `Publisher Data`
      },
      fields: [
        {
          name: 'publisherName',
          type: 'text',
          required: true
        },
        customLanguageSelectField,
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
      label: 'Author Info',
      admin: {
        description: `Author Data`
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
      ]
    },
    {
      name: 'genres',
      type: 'relationship',
      relationTo: ['categories'],
      hasMany: true,
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'profiles',
      defaultValue: ({ user }) => {
        if (!user.roles.includes('admin') && user.profiles?.[0]) return user.profiles[0]
      }
    },
    {
      name: 'rating',
      type: 'relationship',
      relationTo: 'ratings',
      hasMany: true,
      access: {
        create: isAdminFieldLevel,
        update: isAdmin,
      }
    },
  ],
  timestamps: true
}

export default AudioBooks;
