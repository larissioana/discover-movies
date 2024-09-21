import { imageUrlBackdrops, imageUrlBackdrop } from "@/utils/fetchAPI";
import Image from "next/image";
import styles from './postersImages.module.css';
import Info from "./info";

const BackdropsImages = ({ backdrop }) => {
    const {
        file_path,
        width,
        height,
        vote_average
    } = backdrop;
    const imageUrl = `${imageUrlBackdrop}${file_path}`;

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
                            quality={75}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </a>
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

