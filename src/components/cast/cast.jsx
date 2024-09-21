import styles from './cast.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { imageUrlProfilesSmall } from '@/utils/fetchAPI';
import { shortenTitle } from '@/utils/helpers';
import NoImage from '../../assets/blankphoto.webp';
import { useRef, useEffect } from 'react';
import FemaleUserAvatar from '../../assets/userAvatarFemale.png';
import MaleUserAvatar from '../../assets/userAvatarMale.png';

const Cast = ({ credits }) => {
    const refContainer = useRef(null);

    useEffect(() => {
        if (refContainer.current) {
            refContainer.current.scrollLeft = 0;
        }
    }, [credits.cast])

    return (
        <div className={styles.container}>
            {
                credits.cast.length > 0 &&
                <h2 className={styles.title}>Top Cast</h2>
            }
            <div className={styles.flexContainer} ref={refContainer}>
                {
                    credits?.cast?.map((credit) => {
                        const { id, character, name, profile_path, gender } = credit;
                        const shortenedCharacter = shortenTitle(character, 15);
                        return <div key={id}>
                            {
                                profile_path ?
                                    <Link href={`/publicPerson/${id}`}>
                                        <Image
                                            src={`${imageUrlProfilesSmall}${profile_path}`}
                                            width={150}
                                            height={220}
                                            alt={name}
                                            className={styles.img}
                                            loading="eager"
                                            priority
                                            quality={100}
                                        />
                                    </Link>
                                    :
                                    <>
                                        {gender > 0 ?
                                            <Link href={`/publicPerson/${id}`}>
                                                <Image
                                                    src={gender === 1 ? FemaleUserAvatar : MaleUserAvatar}
                                                    width={150}
                                                    height={220}
                                                    alt={name}
                                                    quality={100}
                                                    className={styles.img}
                                                    loading="eager"
                                                    priority
                                                />
                                            </Link>
                                            :
                                            <Link href={`/publicPerson/${id}`}>
                                                <Image
                                                    src={NoImage}
                                                    width={150}
                                                    height={220}
                                                    alt={name}
                                                    quality={100}
                                                    className={styles.img}
                                                    loading="eager"
                                                    priority
                                                />
                                            </Link>
                                        }
                                    </>
                            }
                            <h3 className={styles.name}>{name}</h3>
                            <h4 className={styles.character}>{character !== "" ? `as ${shortenedCharacter}` : ""}</h4>
                        </div>
                    }).slice(0, 5)
                }
            </div>
        </div>
    )
};

export default Cast;
