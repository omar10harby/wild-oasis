import React from "react";
import Filters from "../../ui/Filters";
import SortBy from "../../ui/SortBy";

function CabinsOperations() {
  return (
    <div className="flex gap-4">
      <Filters
        fieldName={"discount"}
        options={[
          { label: "All", value: "all" },
          { label: "With discount", value: "with-discount" },
          { label: "No discount", value: "no-discount" },
        ]}
      />
      <SortBy
        options={[
          { label: "Sort by name (A-Z)", value: "name-asc" },
          { label: "Sort by name (Z-A)", value: "name-desc" },
          { label: "Sort by price (low first)", value: "regularPrice-asc" },
          { label: "Sort by price (high first)", value: "regularPrice-desc" },
          { label: "Sort by capacity (low first)", value: "maxCapacity-asc" },
          { label: "Sort by capacity (high first)", value: "maxCapacity-desc" },
        ]}
      />
    </div>
  );
}

export default CabinsOperations;
