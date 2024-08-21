import { useState, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
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
  languages: string;
  genres: string;
  q: any;
}

const SearchForm: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState();
  const router = useRouter();
  const pathName: any = router.pathname;
  console.log("search audobook genere: ", pathName);
  const { slug = [] }: any = router.query;
  useEffect(() => {
    if (pathName.includes("podcast") || pathName.includes("audiobook")) {
      setSelectedPath(pathName?.split("/").pop());
    }
    if (slug[0] === "podcast" || slug[0] === "audiobook") {
      setSelectedPath(slug[0]);
    }
  }, [pathName, slug]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Input>();

  const fetcher = (url: string) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());
  const languageReq = useSWR(`${process.env.CMS_URI}/api/languages`, fetcher);
  const genreReq = useSWR(`${process.env.CMS_URI}/api/podcast-genres`, fetcher);
  const audiobookReq = useSWR(
    `${process.env.CMS_URI}/api/audiobook-genres`,
    fetcher
  );

  const onSubmit: SubmitHandler<Input> = async (data) => {
    const { q, languages, genres } = data;
    let searchQry;
    for (var [slug, val] of Object.entries(data)) {
      if (val) {
        searchQry = `/search/${selectedPath}/${slug}/${val}`;
        router.push(searchQry);
      }
    }
    if (languages) {
      reset({ languages: "" });
    }
    if (genres) {
      reset({ genres: "" });
    }
  };

  if (languageReq.error) return <div>unable to fetch data!</div>;
  if (!languageReq.data) return <div>Loading...!</div>;
  if (!genreReq.data) return <div>Loading...!</div>;
  if (genreReq.error) return <div>unable to fetch data!</div>;
  if (!audiobookReq.data) return <div>Loading...!</div>;
  if (audiobookReq.error) return <div>unable to fetch data!</div>;

  const language = _.map(languageReq.data.docs, ({ id, title, slug }) => (
    <option key={id} value={slug}>
      {title}
    </option>
  ));

  // console.log("header pathname: ", selectedPath);

  let genre: any[] = [];
  if (selectedPath === "podcast") {
    genre = _.map(genreReq.data.docs, ({ id, title }) => (
      <option key={id} value={id}>
        {title}
      </option>
    ));
  }

  if (selectedPath === "audiobook")
    genre = _.map(audiobookReq.data.docs, ({ id, title }) => (
      <option key={id} value={id}>
        {title}
      </option>
    ));

  return (
    <div className={classes.search}>
      <form className={classes.search__form} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="search"
          {...register("q")}
          className={classes.search__input}
          placeholder="Search podcast"
        />
        <button className={classes.search__btn}>
          <MdSearch className={classes.search__icon} />
        </button>
      </form>
      <select
        className={`${classes.search__select} ${classes.language}`}
        {...register("languages", {
          onChange: handleSubmit(onSubmit),
        })}
      >
        <option value="">Language...</option>
        {language}
      </select>
      <select
        className={classes.search__select}
        {...register("genres", {
          onChange: handleSubmit(onSubmit),
        })}
      >
        <option value="">Genre...</option>
        {genre}
      </select>
    </div>
  );
};

export default SearchForm;
