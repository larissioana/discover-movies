import styles from './recommendations.module.css';
import { imageUrl } from '@/utils/fetchAPI';
import Image from 'next/image';

import { shortenTitle } from '@/utils/helpers';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import NoImage from '../../assets/no-image.webp';
import Vote from '../vote/vote';

const Recommendations = ({ recommendations, title, combinedCredits }) => {
    const containerRef = useRef(null);

    useEffect(() => {

        if (containerRef.current) {
            containerRef.current.scrollLeft = 0;
        }
    }, [recommendations, combinedCredits]);

    const showTitle = combinedCredits?.cast?.length > 0 || recommendations?.results?.length > 0;
    return (
        <div className={styles.container}>
            {
                (showTitle) &&
                <h2 className={styles.title}>{title}</h2>
            }
            {
                recommendations ?

                    <div className={styles.flexContainer} ref={containerRef}>
                        {
                            recommendations?.results?.map((recommendation) => {
                                const { id, poster_path, title, name, vote_average } = recommendation;
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
                                            <Vote vote={vote_average} />
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
                                const { id, poster_path, title, name, vote_average, character, media_type } = cast;
                                const titleShortened = shortenTitle(title || name, 20);
                                const href = media_type === "movie" ? `/movie/${id}` : `/tvSeries/${id}`;
                                return (
                                    <div key={index} className={styles.recommendation}>
                                        {
                                            poster_path ?
                                                <Link href={href}>
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
                                                <Link href={href}>
                                                    <Image
                                                        src={NoImage}
                                                        width={180}
                                                        height={250}
                                                        alt={title || name}
                                                        loading="eager"
                                                        priority
                                                        className={styles.img}
                                                    />
                                                </Link>
                                        }
                                        <Vote vote={vote_average} />
                                        <h3 className={styles.titleMovie}>{titleShortened}</h3>
                                        {
                                            character &&
                                            <p className={styles.character}>as {character}</p>
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
