import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MoviesDataTypes } from "@/types";

const getFavoritesFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedFavorites = localStorage.getItem("movieFavorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  }
  return [];
};

interface FavoritesDataTypes {
  movies: MoviesDataTypes[];
}

const initialState: FavoritesDataTypes = {
  movies: getFavoritesFromLocalStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<MoviesDataTypes>) {
      const movie = action.payload;
      const isFavorite = state.movies.some((fav) => fav.id === movie.id);

      if (isFavorite) {
        state.movies = state.movies.filter((fav) => fav.id !== movie.id);
      } else {
        state.movies.push(movie);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("movieFavorites", JSON.stringify(state.movies));
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
