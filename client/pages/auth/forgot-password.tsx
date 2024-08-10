import ForgotPasswordForm from "../_components/Auth-Form/forgot-password-form";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const router = useRouter();
  async function forgotPasswordHandler(data: any) {
    try {
      const result = await fetch(
        `${process.env.CMS_URI}/api/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (result.ok) {
        router.push("/auth/success");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return <ForgotPasswordForm onForgotPassword={forgotPasswordHandler} />;
};

export default ForgotPassword;
