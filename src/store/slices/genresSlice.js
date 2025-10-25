import { createSlice } from '@reduxjs/toolkit';

const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    items: [
      {
        id: 1,
        name: 'Fantasy',
        image: '../assets/fantasy.png',
        description: 'Magical worlds and epic quests'
      },
      {
        id: 2,
        name: 'Sci-Fi',
        image: '../assets/scifi.png',
        description: 'Future worlds and technology'
      },
      {
        id: 3,
        name: 'Mystery',
        image: '../assets/mystery.png',
        description: 'Thrilling puzzles and suspense'
      },
      {
        id: 4,
        name: 'Romance',
        image: '../assets/romance.png',
        description: 'Heartwarming love stories'
      },
      {
        id: 5,
        name: 'Thriller',
        image: '../assets/thriller.png',
        description: 'Edge-of-your-seat excitement'
      },
      {
        id: 6,
        name: 'Historical',
        image: '../assets/historical.png',
        description: 'Journey through time'
      }
    ],
    selectedGenre: null,
  },
  reducers: {
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    clearSelectedGenre: (state) => {
      state.selectedGenre = null;
    },
  },
});

export const { setSelectedGenre, clearSelectedGenre } = genresSlice.actions;
export default genresSlice.reducer;