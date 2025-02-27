"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MoviesDataTypes } from "@/types";
const Favorites = () => {
  const [favorites, setFavorites] = useState<MoviesDataTypes[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("movieFavorites");
      setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
    }
  }, []);
  return (
    <section className='favorites min-h-dvh'>
      <div className='wrapper'>
        <h2 className='text-3xl font-bold mb-4 pl-4'>Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites added yet.</p>
        ) : (
          <div className='grid grid-cols-3 gap-8'>
            {favorites.map((movie) => (
              <Link
                key={movie.id}
                href={`/overview/${movie.id}`}
                className='rounded shadow-lg hover:shadow-xl transition p-4 w-full h-full flex flex-col'
              >
                <img
                  className='w-full h-auto rounded'
                  src={movie.image.original}
                  alt={movie.name}
                />
                <h2 className='text-xl font-semibold mt-2'>{movie.name}</h2>
                <p className='text-gray-600'>{movie.genres.join(", ")}</p>
                <p className='text-gray-800 font-bold'>
                  {movie.rating.average} / 10
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default Favorites;
