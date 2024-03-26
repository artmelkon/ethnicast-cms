import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

const Search: React.FC = () => {
  const [searchData, setSearchData] = useState(null);
  const router = useRouter();
  const { slug = [] } = router.query;
  console.log("slug ", slug[0], "\nid ", slug[1]);
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  // const { data, error, isLoading } = useSWR(
  //   `${process.env.CMS_URI}/api/podcasts?where[language][equals]=65f8c837cf74c6e39b74fa17&depth=0`,
  //   fetcher
  // );
  const { data, error, isLoading } = useSWR(
    `${process.env.CMS_URI}/api/podcasts?where[${slug[0]}][equals]=${slug[1]}&depth=0`,
    fetcher
  );

  console.log('Data ', data?.docs[0])
  return <div>Search</div>;
};

export default Search;
