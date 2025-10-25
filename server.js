const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Create uploads directory if it doesn't exist
const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads (basic setup)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// In-memory dataset for books
let books = [
  {
    id: 1,
    title: "The Enchanted Forest",
    author: "Emily Rivers",
    genre: "Fantasy",
    publicationDate: "2020-01-15",
    description: "A tale of magic and adventure in a mystical forest where ancient secrets await discovery.",
    coverImage: "/assets/book1.jpg",
    price: 14.99,
    pages: 320,
    language: "English",
    isAvailable: true,
    rating: 4.5
  },
  {
    id: 2,
    title: "Galactic Odyssey",
    author: "Marcus Orion",
    genre: "Sci-Fi",
    publicationDate: "2019-03-22",
    description: "Explore the cosmos in this epic space saga of interstellar travel and alien encounters.",
    coverImage: "/assets/book2.jpg",
    price: 16.50,
    pages: 450,
    language: "English",
    isAvailable: true,
    rating: 4.2
  },
  {
    id: 3,
    title: "The Silent Witness",
    author: "Sarah Jenkins",
    genre: "Mystery",
    publicationDate: "2021-07-10",
    description: "Unravel the secrets of a small town with a dark past in this gripping mystery thriller.",
    coverImage: "/assets/book3.jpg",
    price: 13.25,
    pages: 280,
    language: "English",
    isAvailable: false,
    rating: 4.7
  },
  {
    id: 4,
    title: "Eternal Flame",
    author: "David Chen",
    genre: "Romance",
    publicationDate: "2018-11-05",
    description: "A timeless love story that spans generations and continents, defying all odds.",
    coverImage: "/assets/book4.jpg",
    price: 12.99,
    pages: 310,
    language: "English",
    isAvailable: true,
    rating: 4.0
  }
];

// Helper variable for generating new IDs
let nextId = 5;

// Routes

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id - Get single book by ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});

// POST /books - Create new book with image upload
app.post('/books', upload.single('coverImage'), (req, res) => {
  const { title, author, genre, publicationDate, description, pages, price, rating, language } = req.body;
  
  // Basic validation
  if (!title || !author || !genre || !publicationDate || !description) {
    return res.status(400).json({ error: 'All required fields are missing' });
  }
  
  const newBook = {
    id: nextId++,
    title,
    author,
    genre,
    publicationDate,
    description,
    coverImage: req.file ? `/uploads/${req.file.filename}` : '/assets/default-book.jpg',
    price: price ? parseFloat(price) : 0,
    pages: pages ? parseInt(pages) : 0,
    language: language || 'English',
    isAvailable: true,
    rating: rating ? parseFloat(rating) : 0
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update existing book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const updatedBook = { ...books[bookIndex], ...req.body };
  books[bookIndex] = updatedBook;
  
  res.json(updatedBook);
});

// DELETE /books/:id - Delete book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const deletedBook = books[bookIndex];
  books.splice(bookIndex, 1);
  res.json({ message: 'Book deleted successfully', deletedBook });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bookstore API is running!',
    endpoints: {
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get single book',
      'POST /books': 'Create new book',
      'PUT /books/:id': 'Update book',
      'DELETE /books/:id': 'Delete book'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});