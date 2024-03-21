import Head from "next/head";
import Header from "@/components/header/header";
import Navigation from "@/components/navigation/navigation";
import { fetchAPIId } from "@/utils/fetchAPI";
import TranslationFilter from "@/components/translations/translationFilter";
import styles from '../movieId.module.css';
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
                <meta name="description" content="read informations about a specific movie in your language"></meta>
            </Head>
            <Navigation />
            <Header data={data} />
            <div className={styles.translationsWrapper}>
                <div className={styles.left}>
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
            </div>
        </>
    )
}

export default Translations;

export async function getServerSideProps(context) {
    const { movieId } = context.query;
    const data = await fetchAPIId("movie", movieId);
    const translations = await fetchAPIId("movie", movieId, "translations");
    return {
        props:
        {
            data,
            translations
        }
    }
}
