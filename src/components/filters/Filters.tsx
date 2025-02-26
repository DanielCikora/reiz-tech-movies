"use client";

const Filters = () => {
  const dropdownFilterOptions = [
    { id: 0, text: "No sort", value: "" },
    { id: 1, text: "SomeFilter1", value: "somefilter1" },
    { id: 2, text: "SomeFilter2", value: "somefilter2" },
    { id: 3, text: "SomeFilter3", value: "somefilter3" },
    { id: 4, text: "SomeFilter4", value: "somefilter4" },
  ];
  return (
    <section className='filter-section'>
      <div className='wrapper'>
        <div className='filter-content'>
          <select>
            {dropdownFilterOptions.map(({ id, text, value }) => (
              <option value={value} key={id}>
                {text}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};
export default Filters;
