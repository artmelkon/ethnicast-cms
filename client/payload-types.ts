/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    'audiobook-genres': AudiobookGenre;
    'podcast-genres': PodcastGenre;
    languages: Language;
    pages: Page;
    media: Media;
    audiofiles: Audiofile;
    audiobooks: Audiobook;
    podcasts: Podcast;
    ratings: Rating;
    users: User;
    profiles: Profile;
    example: Example;
    forms: Form;
    'form-submissions': FormSubmission;
    search: Search;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    'main-menu': MainMenu;
    footer: Footer;
  };
}
export interface AudiobookGenre {
  id: string;
  title?: string | null;
  slug?: string | null;
}
export interface PodcastGenre {
  id: string;
  title?: string | null;
  slug?: string | null;
}
export interface Language {
  id: string;
  title?: string | null;
  slug: string;
}
export interface Page {
  id: string;
  title: string;
  layout?:
  | (
    | {
      form: string | Form;
      enableIntro?: boolean | null;
      introContent?:
      | {
        [k: string]: unknown;
      }[]
      | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'formBlock';
    }
    | {
      content?:
      | {
        [k: string]: unknown;
      }[]
      | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'content';
    }
  )[]
  | null;
  slug?: string | null;
  profile?: (string | null) | Profile;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Form {
  id: string;
  title: string;
  fields?:
  | (
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      defaultValue?: string | null;
      required?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'text';
    }
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      defaultValue?: string | null;
      required?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'textarea';
    }
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      defaultValue?: string | null;
      options?:
      | {
        label: string;
        value: string;
        id?: string | null;
      }[]
      | null;
      required?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'select';
    }
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      required?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'email';
    }
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      required?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'state';
    }
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      required?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'country';
    }
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      defaultValue?: number | null;
      required?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'number';
    }
    | {
      name: string;
      label?: string | null;
      width?: number | null;
      required?: boolean | null;
      defaultValue?: boolean | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'checkbox';
    }
    | {
      message?:
      | {
        [k: string]: unknown;
      }[]
      | null;
      id?: string | null;
      blockName?: string | null;
      blockType: 'message';
    }
  )[]
  | null;
  submitButtonLabel?: string | null;
  confirmationType?: ('message' | 'redirect') | null;
  confirmationMessage?:
  | {
    [k: string]: unknown;
  }[]
  | null;
  redirect?: {
    url: string;
  };
  emails?:
  | {
    emailTo?: string | null;
    cc?: string | null;
    bcc?: string | null;
    replyTo?: string | null;
    emailFrom?: string | null;
    subject: string;
    message?:
    | {
      [k: string]: unknown;
    }[]
    | null;
    id?: string | null;
  }[]
  | null;
  updatedAt: string;
  createdAt: string;
}
export interface Profile {
  id: string;
  username: string;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  alt: string;
  profile?: (string | null) | Profile;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface Audiofile {
  id: string;
  title: string;
  profile?: (string | null) | Profile;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}
export interface Audiobook {
  id: string;
  title: string;
  publishingRights?: ('own' | 'public') | null;
  audience: {
    isSexual: 'yes' | 'no';
  };
  rawPlaylistTracks?:
  | {
    audiofile?: (string | null) | Audiofile;
    isSample?: boolean | null;
    id?: string | null;
  }[]
  | null;
  languages?: string | null;
  genres?: (string | AudiobookGenre)[] | null;
  publisher_data: {
    publisherName: string;
    bookCover: string | Media;
    publishedDate: string;
  };
  narratorName: string;
  author_data: {
    authorName: string;
    authorImage?: (string | null) | Media;
    description?: string | null;
  };
  profile?: (string | null) | Profile;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
export interface Podcast {
  id: string;
  title?: string | null;
  creator?: string | null;
  email?: string | null;
  link?: string | null;
  feedUrl?: string | null;
  image?: {
    link?: string | null;
    url?: string | null;
    title?: string | null;
  };
  author?: string | null;
  description?: string | null;
  paginationLink?: {
    self?: string | null;
  };
  languages?: string | null;
  genres?: (string | PodcastGenre)[] | null;
}
export interface Rating {
  id: string;
  value?: number | null;
  user?: (string | null) | User;
  profile?: (string | null) | Profile;
  updatedAt: string;
  createdAt: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  roles?: ('admin' | 'contributor' | 'subscriber')[] | null;
  profiles?: (string | Profile)[] | null;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
export interface Example {
  id: string;
  categories?: (string | null) | Language;
  updatedAt: string;
  createdAt: string;
}
export interface FormSubmission {
  id: string;
  form: string | Form;
  submissionData?:
  | {
    field: string;
    value: string;
    id?: string | null;
  }[]
  | null;
  updatedAt: string;
  createdAt: string;
}
export interface Search {
  id: string;
  title?: string | null;
  priority?: number | null;
  doc: {
    relationTo: 'podcasts';
    value: string | Podcast;
  };
  author?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
  | {
    [k: string]: unknown;
  }
  | unknown[]
  | string
  | number
  | boolean
  | null;
  updatedAt: string;
  createdAt: string;
}
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
export interface MainMenu {
  id: string;
  navItems?:
  | {
    link: {
      type?: ('reference' | 'custom') | null;
      newTab?: boolean | null;
      reference?: {
        relationTo: 'pages';
        value: string | Page;
      } | null;
      url?: string | null;
      label: string;
    };
    id?: string | null;
  }[]
  | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Footer {
  id: string;
  nav?:
  | {
    link: {
      type?: ('reference' | 'custom') | null;
      newTab?: boolean | null;
      reference?: {
        relationTo: 'pages';
        value: string | Page;
      } | null;
      url?: string | null;
      label: string;
    };
    id?: string | null;
  }[]
  | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config { }
}
