import Image from "next/image";
import { IMAGE_URL_342 } from "@/utils/fetchAPI";
import styles from './header.module.css';
import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ data }) => {
    const router = useRouter();
    const {
        original_title,
        poster_path,
        release_date,
        original_name,
        first_air_date
    } = data;
    const year = release_date?.split("-")[0] || first_air_date.split("-")[0];

    const handleGoBack = () => {
        router.back();
    };
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image
                    src={`${IMAGE_URL_342}${poster_path}`}
                    width={80}
                    height={120}
                    alt={original_title || original_name}
                    loading="eager"
                    priority
                    className={styles.img}
                />
            </div>
            <div className={styles.right}>
                <h3 className={styles.title}>{original_title} || {original_name} ({year})</h3>
                <p className={styles.goBack} onClick={handleGoBack}>Back to main</p>
            </div>
        </div>
    )
};

export default Header;
