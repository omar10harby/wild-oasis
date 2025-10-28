import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

function CabinRow({ cabin }) {
  return (
    <tr key={cabin.id} className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-3 px-3">
        <img
          src={cabin.image}
          alt={cabin.name}
          className="w-16 h-12 object-cover rounded"
        />
      </td>
      <td className="py-3 px-3 font-semibold">{cabin.name}</td>
      <td className="py-3 px-3">Fits up to {cabin.maxCapacity} guests</td>
      <td className="py-3 px-3 font-semibold">${cabin.regularPrice}</td>
      <td className="py-3 px-3 text-green-600 font-medium">
        {cabin.discount ? `$${cabin.discount}` : "—"}
      </td>
      <td className="py-3 px-3 text-right">
        <button className="text-gray-600 hover:text-gray-900"> 
          <HiOutlineDotsVertical size={25}/>
        </button>
      </td>
    </tr>
  );
}

export default CabinRow;
