import TvSeriesEpisodes from "@/components/tvSeriesEpisodes/tvSeriesEpisodes";
import { fetchTvSeasons } from "@/utils/fetchAPI";

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

    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "flexStart",
                alignItems: "flexStart",
                flexDirection: "column",
                padding: "1rem 2rem"
            }}>
                {seasonDetails.episodes?.map((episode) => {
                    return <TvSeriesEpisodes episode={episode} key={episode.id} />
                })}
            </div>
        </>
    )
};

export default Season;