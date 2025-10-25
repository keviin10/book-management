import React from 'react';
import { useAppSelector } from '../hooks/redux';
import './BrowseByGenre.css';

// Import genre images - replace these with your actual images
import fantasyImg from '../assets/fantasy.png';
import scifiImg from '../assets/scifi.png';
import mysteryImg from '../assets/mystery.png';
import romanceImg from '../assets/romance.png';
import thrillerImg from '../assets/thriller.png';
import historicalImg from '../assets/historical.png';

const BrowseByGenre = () => {
  const genres = useAppSelector((state) => state.genres.items);

  const getGenreImage = (genreName) => {
    const imageMap = {
      'Fantasy': fantasyImg,
      'Sci-Fi': scifiImg,
      'Mystery': mysteryImg,
      'Romance': romanceImg,
      'Thriller': thrillerImg,
      'Historical': historicalImg
    };
    return imageMap[genreName] || fantasyImg;
  };

  return (
    <section className="browse-genre">
      <div className="container">
        <h2>Browse by Genre</h2>
        <div className="genres-grid">
          {genres.map((genre) => (
            <div key={genre.id} className="genre-item">
              <div 
                className="genre-image"
                style={{ backgroundImage: `url(${getGenreImage(genre.name)})` }}
              >
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByGenre;