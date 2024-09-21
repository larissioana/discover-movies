import { useState, useEffect, useRef } from 'react'
import styles from './media.module.css';
import Image from 'next/image';
import { imageUrl, imageUrlBackdrops } from '@/utils/fetchAPI';
import Videos from '../videos/videos';
import NoImage from '../../assets/blur-image.jpg';

const Media = ({ images, videos }) => {
    const [showMedia, setShowMedia] = useState("Posters");
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollLeft = 0
        }
    }, [images, videos]);

    const handleClickMedia = (media) => {
        setShowMedia(media);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    const isMedia = images.posters.length > 0 || images.backdrops.length > 0 || videos.results.length > 0;
    return (
        <>
            <div className={styles.container}>
                {
                    isMedia &&
                    <h2 className={styles.title}>Media</h2>
                }
                <div className={styles.flexContainer}>
                    {
                        images.posters.length > 0 &&
                        <h3 onClick={() => handleClickMedia("Posters")}
                            style={{
                                borderBottom: showMedia === "Posters" ? "2px solid rgb(236, 187, 40)" : "none",
                                cursor: "pointer"
                            }}
                        >
                            Posters
                        </h3>
                    }
                    {
                        images.backdrops.length > 0 &&
                        <h3 onClick={() => handleClickMedia("Backdrops")}
                            style={{
                                borderBottom: showMedia === "Backdrops" ? "2px solid rgb(236, 187, 40)" : "none",
                                cursor: "pointer"
                            }}
                        >
                            Backdrops
                        </h3>
                    }
                    {
                        videos?.results?.length > 0 &&
                        <h3 onClick={() => handleClickMedia("Videos")}
                            style={{
                                borderBottom: showMedia === "Videos" ? "2px solid rgb(236, 187, 40)" : "none",
                                cursor: "pointer"
                            }}
                        >
                            Videos
                        </h3>
                    }
                </div>
                {
                    showMedia === 'Posters' &&
                    <div className={styles.posters} ref={containerRef}>
                        {
                            images.posters.map((poster, index) => {
                                const { file_path } = poster;
                                return <div key={index} className={styles.imageContainer}>

                                    {file_path &&
                                        <Image
                                            src={`${imageUrl}${file_path}`}
                                            width={250}
                                            height={350}
                                            quality={75}
                                            loading='lazy'
                                            className={styles.poster}
                                            onLoad={handleLoad}
                                            alt="images of the specific movie"
                                        />
                                    }
                                    {
                                        isLoading &&
                                        <Image
                                            src={NoImage}
                                            width={250}
                                            height={350}
                                            quality={75}
                                            loading='lazy'
                                            className={styles.blur}
                                            alt="images of the specific movie"
                                        />
                                    }
                                </div>
                            }).slice(0, 9)
                        }
                    </div>
                }
                {
                    showMedia === "Backdrops" &&
                    <div className={styles.posters} ref={containerRef}>
                        {
                            images.backdrops.map((backdrop, index) => {
                                const { file_path } = backdrop;
                                return <div key={index} className={styles.imageContainer}>
                                    {file_path &&
                                        <Image
                                            src={`${imageUrlBackdrops}${file_path}`}
                                            width={230}
                                            height={130}
                                            loading='lazy'
                                            quality={75}
                                            className={styles.backdrop}
                                            alt="images of the specific movie"
                                        />
                                    }
                                    {
                                        isLoading &&
                                        <Image
                                            src={NoImage}
                                            width={230}
                                            height={130}
                                            loading='eager'
                                            quality={75}
                                            priority
                                            className={styles.blur}
                                            alt="images of the specific movie"
                                        />
                                    }
                                </div>
                            }).slice(0, 9)
                        }
                    </div>
                }
                {
                    showMedia === "Videos" &&
                    <Videos videos={videos} isLoading={isLoading} containerRef={containerRef} />
                }
            </div>
        </>
    )
};

export default Media;
