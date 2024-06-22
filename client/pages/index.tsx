import Link from "next/link";

const Page: React.FC = () => {
  return (
    <div className="card-wrapper">
      <Link href={"/podcast"}>
        <div className="card">
          <div
            className="card__body"
            style={{
              backgroundImage:
                "url(http://scorpio.local:4000/media/music-791631_640.jpg)",
            }}
          >
            <h5 className="card__title">podcasts</h5>
          </div>
        </div>
      </Link>
      <Link href={"/audiobook"}>
        <div className="card">
          <div
            className="card__body"
            style={{
              backgroundImage:
                "url(http://scorpio.local:4000/media/audiobook-6707573_640.jpg)",
            }}
          >
            <h5 className="card__title">audiobooks</h5>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Page;
