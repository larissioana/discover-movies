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
                            width={250}
                            height={150}
                            alt={"more images"}
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

