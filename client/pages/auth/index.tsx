import { useRouter } from "next/router";

import AuthForm from "../../components/Auth-Form";

const SignIn = () => {
  const router = useRouter();

  // if (status === "loading") return <p>Loading...!</p>;
  // if (status === "authenticated") {
  //   router.replace("/");
  // }
  return <AuthForm />;
};

export default SignIn;
