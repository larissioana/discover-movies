import styles from './dropdownMenu.module.css';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMovieContext } from '@/context/moviesContext';

const DropdownMenu = () => {
    const [showDropdownOverview, setShowDropdownOverview] = useState(false);
    const [showDropdownMedia, setShowDropdownMedia] = useState(false);

    const dropdownRef = useRef(null);
    const router = useRouter();
    const { asPath } = router;
    const link = `${asPath}/cast`;
    const linkPosters = `${asPath}/posters`;
    const linkBackdrops = `${asPath}/backdrops`;
    const linkTranslations = `${asPath}/translations`;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdownOverview(false);
                setShowDropdownMedia(false);
            }
        };

        document.addEventListener('mouseout', handleClickOutside);
        return () => {
            document.removeEventListener('mouseout', handleClickOutside);
        };
    }, []);

    const onMouseEnterDropdownOverview = () => {
        setShowDropdownOverview(true);
    };

    const onMouseEnterDropdownMedia = () => {
        setShowDropdownMedia(true);
    };

    return (
        <div className={styles.container} ref={dropdownRef}>
            <div className={styles.dropdown}>
                <h3 className={styles.dropdownTitle} onClick={onMouseEnterDropdownOverview}>Overview </h3>
                <p className={styles.arrowDown} onClick={onMouseEnterDropdownOverview} >&#9660;</p>
                {
                    showDropdownOverview && !showDropdownMedia &&
                    <div className={styles.dropDownMenu}>
                        <Link href={link} className={styles.links}>Cast</Link>
                        <Link href={linkTranslations} className={styles.links}>Translations</Link>
                    </div>
                }
            </div>
            <div className={styles.dropdown}>
                <h3 className={styles.dropdownTitle} onClick={onMouseEnterDropdownMedia}>Images</h3>
                <p className={styles.arrowDown} onClick={onMouseEnterDropdownMedia} >&#9660;</p>
                {
                    showDropdownMedia && !showDropdownOverview &&
                    <div className={styles.dropDownMenu}>
                        <Link href={linkPosters} className={styles.links}>Posters</Link>
                        <Link href={linkBackdrops} className={styles.links}>Backdrops</Link>
                    </div>
                }
            </div>
        </div>
    )
};

export default DropdownMenu;
