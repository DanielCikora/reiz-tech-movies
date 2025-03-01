import { SortingDataTypes } from "@/types";
const Sorting: React.FC<SortingDataTypes> = ({ onChange }) => {
  return (
    <select
      className='bg-gray-600 relative z-10 text-white rounded p-2 w-full max-w-fit font-semibold'
      onChange={onChange}
    >
      <option value='all'>No sort</option>
      <option value='name-asc'>Name Ascending</option>
      <option value='name-desc'>Name Descending</option>
      <option value='premiered-asc'>Premiered Ascending)</option>
      <option value='premiered-desc'>Premiered Descending</option>
    </select>
  );
};
export default Sorting;
