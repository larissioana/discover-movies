import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be within a Provider');
    }
    return context;
};

export const MovieProvider = ({ children }) => {
    const [searchedData, setSearchedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeGenre, setActiveGenre] = useState(null);
    const [activeContentType, setActiveContentType] = useState("");
    const [resetPage, setResetPage] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const updateActiveContentType = (contentType) => {
        setActiveContentType(contentType);
        localStorage.setItem('activeContentType', contentType);
    };

    const storedActiveContentType = typeof window !== 'undefined' ? localStorage.getItem('activeContentType') : null;

    useEffect(() => {

        if (storedActiveContentType) {
            setActiveContentType(storedActiveContentType);
        } else {
            setActiveContentType("movies");
            localStorage.setItem('activeContentType', "movies");
        }
    }, [activeContentType]);

    const value = {
        searchedData,
        setSearchedData,
        searchTerm,
        setSearchTerm,
        activeGenre,
        setActiveGenre,
        activeContentType,
        setActiveContentType,
        updateActiveContentType,
        resetPage,
        setResetPage,
        selectedLanguage,
        setSelectedLanguage
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}