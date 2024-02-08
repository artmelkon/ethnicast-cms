import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface Input {
  feedUrl: string;
}

const PodcastSubmit: React.FC = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = async (data) => {
    const response = await fetch("/api/feedsubmit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (!response.ok)
        throw Error(response.statusText || "Something went wrong");
      const data = await response.json();
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="rssFeed">Eneer RSS Feed url</label>
          <input
            id="rssFeed"
            {...register("feedUrl", {
              required: {
                value: true,
                message: "RSS Feed url required!",
              },
            })}
          />
        </div>
        <p>{errors.feedUrl?.message}</p>
        <input type="submit" />
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default PodcastSubmit;
