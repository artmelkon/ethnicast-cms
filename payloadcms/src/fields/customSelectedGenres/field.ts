import { Field } from "payload/types";
import { CustomSelectComponent } from "./component";

export const customSelectedGenres: Field = {
  name: 'customSelectedGenres',
  type: 'text',
  admin: {
    components: {
      Field: CustomSelectComponent
    }
  },
  hooks: {
    beforeValidate: [
      async ({ value }) => {
        // convert the array to string since this is a text field
        const stringifiedValue = JSON.stringify(value);
        return stringifiedValue;
      },
    ],
  },
}
