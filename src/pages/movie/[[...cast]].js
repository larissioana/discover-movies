import React from 'react'
import Header from '@/components/header/header';
import { fetchAPIId } from '@/utils/fetchAPI';
import Navigation from '@/components/navigation/navigation';
import styles from '../../components/castAndCrew/castAndCrew.module.css';
import Head from 'next/head'
import Image from 'next/image';
import { imageUrlProfilesSmall } from '@/utils/fetchAPI';
import Link from 'next/link';
import ProfileImage from '../../assets/blankphoto.webp';
import userFemale from '../../assets/userAvatarFemale.png';
import userMale from '../../assets/userAvatarMale.png';

const CastAndCrew = ({ data, credits }) => {
    const areCastAndCrew = credits.cast.length > 0 || credits.crew.length > 0;
    return (
        <>
            <Head>
                <title>Cast & Crew</title>
                <meta name="description" content="See cast and crew for a specific movie"></meta>
            </Head>
            <Navigation />
            <Header data={data} />
            {
                areCastAndCrew ?
                    <div className={styles.container}>
                        <div className={styles.left}>
                            {
                                credits.cast.length > 0 &&
                                <h2 className={styles.title}>Cast {credits.cast.length}</h2>
                            }
                            {
                                credits.cast.map((credit) => {
                                    const { id, character, original_name, profile_path, gender } = credit;
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
                                                <h4 className={styles.character}>{character}</h4>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <div className={styles.right}>
                            {
                                credits.crew.length > 0 &&
                                <h2 className={styles.title}>Crew {credits.crew.length}</h2>
                            }
                            {
                                credits.crew.map((credit) => {
                                    const { id, job, original_name, profile_path, gender } = credit;
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
                                                <h4 className={styles.character}>{job}</h4>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    :
                    <p>No</p>
            }
        </>
    )
};

export default CastAndCrew;

export async function getServerSideProps(context) {
    const { cast } = context.query;
    const id = cast[0];
    const data = await fetchAPIId("movie", id);
    const credits = await fetchAPIId("movie", id, "credits");
    return {
        props:
        {
            data,
            credits
        }
    }
}
