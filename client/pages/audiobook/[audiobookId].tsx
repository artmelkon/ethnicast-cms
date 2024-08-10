import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { UseAuth } from "../../context/Auth";
import SelectedAudiobook from "../../components/AudiobookList/Selected";

type Props = {
  audiobookId: string;
};

const FilterPods: React.FC<Props> = () => {
  const router = useRouter();
  const { audiobookId } = router.query;
  console.log("audiobook params: ", audiobookId);
  const { user } = UseAuth();
  console.log("audiobook ID user: ", user);

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, [user]);

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
