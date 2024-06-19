import { Field } from "payload/types";
import { CustomSelectComponent } from "./component";

export const customLanguageSelectField: Field = {
  name: 'languages',
  type: 'text',
  admin: {
    components: {
      Field: CustomSelectComponent
    }
  }
}

