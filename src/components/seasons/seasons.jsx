import styles from './seasons.module.css';
import { imageUrl } from '@/utils/fetchAPI';
import Image from 'next/image';
import { formatDate } from '@/utils/helpers';
import NoImage from '../../assets/no-image.webp';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Seasons = ({ seasons }) => {
    const router = useRouter();
    const
        {
            air_date,
            episode_count,
            name,
            overview,
            poster_path,
            season_number,
        } = seasons;

    const formattedDate = formatDate(air_date);
    const tvSeriesId = router.query.tvSeriesId;

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.left}>
                    {
                        poster_path ?
                            <Image
                                src={`${imageUrl}${poster_path}`}
                                width={205}
                                alt={name}
                                height={220}
                                loading="lazy"
                                quality={75}
                                className={styles.img}
                            />
                            :
                            <Image
                                src={NoImage}
                                width={200}
                                alt={name}
                                height={200}
                                quality={75}
                                loading="lazy"
                                className={styles.img}
                            />
                    }
                </div>
                <div className={styles.right}>
                    <h3 className={styles.name}>{name}</h3>
                    <div className={styles.flexContainer}>
                        <p className={styles.date}>{formattedDate}. </p>
                        <p className={styles.episodes}>&nbsp; {episode_count} Episodes</p>
                    </div>
                    {
                        overview &&
                        <p className={styles.overview}>
                            <span className={styles.overviewSpan}>Overview: </span>
                            {overview}
                        </p>
                    }
                    <Link href={`/tvSeries/${tvSeriesId}/${season_number}`} className={styles.text}>See episodes</Link>
                </div>
            </div>
        </div>
    )
};

export default Seasons;