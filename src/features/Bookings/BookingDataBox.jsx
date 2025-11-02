import { format, isToday } from "date-fns";
import React from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaRegCheckCircle } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  return (
    <div className="mt-10 bg-white rounded-md transition-all duration-300 hover:shadow-lg overflow-hidden border border-gray-200">
      <div className="bg-linear-to-r from-[#4f46e5] to-[#6366f1] text-white py-4 px-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <HiOutlineHomeModern size={26} className="md:size-10" />
          <p className="text-sm md:text-base font-semibold ">
            {booking?.numNights} night in Cabin {booking.cabins.name}
          </p>
        </div>

        {/* Right side */}
        <p className="text-xs md:text-sm font-medium text-gray-100  text-left ">
          {format(new Date(booking.startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(booking.startDate))
            ? "Today"
            : formatDistanceFromNow(booking.startDate)}
          ) &mdash; {format(new Date(booking.endDate), "EEE, MMM dd yyyy")}
        </p>
      </div>
      <div className="py-3 lg:py-5 px-6 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6 mt-4">
          {/* Title on mobile only */}
          <h3 className="lg:hidden text-center font-bold text-gray-700 mb-1 text-base">
            Guest info
          </h3>

          {/* Nationality */}
          <div className="flex items-center gap-2">
            <p className="lg:hidden text-sm font-bold w-28">Nationality:</p>
            <img
              src={booking.guests.countryFlag}
              alt="flag"
              className="w-5 h-auto"
            />
          </div>

          {/* Full Name */}
          <div className="flex items-center gap-2">
            <p className="lg:hidden text-sm font-bold w-28">Full Name:</p>
            <p className="text-sm sm:text-base lg:text-lg font-semibold leading-tight">
              {booking.guests.fullName}{" "}
              <span className={`${booking.numGuests === 1 ? "hidden" : ""}`}>
                {" "}
                + {booking.numGuests - 1} guests
              </span>
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2">
            <p className="lg:hidden text-sm font-bold w-28 text-center">
              Email:
            </p>
            <p className="text-xs sm:text-sm lg:text-lg text-gray-600 break-all leading-tight">
              {booking.guests.email}
            </p>
          </div>

          {/* National ID */}
          <div className="flex items-center gap-2">
            <p className="lg:hidden text-sm  w-28">National ID:</p>
            <p className="text-xs sm:text-sm lg:text-lg text-gray-400 leading-tight">
              <span className="">
                <span className="hidden lg:inline-block ">National ID</span>{" "}
                {booking.guests.nationalId}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          <FaRegCheckCircle className="text-[#4f46e5]" />
          <p className="text-lg font-semibold">
            Breakfast included ?{" "}
            <span className="text-base font-normal">
              {booking.hasBreakfast ? "Yes" : "No"}
            </span>
          </p>
        </div>
        <div
          className={`${
            booking.isPaid
              ? "bg-[#dcfce7] text-[#15803d]"
              : " bg-[#fef9c3] text-[#a16207] "
          }
          px-8 py-5 rounded-md
          flex justify-between items-center
          `}
        >
          <div className="flex items-center gap-3">
            <CiDollar size={20} className="md:size-7" />
            <p className=" font-bold">Total price</p>
            <p>
              {formatCurrency(booking.totalPrice)}{" "}
              <span className={`${booking.hasBreakfast ? "" : "hidden"}`}>
                ({formatCurrency(booking.cabinPrice)} cabin + {formatCurrency(booking.extrasPrice)}breakfast )
              </span>
            </p>
          </div>
          <p className="font-semibold">
            {booking.isPaid? 'Paid' : 'Will pay at property'}
          </p>
        </div>
        <p className="text-right text-xs font-semibold text-gray-500 ">Booked {format(new Date(booking.created_at), "EEE, MMM dd yyyy, p")}</p>
      </div>
    </div>
  );
}

export default BookingDataBox;
