import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { MdSearch, MdFilterList } from "react-icons/md";
import useSWR from "swr";
import _ from "lodash";

import classes from "./index.module.scss";

interface Props {
  language: string;
  genre: string;
}

interface Input {
  search: string;
  language: string;
  genre: string;
}

const SearchForm: React.FC<Props> = (props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const languageReq = useSWR(
    `${process.env.CMS_URI}/api/categories?where[slug][equals]=language&depth=1`,
    fetcher
  );
  const genreReq = useSWR(
    `${process.env.CMS_URI}/api/categories?where[slug][equals]=genre&depth=1`,
    fetcher
  );

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const { search, language, genre } = data;
    for (var [slug, val] of Object.entries(data)) {
      if (val) {
        const searchQ = `/search/${slug}/${val}`;
        console.log("key ", slug);
        console.log("language ", val);
        console.log('search Q ', searchQ)
        router.push(searchQ);
      }
    }
  };

  if (languageReq.error) return <div>unable to fetch data!</div>;
  if (!languageReq.data) return <div>Loading...!</div>;
  if (genreReq.error) return <div>unable to fetch data!</div>;
  if (!genreReq.data) return <div>Loading...!</div>;

  const language = _.map(
    languageReq.data.docs[0].subcategory,
    ({ id, name }) => (
      <option key={id} value={id}>
        {name}
      </option>
    )
  );
  const genre = _.map(genreReq.data.docs[0].subcategory, ({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));

  return (
    <div className={classes.search}>
      <form className={classes.search__form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="search"
          {...register("search")}
          className={classes.search__input}
          placeholder="Search podcast"
        />
        <button className={classes.search__btn}>
          <MdSearch className={classes.search__icon} />
        </button>
      </form>
      <select
          className={`${classes.search__select} ${classes.language}`}
          {...register("language", {
            onChange: handleSubmit(onSubmit)
          })}
        >
          <option value="">Language</option>
          {language}
        </select>
      <select
        className={`${classes.search__select} ${classes.genre}`}
        {...register("genre", {
          onChange: handleSubmit(onSubmit)
        })}
      >
        <option value="">Genre</option>
        {genre}
      </select>
    </div>
  );
};

export default SearchForm;
