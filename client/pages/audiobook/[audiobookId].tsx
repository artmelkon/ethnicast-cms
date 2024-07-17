import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import SelectedAudiobook from "@component/AudiobookList/Selected";

type Props = {
  audiobook: any;
};

const FilterPods: React.FC<Props> = () => {
  const { data: session, status } = useSession();
  console.log("audobook session: ", session);
  const router = useRouter();
  const { audiobookId } = router.query;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading, error } = useSWR(
    `/api/audiobook/${audiobookId}`,
    fetcher
  );
  if (isLoading) return <h2>Loading...!</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!session) {
    console.log("rout the page: ", router);
    router.push("/auth");
    return;
  }
  return <SelectedAudiobook data={data} />;
};

export default FilterPods;
