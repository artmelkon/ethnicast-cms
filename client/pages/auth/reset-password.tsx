import ResetPasswordForm from "../_components/Auth-Form/reset-password";
import { useRouter } from "next/router";

const ResetPassword = () => {
  const router = useRouter();
  async function passwordResetHandler(data: any) {
    const password = data.resetPassword;
    const token = data.token;
    console.log("passwprd ", password, "\ntoken: ", token);

    const result = await fetch(
      `${process.env.CMS_URI}/api/users/reset-password`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ token, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (result.ok) router.push("/auth");
  }

  return <ResetPasswordForm onResetPassword={passwordResetHandler} />;
};

export default ResetPassword;
