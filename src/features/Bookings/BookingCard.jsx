import React, { useState } from "react";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import { HiOutlineDotsVertical, HiOutlineTrash } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { HiMiniArrowDownOnSquare } from "react-icons/hi2";
import { FiCalendar, FiUser, FiMail } from "react-icons/fi";
import DropMenu from "../../ui/DropMenu";

function BookingCard({ booking }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const statusColors = {
    unconfirmed: "bg-[#e0f2fe] text-[#0369a1]",
    "checked-in": "bg-[#dcfce7] text-[#15803d]",
    "checked-out": "bg-[#e5e7eb] text-[#374151]",
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hovshadow duration-3er:shadow-lg transition-00 overflow-visible">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#4f46e5] to-[#6366f1] p-4 flex justify-between items-start rounded-t-lg">
        <div>
          <p className="text-white/80 text-xs font-medium uppercase tracking-wide mb-1">
            Cabin
          </p>
          <h3 className="text-white font-bold text-lg mb-2">
            {booking?.cabins?.name}
          </h3>
          <span
            className={`${
              statusColors[booking.status]
            } px-3 py-1 rounded-full text-xs font-semibold uppercase inline-block`}
          >
            {booking?.status}
          </span>
        </div>
        
        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-all"
          >
            <HiOutlineDotsVertical size={20} className="text-white" />
          </button>
          <DropMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all text-left"
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              <IoEye size={20} className="text-gray-500" />
              <span>View</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all text-left">
              <HiMiniArrowDownOnSquare size={20} className="text-gray-500" />
              <span>Check in</span>
            </button>

            <button
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all text-left"
            >
              <HiOutlineTrash size={20} className="text-gray-500" />
              <span>Delete</span>
            </button>
          </DropMenu>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Guest Info */}
        <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
          <div className="bg-gray-100 p-2 rounded-full">
            <FiUser className="text-gray-600" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Guest
            </p>
            <p className="font-semibold text-gray-800 mb-1">
              {booking?.guests?.fullName}
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FiMail size={14} />
              <span className="break-all">{booking?.guests?.email}</span>
            </div>
          </div>
        </div>

        {/* Date Info */}
        <div className="flex items-start gap-3 pb-3 border-b border-gray-200">
          <div className="bg-gray-100 p-2 rounded-full">
            <FiCalendar className="text-gray-600" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Dates
            </p>
            <p className="font-semibold text-gray-800 mb-1">
              {isToday(new Date(booking?.startDate))
                ? "Today"
                : formatDistanceFromNow(booking?.startDate)}{" "}
              • {booking?.numNights} night{booking?.numNights > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(booking?.startDate), "MMM dd yyyy")} –{" "}
              {format(new Date(booking?.endDate), "MMM dd yyyy")}
            </p>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex justify-between items-center pt-2">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
              Amount
            </p>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(booking?.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;