import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page or filter books
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover Your Next Favorite Book</h1>
        <p>Explore a universe of stories, from timeless classics to modern masterpieces.</p>
        <div className="search-section">
          <p>Search for books, authors, or genres</p>
          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for books, authors, or genres..."
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;