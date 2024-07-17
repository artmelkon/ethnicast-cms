import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./index.module.scss";

interface Input {
  email: string;
}
interface Function {
  onForgotPassword: (data: any) => Promise<void>;
}
const ForgotPasswordForm: React.FC<Function> = ({ onForgotPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<Input> = async (data) => {
    onForgotPassword(data);
  };
  return (
    <section className={classes.auth}>
      <h1>Forgot Password?</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email required!",
              },
            })}
          />
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default ForgotPasswordForm;
