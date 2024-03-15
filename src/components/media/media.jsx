import { useState, useEffect, useRef } from 'react'
import styles from './media.module.css';
import Image from 'next/image';
import { imageUrl, imageUrlBackdrops } from '@/utils/fetchAPI';
import Videos from '../videos/videos';

const Media = ({ images, videos }) => {
    const [showMedia, setShowMedia] = useState("Posters");
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);

    useEffect(() =>
    {
        if (images.posters || images.backdrops || videos.results)
        {
            setIsLoading(false);
    
        } else
        {
            setIsLoading(true);
        } 
    },[]);

    useEffect(() =>
    {
        if (containerRef.current)
        {
            containerRef.current.scrollLeft = 0
        }
    }, [images, videos]);

    const handleClickMedia = (media) =>
    {
        setShowMedia(media);
    };

  return (
    <>
    <div className={styles.container}>
        <h2 className={styles.title}>Media</h2>
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
                images.posters.map((poster, index) =>
                {
                    const {file_path} = poster;
                    return <div key={index}>
                        {
                            !isLoading ?
                            <>
                            {file_path &&
                                <Image
                                src={`${imageUrl}${file_path}`}
                                width={250}
                                height={350}
                                priority
                                loading='eager'
                                className={styles.poster}
                                alt="images of the specific movie"
                                />
                        }
                        </>
                        :
                            <div className={styles.loading}></div>
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
                images.backdrops.map((backdrop, index) =>
                {
                    const {file_path} = backdrop;
                    return <div key={index}>
                          {
                            !isLoading ?
                            <>
                            {file_path &&
                                <Image
                                src={`${imageUrlBackdrops}${file_path}`}
                                width={230}
                                height={130}
                                loading='eager'
                                priority
                                className={styles.backdrop}
                                alt="images of the specific movie"
                                />
                        }
                        </>
                        :
                            <div className={styles.loadingBackdrops}></div>
                        }
                    </div>
                }).slice(0, 9)
            }
        </div>
        }
        {
            showMedia === "Videos" && 
            <Videos videos={videos} isLoading={isLoading} containerRef={containerRef}/>
        }
    </div>
    </>
  )
};

export default Media;
