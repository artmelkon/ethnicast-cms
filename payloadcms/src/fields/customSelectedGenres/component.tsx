import * as React from "react";
import { SelectInput, useField } from "payload/components/forms";

export const CustomSelectComponent = ({ path }: { path: string }) => {
  const { value, setValue } = useField<string>({ path });
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    (async function () {
      try {
        const result = await fetch(
          `http://scorpio.local:4000/api/categories?where[title][equals]=Genre`
        );
        const genreReq = await result.json();
        const genres = genreReq.docs[0].categoryName.map((genre) => {
          return {
            label: genre.label,
            value: genre.value,
          };
        });
        console.log("genres: ", genres);
        setOptions(genres.sort((a, b) => a.label.localeCompare(b.label)));
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    })();
  }, []);

  React.useEffect(() => {
    if (value && !Array.isArray(value)) {
      console.log("value: ", value);
      const newValue = JSON.parse(value);
      setValue(newValue);
    }
  }, [value]);

  return (
    <div>
      <label className="field-label">Custom Category Selection</label>
      <SelectInput
        path={path}
        name={path}
        options={options}
        value={value}
        hasMany={true}
        // onChange={(e) => setValue(e.value)}
        onChange={(selectedOption) => {
          if (!Array.isArray(selectedOption)) return;
          const newValue = selectedOption.map((option) => option.value);
          setValue(newValue);
        }}
      />
    </div>
  );
};

function useCallback(
  arg0: (selectedOption: any) => void,
  arg1: ((val: unknown, modifyForm?: boolean) => void)[]
) {
  throw new Error("Function not implemented.");
}
