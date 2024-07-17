import { useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import useSWR from "swr";

import Card from "../../components/UI/Card";

const Search: React.FC = () => {
  const [reqData, setReqData] = useState(null);
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
    if (slug[1] === "q") {
      queryString = `/api/podcasts/search?q=${slug[2]}`;
    }
    if (
      (slug[0] === "podcast" && slug[1] === "genres") ||
      slug[1] === "languages"
    ) {
      queryString = `/api/podcasts?where[${slug[1]}][contains]=${slug[2]}`;
    } else {
      queryString = `/api/audiobooks?where[${slug[1]}][contains]=${slug[2]}`;
    }
  }
  const { data, isLoading, error } = useSWR(
    `${process.env.CMS_URI}${queryString}`,
    fetcher
  );
  useEffect(() => {
    if (data) return setReqData(data);
  }, [data]);

  console.log("[[...slug] data: ", data);
  if (reqData) {
    var returnedData = _.map(reqData.docs, (item) => {
      return (
        <Card
          key={item.id}
          slug={slug[0]}
          data={item}
          bgcolorSelector={bgcolorSelector()}
        />
      );
    });
  }

  return <div className="container-overflowY">{returnedData}</div>;
};

export default Search;
