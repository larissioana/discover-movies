import ReactPlayer from "react-player";
import styles from './videos.module.css';

const Videos = ({ videos, isLoading, containerRef }) => {
    return (
        <div className={styles.videosContainer} ref={containerRef}>
            {
                videos.results.map((video) => {
                    const { key, id } = video;
                    return <div key={id} className={styles.trailers}>
                        {
                            !isLoading ?

                                <ReactPlayer
                                    controls
                                    className={styles.reactPlayer}
                                    playing={false}
                                    url={`https://www.youtube.com/watch?v=${key}`}
                                />
                                :
                                <div className={styles.loadingVideos}></div>
                        }
                    </div>
                }).slice(0, 4)
            }
        </div>
    )
};

export default Videos;
