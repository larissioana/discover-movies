import TvSeriesEpisodes from "@/components/tvSeriesEpisodes/tvSeriesEpisodes";
import { fetchTvSeasons } from "@/utils/fetchAPI";
import { useRouter } from "next/router";
import Navigation from "@/components/navigation/navigation";

export async function getServerSideProps(context) {
    const tvSeriesId = context.query.season?.[0] || null;
    const seasonNumber = context.query.season?.[1] || null;
    const seasonDetails = await fetchTvSeasons(tvSeriesId, seasonNumber);

    return {
        props:
        {
            seasonDetails,
            tvSeriesId,
            seasonNumber
        }
    }
}
const Season = ({ seasonDetails }) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <>
            <Navigation />
            <div style={{
                padding: "2rem"
            }}>
                <h3 style={{
                    cursor: "pointer",
                    paddingBottom: "3rem"
                }} onClick={handleGoBack}>Go back</h3>
                {seasonDetails.episodes?.map((episode) => {
                    return <TvSeriesEpisodes episode={episode} key={episode.id} />
                })}
            </div>
        </>
    )
};

export default Season;