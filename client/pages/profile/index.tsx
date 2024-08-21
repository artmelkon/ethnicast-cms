import { GetServerSideProps } from "next";

import UserProfile from "../../components/Profile";

const ProfilePage = () => {
  // return <UserProfile />;
  return <h2>Profile Page</h2>;
};

// export async function getServerSideProps<GetServerSideProps>(ctx: any) {
//   // const session = await getSession({ req: ctx.req });

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: "/auth",
//   //       permanent: false,
//   //     },
//   //   };
//   // }

//   // return {
//   //   props: {
//   //     session,
//   //   },
//   // };
// }

export default ProfilePage;
