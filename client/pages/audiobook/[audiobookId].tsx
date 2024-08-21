import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { useAuth } from "../../context/Auth";
import SelectedAudiobook from "../../components/AudiobookList/Selected";
import { includes } from "lodash";

type Props = {
  audiobookId: string;
};

const FilterPods: React.FC<Props> = () => {
  const [audiobook, setAudiobook] = useState();
  const router = useRouter();
  const { audiobookId } = router.query;
  console.log("audiobook params: ", audiobookId);
  const { user, setUser } = useAuth();
  console.log("audiobook ID user: ", user);

  useEffect(() => {
    (async function () {
      const result = await fetch(`${process.env.CMS_URI}/api/users/me`, {
        credentials: "include",
      });
      console.log("audiobook result: ", result);
      const data = await result.json();
      if (!data.user) router.push("/auth");
      console.log("adudiobook valid user ", data);
      setUser(data);
    })();
  }, []);

  const fetcher = (url: string) =>
    fetch(url, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `${process.env.CMS_URI}/api/audiobooks/${audiobookId}`,
    fetcher
  );
  if (isLoading) return <h2>Loading...!</h2>;
  if (error) return <h2>Error: {error}</h2>;
  console.log("audiobook data: ", data);

  return <SelectedAudiobook data={data} />;
};

export default FilterPods;
