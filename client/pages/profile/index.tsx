import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

import UserProfile from "@component/Profile";

const ProfilePage = () => {
  return <UserProfile />;
};

export async function getServerSideProps<GetServerSideProps>(ctx: any) {
  const session = await getSession({ req: ctx.req });

  console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
