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
    <div className='filtering-content'>
      <div className='filter-buttons flex w-full text-nowrap md:flex-row flex-col items-center gap-4'>
        <button
          className='w-full sm:max-w-[200px] max-w-full hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-200 ease-in-out dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative z-10  rounded p-2 font-semibold'
          type='button'
          onClick={handleGenreClick}
        >
          Genre Filter
        </button>
        <button
          className='w-full sm:max-w-[200px] max-w-full hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-200 dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite  relative z-10  rounded p-2 font-semibold'
          type='button'
          onClick={handleStatusClick}
        >
          Status Filter
        </button>
        <button
          className='w-full sm:max-w-[200px] max-w-full hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-200 dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite  relative z-10  rounded p-2 font-semibold'
          type='button'
          onClick={onClearFilters}
        >
          Reset All Filters
        </button>
      </div>
      <div className='relative'>
        <div
          className={`filter-content absolute z-20 md:left-0 left-[50%] md:-translate-x-[0] -translate-x-[50%] top-4 rounded px-4 overflow-y-auto max-h-[300px] w-full max-w-[300px] flex flex-col gap-2 dark:bg-gray-700 bg-offWhite transition-all duration-700 ease-in-out ${
            genreClick
              ? "h-[1200px] py-4 border border-solid border-dark"
              : "h-0"
          } `}
        >
          {genres.map((genre) => (
            <label
              key={genre}
              className='flex justify-end gap-2 cursor-pointer '
            >
              <input
                type='checkbox'
                checked={selectedGenres.includes(genre)}
                onChange={() => onGenreChange(genre)}
                className='hidden'
              />
              <span
                className={`hover:bg-green-500 hover:dark:bg-green-500 duration-200 px-4 py-2 dark:text-offWhite w-full text-center rounded-md border cursor-pointer transition-all ${
                  selectedGenres.includes(genre)
                    ? "bg-green-500"
                    : "dark:bg-gray-800 border border-dark border-solid dark:text-offWhite"
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
          className={`filter-content absolute z-20 md:left-0 left-[50%] md:-translate-x-[0] -translate-x-[50%] top-4 rounded px-4 overflow-y-auto max-h-fit w-full max-w-[300px] flex flex-col gap-2 dark:bg-gray-700 bg-offWhite transition-all duration-700 ease-in-out ${
            statusClick
              ? "h-[200px] py-4 border border-solid border-dark"
              : "h-0"
          } `}
        >
          {statuses.map((status) => (
            <label
              key={status}
              className='flex justify-start w-full gap-2 cursor-pointer'
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
                className={`hover:bg-green-500 hover:dark:bg-green-500 duration-200 px-4 dark:text-offWhite py-2 w-full text-center rounded-md border cursor-pointer transition-all ${
                  selectedStatus === status
                    ? "bg-green-500"
                    : "dark:bg-gray-800 border border-dark border-solid dark:text-offWhite"
                }`}
              >
                {status}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Filters;
