import { useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import Card from "../../components/UI/Card";

const Search: React.FC = () => {
  const [reqData, setReqData] = useState(null);
  const { data: session } = useSession();
  console.log("catch all session: ", session);
  const router = useRouter();
  const { slug = [] } = router.query;
  function bgcolorSelector() {
    const bgColorList = [
      "#414833",
      "#FB5607",
      "#FF006E",
      "#8338EC",
      "#3A86FF",
      "#004fc1",
      "#386641",
      "#e63946",
      "#003566",
      "#3a0ca3",
    ];
    const rN = Math.floor(Math.random() * 10);
    return bgColorList[rN];
  }

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  let queryString;
  if (slug.length > 0 && slug.length === 3) {
    if (slug.includes("q") && slug.includes("podcast")) {
      queryString = `/api/podcasts/search?q=${slug[2]}`;
      console.log("query String: ", queryString);
    }
    if (slug.includes("q") && slug.includes("audiobook")) {
      queryString = `/api/audiobooks/search?q=${slug[2]}`;
      console.log("query String: ", queryString);
    }
    if (
      slug.includes("podcast") &&
      (slug.includes("genres") || slug.includes("languages"))
    ) {
      queryString = `/api/podcasts?where[${slug[1]}][contains]=${slug[2]}`;
    }
    if (
      slug.includes("audiobook") &&
      (slug.includes("genres") || slug.includes("languages"))
    ) {
      queryString = `/api/audiobooks?where[${slug[1]}][contains]=${slug[2]}`;
    }
  }

  const { data, isLoading, error } = useSWR(
    `${process.env.CMS_URI}${queryString}`,
    fetcher
  );
  console.log("[[..SWR data]]: ", data);

  useEffect(() => {
    if (Array.isArray(data)) setReqData(data);
    if (data?.hasOwnProperty("docs")) setReqData(data.docs);
  }, [data]);

  console.log("[[..req data]]: ", reqData);
  if (isLoading)
    return <h2 style={{ textAlign: "center" }}>loadBindings...!</h2>;
  if (error)
    return <h2 style={{ textAlign: "center", color: "red" }}>Error...!</h2>;
  const returnedData = _.map(reqData, (item: any) => {
    const id = item.id ?? item._id;
    return (
      <Card
        key={id}
        slug={slug[0]}
        data={item}
        bgcolorSelector={bgcolorSelector()}
      />
    );
  });

  return <div className="container-overflowY">{returnedData}</div>;

  return <p>hello</p>;
};

export default Search;
