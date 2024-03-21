import React from 'react'
import Header from '@/components/header/header';
import { fetchAPIId } from '@/utils/fetchAPI';
import Navigation from '@/components/navigation/navigation';
import Head from 'next/head';
import styles from '../../../pages/movie/movieId.module.css';
import BackdropsImages from '@/components/images/backdropsImages';
import Loading from '@/components/loading/loading';

const Backdrops = ({ data, images }) => {
    return (
        <>
            <Head>
                <title>Backdrops</title>
                <meta name="description" content="see more images"></meta>
            </Head>
            <Navigation />
            <Header data={data} />
            {
                images.backdrops.length > 0 &&
                <h3 className={styles.postersTitle}>Posters ({images.backdrops.length})</h3>
            }
            {
                images.backdrops ?
                    <div className={styles.flexContainer}>
                        {
                            images.backdrops.map((backdrop) => {
                                return <BackdropsImages key={backdrop.id} backdrop={backdrop} />
                            })
                        }
                    </div>
                    :
                    <Loading />
            }
        </>
    )
};

export default Backdrops;

export async function getServerSideProps(context) {
    const { tvSeriesId } = context.query;
    const data = await fetchAPIId("tv", tvSeriesId);
    const images = await fetchAPIId("tv", tvSeriesId, "images");
    return {
        props:
        {
            data,
            images
        }
    }
}

