"use client";
import { ChangeEventHandler, useState } from "react";
interface FiltersDataTypes {
  genres: string[];
  selectedGenres: string[];
  onGenreChange: (genre: string) => void;
  statuses: string[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  genreCounter: number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  sortType: string;
  perViewChange: ChangeEventHandler<HTMLSelectElement>;
  perViewValue: number;
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
  onChange,
  sortType,
  perViewChange,
  perViewValue,
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
  const handleClearFilters = () => {
    onClearFilters();
    setGenreClick(false);
    setStatusClick(false);
  };
  return (
    <section className='filtering-section py-10 flex md:flex-row flex-col sm:items-center lg:gap-4 gap-2 w-full'>
      <div className='filtering-content flex w-full text-nowrap md:flex-row flex-col md:items-start sm:items-start items-center lg:gap-4 gap-2'>
        <select
          className='md:text-md text-sm w-full text-center lg:max-w-[300px] md:max-w-[200px] max-w-[300px]  dark:bg-gray-700 bg-transparent cursor-pointer border border-solid border-dark dark:text-offWhite relative z-10 rounded py-[8px] font-semibold'
          onChange={onChange}
          value={sortType}
        >
          <option value='all'>No sort</option>
          <option value='name-asc'>Name Ascending</option>
          <option value='name-desc'>Name Descending</option>
          <option value='premiered-asc'>Premiered Ascending</option>
          <option value='premiered-desc'>Premiered Descending</option>
        </select>
        <button
          className={`md:text-md text-sm ${
            genreClick ? "z-50" : "z-20"
          } w-full max-w-[300px] hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-100 ease-in-out dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative rounded p-2 font-semibold`}
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
            <label className='flex justify-end gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={selectedGenres.length === 0}
                onChange={() => onGenreChange("all")}
                className='hidden'
              />
              <span
                className={`md:text-md text-sm hover:bg-green-500 hover:dark:bg-green-500 duration-100 lg:px-4 px-2 py-2 dark:text-offWhite w-full text-center rounded-md border cursor-pointer transition-all ${
                  selectedGenres.length === 0
                    ? "bg-green-500"
                    : "dark:bg-gray-800 border border-dark border-solid dark:text-offWhite"
                }`}
              >
                All
              </span>
            </label>
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
          } w-full max-w-[300px] hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-100 dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative z-20 rounded p-2 font-semibold`}
          type='button'
          onClick={handleStatusClick}
        >
          Status Filter
          <div
            className={`filter-content absolute z-20 md:left-0 left-[50%] md:-translate-x-[0] -translate-x-[50%] top-10 rounded px-4 overflow-y-auto max-h-fit w-full sm:max-w-[300px] flex flex-col gap-2 dark:bg-gray-700 bg-offWhite transition-all duration-700 ease-in-out ${
              statusClick
                ? "h-[300px] py-4 border border-solid border-dark"
                : "h-0"
            } `}
          >
            <label className='flex justify-start w-full gap-2 cursor-pointer'>
              <input
                type='radio'
                name='status'
                value=''
                checked={selectedStatus === ""}
                onChange={() => onStatusChange("")}
                className='hidden'
              />
              <span
                className={`md:text-md text-sm hover:bg-green-500 hover:dark:bg-green-500 duration-100 lg:px-4 px-2 dark:text-offWhite py-2 w-full text-center rounded-md border cursor-pointer transition-all ${
                  selectedStatus === ""
                    ? "bg-green-500"
                    : "dark:bg-gray-800 border border-dark border-solid dark:text-offWhite"
                }`}
              >
                All
              </span>
            </label>
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
          className='md:text-md text-sm w-full max-w-[300px] hover:bg-green-500 hover:dark:bg-green-500 transition-all duration-100 dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative rounded p-2 font-semibold'
          type='button'
          onClick={handleClearFilters}
        >
          Reset All Filters
        </button>
        <select
          className='text-center md:text-md text-sm w-full max-w-fit dark:bg-gray-700 bg-transparent border border-solid border-dark dark:text-offWhite relative rounded p-2 font-semibold'
          onChange={perViewChange}
          value={perViewValue}
        >
          <option value={6}>6</option>
          <option value={12}>12</option>
          <option value={18}>18</option>
          <option value={24}>24</option>
          <option value={30}>30</option>
        </select>
      </div>
    </section>
  );
};
export default Filters;
