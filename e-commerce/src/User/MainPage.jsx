import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';

const MainPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div>
            <Navbar onSearch={handleSearch} />
            <Home searchQuery={searchQuery} />
        </div>
    );
}

export default MainPage;
