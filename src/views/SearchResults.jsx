import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Mock book data - in real app, this would come from your backend
  const allBooks = [
    {
      id: 1,
      title: "The Enchanted Forest",
      author: "Emily Rivers",
      genre: "Fantasy",
      description: "A tale of magic and adventure in a mystical forest",
      price: 14.99
    },
    {
      id: 2,
      title: "Galactic Odyssey",
      author: "Marcus Orion",
      genre: "Sci-Fi",
      description: "Explore the cosmos in this epic space saga",
      price: 16.50
    },
    {
      id: 3,
      title: "The Silent Witness",
      author: "Sarah Jenkins",
      genre: "Mystery",
      description: "Unravel the secrets of a small town",
      price: 13.25
    },
    {
      id: 4,
      title: "Eternal Flame",
      author: "David Chen",
      genre: "Romance",
      description: "A timeless love story",
      price: 12.99
    }
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('search') || '';
    
    if (query) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const results = allBooks.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.genre.toLowerCase().includes(query.toLowerCase()) ||
          book.description.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        setLoading(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  }, [location.search]);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search') || '';

  return (
    <div className="search-results">
      <div className="container">
        <Link to="/" className="back-btn">← Back to Home</Link>
        
        <h1>Search Results</h1>
        
        {query && (
          <p className="search-query">Showing results for: "{query}"</p>
        )}

        {loading ? (
          <div className="loading">Searching...</div>
        ) : (
          <>
            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map(book => (
                  <Link key={book.id} to={`/book/${book.id}`} className="book-result-link">
                    <div className="book-result">
                      <div className="book-image">
                        <div className="book-placeholder">📚</div>
                      </div>
                      <div className="book-info">
                        <h3>{book.title}</h3>
                        <p className="book-author">by {book.author}</p>
                        <p className="book-genre">{book.genre}</p>
                        <p className="book-description">{book.description}</p>
                        <p className="book-price">${book.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="no-results">
                <p>No books found matching your search.</p>
                <p>Try different keywords or browse our featured books.</p>
              </div>
            ) : (
              <div className="no-query">
                <p>Enter a search term to find books.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;