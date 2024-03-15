import { useState, useEffect } from "react";
import styles from "./navigation.module.css";
import { fetchAPISearch, imageUrl } from "@/utils/fetchAPI";
import { useMovieContext } from "@/context/moviesContext";
import Image from "next/image";
import NoImage from '../../assets/NoImage.jpg';
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../loading/loading";

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { searchedData, setSearchedData, searchTerm, setSearchTerm } = useMovieContext();
  const router = useRouter();

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (searchTerm.trim()) {
      const timer = setTimeout(() => {
        fetchFilteredData(searchTerm, 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  };

  const fetchFilteredData = async (value) => {
    try {
      setIsLoading(true);
      const searchData = await fetchAPISearch(value, 1);
      const filteredResults = searchData.results.filter(item => {
        const lowercaseSearchTerm = value.toLowerCase();
        return (
          (item.original_title && item.original_title.toLowerCase().includes(lowercaseSearchTerm)) ||
          (item.original_name && item.original_name.toLowerCase().includes(lowercaseSearchTerm))
        );
      });
      setSearchedData(filteredResults);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.asPath.includes('/tvSeries/') || router.asPath.includes('/movie/') || router.asPath.includes('/publicPerson/')) {
      setSearchTerm('');
    }
  }, [router.asPath]);

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href={'/'}>
            <h2 className={styles.logo}>Discover Movies and Tv Series</h2>
          </Link>
          <div className={styles.searchContainer}>
            <input
              onChange={handleChange}
              value={searchTerm}
              className={styles.input}
              type="text"
              placeholder="Search for a movie, tv show or person"
            />
          </div>
        </div>
      </nav>
      {searchTerm && <>
        <div className={styles.searchedContainer}>
          {
            searchTerm &&
            searchedData
              .map((item) => {
                const { id, original_title, original_name, poster_path, profile_path, media_type } = item;
                return (
                  <div key={id} className={styles.suggestions}>
                    {(poster_path || profile_path) ? (
                      <>
                        {media_type === 'tv' && (
                          <Link href={`/tvSeries/${id}`}>
                            <Image
                              src={`${imageUrl}${poster_path}`}
                              width={70}
                              height={90}
                              alt={original_title}
                              loading="eager"
                              priority
                              className={styles.img}
                              style={{
                                objectFit: "cover"
                              }}
                            />
                          </Link>
                        )}
                        {media_type === 'movie' && (
                          <Link href={`/movie/${id}`}>
                            <Image
                              src={`${imageUrl}${poster_path}`}
                              width={70}
                              height={90}
                              alt={original_title}
                              loading="eager"
                              priority
                              className={styles.img}
                              style={{
                                objectFit: "cover"
                              }}
                            />
                          </Link>
                        )}
                        {media_type === 'person' && (
                          <Link href={`/publicPerson/${id}`}>
                            <Image
                              src={`${imageUrl}${profile_path}`}
                              width={70}
                              height={90}
                              alt={original_name}
                              loading="eager"
                              priority
                              className={styles.img}
                              style={{
                                objectFit: "cover"
                              }}
                            />
                          </Link>
                        )}
                      </>
                    ) : (
                      <Image
                        src={NoImage}
                        width={70}
                        height={90}
                        alt={original_name}
                        loading="eager"
                        priority
                        className={styles.img}
                        style={{
                          objectFit: "cover"
                        }}
                      />
                    )}
                    {
                      original_title ?
                        <h5 className={styles.title}>{original_title}</h5>
                        :
                        <h5 className={styles.title}>{original_name}</h5>
                    }
                  </div>
                );
              }).slice(0, 8)}
        </div>
      </>
      }
    </>
  );
};

export default Navigation;
