import Image from "next/image";
import { IMAGE_URL_342, imageUrlBackdrop } from "@/utils/fetchAPI";
import styles from './postersImages.module.css';
import Info from "./info";

const PostersImages = ({ poster }) => {
    const {
        file_path,
        height,
        width,
        vote_average
    } = poster;

    const imageUrl = `${imageUrlBackdrop}${file_path}`;
    return (
        <div className={styles.container}>
            {
                file_path &&
                <div className={styles.postersContainer}>
                    <a target="_blank" href={imageUrl}>
                        <Image
                            className={styles.img}
                            loading="eager"
                            priority
                            src={`${IMAGE_URL_342}${file_path}`}
                            width={200}
                            height={300}
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

export default PostersImages;
