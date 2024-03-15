import Head from "next/head";
import Navigation from "@/components/navigation/navigation";
import { fetchAPITrending, fetchMovies } from "@/utils/fetchAPI";
import Movies from "@/components/movies/movies";
import { useState } from "react";
import SelectGenres from "@/components/select/selectGenres";
import { optionsMovie, optionsSeries } from "@/utils/helpers";
import { useMovieContext } from "@/context/moviesContext";

export default function Home({ data, dataTvSeries, dataTrendingDay, dataTrendingWeek }) {
  const [showTrending, setShowTrending] = useState(true);
  const { activeContentType, updateActiveContentType } = useMovieContext();

  return (
    <>
      <Head>
        <title>Discover Movies</title>
        <meta name="description" content="Discover Movies and Tv Series" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <SelectGenres options={activeContentType === "movies" ? optionsMovie : optionsSeries} />
      <h3 className="title">Featured today</h3>
      {
        activeContentType !== null &&
        <div className='container'>
          <h3
            onClick={() => updateActiveContentType("movies")}
            style={{
              borderBottom: activeContentType === "movies" ? "2px solid rgb(187, 167, 16)" : "none",
              cursor: "pointer"
            }}
          >
            Movies
          </h3>
          <h3
            style={{
              borderBottom: activeContentType === "tv series" ? "2px solid rgb(187, 167, 16)" : "none",
              cursor: "pointer"
            }}
            onClick={() => updateActiveContentType("tv series")}
          >
            Tv Series
          </h3>
        </div>
      }
      {
        activeContentType === "movies" ?
          <Movies movies={data} />
          :
          <Movies movies={dataTvSeries} />
      }
      <div className="flex-container">
        <h3 className="title">Trending</h3>
        <div className="btn-container">
          <button className="today" onClick={() => setShowTrending(true)}
            style={{
              backgroundColor: showTrending ? "rgb(120, 137, 128)" : "",
            }}
          >
            Today
          </button>
          <button className="week" onClick={() => setShowTrending(false)}
            style={{
              backgroundColor: !showTrending ? "rgb(120, 137, 128)" : "",
            }}
          >
            This week
          </button>
        </div>
      </div>
      {
        showTrending ?
          <Movies movies={dataTrendingDay} />
          :
          <Movies movies={dataTrendingWeek} />
      }
    </>
  );
}

export async function getServerSideProps() {
  const data = await fetchMovies("movie", "now_playing");
  const dataTvSeries = await fetchMovies("tv", "popular");
  const dataTrendingDay = await fetchAPITrending("tv", "day");
  const dataTrendingWeek = await fetchAPITrending("tv", "week");

  return {
    props:
    {
      data,
      dataTvSeries,
      dataTrendingDay,
      dataTrendingWeek
    }
  }
}