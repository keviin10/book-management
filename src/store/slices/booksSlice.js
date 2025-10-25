import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks for API calls
export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const response = await fetch('http://localhost:5000/books');
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  }
);

export const addBook = createAsyncThunk(
  'books/addBook',
  async (bookData) => {
    const formData = new FormData();
    Object.keys(bookData).forEach(key => {
      if (bookData[key] !== null && bookData[key] !== undefined) {
        formData.append(key, bookData[key]);
      }
    });

    const response = await fetch('http://localhost:5000/books', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to add book');
    }
    return await response.json();
  }
);

export const updateBook = createAsyncThunk(
  'books/updateBook',
  async ({ id, bookData }) => {
    const response = await fetch(`http://localhost:5000/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      throw new Error('Failed to update book');
    }
    return await response.json();
  }
);

export const deleteBook = createAsyncThunk(
  'books/deleteBook',
  async (bookId) => {
    const response = await fetch(`http://localhost:5000/books/${bookId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
    return bookId;
  }
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (bookId) => {
    const response = await fetch(`http://localhost:5000/books/${bookId}`);
    if (!response.ok) {
      throw new Error('Book not found');
    }
    return await response.json();
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    featuredBooks: [],
    currentBook: null,
    loading: false,
    error: null,
    searchResults: [],
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBook: (state) => {
      state.currentBook = null;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        // Set featured books (first 4 books)
        state.featuredBooks = action.payload.slice(0, 4);
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add Book
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Book
      .addCase(updateBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(book => book.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.currentBook && state.currentBook.id === action.payload.id) {
          state.currentBook = action.payload;
        }
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(book => book.id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch Book by ID
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  clearError, 
  clearCurrentBook, 
  setSearchResults, 
  clearSearchResults 
} = booksSlice.actions;

export default booksSlice.reducer;