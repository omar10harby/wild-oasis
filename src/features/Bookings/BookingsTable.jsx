import React from "react";
import TableHeader from "../../ui/TableHeader";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";
import BookingCard from "./BookingCard";

function BookingsTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <p>loading ... </p>;
  console.log(bookings);

  return (
    <div className="mt-10">
      <div className="hidden md:block overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-[800px] w-full table-fixed">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-sm  font-bold uppercase py-3 px-3 text-left w-[8%]">
                Cabin
              </th>
              <th className="text-sm  font-bold uppercase py-3 px-3 text-left w-[27%]">
                Guest
              </th>
              <th className="text-sm  font-bold uppercase py-3 px-3 text-left w-[32%]">
                Dates
              </th>
              <th className="text-sm  font-bold uppercase py-3 px-3 text-left w-[19%]">
                Status
              </th>
              <th className="text-sm  font-bold uppercase py-3 px-3 text-left w-[13%]">
                Amount
              </th>
              <th className="text-sm  font-bold uppercase py-3 px-3 text-right w-[3.2rem]"></th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, index) => (
              <BookingRow booking={booking} key={index} />
            ))}
          </tbody>
        </table>
        <Pagination count={count} />
      </div>
      <div className="md:hidden flex flex-col gap-4">
            {bookings.map((booking)=><BookingCard booking={booking}/>)}
            <Pagination count={count}/>
      </div>
    </div>
  );
}

export default BookingsTable;
