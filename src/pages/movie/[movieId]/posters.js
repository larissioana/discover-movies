import React from 'react'
import Header from '@/components/header/header';
import { fetchAPIId } from '@/utils/fetchAPI';
import Navigation from '@/components/navigation/navigation';
import Head from 'next/head';
import PostersImages from '@/components/images/postersImages';
import styles from '../movieId.module.css';

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
            <div className={styles.flexContainer}>
                {
                    images.posters.map((poster) => {
                        return <PostersImages key={poster.id} poster={poster} />
                    })
                }
            </div>
        </>
    )
};

export default Posters;

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

