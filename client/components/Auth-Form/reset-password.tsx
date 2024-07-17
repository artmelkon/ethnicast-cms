import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./index.module.scss";

interface Input {
  resetPassword: string;
  token: string;
}

interface Function {
  onResetPassword: (data: string) => Promise<void>;
}

const ResetPasswordForm: React.FC<Function> = ({ onResetPassword }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<Input> = async (data) => {
    onResetPassword(data);
  };

  return (
    <section className={classes.auth}>
      <h1>Reset Password </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.control}>
          <label htmlFor="rest-password">Enter New Password</label>
          <input
            id="reset-password"
            type="password"
            {...register("resetPassword")}
          />
          <input
            type="hidden"
            {...register("token")}
            value={router.asPath.split("=").pop()}
          />
        </div>
        <div className={classes.actions}>
          <button>Reset Password</button>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordForm;
