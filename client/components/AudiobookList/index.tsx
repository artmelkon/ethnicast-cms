import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import classes from "./index.module.scss";
import { Audiobook } from "payload/generated-types";
interface AudoBookProps {
  data: Audiobook[];
}

const AudiobookList = ({ data }: { data: any }) => {

  const { data: session, status } = useSession();
  const podcast = data.map(
    ({
      id,
      title,
      publisher_data,
    }: {
      id: string;
      title: string;
      publisher_data: any;
    }) => {
      console.log("publisher data: ", publisher_data);
      return (
        <li key={id} className={classes.podcast__item}>
          <Link href={`/audiobook/${id}`} className={classes.card__item}>
            <figure className={classes.podcast__figure}>
              <Image
                width={300}
                height={200}
                src={publisher_data.bookCover.url}
                alt={publisher_data.bookCover.alt}
                className={classes.podcast__img}
              />
              <figcaption className={classes.podcast__title}>
                {title}
              </figcaption>
            </figure>
          </Link>
        </li>
      );
    }
  );

  return (
    <div className={classes.podcast}>
      <h2 className={classes.podcast__heading}>Audiobooks</h2>
      <ul className={classes.podcast__list}>{data && podcast}</ul>
    </div>
  );
};

export default AudiobookList;
