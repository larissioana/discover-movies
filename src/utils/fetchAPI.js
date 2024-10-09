
const options =
{
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
};

const BASE_URL = 'https://api.themoviedb.org/3/';

export const imageUrl = 'http://image.tmdb.org/t/p/w342/';
export const imageUrlBackdrops = 'http://image.tmdb.org/t/p/w300/';
export const imageUrlProfiles = 'http://image.tmdb.org/t/p/h632/';
export const imageUrlProfilesSmall = 'http://image.tmdb.org/t/p/w185/';
export const imageUrlBackdrop = 'http://image.tmdb.org/t/p/original/';
export const IMAGE_URL_342 = 'https://image.tmdb.org/t/p/w342';
export const IMAGE_URL_500 = 'https://image.tmdb.org/t/p/w500';

export const fetchMovies = async (mediaType, list) => {
    const data = await fetch(`${BASE_URL}${mediaType}/${list}?language=en-US&page=1`, options);
    const response = await data.json();
    return response;
};

export const fetchAPISearch = async (query, page) => {
    const data = await fetch(`${BASE_URL}search/multi?&query=${query}&include_adult=false&language=en-US&page=${page}`, options);
    const response = await data.json();
    return response;
};

export const fetchAPIGenres = async (mediaType, page, genre) => {
    const data = await fetch(`${BASE_URL}discover/${mediaType}?with_genres=${genre}&include_adult=false&language=en-US&page=${page}`, options);
    const response = await data.json();
    return response;
};

export const fetchAPIId = async (mediaType, id, category) => {
    const url = category ? `${BASE_URL}${mediaType}/${id}/${category}` : `${BASE_URL}${mediaType}/${id}?language=en-US`;
    const data = await fetch(url, options);
    const response = await data.json();
    return response;
};

export const fetchAPITrending = async (mediaType, time) => {
    const data = await fetch(`${BASE_URL}trending/${mediaType}/${time}?language=en-US`, options);
    const response = await data.json();
    return response;
};

export const fetchTvSeasons = async (id, number) => {
    const response = await fetch(`${BASE_URL}tv/${id}/season/${number}?language=en-US'`, options);
    const data = await response.json();
    return data;
}
