import Image from 'next/image';
import styles from "./banner.module.css";
import NoImage from '../../assets/no-image.webp';
import { imageUrlBackdrop } from '@/utils/fetchAPI';
import Link from 'next/link';
import { useMovieContext } from '@/context/moviesContext';

const Banner = ({ imageUrl, name, id }) => {
    const { activeContentType } = useMovieContext();

    return (
        <div className={styles.container}>
            {
                imageUrl ?
                    <>
                        {activeContentType === "movies" ?
                            <>

                                <Image
                                    src={`${imageUrlBackdrop}${imageUrl}`}
                                    loading='eager'
                                    fill
                                    priority
                                    className={styles.img}
                                    alt={name}
                                />

                                <Link href={`/movie/${id}`}>
                                    <div className={styles.onTopBanner}></div>
                                </Link>
                            </>
                            :
                            <>
                                <Image
                                    src={`${imageUrlBackdrop}${imageUrl}`}
                                    loading='eager'
                                    fill
                                    priority
                                    className={styles.img}
                                    alt={name}
                                />
                                <Link href={`/tvSeries/${id}`}>
                                    <div className={styles.onTopBanner}></div>
                                </Link>
                            </>
                        }
                    </>
                    :
                    <Image
                        src={NoImage}
                        loading='eager'
                        fill
                        priority
                        className={styles.img}
                        alt={name}
                    />
            }
        </div>
    )
};

export default Banner;
