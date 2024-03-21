import Image from "next/image";
import { IMAGE_URL_500, imageUrlBackdrop } from "@/utils/fetchAPI";
import styles from './postersImages.module.css';
import Info from "./info";

const PostersImages = ({ poster }) => {
    const {
        file_path,
        height,
        width,
        vote_average
    } = poster;

    const imageURL = `${imageUrlBackdrop}${file_path}`;
    return (
        <div className={styles.container}>
            {
                file_path &&
                <div className={styles.postersContainer}>
                    <a target="_blank" href={imageURL}>
                        <Image
                            className={styles.img}
                            loading="eager"
                            priority
                            src={`${IMAGE_URL_500}${file_path}`}
                            width={200}
                            height={280}
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
