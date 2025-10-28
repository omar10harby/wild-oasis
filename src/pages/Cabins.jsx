import React from "react";
import CabinsTable from "../features/Cabins/CabinsTable";
import AddCabin from "../features/Cabins/AddCabin";

function Cabins() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700">Cabins</h2>
      <CabinsTable/>
      <AddCabin/>
    </div>
  );
}

export default Cabins;
