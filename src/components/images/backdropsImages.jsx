import { imageUrlBackdrops, imageUrlBackdrop } from "@/utils/fetchAPI";
import Image from "next/image";
import styles from './postersImages.module.css';
import Info from "./info";
import NoImage from '../../assets/blur-image.jpg';
import { useState } from "react";

const BackdropsImages = ({ backdrop }) => {
    const [isLoading, setIsLoading] = useState(true);

    const {
        file_path,
        width,
        height,
        vote_average
    } = backdrop;
    const imageUrl = `${imageUrlBackdrop}${file_path}`;

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className={styles.container}>
            {
                file_path &&
                <div className={styles.backdropsContainer}>
                    <a target="_blank" href={imageUrl}>
                        <Image
                            className={styles.imgBackdrop}
                            loading="eager"
                            priority
                            src={`${imageUrlBackdrops}${file_path}`}
                            width={230}
                            height={120}
                            alt={"more images"}
                            onLoad={handleLoad}
                            quality={75}
                        />
                    </a>
                    {
                        isLoading &&
                        <Image
                            className={`${styles.imgBackdrop} ${styles.blur}`}
                            loading="eager"
                            priority
                            src={NoImage}
                            width={230}
                            quality={75}
                            height={120}
                            alt={"more images"}
                        />
                    }
                    <Info
                        width={width}
                        height={height}
                        vote_average={vote_average}
                    />
                </div>
            }
        </div>
    )
};

export default BackdropsImages;

