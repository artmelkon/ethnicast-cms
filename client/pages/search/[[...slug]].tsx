import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import Card from "../../components/UI/Card";

const Search: React.FC = () => {
  const [searchData, setSearchData] = useState(null);
  const router = useRouter();
  const { slug = [] } = router.query;

  console.log("slug ", slug[0], "\nid ", slug[1]);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  if (slug.length > 0 && slug.length === 2 && (slug[0] === 'languageId' || slug[0] === 'genreId')) {
    const { data, error, isLoading } = useSWR(
      `${process.env.CMS_URI}/api/podcasts?where[${slug[0]}][equals]=${slug[1]}&depth=0`,
      fetcher
    );
    return <Card slug={slug[0]} data={data?.docs} />;
  }
  if(slug.length > 0 && slug.length === 2 && slug[0] === 'q') {
    const {data, error, isLoading} = useSWR(`/api/producst`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    })
  }
  console.log("length ", slug.length);
  const { data, error, isLoading } = useSWR(
    `${process.env.CMS_URI}/api/categories?where[slug][equals]=genre&depth=1`,
    fetcher
  );

  return <Card data={data?.docs} />;
};

export default Search;
