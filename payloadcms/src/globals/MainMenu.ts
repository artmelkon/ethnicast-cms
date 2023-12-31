import { GlobalConfig } from "payload/types";
import link from "../fields/link";

export const MainMenu: GlobalConfig = {
  slug: "main-menu",
  label: "Main Menu",
  access: {
    read: () => Boolean(true),
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
};
