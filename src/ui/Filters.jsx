import { option } from "framer-motion/client";
import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import DropMenu from "./DropMenu";

function Filters({ fieldName, options }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(fieldName) || options[0].value;
  function handleClick(value) {
    searchParams.set(fieldName, value);
    setSearchParams(searchParams);
  }
  return (
    <>
      <div className="hidden md:flex bg-white gap-1.5 p-1.5 shadow-sm rounded">
        {options.map((option) => (
          <button
            className={`${
              currentFilter === option.value && "bg-[#4f46e5] text-white"
            } px-2 py-1 text-sm font-semibold transition-all duration-150 hover:bg-[#4f46e5] hover:text-white rounded`}
            value={option.value}
            onClick={(e) => handleClick(e.target.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className=" relative md:hidden">
        <button onClick={() => setIsFilterOpen(true)}>
          <IoFilterOutline size={20} />
        </button>
        <DropMenu isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)}>
          {options.map((option) => (
            <button
              className={`${
                currentFilter === option.value && "bg-[#4f46e5] text-white"
              } w-full px-2 py-1 text-sm font-semibold transition-all duration-150 hover:bg-[#4f46e5] hover:text-white rounded`}
              value={option.value}
              onClick={(e) => {
                handleClick(e.target.value)
                 setIsFilterOpen(false)
            }}
            >
              {option.label}
            </button>
          ))}
        </DropMenu>
      </div>
    </>
  );
}

export default Filters;
