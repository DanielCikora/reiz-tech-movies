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
import Sorting from "../sorting/Sorting";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { toast } from "react-toastify";
const Movies = () => {
  const [movies, setMovies] = useState<MoviesDataTypes[]>([]);
  const [allMovies, setAllMovies] = useState<MoviesDataTypes[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortType, setSortType] = useState<string>("name");
  const [genreCounter, setGenreCounter] = useState<number>(0);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const fetchMovies = async () => {
    const response = await axios.get<MoviesDataTypes[]>(
      "https://api.tvmaze.com/shows"
    );
    const fetchedMovies = response.data;
    setAllMovies(fetchedMovies);

    const allGenres = new Set<string>();
    const allStatuses = new Set<string>();
    fetchedMovies.forEach((movie) => {
      movie.genres.forEach((genre) => allGenres.add(genre));
      allStatuses.add(movie.status);
    });
    setGenres(Array.from(allGenres));
    setStatuses(Array.from(allStatuses));
    updateMovies(fetchedMovies, selectedGenres, selectedStatus, 1, sortType);
  };

  const sortMovies = (moviesList: MoviesDataTypes[], sortOption: string) => {
    if (sortOption === "all") return moviesList;
    return [...moviesList].sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "premiered-asc":
          return (
            new Date(a.premiered).getTime() - new Date(b.premiered).getTime()
          );
        case "premiered-desc":
          return (
            new Date(b.premiered).getTime() - new Date(a.premiered).getTime()
          );
        default:
          return 0;
      }
    });
  };

  const updateMovies = (
    moviesList: MoviesDataTypes[],
    filters: string[],
    status: string,
    page: number,
    sortOption: string
  ) => {
    let filteredMovies = moviesList;

    if (filters.length > 0) {
      filteredMovies = moviesList.filter((movie) =>
        filters.every((filter) => movie.genres.includes(filter))
      );
    }

    if (status) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.status === status
      );
    }

    const sortedMovies = sortMovies(filteredMovies, sortOption);

    const moviesPerPage: number = 6;
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = page * moviesPerPage;
    setMovies(sortedMovies.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(sortedMovies.length / moviesPerPage));
    setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortType(newSortOption);
    updateMovies(allMovies, selectedGenres, selectedStatus, 1, newSortOption);
  };

  const handleGenreSelection = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      const updatedGenres = prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre];

      updateMovies(allMovies, updatedGenres, selectedStatus, 1, sortType);
      return updatedGenres;
    });
    setGenreCounter((prevCounter) => {
      if (selectedGenres.includes(genre)) {
        return prevCounter - 1;
      } else {
        return prevCounter + 1;
      }
    });
  };

  const handleStatusSelection = (status: string) => {
    setSelectedStatus(status);
    updateMovies(allMovies, selectedGenres, status, 1, sortType);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    updateMovies(allMovies, selectedGenres, selectedStatus, 1, sortType);
  }, [selectedGenres, selectedStatus, sortType, allMovies]);

  const sanitizeHTML = (html?: string) => {
    return DOMPurify.sanitize(html || "");
  };

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      updateMovies(
        allMovies,
        selectedGenres,
        selectedStatus,
        pageNumber,
        sortType
      );
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
    dispatch(toggleFavorite(movie));
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      toast.success("Movie Removed from Favorites!");
    } else {
      toast.success("Movie Added to Favorites!");
    }
  };

  const handleClearFilters = () => {
    setSelectedGenres([]);
    setSelectedStatus("");
    setSortType("all");
    updateMovies(allMovies, [], "", 1, "all");
    setGenreCounter(0);
  };

  return (
    <section className='movies min-h-dvh'>
      <div className='wrapper'>
        <section className='filtering-section py-10 flex md:flex-row flex-col sm:items-center gap-4'>
          <Sorting sortType={sortType} onChange={handleSortChange} />
          <Filters
            genres={genres}
            selectedGenres={selectedGenres}
            onGenreChange={handleGenreSelection}
            statuses={statuses}
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusSelection}
            onClearFilters={handleClearFilters}
            genreCounter={genreCounter}
          />
        </section>
        <div className='grid lg:grid-cols-2 grid-cols-1 place-items-center gap-8 w-full mb-20'>
          {movies.map((movie) => (
            <Link
              href={`/overview/${movie.id}`}
              key={movie.id}
              onClick={(e) => {
                if (e.defaultPrevented) return;
              }}
              className='cursor-pointer rounded hover:shadow-2xl hover:shadow-gray-400 shadow-inherit transition-all duration-200 ease-in-out p-4 w-full h-full flex md:flex-row flex-col gap-4'
            >
              <div className='movie__image w-full md:max-w-80'>
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
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleFavorite(movie);
                      }}
                      className='relative z-10 top-0 right-0 flex items-start'
                      type='button'
                    >
                      {favorites.some((fav) => fav.id === movie.id) ? (
                        <FontAwesomeIcon
                          className='block text-3xl text-green-500'
                          icon={solidHeart}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className='block text-3xl text-green-500'
                          icon={regularHeart}
                        />
                      )}
                    </button>
                  </span>
                  <p
                    className='mediumLarge:text-lg text-md'
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(`${movie.summary.slice(0, 100)}...`),
                    }}
                  />
                </span>
                <span className='flex flex-col gap-1'>
                  <h5>Rating</h5>
                  <span className='flex justify-between w-full '>
                    <p>{movie.rating.average} / 10</p>
                    {movie.genres.join(", ")}
                  </span>
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
                  ? "bg-green-500 text-black"
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
