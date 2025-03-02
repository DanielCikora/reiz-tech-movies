"use client";
import { useState } from "react";
interface FiltersDataTypes {
  genres: string[];
  selectedGenres: string[];
  onGenreChange: (genre: string) => void;
  statuses: string[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  genreCounter: number;
}
const Filters = ({
  genres,
  selectedGenres,
  onGenreChange,
  statuses,
  selectedStatus,
  onStatusChange,
  onClearFilters,
  genreCounter,
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
    <div className='filtering-content w-full'>
      <div className='filter-buttons flex w-full text-nowrap md:flex-row flex-col items-center lg:gap-4 gap-2'>
        <button
          className={`md:text-md text-sm ${
            genreClick ? "z-50" : "z-20"
          } w-full sm:max-w-[300px] max-w-full hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-100 ease-in-out dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative rounded p-2 font-semibold`}
          type='button'
          onClick={handleGenreClick}
        >
          Genre Filter ( {genreCounter} )
          <div
            className={`filter-content absolute z-50 md:left-0 left-[50%] md:-translate-x-[0] -translate-x-[50%] top-10 rounded px-4 overflow-y-auto max-h-[300px] w-full flex flex-col gap-2 dark:bg-gray-700 bg-offWhite transition-all duration-700 ease-in-out ${
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
                  className={`md:text-md text-sm hover:bg-green-500 hover:dark:bg-green-500 duration-100 lg:px-4 px-2 py-2 dark:text-offWhite w-full text-center rounded-md border cursor-pointer transition-all ${
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
        </button>
        <button
          className={`md:text-md text-sm ${
            genreClick ? "z-40" : "z-20"
          } w-full sm:max-w-[300px] max-w-full hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-100 dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative z-20 rounded p-2 font-semibold`}
          type='button'
          onClick={handleStatusClick}
        >
          Status Filter
          <div
            className={`filter-content absolute z-20 md:left-0 left-[50%] md:-translate-x-[0] -translate-x-[50%] top-10 rounded px-4 overflow-y-auto max-h-fit w-full sm:max-w-[300px] flex flex-col gap-2 dark:bg-gray-700 bg-offWhite transition-all duration-700 ease-in-out ${
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
                  className={`md:text-md text-sm hover:bg-green-500 hover:dark:bg-green-500 duration-100 lg:px-4 px-2 dark:text-offWhite py-2 w-full text-center rounded-md border cursor-pointer transition-all ${
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
        </button>
        <button
          className='md:text-md text-sm w-full sm:max-w-[300px] max-w-full hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-100 dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative rounded p-2 font-semibold'
          type='button'
          onClick={onClearFilters}
        >
          Reset All Filters
        </button>
      </div>
    </div>
  );
};
export default Filters;
