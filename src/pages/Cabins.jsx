import React from "react";
import CabinsTable from "../features/Cabins/CabinsTable";
import AddCabin from "../features/Cabins/AddCabin";
import CabinsOperations from "../features/Cabins/CabinsOperations";

function Cabins() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700">Cabins</h2>
        <CabinsOperations/>
      </div>
      <CabinsTable />
      <AddCabin />
    </div>
  );
}

export default Cabins;
