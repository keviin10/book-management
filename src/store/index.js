import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './slices/booksSlice';
import genresReducer from './slices/genresSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    genres: genresReducer,
  },
});

export default store;