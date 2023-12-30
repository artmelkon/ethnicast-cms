import { GlobalConfig } from "payload/types";
import link from "../fields/link";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: 'Footer',
  access: {
    read: () => Boolean(true),
  },
  fields: [
    {
      name: 'nav',
      label: 'Navigation',
      type: 'array',
      maxRows: 3,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
};