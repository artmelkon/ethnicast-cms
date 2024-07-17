import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import _ from "lodash";

import classes from "./index.module.scss";

interface Input {
  feedUrl: string;
  languages: string;
  genres: string;
}

interface Props {
  languages: {
    id: string;
    name: string;
    value: string;
  };
  genres: {
    id: string;
    name: string;
    value: string;
  };
}

const PodcastSubmit: React.FC<Props> = ({ languages, genres }) => {
  const languageList = _.map(languages, (item: any) => (
    <option key={item.id} value={item.slug}>
      {item.title}
    </option>
  ));
  const gernreList = _.map(genres, (item: any) => (
    <option key={item.id} value={item.slug}>
      {item.title}
    </option>
  ));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const response = await fetch("/api/feedsubmit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (!response.ok)
        throw Error(response.statusText || "Something went wrong");
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <h3 className={classes["form__title-h3"]}>Submit RSS Feed</h3>

        <div className={classes.form__controller}>
          <label
            htmlFor="rssFeed"
            className={classes["form__controller-label"]}
          >
            Eneer RSS Feed url
          </label>
          <input
            id="rssFeed"
            {...register("feedUrl", {
              required: {
                value: true,
                message: "RSS Feed url required!",
              },
            })}
            className={classes["form__controller-input"]}
            placeholder="Enter RSS Feed"
          />
          <p>{errors.feedUrl?.message}</p>
        </div>
        <div className={classes.form__controller}>
          <div className={classes["form__controller-wrapper"]}>
            <select
              id="language"
              {...register("language")}
              className={classes["form__controller-select"]}
            >
              <option>Select Language</option>
              {languageList}
            </select>
            <select
              id=""
              {...register("genre")}
              className={classes["form__controller-select"]}
            >
              <option>Select Genre</option>
              {gernreList}
            </select>
          </div>
        </div>
        <div className={classes.form__controller}>
          <button className={classes.btn}>Submit RSS Feed</button>
        </div>
      </form>
      {/* The DevTool throus React related errors, probably a bug */}
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default PodcastSubmit;
