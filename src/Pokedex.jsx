import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState('english');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleLangChange = (language) => {
        setLanguage(language);
    }

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://us-central1-it-sysarch32.cloudfunctions.net/pagination?page=${currentPage}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setPokemonList(data.data);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="content">
            <div className="buttons">
                <button value="english" onClick={() => handleLangChange('english')}>English</button>
                <button value="japanese" onClick={() => handleLangChange('japanese')}>Japanese</button>
                <button value="chinese" onClick={() => handleLangChange('chinese')}>Chinese</button>
                <button value="french" onClick={() => handleLangChange('french')}>French</button>
            </div>

            <div className="page-container">
                <p className="pages">
                    {currentPage} of {totalPages}
                </p>
                <div className="flex-container">
                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage(currentPage - 1)}>
                            Back
                        </button>
                    )}
                    <div className="button-container">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={page === currentPage ? "active" : ""}>
                                {page}
                            </button>
                        ))}
                    </div>
                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage(currentPage + 1)}>
                            Next
                        </button>
                    )}
                </div>
            </div>
            <div className="pokemon-list">
                {pokemonList.map((pokemon, index) => (
                    <Pokemon key={index} pokemon={pokemon} language={language} />
                ))}
            </div>
        </div>
    );
}

export default Pokedex;
