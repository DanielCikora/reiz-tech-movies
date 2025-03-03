"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoviesDataTypes } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { toast } from "react-toastify";
import { RootState } from "@/store/store";
import DOMPurify from "dompurify";
const Favorites = () => {
  const [favorites, setFavorites] = useState<MoviesDataTypes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) => state.favorites.movies);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("movieFavorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }
  }, [isFavorite]);

  const handleToggleFavorite = (movie: MoviesDataTypes) => {
    setLoading(true);
    setTimeout(() => {
      const isFavorite = favorites.some((fav) => fav.id === movie.id);
      if (favorites) {
        dispatch(toggleFavorite(movie));
      }
      if (isFavorite) {
        toast.success("Movie Removed from Favorites!");
      } else {
        toast.success("Movie Added to Favorites!");
      }
      setLoading(false);
    }, 800);
  };

  if (loading) {
    return (
      <div className='grid place-items-center w-dvw h-dvh'>
        <div className='loader'></div>
      </div>
    );
  }

  const sanitizeHTML = (html?: string) => {
    return DOMPurify.sanitize(html || "");
  };

  return (
    <section className='favorites pt-24 min-h-dvh dark:bg-dark dark:text-muted bg-offWhite text-dark'>
      <div className='wrapper'>
        <h2 className='md:text-3xl sm:text-2xl text-xl font-bold mb-4 md:text-left text-center'>
          Favorites
        </h2>
        {favorites.length === 0 ? (
          <h1 className='text-center m-auto'>No favorites added yet.</h1>
        ) : (
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-8'>
            {favorites.map((movie) => (
              <Link
                key={movie.id}
                href={`/overview/${movie.id}`}
                className='rounded hover:shadow-xl transition p-4 w-full h-full flex md:flex-row flex-col gap-4'
              >
                <img
                  className='block w-full h-auto md:max-w-80 rounded'
                  src={movie.image.original}
                  alt={movie.name}
                />
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
                      <h5 className='text-lg font-semibold'>Rating</h5>
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
      </div>
    </section>
  );
};
export default Favorites;
