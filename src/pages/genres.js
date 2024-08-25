"use strict"
import Navigation from "@/components/navigation/navigation";
import { useRouter } from "next/router";
import styles from './genres.module.css';
import { fetchAPIGenres } from "@/utils/fetchAPI";
import { useMovieContext } from "@/context/moviesContext";
import { useState, useEffect } from "react";
import Pagination from "@/components/pagination/pagination";
import FilteredData from "@/components/filteredData/filteredData";
import Link from "next/link";
import Banner from "@/components/banner/banner";
import Loading from "@/components/loading/loading";
import Head from "next/head";

const Genres = () => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { genre } = router.query;

    const { activeGenre, activeContentType, resetPage, setResetPage } = useMovieContext();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const storedPage = localStorage.getItem('newPage');
            const page = storedPage ? parseInt(storedPage) : 1;
            const activeGenreFromStorage = localStorage.getItem('activeGenre');
            const genreToUse = activeGenreFromStorage || activeGenre;

            const movieContent = await fetchAPIGenres('movie', page, genreToUse);
            const tvContent = await fetchAPIGenres('tv', page, genreToUse);

            const combinedResults = [
                ...movieContent.results.map(movie => ({ ...movie, contentType: 'movie' })),
                ...tvContent.results.map(tv => ({ ...tv, contentType: 'tv' }))
            ];

            const combinedContent = {
                page,
                total_pages: movieContent.total_pages + tvContent.total_pages,
                total_results: movieContent.total_results + tvContent.total_results,
                results: combinedResults,
            };

            setFilteredMovies(combinedContent);
            setIsLoading(false);
        } catch (error) {
            console.error('API error', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (resetPage) {
            localStorage.setItem('newPage', 1);
            fetchData();
            setResetPage(false);
        } else {
            fetchData();
        }
    }, [activeGenre, resetPage]);

    const handlePageChange = async (newPage) => {
        try {
            setIsLoading(true);
            const activeGenreFromStorage = localStorage.getItem('activeGenre');
            const genreToUse = activeGenreFromStorage || activeGenre;

            const movieResults = await fetchAPIGenres('movie', newPage, genreToUse);
            const tvResults = await fetchAPIGenres('tv', newPage, genreToUse);

            const combinedResults = [
                ...movieResults.results.map(movie => ({ ...movie, contentType: 'movie' })),
                ...tvResults.results.map(tv => ({ ...tv, contentType: 'tv' }))
            ];

            setFilteredMovies({
                page: newPage,
                total_pages: Math.max(movieResults.total_pages, tvResults.total_pages),
                total_results: movieResults.total_results + tvResults.total_results,
                results: combinedResults,
            });

            window.scrollTo(0, 0);
            setIsLoading(false);
            localStorage.setItem('newPage', newPage);
        } catch (error) {
            console.error('API error', error);
            setIsLoading(false);
        }
    };

    const movies = filteredMovies?.results?.filter(movie => movie.contentType === 'movie');
    const tvShows = filteredMovies?.results?.filter(movie => movie.contentType === 'tv');

    return (
        <>
            <Head>
                <title>Genres</title>
                <meta name="description" content="watch a large list of movie and tv series genre"></meta>
            </Head>
            <Navigation />
            <div className={styles.contentContainer}>
                <Link href={"/"}>
                    <h2 className={styles.activeContentType}>{activeContentType} &gt;</h2>
                </Link>
                <h2 className={styles.genre}>{genre}</h2>
            </div>
            {
                !isLoading ?
                    <>

                        {
                            activeContentType === "movies" ?
                                <FilteredData isloading={isLoading} data={movies} />
                                :
                                <FilteredData isLoading={isLoading} data={tvShows} />
                        }
                        {
                            filteredMovies?.results?.length > 0 && (
                                <>
                                    {
                                        !isLoading &&
                                        <div className={styles.paginationContainer}>
                                            <Pagination filteredMovies={filteredMovies} handlePageChange={handlePageChange} />
                                        </div>
                                    }
                                </>
                            )}
                    </>
                    :
                    <div className="loading">
                        <Loading />
                    </div>
            }
        </>
    )
};

export default Genres;
