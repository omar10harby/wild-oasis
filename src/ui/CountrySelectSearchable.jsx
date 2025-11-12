

import { useState, useRef, useEffect } from "react";
import { countries, getFlagUrl } from "../data/Countries";
import { useOutSideClick } from "../hooks/useOutSideClick";

function CountrySelectSearchable({ value, onChange, error, disabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    value ? countries.find(c => c.name === value || c.code === value) : null
  );

  const ref = useOutSideClick(() => setIsOpen(false));

  // Filter countries based on search
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (country) => {
    setSelectedCountry(country);
    onChange({
      nationality: country.name,
      countryFlag: getFlagUrl(country.code),
      countryCode: country.code
    });
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="w-full relative" ref={ref}>
      {/* Selected Country Display / Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-md text-left flex items-center justify-between ${
          error ? "border-red-500" : "border-gray-300 focus:border-[#4f46e5]"
        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer hover:border-[#4f46e5]"}`}
      >
        {selectedCountry ? (
          <div className="flex items-center gap-2">
            <img
              src={getFlagUrl(selectedCountry.code)}
              alt={selectedCountry.name}
              className="w-6 h-4 object-cover rounded shadow-sm"
            />
            <span className="font-medium text-gray-800">{selectedCountry.name}</span>
          </div>
        ) : (
          <span className="text-gray-500">Select a country...</span>
        )}
        
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
            <input
              type="text"
              placeholder="Search country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#4f46e5] text-sm"
              autoFocus
            />
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-64">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <button
                  key={`${country.code}-${index}`}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-100 transition-colors text-left ${
                    selectedCountry?.code === country.code ? "bg-blue-50" : ""
                  }`}
                >
                  <img
                    src={getFlagUrl(country.code)}
                    alt={country.name}
                    className="w-8 h-6 object-cover rounded shadow-sm"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {country.name}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-gray-500 text-sm">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}

      {error && (
        <span className="text-red-500 text-xs mt-1 block">{error}</span>
      )}
    </div>
  );
}

export default CountrySelectSearchable;