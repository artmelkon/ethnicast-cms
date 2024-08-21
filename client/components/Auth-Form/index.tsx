import { useState, useCallback, useEffect } from "react";
import { useForm, SubmitHandler, FieldValue } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../../context/Auth";
import classes from "./index.module.scss";

interface Input {
  email?: string;
  password?: string;
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

  if (!result.ok) throw new Error(result.statusText || "Something went wrong!");

  const user = await result.json();
  return user;
}

const AuthForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();

  function toggleAuthMethodHandler() {
    setIsLoggingIn((prevState) => !prevState);
  }

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        if (isLoggingIn) {
          console.log("auth-form data: ", data);
          await login(data);
          router.push("/");
        } else {
          createUser(data);
        }
      } catch (err) {
        setError(
          "There was an error with the credentials provided. Please try again."
        );
      }
    },
    [login, router]
  );

  return (
    <section className={classes.auth}>
      <div className={classes.auth__wrapper}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <h2 className={classes.form__title}>
            {isLoggingIn ? "Sign In" : "Sign Up"}
          </h2>
          {error && <div className={classes.alert}>{error}</div>}
          <div className={classes.form__control}>
            <label htmlFor="email" className={classes.form__label}>
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className={classes.form__input}
            />
            {errors.email?.type === "required" && (
              <p className={classes.alert}>Email required!</p>
            )}
          </div>
          <div className={classes.form__control}>
            <label htmlFor="password" className={classes.form__label}>
              Your Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: true,
                minLength: 4,
                maxLength: 36,
              })}
              className={classes.form__input}
            />
            {errors.password?.type === "required" && (
              <p className={classes.alert}>Password required!</p>
            )}
          </div>
          {!isLoggingIn && (
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
                    required: true,
                    minLength: 4,
                    maxLength: 36,
                  })}
                  className={classes.form__input}
                />
              </div>
              <div className={classes.form__control}>
                <label htmlFor="firstName" className={classes.form__label}>
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
                <label htmlFor="lastName" className={classes.form__label}>
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
            <button>{isLoggingIn ? "Login" : "Create Account"}</button>
          </div>
        </form>
        <div></div>
        <div className={classes.actions}>
          <button className={classes.toggle} onClick={toggleAuthMethodHandler}>
            {isLoggingIn
              ? "Sign up a new account"
              : "Sign in with existint account"}
          </button>
        </div>
        {isLoggingIn && (
          <div className={classes.forgotPassword}>
            <Link href="/auth/forgot-password">Forgot Password?</Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthForm;
