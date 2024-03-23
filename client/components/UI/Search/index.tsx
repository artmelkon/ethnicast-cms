import {useForm, SubmitHandler} from 'react-hook-form';
import { MdSearch, MdFilterList } from "react-icons/md";

import classes from './index.module.scss';

interface Input {
  search: string
  choices: string
}

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    console.log(data);
  };
  return (
    <form className={classes.search} onSubmit={handleSubmit(onSubmit)}>
      <input
        type="search"
        {...register("search")}
        className={classes.search__input}
        placeholder="Search podcast"
      />
      <select className={classes.search__select} {...register("choices")}>
        <option>Select</option>
        <option value="language">Language</option>
        <option value="genre">Genre</option>
      </select>
      <button className={classes.search__btn}>
        <MdSearch className={classes.search__icon} />
      </button>
    </form>
  );
};

export default SearchForm;
