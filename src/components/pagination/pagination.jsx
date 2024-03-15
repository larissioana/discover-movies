import styles from './pagination.module.css';
import NextIcon from '../../assets/next.png';
import PrevIcon from '../../assets/prev.png';
import Image from 'next/image';
import CircleIcon from '../../assets/circle.png';

const Pagination = ({ handlePageChange, filteredMovies }) => {
    const { page, total_pages } = filteredMovies;
    return (
        <>
            <div className={styles.pagination}>
                <button
                    className={styles.paginationBtn}
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    <Image src={PrevIcon} width={25} height={25} alt={"prev icon"} className={styles.iconBtn} />
                </button>
                {
                    Array.from({ length: total_pages }, (_, index) => index + 1)
                        .slice(page - 1, page + 4)
                        .map(pageNumber => (
                            <button
                                key={pageNumber}
                                className={`${pageNumber === page ? styles.selectedBtn : styles.paginationBtn}`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                <Image src={CircleIcon} width={20} height={20} alt={"circle icon"} />
                            </button>
                        ))
                }
                <button
                    className={styles.paginationBtn}
                    disabled={page === total_pages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    <Image src={NextIcon} width={25} height={25} alt={"next icon"} className={styles.iconBtn} />
                </button>

            </div>
            <div className={styles.pages}>
                <p>Page {page} of{" "}
                    {total_pages.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: total_pages > 1000 ? 0 : 2,
                    })}
                </p>
            </div>
        </>
    )
};

export default Pagination;