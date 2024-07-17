import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import AuthForm from "@component/Auth-Form";

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...!</p>;
  if (status === "authenticated") {
    router.replace("/");
  }
  return <AuthForm />;
};

export default SignIn;
