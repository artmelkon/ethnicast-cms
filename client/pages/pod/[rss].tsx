import React from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";

const FilterPods: React.FC = (props) => {
  const router = useRouter();
  const filterData = router.query.rss;
  console.log(filterData);
  // console.log(props.ctx)

  return <h2>filterData</h2>;
};

// export async function getStaticProps<GetStaticProps>() {
//   const ctx = 'hello'
//   return {
//     props: {
//       ctx,
//     },
//   };
// }

export default FilterPods;
