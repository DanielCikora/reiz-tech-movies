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
  const [moviesPerView, setMoviesPerView] = useState<number>(6);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);

  const movieAmount = allMovies.length;

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
    updateMovies(
      fetchedMovies,
      selectedGenres,
      selectedStatus,
      1,
      sortType,
      moviesPerView
    );
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
    sortOption: string,
    moviesPerView: number
  ) => {
    let filteredMovies = moviesList;

    if (filters.length > 0 && !filters.includes("all")) {
      filteredMovies = moviesList.filter((movie) =>
        filters.every((filter) => movie.genres.includes(filter))
      );
    }

    if (status && status !== "all") {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.status === status
      );
    }

    const sortedMovies = sortMovies(filteredMovies, sortOption);
    const startIndex = (page - 1) * moviesPerView;
    const endIndex = page * moviesPerView;
    setMovies(sortedMovies.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(sortedMovies.length / moviesPerView));
    setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortOption = e.target.value;
    setSortType(newSortOption);
    updateMovies(
      allMovies,
      selectedGenres,
      selectedStatus,
      1,
      newSortOption,
      moviesPerView
    );
  };

  const handleGenreSelection = (genre: string) => {
    setSelectedGenres((prevGenres) => {
      let updatedGenres: string[];
      let isSelected = prevGenres.includes(genre);

      if (genre === "all") {
        setGenreCounter(0);
        return [];
      }

      updatedGenres = isSelected
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre];

      setGenreCounter((prevCounter) => {
        const newCounter = isSelected ? prevCounter - 1 : prevCounter + 1;
        return newCounter;
      });

      return updatedGenres;
    });
  };
  const handleStatusSelection = (status: string) => {
    setSelectedStatus(status === "all" ? "" : status);
    updateMovies(allMovies, selectedGenres, status, 1, sortType, moviesPerView);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    updateMovies(
      allMovies,
      selectedGenres,
      selectedStatus,
      1,
      sortType,
      moviesPerView
    );
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
        sortType,
        moviesPerView
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
    updateMovies(allMovies, [], "", 1, "all", moviesPerView);
    setGenreCounter(0);
    setMoviesPerView(6);
  };

  const handlePerViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMoviesPerView = parseInt(event.target.value, 10);
    setMoviesPerView(newMoviesPerView);
    updateMovies(
      allMovies,
      selectedGenres,
      selectedStatus,
      1,
      sortType,
      newMoviesPerView
    );
  };

  return (
    <section className='movies min-h-dvh pt-20'>
      <div className='wrapper'>
        <Filters
          genres={genres}
          selectedGenres={selectedGenres}
          onGenreChange={handleGenreSelection}
          statuses={statuses}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusSelection}
          onClearFilters={handleClearFilters}
          genreCounter={genreCounter}
          sortType={sortType}
          onChange={handleSortChange}
          perViewChange={handlePerViewChange}
          perViewValue={moviesPerView}
          movieAmount={movieAmount}
        />
        {movies.length === 0 ? (
          <div className='grid justify-items-center w-full h-dvh pt-52'>
            <h2 className='text-3xl font-semibold'>No Movies Found!</h2>
          </div>
        ) : (
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
                  <span className='mb-10'>
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
                        __html: sanitizeHTML(
                          `${movie.summary.slice(0, 100)}...`
                        ),
                      }}
                    />
                  </span>
                  <span className='flex w-full justify-between gap-4'>
                    <span className='flex flex-col h-fit w-fit text-nowrap'>
                      <h5 className='text-md font-medium'>Rating</h5>
                      {movie.rating.average ? (
                        <p className='text-md font-medium'>
                          {movie.rating.average} / 10
                        </p>
                      ) : (
                        <p className='text-md font-medium'>No Rating</p>
                      )}
                    </span>
                    <p className='text-md font-medium text-wrap w-fit'>
                      {movie.genres.join(", ")}
                    </p>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className='pagination-controls flex justify-center items-center gap-2 pb-10'>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`font-semibold w-20 h-10 mx-1 rounded-md ${
              currentPage === 1
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-800 hover:bg-green-500"
            } text-white`}
          >
            Prev
          </button>
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              disabled={page === currentPage}
              className={`font-semibold w-10 h-10 mx-1 rounded-md ${
                page === currentPage
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-white hover:bg-green-500"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`font-semibold w-20 h-10 mx-1 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-800 hover:bg-green-500"
            } text-white`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
export default Movies;
