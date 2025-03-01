import { SortingDataTypes } from "@/types";
const Sorting: React.FC<SortingDataTypes> = ({ onChange }) => {
  return (
    <select
      className='w-full text-center sm:max-w-[200px] max-w-full dark:bg-gray-700 bg-transparent cursor-pointer border border-solid border-dark dark:text-offWhite  relative z-10 rounded py-[10px] font-semibold'
      onChange={onChange}
    >
      <option value='all'>No sort</option>
      <option value='name-asc'>Name Ascending</option>
      <option value='name-desc'>Name Descending</option>
      <option value='premiered-asc'>Premiered Ascending</option>
      <option value='premiered-desc'>Premiered Descending</option>
    </select>
  );
};
export default Sorting;
