import React from "react";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSortByValue = searchParams.get("sortBy") || "";
  function handleSelect(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  return (
    <select
      value={currentSortByValue}
      onChange={(e) => handleSelect(e.target.value)}
      className="text-sm border border-gray-300 outline-none px-1 rounded-md"
    >
      {options?.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={`text-sm ${
            currentSortByValue === option.value ? "bg-[#4f46e5] text-white" : ""
          }`}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
