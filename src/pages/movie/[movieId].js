import Navigation from '@/components/navigation/navigation';
import { fetchAPIId, imageUrl } from '@/utils/fetchAPI';
import React from 'react'
import Details from '@/components/details/details';
import Head from 'next/head';

const MovieDetails = ({ data, images, videos, recommendations, credits }) => {
    const {
        genres,
        original_title,
        overview,
        release_date,
        vote_average,
        status,
        production_countries,
        runtime,
        poster_path,
        production_companies,
        budget,
        homepage,
        revenue,
        tagline,
        original_language,
        imdb_id
    }
        = data;

    const year = release_date.split("-")[0];
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const imageURL = `${imageUrl}${poster_path}`;
    return (
        <>
            <Head>
                <title>{original_title}</title>
                <meta name="description" content="Read about your favorite movie."></meta>
            </Head>
            <Navigation />
            <Details
                firstTitle={"Movies"}
                image={imageURL}
                vote={vote_average}
                date={year}
                releaseDate={release_date}
                hours={hours}
                minutes={minutes}
                genres={genres}
                title={original_title}
                overview={overview}
                status={status}
                productionCountries={production_countries}
                productionCompanies={production_companies}
                posterPath={poster_path}
                budget={budget}
                homepage={homepage}
                tagline={tagline}
                language={original_language}
                revenue={revenue}
                images={images}
                videos={videos}
                imdb={imdb_id}
                recommendations={recommendations}
                credits={credits}
            />
        </>
    )
};

export default MovieDetails;

export async function getServerSideProps(context) {
    const { movieId } = context.query;
    const data = await fetchAPIId("movie", movieId);
    const images = await fetchAPIId("movie", movieId, "images");
    const videos = await fetchAPIId("movie", movieId, "videos");
    const recommendations = await fetchAPIId("movie", movieId, "recommendations");
    const credits = await fetchAPIId("movie", movieId, "credits");
    return {
        props:
        {
            data,
            images,
            videos,
            recommendations,
            credits
        }
    }
}