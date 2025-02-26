import axios from "axios";
import Link from "next/link";
import { MoviesDataTypes } from "@/types";
interface MovieDetailsProps {
  params: { id: string };
}
const MovieOverview = async ({ params }: MovieDetailsProps) => {
  const movieId = Number(params.id);
  try {
    const response = await axios.get(`https://api.tvmaze.com/shows/${movieId}`);
    const movie: MoviesDataTypes = response.data;
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
                <button className='mb-6 underline'>ADD TO FAVORITES</button>
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
  } catch (error) {
    return (
      <p className='text-center text-red-500'>
        Movie Overview not found. Please try again later.
      </p>
    );
  }
};
export default MovieOverview;
