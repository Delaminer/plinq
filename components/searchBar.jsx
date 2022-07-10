import { useState, useEffect } from "react";
import { searchQueryRoughlyMatch } from "./tools";

export default function SearchBar({
  setFunction, // Function: array of objects -> array of filtered, sorted objects for display
  sortOptions, // [ { label: ..., comparator: ... } ]
  nameExtractor, // nameExtractor(object) contains all searchable text tokens of object
  filter, // { label: ..., options: { label: ..., value: keyof data-object }, key: keyof data-object }
  defaultSort,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSort] = useState("-1");
  const [filterWith, setFilter] = useState("");

  useEffect(() => {
    const applySearchFilters = (data) => {
      // Step 1: Apply filters
      // Filters include the search query and custom dropdowns.
      if (searchTerm.trim().length > 0) {
        data = data.filter((item) => searchQueryRoughlyMatch(searchTerm.trim(), nameExtractor(item)));
      }
      if (filterWith.trim().length > 0) {
        data = data.filter((item) => item[filter.key] === filterWith);
      }

      // Step 2: Sort
      // If a sorting method is specified, sort by that method first.
      // If a non-empty search query exists, break ties by search relevancy (tokens matched).
      const primarySorter = parseInt(sortBy) === -1 ? defaultSort : sortOptions[parseInt(sortBy)].comparator;
      const secondarySorter = searchTerm.trim().length > 0 ? (a, b) => {
        const aTokenCount = searchQueryRoughlyMatch(searchTerm.trim(), nameExtractor(a));
        const bTokenCount = searchQueryRoughlyMatch(searchTerm.trim(), nameExtractor(b));
        return bTokenCount - aTokenCount;
      } : undefined;

      data = data.sort((a, b) => {
        let result = 0;
        if (primarySorter !== undefined) result = primarySorter(a, b);
        if (result === 0 && secondarySorter !== undefined) result = secondarySorter(a, b);
        return result;
      });

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
      <div className="flex gap-2 flex-wrap">
        {sortOptions && sortOptions.length > 0 && (
          <select
            onChange={(e) => setSort(e.target.value)}
            className="w-44 bg-gray-1 pl-3 rounded-lg border border-gray-3 h-12"
          >
            <option value={-1}>Sort by</option>
            {sortOptions.map(({label}, index) => (
              <option key={label} value={index}>{label}</option>
            ))}
          </select>
        )}
        {filter && filter.options && filter.options.length > 0 && (
        <select className="w-44 bg-gray-1 pl-3 rounded-lg border border-gray-3 h-12"
          onChange={(e) => setFilter(e.target.value)}>
          <option value="">{filter.label}</option>
          {filter.options.map(({ label, value }) => (
            <option key={value} value={value}>{label}</option>
          )) }
        </select>)}
      </div>
    </>
  );
}
