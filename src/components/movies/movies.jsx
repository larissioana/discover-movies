import styles from "./movies.module.css";
import { imageUrl } from "@/utils/fetchAPI";
import Image from "next/image";
import Vote from "../vote/vote";
import { shortenTitle } from "@/utils/helpers";
import Link from "next/link";
import { useEffect, useRef } from 'react';

const Movies = ({ movies }) => {
  const refContainer = useRef(null);

  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.scrollLeft = 0;
    }
  }, [movies]);

  return (
    <div>
      <div className={styles.container} ref={refContainer}>
        {movies.results.map((result) => {
          const { id, title, name, poster_path, vote_average } = result;
          const titleShortened = shortenTitle(title || name, 20);
          return (
            <div key={id} className={styles.slider}>
              {title ?
                <Link href={`/movie/${id}`}>
                  <Image
                    src={`${imageUrl}${poster_path}`}
                    width={200}
                    height={300}
                    quality={75}
                    alt={title || name}
                    loading="eager"
                    priority
                    className={styles.img}
                  />
                </Link>
                :
                <Link href={`/tvSeries/${id}`}>
                  <Image
                    src={`${imageUrl}${poster_path}`}
                    width={200}
                    height={300}
                    quality={75}
                    alt={title || name}
                    loading="eager"
                    priority
                    className={styles.img}
                  />
                </Link>
              }
              <Vote vote={vote_average} />
              <h3 className={styles.title}>{titleShortened}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movies;
