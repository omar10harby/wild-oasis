import React, { useState } from "react";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { HiMiniArrowDownOnSquare } from "react-icons/hi2";
import DropMenu from "../../ui/DropMenu";
import { useNavigate } from "react-router-dom";
function BookingRow({ booking }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate()
  const statusColors = {
    unconfirmed: "bg-[#e0f2fe] text-[#0369a1]",
    "checked-in": "bg-[#dcfce7] text-[#15803d]",
    "checked-out": "bg-[#e5e7eb] text-[#374151]",
  };
  return (
    <tr className="border-b border-gray-200 ">
      {/* Cabin */}
      <td className="text-base py-3 px-3 text-left w-[8%] font-bold text-gray-700">
        {booking?.cabins?.name}
      </td>

      {/* Guest */}
      <td className="text-sm py-3 px-3 text-left w-[27%] text-gray-700">
        <div className="">
          <span className="block font-semibold mb-1">
            {" "}
            {booking?.guests?.fullName}
          </span>
          <span className="text-xs text-gray-500 font-semibold">
            {booking?.guests?.email}
          </span>
        </div>
      </td>

      {/* Dates */}
      <td className="text-sm py-3 px-3 text-left w-[32%] text-gray-700">
        <span className="block font-semibold mb-1">
          {isToday(new Date(booking?.startDate))
            ? "Today"
            : formatDistanceFromNow(booking?.startDate)}{" "}
          &rarr; {booking?.numNights} night stay
        </span>
        <span className="text-xs text-gray-500 font-semibold">
          {format(new Date(booking?.startDate), "MMM dd yyyy")} –{" "}
          {format(new Date(booking?.endDate), "MMM dd yyyy")}
        </span>
      </td>

      {/* Status */}
      <td className={` text-xs py-3 px-3 font-semibold text-left w-[19%]  `}>
        <span
          className={`${
            statusColors[booking.status]
          } px-2 py-1 rounded-lg uppercase`}
        >
          {" "}
          {booking?.status}
        </span>
      </td>

      {/* Amount */}
      <td className="text-sm py-3 px-3 text-left w-[13%] font-semibold text-gray-900">
        {formatCurrency(booking?.totalPrice)}
      </td>

      {/* Actions */}
      <td className="text-sm py-3 px-3 text-right w-[3.2rem]">
        {/* مثلًا زر تفاصيل أو حذف */}
        <div className=" relative inline-block">
          <button onClick={()=>setIsMenuOpen((prev)=>!prev)}>
            <HiOutlineDotsVertical size={20} />
          </button>
          <DropMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <button
              className="w-full flex items-center  gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
              onClick={() => {
                setIsMenuOpen(false);
                navigate(`/bookings/${booking.id}`)
              }}
            >
              <IoEye size={20} className="text-gray-500" />
              <span>See details</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all">
              <HiMiniArrowDownOnSquare size={25} className="text-gray-500" />
              <span>Duplicate</span>
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
            >
              <HiOutlineTrash size={25} className="text-gray-500" />
              <span>Delete</span>
            </button>
          </DropMenu>
        </div>
      </td>
    </tr>
  );
}

export default BookingRow;
