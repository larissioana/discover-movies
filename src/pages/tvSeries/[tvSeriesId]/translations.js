import Head from "next/head";
import Header from "@/components/header/header";
import Navigation from "@/components/navigation/navigation";
import { fetchAPIId } from "@/utils/fetchAPI";
import TranslationFilter from "@/components/translations/translationFilter";
import styles from '../../../pages/movie/movieId.module.css';
import TableTranslations from "@/components/table/tableTranslations";

const Translations = ({ data, translations }) => {
    const sortedTranlations = translations.translations.sort((a, b) => {
        const nameA = a.english_name.toUpperCase();
        const nameB = b.english_name.toUpperCase();

        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })
    return (
        <>
            <Head>
                <title>Translations</title>
                <meta name="description" content="read informations about a specific tv series in your language"></meta>
            </Head>
            <Navigation />
            <Header data={data} />
            {
                sortedTranlations.length > 0 ?
                    <div className={styles.translationsWrapper}>
                        <div className={styles.left}
                            style={{
                                height: sortedTranlations.length === 1 ? "15rem" : "20rem",
                            }}
                        >
                            {
                                translations.translations.length > 0 &&
                                <h3 className={styles.translationTitle}>Translations {translations.translations.length}</h3>
                            }
                            <div className={styles.flexContainerLanguages}>
                                {
                                    sortedTranlations.map((translation) => {
                                        const { english_name, iso_639_1, iso_3166_1 } = translation;
                                        return <TranslationFilter name={english_name} language={iso_639_1} country={iso_3166_1} key={translation.id} />
                                    })
                                }
                            </div>
                        </div>
                        <div className={styles.right}>
                            <TableTranslations translations={translations} />
                        </div>
                    </div >
                    :
                    <p className={styles.noTranslation}>No translations available &#128532;</p>
            }
        </>
    )
}

export default Translations;

export async function getServerSideProps(context) {
    const { tvSeriesId } = context.query;
    const data = await fetchAPIId("tv", tvSeriesId);
    const translations = await fetchAPIId("tv", tvSeriesId, "translations");
    return {
        props:
        {
            data,
            translations
        }
    }
}
