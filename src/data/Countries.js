// src/data/countries.js

export const countries = [
  { name: "Egypt", code: "eg" },
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Saudi Arabia", code: "sa" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "Kuwait", code: "kw" },
  { name: "Qatar", code: "qa" },
  { name: "Bahrain", code: "bh" },
  { name: "Oman", code: "om" },
  { name: "Jordan", code: "jo" },
  { name: "Lebanon", code: "lb" },
  { name: "Palestine", code: "ps" },
  { name: "Syria", code: "sy" },
  { name: "Iraq", code: "iq" },
  { name: "Yemen", code: "ye" },
  { name: "Libya", code: "ly" },
  { name: "Tunisia", code: "tn" },
  { name: "Algeria", code: "dz" },
  { name: "Morocco", code: "ma" },
  { name: "Sudan", code: "sd" },
  { name: "Turkey", code: "tr" },
  { name: "Iran", code: "ir" },
  { name: "Germany", code: "de" },
  { name: "France", code: "fr" },
  { name: "Italy", code: "it" },
  { name: "Spain", code: "es" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "Japan", code: "jp" },
  { name: "China", code: "cn" },
  { name: "India", code: "in" },
  { name: "Brazil", code: "br" },
  { name: "Mexico", code: "mx" },
  { name: "Russia", code: "ru" },
  { name: "South Korea", code: "kr" },
  { name: "Netherlands", code: "nl" },
  { name: "Belgium", code: "be" },
  { name: "Switzerland", code: "ch" },
  { name: "Sweden", code: "se" },
  { name: "Norway", code: "no" },
  { name: "Denmark", code: "dk" },
  { name: "Finland", code: "fi" },
  { name: "Poland", code: "pl" },
  { name: "Greece", code: "gr" },
  { name: "Portugal", code: "pt" },
  { name: "Austria", code: "at" },
  { name: "Czech Republic", code: "cz" },
  { name: "Ireland", code: "ie" },
  { name: "New Zealand", code: "nz" },
  { name: "South Africa", code: "za" },
  { name: "Argentina", code: "ar" },
  { name: "Chile", code: "cl" },
  { name: "Colombia", code: "co" },
  { name: "Peru", code: "pe" },
  { name: "Venezuela", code: "ve" },
  { name: "Thailand", code: "th" },
  { name: "Malaysia", code: "my" },
  { name: "Singapore", code: "sg" },
  { name: "Indonesia", code: "id" },
  { name: "Philippines", code: "ph" },
  { name: "Vietnam", code: "vn" },
  { name: "Pakistan", code: "pk" },
  { name: "Bangladesh", code: "bd" },
  { name: "Nigeria", code: "ng" },
  { name: "Kenya", code: "ke" },
  { name: "Ethiopia", code: "et" },
  { name: "Ghana", code: "gh" },
]
  .filter((country, index, self) => 
    // Remove duplicates based on code
    index === self.findIndex((c) => c.code === country.code)
  )
  .sort((a, b) => a.name.localeCompare(b.name));

// Helper function to get flag URL
export const getFlagUrl = (countryCode) => {
  return `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
};

// Helper function to get country by code
export const getCountryByCode = (code) => {
  return countries.find(c => c.code.toLowerCase() === code.toLowerCase());
};

// Helper function to get country by name
export const getCountryByName = (name) => {
  return countries.find(c => c.name.toLowerCase() === name.toLowerCase());
};