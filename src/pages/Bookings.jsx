import React from "react";
import BookingsTable from "../features/Bookings/BookingsTable";
import BookingTableOperations from "../features/Bookings/BookingTableOperations";
import { Link } from "react-router-dom";
function Bookings() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-700">Bookings</h2>
        <BookingTableOperations />
      </div>
      <BookingsTable />
      <Link
        to={"/bookings/createBooking"}
        className=" inline-block bg-[#4f46e5] px-4 py-3 mt-5  text-white rounded-md font-semibold "
      >New Booking</Link>
    </div>
  );
}

export default Bookings;
