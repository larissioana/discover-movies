import Link from "next/link";
import Image from "next/image";
import { imageUrl } from "@/utils/fetchAPI";
import StarIcon from '../../assets/star.png';
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
                    const vote = Math.floor(vote_average).toFixed(1);
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
                                                priority
                                                alt={name}
                                                className={styles.posterImage}
                                            />
                                        </Link>
                                    }
                                    {
                                        poster_path &&
                                        <>
                                            <div className={styles.voteContainer}>
                                                <Image src={StarIcon} width={20} height={20} alt={"star icon"} />
                                                <p className={styles.vote}>{vote}</p>
                                            </div>
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
                                            <div className={styles.voteContainer}>
                                                <Image src={StarIcon} width={20} height={20} alt={"star icon"} />
                                                <p className={styles.vote}>{vote}</p>
                                            </div>
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
