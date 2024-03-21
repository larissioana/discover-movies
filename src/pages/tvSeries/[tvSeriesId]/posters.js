import React from 'react'
import Header from '@/components/header/header';
import { fetchAPIId } from '@/utils/fetchAPI';
import Navigation from '@/components/navigation/navigation';
import Head from 'next/head';
import PostersImages from '@/components/images/postersImages';
import styles from '../../../pages/movie/movieId.module.css';
import Loading from '@/components/loading/loading';

const Posters = ({ data, images }) => {
    return (
        <>
            <Head>
                <title>Posters</title>
                <meta name="description" content="see more images"></meta>
            </Head>
            <Navigation />
            <Header data={data} />
            {
                images.posters.length > 0 &&
                <h3 className={styles.postersTitle}>Posters ({images.posters.length})</h3>
            }
            {
                images.posters ?
                    <div className={styles.flexContainer}>
                        {
                            images.posters.map((poster) => {
                                return <PostersImages key={poster.id} poster={poster} />
                            })
                        }
                    </div>
                    :
                    <Loading />
            }
        </>
    )
};

export default Posters;

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

