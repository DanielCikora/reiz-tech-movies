"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MoviesDataTypes } from "@/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const MovieOverview = () => {
  const [movie, setMovie] = useState<MoviesDataTypes | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.movies);
  const params = useParams();

  const movieId = params.id;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.tvmaze.com/shows/${movieId}`
        );
        setMovie(response.data);
      } catch (error: any) {
        toast.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  const handleToggleFavorite = () => {
    if (movie) {
      dispatch(toggleFavorite(movie));
    }
  };

  if (loading) return <h1 className='text-center m-auto'>Loading...</h1>;
  if (!movie)
    return (
      <h1 className='text-center text-red-500 m-auto'>Movie not found.</h1>
    );

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const buttonText = isFavorite ? "Remove from Favorites" : "Add to Favorites";
  const icon = isFavorite ? solidHeart : regularHeart;

  return (
    <section className='overview py-36'>
      <div className='wrapper'>
        <div className='overview-content flex gap-6 md:flex-row flex-col w-full'>
          <div className='w-fit'>
            <img
              className='block w-full h-auto'
              src={movie.image.original}
              alt={movie.name}
            />
          </div>
          <div className='w-full flex flex-col justify-between max-w-[800px]'>
            <div>
              <h2 className='text-3xl font-bold mb-2'>{movie.name}</h2>
              <button
                onClick={handleToggleFavorite}
                className='absolute z-10 top-0 right-0 flex items-center gap-2'
                type='button'
              >
                <FontAwesomeIcon
                  className='text-3xl text-green-300'
                  icon={icon}
                />
                <span>{buttonText}</span>
              </button>
              <p
                className='text-xl'
                dangerouslySetInnerHTML={{ __html: movie.summary }}
              />
            </div>
            <div className='text-lg'>
              <p>Premiered: {movie.premiered}</p>
              <p>Ended: {movie.ended}</p>
              <p>Average runtime: {movie.runtime} minutes</p>
              <p>Show status: {movie.status}</p>
              <p>Language: {movie.language}</p>
              <p>Average rating: {movie.rating.average}</p>
              <p>
                Official site:{" "}
                <Link
                  className='underline text-green-300'
                  href={movie.officialSite}
                >
                  Official Site
                </Link>
              </p>
              <p>Genres: {movie.genres.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieOverview;
