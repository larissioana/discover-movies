import styles from './select.module.css';
import Select from 'react-select';
import { useMovieContext } from '@/context/moviesContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SelectGenres = ({ options }) => {
    const { setActiveGenre, activeGenre, setResetPage } = useMovieContext();
    const router = useRouter();

    const handleGenres = (genre) => {
        setActiveGenre(genre.id);
        setResetPage(true);
        router.push({
            pathname: '/genres',
            query: { genre: genre.value }
        })
    };

    useEffect(() => {
        const storedActiveGenre = localStorage.getItem('activeGenre');
        if (storedActiveGenre) {
            setActiveGenre(storedActiveGenre);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeGenre', activeGenre);
    }, [activeGenre]);

    const customStyles = {
        container: (provided, _state) => ({
            ...provided,
            width: '200px',
        }),
        control: (provided, _state) => ({
            ...provided,
            border: '1px solid #b4a505',
            borderRadius: '5px',
            backgroundColor: "rgb(27, 29, 28)",
            fontWeight: "bolder",
            color: "#e1e7e5"
        }),
        singleValue: (provided, _state) => ({
            ...provided,
            color: '#e1e7e5',
        }),
        placeholder: (provided, _state) => ({
            ...provided,
            color: '#e1e7e5',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#9e8206' : 'rgb(27, 29, 28)',
            color: state.isSelected ? '#e1e7e5' : '#e1e7e5',
            '&:hover': {
                backgroundColor: '#9e8206',
            },
        }),
    };

    return (
        <div className={styles.container}>
            <Select
                options={options}
                value={options.find(option => option.id === activeGenre)}
                onChange={handleGenres}
                styles={customStyles}
                placeholder={"Genres"}
            />
        </div>
    )
};

export default SelectGenres;
