import { DarkModeButtonDataTypes } from "@/types";
const DarkModeButton: React.FC<DarkModeButtonDataTypes> = ({
  handleDarkModeToggle,
  isDarkMode,
}) => {
  return (
    <button
      onClick={handleDarkModeToggle}
      className='p-2 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center'
    >
      {!isDarkMode && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-yellow-500'
        >
          <circle cx='12' cy='12' r='5' />
          <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
        </svg>
      )}
      {isDarkMode && (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='text-gray-200'
        >
          <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
        </svg>
      )}
    </button>
  );
};
export default DarkModeButton;
