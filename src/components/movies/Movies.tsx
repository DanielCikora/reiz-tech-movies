"use client";
import { useState, useEffect } from "react";
import { MoviesDataTypes } from "@/types";
import axios from "axios";
import DOMPurify from "dompurify";
import Link from "next/link";
import Filters from "../filters/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
const Movies = () => {
  const [movies, setMovies] = useState<MoviesDataTypes[]>([]);
  const [allMovies, setAllMovies] = useState<MoviesDataTypes[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [favorites, setFavorites] = useState<MoviesDataTypes[]>(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("movieFavorites");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });
  const moviesPerPage: number = 6;

  const fetchMovies = async () => {
    const response = await axios.get<MoviesDataTypes[]>(
      "https://api.tvmaze.com/shows"
    );
    const fetchedMovies = response.data;
    setAllMovies(fetchedMovies);

    const allGenres = new Set<string>();
    fetchedMovies.forEach((movie) => {
      movie.genres.forEach((genre) => allGenres.add(genre));
    });
    setGenres(Array.from(allGenres));

    updateMovies(fetchedMovies, selectedGenres, 1);
  };

  const updateMovies = (
    moviesList: MoviesDataTypes[],
    filters: string[],
    page: number
  ) => {
    let filteredMovies = moviesList;

    if (filters.length > 0) {
      filteredMovies = moviesList.filter((movie) =>
        filters.every((filter) => movie.genres.includes(filter))
      );
    }

    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = page * moviesPerPage;
    setMovies(filteredMovies.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(filteredMovies.length / moviesPerPage));
    setCurrentPage(page);
  };

  const handleGenreSelection = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      const updatedGenres = prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre];

      updateMovies(allMovies, updatedGenres, 1);
      return updatedGenres;
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const sanitizeHTML = (html?: string) => {
    return DOMPurify.sanitize(html || "");
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      updateMovies(allMovies, selectedGenres, pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(i);
      }
    }
    return pages;
  };

  const handleToggleFavorite = (movie: MoviesDataTypes) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === movie.id);

      const updatedFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav.id !== movie.id)
        : [...prevFavorites, movie];

      localStorage.setItem("movieFavorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <section className='movies min-h-dvh'>
      <div className='wrapper'>
        <Filters
          genres={genres}
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreSelection}
        />
        <div className='grid grid-cols-3 gap-8 w-full mb-20'>
          {movies.map((movie) => (
            <Link
              href={`/overview/${movie.id}`}
              key={movie.id}
              className='cursor-pointer rounded hover:shadow-2xl hover:shadow-gray-400 shadow-inherit transition-all duration-200 ease-in-out p-4 w-full h-full flex md:flex-row flex-col gap-4'
            >
              <div className='movie__image w-full'>
                <img
                  className='block w-full h-auto'
                  src={movie.image.original}
                  alt={movie.name}
                />
              </div>
              <div className='movie__description w-full flex flex-col justify-between'>
                <span>
                  <span className='flex justify-between'>
                    <h2 className='mb-8 text-2xl font-semibold'>
                      {movie.name}
                    </h2>
                    <button
                      onClick={() => handleToggleFavorite(movie)}
                      className='relative z-50 flex items-start'
                      type='button'
                    >
                      {favorites.some((fav) => fav.id === movie.id) ? (
                        <FontAwesomeIcon
                          className='block text-2xl'
                          icon={solidHeart}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className='block text-2xl'
                          icon={regularHeart}
                        />
                      )}
                    </button>
                  </span>
                  <p
                    className='mediumLarge:text-xl text-lg text-pretty'
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(`${movie.summary.slice(0, 80)}...`),
                    }}
                  />
                </span>
                <span className='flex md:flex-row flex-col justify-between'>
                  <p>{movie.rating.average} / 10</p>
                  {movie.genres.join(", ")}
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className='pagination-controls flex justify-center pb-10'>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              disabled={page === currentPage}
              className={`font-semibold w-10 h-10 mx-1 rounded-md ${
                page === currentPage
                  ? "bg-green-300 text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Movies;
