"use client";
import { useState } from "react";
interface FiltersDataTypes {
  genres: string[];
  selectedGenres: string[];
  onGenreChange: (genre: string) => void;
  statuses: string[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}
const Filters = ({
  genres,
  selectedGenres,
  onGenreChange,
  statuses,
  selectedStatus,
  onStatusChange,
  onClearFilters,
}: FiltersDataTypes & { onClearFilters: () => void }) => {
  const [genreClick, setGenreClick] = useState<boolean>(false);
  const [statusClick, setStatusClick] = useState<boolean>(false);
  const handleGenreClick = () => {
    setGenreClick((prevGenreClick) => !prevGenreClick);
    setStatusClick(false);
  };
  const handleStatusClick = () => {
    setStatusClick((prevGenreClick) => !prevGenreClick);
    setGenreClick(false);
  };
  return (
    <section className='filter-section py-2'>
      <div className='wrapper'>
        <div className='filter-buttons flex md:flex-row flex-col gap-4'>
          <button
            className='bg-gray-600 relative z-10 text-white rounded p-2 w-full max-w-fit font-semibold'
            type='button'
            onClick={handleGenreClick}
          >
            Genre Filter
          </button>
          <button
            className='bg-gray-600 relative z-10 text-white rounded p-2 w-full max-w-fit font-semibold'
            type='button'
            onClick={handleStatusClick}
          >
            Status Filter
          </button>
          <button
            className='bg-gray-600 relative z-10 text-white rounded p-2 w-full max-w-fit font-semibold'
            type='button'
            onClick={onClearFilters}
          >
            All Filters
          </button>
        </div>
        <div className='relative'>
          <div
            className={`filter-content absolute z-20 left-0 top-4 rounded px-4 overflow-y-auto max-h-[300px] w-full max-w-[300px] flex flex-col gap-2 bg-gray-700 transition-all duration-700 ease-in-out ${
              genreClick ? "h-[1200px] py-4" : "h-[0]"
            } `}
          >
            {genres.map((genre) => (
              <label
                key={genre}
                className='flex justify-end gap-2 cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={selectedGenres.includes(genre)}
                  onChange={() => onGenreChange(genre)}
                  className='hidden'
                />
                <span
                  className={`px-4 py-2 w-full text-center rounded-md border cursor-pointer transition-all ${
                    selectedGenres.includes(genre)
                      ? "bg-green-300 text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {genre}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className='relative'>
          <div
            className={`filter-content absolute z-20 left-0 top-4 rounded px-4 overflow-y-auto max-h-[300px] w-full max-w-[300px] flex flex-col gap-2 bg-gray-700 transition-all duration-700 ease-in-out ${
              statusClick ? "h-[1200px] py-4" : "h-[0]"
            } `}
          >
            {statuses.map((status) => (
              <label
                key={status}
                className='flex justify-start gap-2 cursor-pointer'
              >
                <input
                  type='radio'
                  name='status'
                  value={status}
                  checked={selectedStatus === status}
                  onChange={() => onStatusChange(status)}
                  className='hidden'
                />
                <span
                  className={`px-4 py-2 w-full text-center rounded-md border cursor-pointer transition-all ${
                    selectedStatus === status
                      ? "bg-green-300 text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Filters;
