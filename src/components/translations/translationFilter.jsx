import styles from './translationFilter.module.css';
import { useMovieContext } from '@/context/moviesContext';

const TranslationFilter = ({ name, language, country }) => {
    const { setSelectedLanguage } = useMovieContext();

    const handleLanguage = (name) => {
        setSelectedLanguage(name);
    };

    return (
        <div className={styles.container} onClick={() => handleLanguage(name)}>
            <div className={styles.left}>
                <h4 className={styles.name}>{name}</h4>
            </div>
            <div className={styles.right}>
                <h4 className={styles.language}>{language} - {country}</h4>
            </div>
        </div>
    )
};

export default TranslationFilter;
