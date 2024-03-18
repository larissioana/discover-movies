import styles from './vote.module.css';
import Image from 'next/image';
import StarIcon from '../../assets/star.png';

const Vote = ({ vote }) => {
    return (
        <div className={styles.voteContainer}>
            <Image src={StarIcon} width={20} height={20} alt={"star icon"} />
            <p className={styles.vote}>{Math.floor(vote).toFixed(1)}</p>
        </div>
    )
};

export default Vote;
