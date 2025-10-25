import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchBooks } from '../store/slices/booksSlice';
import './FeaturedBooks.css';

// Import book images
import book1 from '../assets/book1.jpg';
import book2 from '../assets/book2.jpg';
import book3 from '../assets/book3.jpg';
import book4 from '../assets/book4.jpg';

const FeaturedBooks = () => {
  const dispatch = useAppDispatch();
  const { featuredBooks } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const getBookImage = (book) => {
    if (book.id === 1) return book1;
    if (book.id === 2) return book2;
    if (book.id === 3) return book3;
    if (book.id === 4) return book4;
    
    if (book.coverImage && book.coverImage.startsWith('/uploads/')) {
      return `http://localhost:5000${book.coverImage}`;
    }
    
    return book1;
  };

  return (
    <section className="featured-books">
      <div className="container">
        <h2>Featured Books</h2>
        <div className="books-grid">
          {featuredBooks.map((book) => (
            <Link 
              key={book.id}
              to={`/book/${book.id}`}
              className="book-item-link"
            >
              <div className="book-item">
                <div 
                  className="book-image"
                  style={{
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa'
                  }}
                >
                  <img 
                    src={getBookImage(book)} 
                    alt={book.title} 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <div className="book-info">
                  <strong>{book.title}</strong>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-description">{book.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;