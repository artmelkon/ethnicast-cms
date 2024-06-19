import * as React from "react";
import { SelectInput, useField } from "payload/components/forms";

export const CustomSelectComponent = ({
  path,
}: {
  path: string;
}): React.JSX.Element => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    const fetchOptions = async () => {
      try {
        const result = await fetch(
          "https://restcountries.com/v3.1/alpha?codes=760,051,840"
        );
        const data = await result.json();

        const countryOptions = data.map((country) => {
          console.log(Object.keys(country.languages));
          return {
            label: `${country.name.common + " " + country.flag}`,
            // value: country.name.common,
            value: Object.keys(country.languages)[0],
          };
        });

        setOptions(
          countryOptions.sort((a, b) => a.label.localeCompare(b.label))
        );
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchOptions();
  }, []);

  return (
    <div>
      <label className="field-label">Custom Selection</label>
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
