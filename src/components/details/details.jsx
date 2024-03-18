import Image from 'next/image';
import StarIcon from '../../assets/star.png';
import styles from './details.module.css';
import WebIcon from '../../assets/web.png';
import Media from '../media/media';
import Recommendations from '../recommendations/recommendations';
import Cast from '../cast/cast';
import ImdbIcon from '../../assets/imdb.png';
import Seasons from '../seasons/seasons';
import { formatDate } from '@/utils/helpers';
import NoImage from '../../assets/no-image.webp';

const Details = ({
    image,
    title,
    firstTitle,
    date,
    hours,
    minutes,
    genres,
    vote,
    status,
    overview,
    productionCountries,
    releaseDate,
    productionCompanies,
    posterPath,
    firstAirDate,
    tagline,
    budget,
    homepage,
    revenue,
    language,
    images,
    videos,
    recommendations,
    credits,
    seasonsNumber,
    episodesNumber,
    imdb,
    seasons
}) => {

    const releasedDate = new Date(releaseDate || firstAirDate);
    const imdbLink = `https://www.imdb.com/title/${imdb}`;
    const formattedBudget = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(budget);

    const formattedRevenue = new Intl.NumberFormat('en-US',
        {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(revenue);

    const formattedDate = formatDate(releasedDate);

    return (
        <>
            <div className={styles.movieContainer}>
                <h5 className={styles.movieTitle}>{firstTitle}</h5>
                <div className={styles.flexContainer2}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.language}>({language})</p>
                    {
                        vote !== 0 &&
                        <p className={styles.vote}>
                            <Image src={StarIcon} width={20} height={20} className={styles.star} alt="star icon for ratings" />

                            {Math.floor(vote).toFixed(1)}
                        </p>
                    }
                </div>
                <h4 className={styles.tagline}>{tagline}</h4>
                <div
                    className={styles.flexContainer}
                    style={{
                        gap: date !== "" ? null : "0rem"
                    }}
                >
                    <p className={styles.year}>{date}</p>
                    <p className={styles.runtime}>
                        {hours ? hours + "h" : null}
                        {minutes ? minutes + "m" : null}
                    </p>
                </div>
            </div>
            <div className={styles.movieDetails}>
                <div className={styles.left}>
                    {
                        posterPath ?
                            <Image src={image} className={styles.image} priority loading="eager" alt={title || "poster of the specific movie/tv series"} width={300} height={450} />
                            :
                            <Image src={NoImage} className={styles.image} priority loading="eager" alt={title || "poster of the specific movie/tv series"} width={300} height={450} />
                    }
                </div>
                <div className={styles.right}>
                    <div className={styles.genres}>
                        {genres.map((genre) => {
                            return <div key={genre.id}>
                                <p className={styles.genreText}>{genre.name}</p>
                            </div>
                        })}
                    </div>
                    {
                        overview &&
                        <p className={styles.text}>
                            Overview:
                            <span className={styles.overview}> {overview}</span>
                        </p>
                    }
                    {
                        status &&
                        <p className={styles.text}>Status: {status}</p>
                    }
                    {
                        revenue !== 0.00 && revenue &&
                        <p className={styles.text}>Revenue: {formattedRevenue}</p>
                    }

                    {
                        budget !== 0.00 && budget &&
                        <p className={styles.text}> Budget: {formattedBudget}</p>
                    }
                    <p className={styles.text}>Release date: {formattedDate}</p>
                    {
                        seasonsNumber &&
                        <p className={styles.text}>{seasonsNumber.length > 1 ? "Number of seasons:" : "Number of season:"} {seasonsNumber}</p>
                    }
                    {
                        episodesNumber &&
                        <p className={styles.text}>{episodesNumber.length > 1 ? "Number of episodes:" : "Number of episode:"} {episodesNumber}</p>
                    }
                    {
                        productionCountries.length > 0 &&
                        <p className={styles.countries}>Countries of origin:
                            {
                                productionCountries.map((country, index) => {
                                    return <span key={index}> {index !== productionCountries.length - 4 ? country.name + "," : country.name}</span>
                                }).slice(0, 4)
                            }
                        </p>
                    }
                    {
                        homepage &&
                        <div className={styles.text}>Homepage:
                            <a href={homepage} target="_blank">
                                <Image src={WebIcon} width={20} height={20} alt="web icon" className={styles.homepage} />
                            </a>
                        </div>
                    }
                    {
                        imdb &&
                        <div className={styles.text}>IMDB:
                            <a href={imdbLink} target="_blank">
                                <Image src={ImdbIcon} width={35} height={40} alt="imdb icon" className={styles.imdb} />
                            </a>
                        </div>
                    }
                    {
                        productionCompanies.length > 0 &&
                        <div className={styles.companies}>
                            {productionCompanies.length === 1 ? "Production company:" : "Production companies"}
                            {productionCompanies.map((company) => {
                                return <ul key={company.id} className={styles.text}>
                                    <li className={styles.listCompany}>{company.name}</li>
                                </ul>
                            }).slice(0, 4)}
                        </div>
                    }
                </div>
            </div>
            <Cast credits={credits} />
            <Media images={images} videos={videos} />
            {
                recommendations.results.length > 0 &&
                <Recommendations recommendations={recommendations} title="You might also like" />
            }
            {
                seasons?.length > 0 &&
                <h2 className={styles.seasonTitle}>{seasons.length === 1 ? "Season" : "Seasons"}</h2>
            }
            {
                seasons &&
                <>
                    {
                        seasons.map((season) => {
                            return <Seasons key={season.id} seasons={season} />
                        })
                    }
                </>
            }
        </>
    )
};

export default Details;
