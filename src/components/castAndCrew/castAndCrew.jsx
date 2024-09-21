import styles from './castAndCrew.module.css';
import Link from 'next/link';
import Image from 'next/image';
import userFemale from '../../assets/userAvatarFemale.png';
import userMale from '../../assets/userAvatarMale.png';
import ProfileImage from '../../assets/blankphoto.webp';
import { imageUrlProfilesSmall } from '@/utils/fetchAPI';

const CastAndCrewDetails = ({ credits }) => {
    const areCastAndCrew = credits.cast.length > 0 || credits.crew.length > 0;

    const sortedCast = credits.cast.sort((a, b) => {
        const nameA = a.original_name.toUpperCase();
        const nameB = b.original_name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }

        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return (
        <>
            {areCastAndCrew ?
                <div className={styles.container}>
                    <div className={styles.left}>
                        {
                            credits.cast.length > 0 &&
                            <h2 className={styles.title}> Series Cast {credits.cast.length}</h2>
                        }
                        {
                            sortedCast.map((credit) => {
                                const { id, original_name, profile_path, gender, roles } = credit;
                                let imageSrc;
                                if (gender === 0) {
                                    imageSrc = ProfileImage;
                                } else if (gender === 1) {
                                    imageSrc = userFemale
                                } else {
                                    imageSrc = userMale
                                }
                                return <div key={id}>
                                    <div className={styles.flexContainer}>
                                        <div className={styles.leftContainer}>
                                            {
                                                profile_path ?

                                                    <Link href={`/publicPerson/${id}`}>
                                                        <Image
                                                            src={`${imageUrlProfilesSmall}${profile_path}`}
                                                            width={100}
                                                            height={130}
                                                            loading="eager"
                                                            quality={75}
                                                            priority
                                                            className={styles.img}
                                                            alt={original_name}
                                                        />
                                                    </Link>
                                                    :
                                                    <Link href={`/publicPerson/${id}`}>
                                                        <Image
                                                            src={imageSrc}
                                                            width={100}
                                                            height={130}
                                                            loading="eager"
                                                            priority
                                                            quality={75}
                                                            className={styles.img}
                                                            alt={original_name}
                                                        />
                                                    </Link>
                                            }
                                        </div>
                                        <div className={styles.rightContainer}>
                                            <h3 className={styles.originalName}>{original_name}</h3>
                                            {
                                                roles.map((role, index) => {
                                                    const { character, episode_count } = role;
                                                    return <h4 key={index} className={styles.character}> {character} ({episode_count} {episode_count > 1 ? "Episodes" : "Episode"})</h4>
                                                }).slice(0, 1)
                                            }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className={styles.right}>
                        {
                            credits.crew.length > 0 &&
                            <h2 className={styles.title}> Series Crew {credits.crew.length}</h2>
                        }
                        {
                            credits.crew.map((credit) => {
                                const { id, original_name, profile_path, gender, jobs } = credit;
                                let imageSrc;
                                if (gender === 0) {
                                    imageSrc = ProfileImage;
                                } else if (gender === 1) {
                                    imageSrc = userFemale
                                } else {
                                    imageSrc = userMale
                                }
                                return <div key={id}>
                                    <div className={styles.flexContainer}>
                                        <div className={styles.leftContainer}>
                                            {
                                                profile_path ?

                                                    <Link href={`/publicPerson/${id}`}>
                                                        <Image
                                                            src={`${imageUrlProfilesSmall}${profile_path}`}
                                                            width={100}
                                                            height={130}
                                                            loading="eager"
                                                            priority
                                                            className={styles.img}
                                                            alt={original_name}
                                                        />
                                                    </Link>
                                                    :
                                                    <Link href={`/publicPerson/${id}`}>
                                                        <Image
                                                            src={imageSrc}
                                                            width={100}
                                                            height={130}
                                                            loading="eager"
                                                            priority
                                                            className={styles.img}
                                                            alt={original_name}
                                                        />
                                                    </Link>
                                            }
                                        </div>
                                        <div className={styles.rightContainer}>
                                            <h3 className={styles.originalName}>{original_name}</h3>
                                            {
                                                jobs.map((item, index) => {
                                                    const { job, episode_count } = item;
                                                    return <h4 key={index} className={styles.character}>{job} ({episode_count} {episode_count > 1 ? "Episodes" : "Episode"})</h4>
                                                }).slice(0, 1)
                                            }
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
                :
                <p className={styles.noCast}>No cast and crew available &#128532;</p>
            }
        </>
    )
};

export default CastAndCrewDetails;
