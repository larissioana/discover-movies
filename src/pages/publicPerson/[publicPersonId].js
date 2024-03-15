import Navigation from '@/components/navigation/navigation';
import { fetchAPIId, imageUrl, imageUrlProfiles } from '@/utils/fetchAPI';
import Image from 'next/image';
import Head from 'next/head';
import styles from './publicPerson.module.css';
import { useRef, useEffect, useState } from 'react';
import CloseIcon from '../../assets/close.png';
import WebIcon from '../../assets/web.png';
import InstagramIcon from '../../assets/instagram.png';
import TwitterIcon from '../../assets/twitter.png';
import FacebookIcon from '../../assets/facebook.png';
import Recommendations from '@/components/recommendations/recommendations';
import NoImage from '../../assets/blankphoto.webp';

const PublicPersonDetail = ({ data, images, externalIds, combinedCredits }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [showFullBiography, setShowFullBiography] = useState(false);

    const {
        biography,
        birthday,
        gender,
        known_for_department,
        name,
        place_of_birth,
        profile_path,
        homepage
    } = data;

    const {
        instagram_id,
        twitter_id,
        facebook_id
    } = externalIds;

    const refContainer = useRef(null);

    const image = imageUrl + profile_path;
    const date = new Date(birthday);
    const instagramLink = `https://www.instagram.com/${instagram_id}`;
    const twitterLink = `https://www.twitter.com/${twitter_id}`;
    const facebookLink = `https://www.facebook.com/${facebook_id}`;

    const formattedDate = date.toLocaleString('en-US', {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const birthdate = new Date(birthday);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthdate.getFullYear();

    const hasBirthdayPassed = (
        currentDate.getMonth() > birthdate.getMonth() ||
        (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() >= birthdate.getDate())
    );

    if (!hasBirthdayPassed) {
        age--;
    }

    useEffect(() => {
        if (refContainer.current) {
            refContainer.current.scrollLeft = 0;
        }
    }, [images.profiles]);

    return (
        <>
            <Head>
                <title>{name}</title>
                <meta name="description" content="Read more about your favorite public person"></meta>
            </Head>
            <Navigation />
            <div className={styles.movieContainer}>
                <h5 className={styles.movieTitle}>Public Person</h5>
                <div className={styles.flexContainer2}>
                    <h1 className={styles.title}>{name}</h1>
                    <p className={styles.text}>Age: {age} years</p>
                </div>
            </div>
            <div className={styles.personDetails}>
                <div className={styles.left}>
                    {
                        profile_path ?
                            <Image src={image} priority className={styles.image} loading="eager" alt={"public person biography"} width={300} height={450} />
                            :
                            <Image src={NoImage} priority className={styles.image} loading="eager" alt={"public person biography"} width={300} height={450} />
                    }
                </div>
                <div className={styles.right}>
                    <p className={styles.text}>Gender: <span className={styles.lightText}>{gender === 2 ? "Male" : "Female"}</span></p>
                    {
                        birthday &&
                        <p className={styles.text}>
                            Birthday:
                            <span className={styles.lightText}> {formattedDate}</span>
                        </p>
                    }
                    {
                        place_of_birth &&
                        <p className={styles.text}>Place of birth: <span className={styles.lightText}>{place_of_birth}</span></p>
                    }
                    {
                        known_for_department &&
                        <p className={styles.text}>Known for:
                            <span className={styles.lightText}> {known_for_department}</span>
                        </p>
                    }
                    {
                        biography &&
                        <p className={styles.text}> Biography:&nbsp;
                            <span className={styles.lightText}>
                                {showFullBiography ? biography : `${biography.substring(0, 200)}...`}
                            </span>
                            {biography.length > 200 && (
                                <button onClick={() => setShowFullBiography(!showFullBiography)} className={styles.readMoreBtn}>
                                    {!showFullBiography ? 'Read more' : 'Read less'}
                                </button>
                            )}
                        </p>
                    }
                    {
                        homepage &&
                        <p className={styles.text}>Homepage:
                            <a href={homepage} target="_blank">
                                <Image className={styles.webIcon} src={WebIcon} width={24} height={24} alt={"web icon"} />
                            </a>
                        </p>
                    }

                    {instagram_id && twitter_id && facebook_id &&
                        <div className={styles.text}>Social Media:
                            {
                                instagram_id &&
                                <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                                    <Image src={InstagramIcon} width={24} height={24} alt={'Instagram icon'} className={styles.hrefIcon} />
                                </a>
                            }
                            {
                                twitter_id &&
                                <a href={twitterLink} target="_blank" rel="noopener noreferrer">
                                    <Image src={TwitterIcon} width={24} height={24} alt={'Twitter icon'} className={styles.hrefIcon} />
                                </a>
                            }
                            {
                                facebook_id &&
                                <a href={facebookLink} target="_blank" rel="noopener noreferrer">
                                    <Image src={FacebookIcon} width={24} height={24} alt={'Facebook icon'} className={styles.hrefIcon} />
                                </a>
                            }
                        </div>
                    }
                </div>
            </div>
            {
                images.profiles.length > 0 &&
                <h2 className={styles.media}>Media</h2>
            }
            <div className={styles.imagesContainer} ref={refContainer}>
                {
                    images.profiles.map((profile, index) => {
                        const { file_path } = profile;
                        return <div key={index} onClick={() => setSelectedImage(file_path)} className={styles.moreImages}>
                            {images.profiles.length > 0 && profile_path &&
                                <>
                                    <Image
                                        className={styles.images}
                                        loading="eager"
                                        priority
                                        src={`${imageUrl}${file_path}`}
                                        width={200}
                                        height={300}
                                        alt={"public person images"}
                                    />
                                    <div className={styles.expand}>
                                        <p className={styles.expandText}>Expand</p>
                                    </div>
                                </>
                            }
                        </div>
                    }).slice(0, 7)
                }
                {selectedImage && (
                    <div className={styles.overlay}>
                        <button onClick={() => setSelectedImage(null)} className={styles.closeBtn}>
                            <Image
                                src={CloseIcon}
                                width={30}
                                height={30}
                                alt={"close icon"}
                            />
                        </button>
                        <Image
                            className={styles.selectedImage}
                            loading="eager"
                            priority
                            width={450}
                            height={600}
                            src={`${imageUrlProfiles}${selectedImage}`}
                            alt={"public person images"}
                        />
                    </div>
                )}
            </div>
            <Recommendations combinedCredits={combinedCredits} title="Known for" />
        </>
    )
};

export default PublicPersonDetail;

export async function getServerSideProps(context) {
    const { publicPersonId } = context.query;
    const data = await fetchAPIId("person", publicPersonId);
    const images = await fetchAPIId("person", publicPersonId, "images");
    const externalIds = await fetchAPIId("person", publicPersonId, "external_ids");
    const combinedCredits = await fetchAPIId("person", publicPersonId, "combined_credits");
    return {
        props:
        {
            data,
            images,
            externalIds,
            combinedCredits
        }
    }
}
