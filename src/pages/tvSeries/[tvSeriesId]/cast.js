import Head from 'next/head';
import Navigation from '@/components/navigation/navigation';
import React from 'react'
import Header from '@/components/header/header';
import { fetchAPIId } from '@/utils/fetchAPI';
import CastAndCrewDetails from '@/components/castAndCrew/castAndCrew';

const CastAndCrew = ({ data, credits }) => {

    return (
        <>
            <Head>
                <title>Cast & Crew</title>
                <meta name="description" content="See cast and crew for a specific tv series"></meta>
            </Head>
            <Navigation />
            <Header data={data} />
            <CastAndCrewDetails credits={credits} />
        </>
    )
};

export default CastAndCrew;

export async function getServerSideProps(context) {
    const { tvSeriesId } = context.query;
    const data = await fetchAPIId('tv', tvSeriesId);
    const credits = await fetchAPIId("tv", tvSeriesId, "aggregate_credits");

    return {
        props:
        {
            data,
            credits
        }
    }
}

