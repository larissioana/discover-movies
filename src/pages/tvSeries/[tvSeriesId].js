import Navigation from '@/components/navigation/navigation';
import { fetchAPIId, imageUrl } from '@/utils/fetchAPI';
import Details from '@/components/details/details';
import Head from 'next/head';

const TvSeriesDetails = ({ data, images, videos, recommendations, credits }) => {
    const {
        genres,
        poster_path,
        first_air_date,
        overview,
        production_companies,
        production_countries,
        original_name,
        status,
        vote_average,
        revenue,
        budget,
        tagline,
        homepage,
        episode_run_time,
        original_language,
        number_of_episodes,
        number_of_seasons,
        seasons

    } = data;

    const year = first_air_date.split("-")[0];
    const minutes = episode_run_time[0];
    const imageURL = imageUrl + poster_path;

    return (
        <>
            <Head>
                <title>{original_name}</title>
                <meta name="description" content="Read about your favorite tv series."></meta>
            </Head>
            <Navigation />
            <Details
                firstTitle={'Tv Series'}
                genres={genres}
                date={year}
                minutes={minutes}
                title={original_name}
                productionCountries={production_countries}
                productionCompanies={production_companies}
                overview={overview}
                status={status}
                image={imageURL}
                vote={vote_average}
                firstAirDate={first_air_date}
                posterPath={poster_path}
                revenue={revenue}
                budget={budget}
                tagline={tagline}
                homepage={homepage}
                language={original_language}
                images={images}
                videos={videos}
                recommendations={recommendations}
                credits={credits}
                seasonsNumber={number_of_seasons}
                episodesNumber={number_of_episodes}
                seasons={seasons}
            />
        </>
    )
};

export default TvSeriesDetails;

export async function getServerSideProps(context) {
    const { tvSeriesId } = context.query;
    const data = await fetchAPIId("tv", tvSeriesId);
    const images = await fetchAPIId("tv", tvSeriesId, "images");
    const videos = await fetchAPIId("tv", tvSeriesId, "videos");
    const recommendations = await fetchAPIId("tv", tvSeriesId, "recommendations");
    const credits = await fetchAPIId("tv", tvSeriesId, "credits");

    return {
        props:
        {
            data,
            images,
            videos,
            recommendations,
            credits,
        }
    }
}
