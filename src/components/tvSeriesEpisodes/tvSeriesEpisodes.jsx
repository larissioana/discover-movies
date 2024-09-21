import Image from "next/image";
import Head from "next/head";
import { IMAGE_URL_342 } from "@/utils/fetchAPI";
import styles from './tvSeriesEpisodes.module.css';
import NoImage from '../../assets/no-image.webp';

const TvSeriesEpisodes = ({ episode }) => {
    const {
        episode_number,
        name,
        overview,
        still_path,
    } = episode;

    return (
        <>
            <Head>
                <title>{name}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Episodes description of the tv series season."></meta>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <div className={styles.imageContainer}>
                        {
                            still_path ?
                                <Image src={`${IMAGE_URL_342}${still_path}`}
                                    width={322}
                                    height={152}
                                    loading="lazy"
                                    quality={75}
                                    alt={name}
                                    className={styles.episodeImage}
                                />
                                :
                                <Image src={NoImage}
                                    width={342}
                                    height={152}
                                    quality={75}
                                    loading="lazy"
                                    alt={name}
                                    className={styles.episodeImage}
                                />
                        }
                    </div>
                </div>
                <div className={styles.right}>
                    {name &&
                        <h3 className={styles.title}>{name}</h3>
                    }
                    {episode_number &&
                        <h5 className={styles.episodeNr}><b>Episode number:</b> {episode_number}</h5>
                    }
                    {overview &&
                        <p className={styles.overview}><b>Overview: </b>{overview}</p>
                    }
                </div>
            </div>
        </>
    )
};

export default TvSeriesEpisodes;