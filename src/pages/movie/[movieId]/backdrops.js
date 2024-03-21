import Head from "next/head";
import Header from "@/components/header/header";
import Navigation from "@/components/navigation/navigation";
import { fetchAPIId } from "@/utils/fetchAPI";
import BackdropsImages from "@/components/images/backdropsImages";
import styles from '../movieId.module.css';

const Backdrops = ({ data, images }) => {
    return (
        <>
            <Head>
                <title>Backdrops</title>
                <meta name="description" content="see more images"></meta>
            </Head>
            <Navigation />
            <Header data={data} />
            {images.backdrops.length > 0 &&
                <h3 className={styles.backdropsTitle}>Backdrops ({images.backdrops.length})</h3>
            }
            <div className={styles.flexContainer}>
                {
                    images.backdrops.map((backdrop) => {
                        return <BackdropsImages key={backdrop.id} backdrop={backdrop} />
                    })
                }
            </div>
        </>
    )
}

export default Backdrops;

export async function getServerSideProps(context) {
    const { movieId } = context.query;
    const data = await fetchAPIId("movie", movieId);
    const images = await fetchAPIId("movie", movieId, "images");
    return {
        props:
        {
            data,
            images
        }
    }
}
