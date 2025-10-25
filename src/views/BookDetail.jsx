import React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './BookDetail.css'

// Import book images
import book1 from '../assets/book1.jpg'
import book2 from '../assets/book2.jpg'
import book3 from '../assets/book3.jpg'
import book4 from '../assets/book4.jpg'

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [book, setBook] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      console.log(`Fetching book with ID: ${id}`);
      const response = await fetch(`http://localhost:5000/books/${id}`);
      
      if (!response.ok) {
        throw new Error('Book not found');
      }
      
      const bookData = await response.json();
      console.log('Book data received:', bookData);
      console.log('Cover image path:', bookData.coverImage);
      console.log('Final image URL:', getBookImage(bookData));
      
      setBook(bookData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching book:', err);
      setError('Book not found. It may have been deleted or does not exist.');
      setLoading(false);
    }
  };

  const getBookImage = (book) => {
    // For predefined books 1-4
    if (book.id === 1) return book1;
    if (book.id === 2) return book2;
    if (book.id === 3) return book3;
    if (book.id === 4) return book4;
    
    // For new books with uploaded images
    if (book.coverImage && book.coverImage.startsWith('/uploads/')) {
      return `http://localhost:5000${book.coverImage}`;
    }
    
    // For new books without uploaded images, use default
    return book1;
  };

  const handleEditBook = () => {
    navigate(`/edit-book/${id}`);
  };

  const handleAddToCart = () => {
    if (book.isAvailable) {
      alert(`"${book.title}" added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="book-detail">
        <div className="book-detail-loading">
          <div className="loading-spinner"></div>
          <h2>Loading Book Details...</h2>
          <p>Please wait while we fetch the book information</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="book-detail">
        <div className="book-detail-error">
          <div className="error-icon">📚</div>
          <h2>Book Not Found</h2>
          <p>{error}</p>
          <div className="error-actions">
            <Link to="/all-books" className="back-to-books-btn">
              ← Back to All Books
            </Link>
            <Link to="/" className="back-to-home-btn">
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail">
      <div className="book-detail-container">
        {/* Navigation Buttons - Fixed */}
        <div className="book-detail-nav">
          <Link to="/all-books" className="back-button">
            ← Back to Library
          </Link>
          <button onClick={() => navigate(-1)} className="back-button">
            ← Go Back
          </button>
        </div>

        <div className="book-detail-content">
          <div className="book-cover-section">
            <div className="book-cover-container">
              <img 
                src={getBookImage(book)} 
                alt={book.title}
                className="book-cover-image"
                onError={(e) => {
                  // If uploaded image fails to load, fallback to default
                  if (book.coverImage && book.coverImage.startsWith('/uploads/')) {
                    e.target.src = book1;
                  }
                }}
              />
              <div className="book-cover-overlay">
                <span className={`availability-badge ${book.isAvailable ? 'available' : 'unavailable'}`}>
                  {book.isAvailable ? 'Available' : 'Out of Stock'}
                </span>
              </div>
            </div>
            
            <div className="book-quick-actions">
              <button 
                onClick={handleAddToCart}
                className={`add-to-cart-btn ${!book.isAvailable ? 'disabled' : ''}`}
                disabled={!book.isAvailable}
              >
                {book.isAvailable ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
              <button onClick={handleEditBook} className="edit-book-btn">
                ✏️ Edit Book
              </button>
            </div>
          </div>

          <div className="book-info-section">
            <div className="book-header">
              <h1 className="book-title">{book.title}</h1>
              <p className="book-author">by <span>{book.author}</span></p>
              
              <div className="book-rating-section">
                <div className="rating-stars">
                  {'⭐'.repeat(Math.floor(book.rating || 4))}
                  <span className="rating-text">({book.rating || '4.0'}/5)</span>
                </div>
                <span className="review-count">128 reviews</span>
              </div>
            </div>

            <div className="book-description-section">
              <h3>About This Book</h3>
              <p className="book-description">{book.description}</p>
            </div>

            <div className="book-details-grid">
              <div className="detail-card">
                <h4>Book Information</h4>
                <div className="detail-item">
                  <span className="detail-label">Genre:</span>
                  <span className="detail-value">{book.genre}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Publication Date:</span>
                  <span className="detail-value">
                    {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Unknown'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Pages:</span>
                  <span className="detail-value">{book.pages || '300'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Language:</span>
                  <span className="detail-value">{book.language || 'English'}</span>
                </div>
              </div>

              <div className="pricing-card">
                <h4>Pricing & Availability</h4>
                <div className="price-section">
                  <span className="book-price">${book.price || '14.99'}</span>
                  <span className="price-note">Free shipping available</span>
                </div>
                <div className="availability-info">
                  <div className={`status-indicator ${book.isAvailable ? 'in-stock' : 'out-of-stock'}`}>
                    {book.isAvailable ? '✓ In Stock' : '✗ Out of Stock'}
                  </div>
                  <p className="delivery-info">Usually ships within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="book-actions-section">
              <button 
                onClick={handleAddToCart}
                className={`primary-action-btn ${!book.isAvailable ? 'disabled' : ''}`}
                disabled={!book.isAvailable}
              >
                {book.isAvailable ? 'Add to Cart - $' + (book.price || '14.99') : 'Currently Unavailable'}
              </button>
              <button className="secondary-action-btn">
                ♡ Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;