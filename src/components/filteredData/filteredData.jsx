import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/utils/fetchAPI";
import Vote from "../vote/vote";
import styles from './filteredData.module.css';
import { shortenTitle } from "@/utils/helpers";

const FilteredData = ({ data }) => {
    return (
        <div className={styles.container}>
            {
                data?.map((result) => {
                    const { contentType, id, name, poster_path, vote_average, title } = result;
                    const shortenedName = shortenTitle(name, 20);
                    const shortenedTitle = shortenTitle(title, 20);
                    return <div key={id} className={styles.paginationContainer}>
                        {
                            contentType === "tv" ?
                                <>
                                    {
                                        poster_path &&
                                        <Link href={`/tvSeries/${id}`}>
                                            <Image
                                                src={`${imageUrl}${poster_path}`}
                                                width={250}
                                                height={350}
                                                loading="eager"
                                                quality={75}
                                                priority
                                                alt={name}
                                                className={styles.posterImage}
                                            />
                                        </Link>
                                    }
                                    {
                                        poster_path &&
                                        <>
                                            <Vote vote={vote_average} />
                                            <h3 className={styles.title}>{shortenedName}</h3>
                                        </>
                                    }
                                </>
                                :
                                <>
                                    {poster_path &&
                                        <Link href={`/movie/${id}`}>
                                            <Image
                                                src={`${imageUrl}${poster_path}`}
                                                width={250}
                                                quality={75}
                                                height={350}
                                                loading="eager"
                                                alt={title}
                                                priority
                                                className={styles.posterImage}
                                            />
                                        </Link>
                                    }
                                    {
                                        poster_path &&
                                        <>
                                            <Vote vote={vote_average} />
                                            <h3 className={styles.title}>{shortenedTitle}</h3>
                                        </>
                                    }
                                </>
                        }
                    </div>
                })
            }
        </div>
    )
};

export default FilteredData;
