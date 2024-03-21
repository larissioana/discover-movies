import styles from './tableTranslations.module.css';

const Table = ({ translation }) => {
    const {
        title,
        tagline,
        overview
    } = translation.data;
    return (
        <table className={styles.tableData}>
            <tbody>
                <tr>
                    <td>Name</td>
                    <td>{title ? title : "-"}</td>
                </tr>
                <tr>
                    <td>Tagline</td>
                    <td>{tagline ? tagline : "-"}</td>
                </tr>
                <tr>
                    <td>Overview</td>
                    <td>{overview ? overview : "-"}</td>
                </tr>
            </tbody>
        </table>
    )
};

export default Table;
