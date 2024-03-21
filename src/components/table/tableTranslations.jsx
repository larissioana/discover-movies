import styles from './tableTranslations.module.css';
import Table from './table';
import { useMovieContext } from '@/context/moviesContext';

const TableTranslations = ({ translations }) => {
    const { selectedLanguage } = useMovieContext();

    const sortedTranslations = translations.translations.sort((a, b) => {
        const nameA = a.english_name.toUpperCase();
        const nameB = b.english_name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    const filteredTranslations = sortedTranslations.filter((translation) => translation.english_name === selectedLanguage)
    return (
        <>
            {
                filteredTranslations.map((translation) => {
                    return <div key={translation.id} className={styles.translationTitleContainer}>
                        <h3 >{translation.english_name} ({translation.iso_639_1} - {translation.iso_3166_1})</h3>
                        <Table translation={translation} />
                    </div>
                })
            }
        </>
    )
};

export default TableTranslations;
