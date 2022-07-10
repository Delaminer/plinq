import { useState, useEffect } from "react";

export default function SearchBar({
  setFunction,
  sortOptions,
  filter,
  defaultSort,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSort] = useState(-1);
  const [filterWith, setFilter] = useState("");

  useEffect(() => {
    const applySearchFilters = (data) => {
      // Step 1: Apply filters
      // TODO - see https://github.com/Delaminer/plinq/issues/17

      // Step 2: Filter by text
      if (filterWith != "") {
        data = data.filter((item) => filter.applyFilter(item, filterWith));
      }

      // Step 3: Sort by search
      if (sortBy != -1) {
        // Apply sorting
        data.sort(sortOptions[sortBy].sort);
      } else if (defaultSort) {
        // No specified sorting, use the default if available
        data.sort(defaultSort);
      }

      return data;
    };

    setFunction(() => applySearchFilters);
  }, [searchTerm, sortBy, filterWith]);

  return (
    <>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className="w-96 rounded-lg bg-gray-1 border border-gray-3 placeholder:text-black pl-6 box-border h-12 mr-12"
        placeholder="Search"
      />
      {sortOptions && sortOptions.length > 0 && (
        <select
          onChange={(e) => setSort(e.target.value)}
          className="w-44 mr-6 bg-gray-1 pl-4 rounded-lg border border-gray-3 box-border h-12"
        >
          <option value={-1}>Sort by</option>
          {sortOptions.map(({ label }, index) => (
            <option key={label} value={index}>{label}</option>
          ))}
        </select>
      )}
      {filter && filter.options && filter.options.length > 0 && (


        <select className="w-44 mr-12 bg-gray-1 pl-4 rounded-lg border border-gray-3 box-border h-12"
        
        onChange={(e) => setFilter(e.target.value)}
        
        >
        <option value="">{filter.label}</option>
        {filter.options.map(({ label, value}) => (


          <option key={value} value={value}>{label}</option>


        )) }
      </select>

      )
      
      
      }
    </>
  );
}
