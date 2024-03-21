import Vote from "../vote/vote";
import styles from "./postersImages.module.css";

const Info = ({
    width,
    height,
    vote_average
}) => {
    return (
        <>
            <h3 className={styles.info}>Info</h3>
            <div className={styles.hr}></div>
            <h4 className={styles.size}>Size: {width}x{height}</h4>
            <div className={styles.vote}>
                <Vote vote={vote_average} />
            </div>
        </>
    )
};

export default Info;
