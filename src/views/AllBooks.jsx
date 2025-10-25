import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchBooks, deleteBook } from "../store/slices/booksSlice";
import "./AllBooks.css";

// Import book images
import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";
import book3 from "../assets/book3.jpg";
import book4 from "../assets/book4.jpg";

const AllBooks = () => {
  const dispatch = useAppDispatch();
  const { items: books, loading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = async (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await dispatch(deleteBook(bookId)).unwrap();
        alert("Book deleted successfully!");
      } catch (err) {
        console.error("Error deleting book:", err);
        alert("Failed to delete book. Please try again.");
      }
    }
  };

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

  if (loading) {
    return (
      <div className="allbooks-page">
        <div className="allbooks-loading">Loading books...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="allbooks-page">
        <div className="allbooks-error">
          <h2>Error Loading Books</h2>
          <p>{error}</p>
          <Link to="/" className="back-home-btn">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="allbooks-page">
      <div className="allbooks-header">
        <h1>Our Book Collection</h1>
        <p className="allbooks-subtitle">Discover amazing stories and adventures</p>
        <Link to="/add-book" className="add-book-btn">
          + Add New Book
        </Link>
      </div>
      
      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-image-container">
                <img 
                  src={getBookImage(book)}
                  alt={book.title}
                  className="book-image"
                  onError={(e) => {
                    if (book.coverImage && book.coverImage.startsWith('/uploads/')) {
                      e.target.src = book1;
                    }
                  }}
                />
                <div className="book-overlay">
                  <span className="book-genre-tag">{book.genre}</span>
                </div>
              </div>
              
              <div className="book-content">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-description">
                  {book.description.length > 100 
                    ? `${book.description.substring(0, 100)}...` 
                    : book.description
                  }
                </p>
                
                <div className="book-meta">
                  <span className="book-price">${book.price || "14.99"}</span>
                  <span className="book-rating">⭐ {book.rating || "4.0"}/5</span>
                </div>
                
                <div className="book-actions">
                  <Link to={`/book/${book.id}`} className="view-details-btn">
                    View Details
                  </Link>
                  <button 
                    onClick={() => handleDelete(book.id)}
                    className="delete-book-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-books">
            <div className="no-books-icon">📚</div>
            <h3>No Books Available</h3>
            <p>Start building your library by adding the first book!</p>
            <Link to="/add-book" className="add-first-book-btn">
              Add Your First Book
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;