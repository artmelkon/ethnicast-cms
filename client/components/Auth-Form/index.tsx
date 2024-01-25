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
      <h1>{isLoggedIn ? "Sign In" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" {...register("email")} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            {...register("password", { minLength: 4, maxLength: 36 })}
          />
        </div>
        {!isLoggedIn && (
          <>
            <div className={classes.control}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  minLength: 4,
                  maxLength: 36,
                })}
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" {...register("firstName")} />
            </div>
            <div className={classes.control}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" {...register("lastName")} />
            </div>
          </>
        )}
        <div className={classes.actions}>
          <button>{isLoggedIn ? "Login" : "Create Account"}</button>
        </div>
      </form>
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
    </section>
  );
};

export default AuthForm;
