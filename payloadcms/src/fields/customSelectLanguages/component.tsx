import * as React from "react";
import { SelectInput, useField } from "payload/components/forms";

import { language_code } from "./language-code";

export const CustomSelectComponent = ({
  path,
}: {
  path: string;
}): React.JSX.Element => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    const languageOptions: any = language_code.map((item) => ({
      label: item.language,
      value: item.code,
    }));
    setOptions(languageOptions.sort((a, b) => a.label.localeCompare(b.label)));
  }, []);

  return (
    <div>
      <label className="field-label">Select Language</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        onChange={(e) => setValue(e.value)}
      />
    </div>
  );
};
