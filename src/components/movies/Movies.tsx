"use client";
import { useState, useEffect } from "react";
import { MoviesDataTypes } from "@/types";
import axios from "axios";
import DOMPurify from "dompurify";
import Link from "next/link";
const Movies = () => {
  const [movies, setMovies] = useState<MoviesDataTypes[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const moviesPerPage: number = 6;
  const fetchMovies = async (page: number) => {
    const response = await axios.get<MoviesDataTypes[]>(
      "https://api.tvmaze.com/shows"
    );
    const allMovies = response.data;
    const startIndex = (page - 1) * moviesPerPage;
    const endIndex = page * moviesPerPage;
    const paginatedMovies = allMovies.slice(startIndex, endIndex);
    setMovies(paginatedMovies);
    setTotalPages(Math.ceil(response.data.length / moviesPerPage));
  };
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);
  const sanitizeHTML = (html?: string) => {
    return DOMPurify.sanitize(html || "");
  };
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
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
  return (
    <section className='movies'>
      <div className='wrapper'>
        <div className='grid grid-cols-3 gap-8 w-full mb-10'>
          {movies.map((movie) => (
            <Link
              href={`/overview/${movie.id}`}
              key={movie.id}
              className='cursor-pointer rounded group hover:bg-white transition-all duration-200 ease-in-out p-4 w-full h-full flex md:flex-row flex-col gap-4'
            >
              <div className='movie__image w-full'>
                <img
                  className='block w-full h-auto'
                  src={movie.image.original}
                  alt={movie.name}
                />
              </div>
              <div className='movie__description group-hover:text-black w-full flex flex-col justify-between'>
                <span>
                  <h2 className='mb-8 text-2xl font-semibold'>{movie.name}</h2>
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
        <div className='pagination-controls flex justify-center mt-4'>
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
