import styles from './recommendations.module.css';
import { imageUrl } from '@/utils/fetchAPI';
import Image from 'next/image';
import Star from '../../assets/star.png';
import { shortenTitle } from '@/utils/helpers';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

const Recommendations = ({ recommendations, title, combinedCredits }) => {
    const containerRef = useRef(null);

    useEffect(() => {

        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    }, [recommendations, combinedCredits]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {
                recommendations ?

                    <div className={styles.flexContainer} ref={containerRef}>
                        {
                            recommendations?.results?.map((recommendation) => {
                                const { id, poster_path, title, name, vote_average } = recommendation;
                                const vote = parseFloat(vote_average).toFixed(1);
                                const titleShortened = shortenTitle(title || name, 20);
                                return (
                                    <div key={id} className={styles.recommendation}>
                                        {title && poster_path ?
                                            <Link href={`/movie/${id}`}>
                                                <Image
                                                    src={`${imageUrl}${poster_path}`}
                                                    width={180}
                                                    height={260}
                                                    alt={title || name}
                                                    loading="eager"
                                                    priority
                                                    className={styles.img}
                                                />
                                            </Link>
                                            :
                                            <>
                                                {poster_path &&
                                                    <Link href={`/tvSeries/${id}`}>
                                                        <Image
                                                            src={`${imageUrl}${poster_path}`}
                                                            width={180}
                                                            height={260}
                                                            alt={title || name}
                                                            loading="eager"
                                                            priority
                                                            className={styles.img}
                                                        />
                                                    </Link>
                                                }
                                            </>
                                        }
                                        {
                                            poster_path &&
                                            <div className={styles.voteContainer}>
                                                <Image src={Star} width={20} height={20} alt={"star icon"} />
                                                <p className={styles.vote}>{vote}</p>
                                            </div>
                                        }
                                        {
                                            poster_path &&
                                            <h3 className={styles.titleMovie}>{titleShortened}</h3>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className={styles.flexContainer} ref={containerRef}>
                        {
                            combinedCredits?.cast?.map((cast, index) => {
                                const { id, poster_path, title, name, vote_average, character } = cast;
                                const vote = parseFloat(vote_average).toFixed(1);
                                const titleShortened = shortenTitle(title || name, 20);
                                return (
                                    <div key={index} className={styles.recommendation}>
                                        {title && poster_path ?
                                            <Link href={`/movie/${id}`}>
                                                <Image
                                                    src={`${imageUrl}${poster_path}`}
                                                    width={180}
                                                    height={260}
                                                    alt={title || name}
                                                    loading="eager"
                                                    priority
                                                    className={styles.img}
                                                />
                                            </Link>
                                            :
                                            <>
                                                {
                                                    poster_path &&

                                                    <Link href={`/tvSeries/${id}`}>
                                                        <Image
                                                            src={`${imageUrl}${poster_path}`}
                                                            width={180}
                                                            height={250}
                                                            alt={title || name}
                                                            loading="eager"
                                                            priority
                                                            className={styles.img}
                                                        />
                                                    </Link>
                                                }
                                            </>
                                        }
                                        {
                                            poster_path &&
                                            <div className={styles.voteContainer}>
                                                <Image src={Star} width={20} height={20} alt={"star icon"} />
                                                <p className={styles.vote}>{vote}</p>
                                            </div>
                                        }
                                        {
                                            poster_path &&
                                            <>
                                                <h3 className={styles.titleMovie}>{titleShortened}</h3>
                                                <p className={styles.character}>as {character}</p>
                                            </>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
};

export default Recommendations;
