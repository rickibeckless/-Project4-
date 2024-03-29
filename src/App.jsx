import React, { useState, useEffect } from 'react';
import CatCard from './components/CatCard.jsx';
import './App.css';

const API_URL = `https://api.thecatapi.com/v1/images/search?api_key=${import.meta.env.VITE_CAT_SEARCH_ACCESS_KEY}`;
const BREEDS_API_URL = 'https://api.thecatapi.com/v1/breeds';

const CatCardMemoized = React.memo(CatCard);

const App = () => {
    const [catData, setCatData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [breeds, setBreeds] = useState([]);
    const [banList, setBanList] = useState([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const breedsResponse = await fetch(`${BREEDS_API_URL}`);
                if (!breedsResponse.ok) {
                    throw new Error('Failed to fetch breeds data');
                }
                const breedsData = await breedsResponse.json();
                setBreeds(breedsData);
            } catch (error) {
                console.error('Error fetching breeds data:', error);
            }
        };
        
        fetchBreeds();
    }, []);

    const fetchCatData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}&has_breeds=true`);
            if (!response.ok) {
                throw new Error('Failed to fetch cat data');
            }
            const data = await response.json();
    
            if (!data || !data[0]?.breeds || data[0].breeds.length === 0) {
                console.error('Failed to fetch cat data with breed information');
                return;
            }
    
            const filteredData = data.filter(cat => {
                const catBreeds = cat.breeds.map(breed => breed.name);
                return !catBreeds.some(breed => banList.includes(breed));
            });
    
            if (filteredData.length === 0) {
                console.error('No cat data available after applying ban list');
                return;
            }
    
            setCatData(filteredData[0]);
        } catch (error) {
            console.error('Error fetching cat data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBanAttribute = (attribute) => {
        if (!banList.includes(attribute)) {
            setBanList([...banList, attribute]);
        }
    };

    const handleNewCatClick = () => {
        fetchCatData();
    };

    const filteredBreeds = breeds.filter(breed => !banList.includes(breed.name));

    return (
        <div id="cat-card-holder">
            <h1>Cat Explorer</h1>
            {loading && <p>Loading...</p>}
            {!loading && catData && (
                <CatCardMemoized catData={catData} breeds={filteredBreeds} onBanAttribute={handleBanAttribute} banList={banList} />
            )}
            <button onClick={handleNewCatClick}>Find New Cat</button>
        </div>
    );
};

export default App;

