import Image from "next/image";
import { imageUrlBackdrop } from "@/utils/fetchAPI";
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
    const imageUrl = 'http://image.tmdb.org/t/p/w300/'

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
                            src={`${imageUrl}${file_path}`}
                            placeholder="blur"
                            blurDataURL={`${imageUrl}${file_path}`}
                            width={200}
                            height={280}
                            quality={75}
                            alt={"more images"}
                        />
                    </a>
                    {/*  {
                        isLoading &&
                        <Image
                            className={`${styles.img} #styles.blur}`}
                            loading="eager"
                            priority
                            src={NoImage}
                            width={200}
                            height={280}
                            quality={75}
                            alt={"more images"}
                        />
                    } */}
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
