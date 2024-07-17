import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";

import classes from "./index.module.scss";

interface Input {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

async function createUser(data: Input) {
  const result = await fetch(`${process.env.CMS_URI}/api/users`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!result.ok) throw Error(result.statusText || "Something went wrong!");

  const user = await result.json();
  return user;
}

const AuthForm = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  function toggleAuthMethodHandler() {
    setIsLoggedIn((prevState) => !prevState);
  }

  const onSubmit: SubmitHandler<Input> = async (data) => {
    if (isLoggedIn) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      // if (!result?.error) {
      //   router.replace("/");
      // }
    } else {
      console.log("is logged in ", isLoggedIn);

      createUser(data);
    }
  };

  return (
    <section className={classes.auth}>
      <div className={classes.auth__wrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <h2 className={classes.form__title}>
            {isLoggedIn ? "Sign In" : "Sign Up"}
          </h2>
          <div className={classes.form__control}>
            <label htmlFor="email" className={classes.form__label}>
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={classes.form__input}
            />
          </div>
          <div className={classes.form__control}>
            <label htmlFor="password" className={classes.form__label}>
              Your Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { minLength: 4, maxLength: 36 })}
              className={classes.form__input}
            />
          </div>
          {!isLoggedIn && (
            <>
              <div className={classes.form__control}>
                <label
                  htmlFor="confirmPassword"
                  className={classes.form__label}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    minLength: 4,
                    maxLength: 36,
                  })}
                  className={classes.form__input}
                />
              </div>
              <div className={classes.form__control}>
                <label
                  htmlFor="firstName"
                  className={classes.form__label}
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className={classes.form__input}
                />
              </div>
              <div className={classes.form__control}>
                <label
                  htmlFor="lastName"
                  className={classes.form__label}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className={classes.form__input}
                />
              </div>
            </>
          )}
          <div className={classes.actions}>
            <button>{isLoggedIn ? "Login" : "Create Account"}</button>
          </div>
        </form>
        <div>

        </div>
        <div className={classes.actions}>
          <button className={classes.toggle} onClick={toggleAuthMethodHandler}>
            {isLoggedIn
              ? "Sign up a new account"
              : "Sign in with existint account"}
          </button>
        </div>
        {isLoggedIn && (
          <div className={classes.forgotPassword}>
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthForm;
