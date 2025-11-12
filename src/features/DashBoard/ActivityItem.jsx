// src/features/dashboard/ActivityItem.jsx
import React from "react";
import { HiMiniArrowDownOnSquare, HiMiniArrowUpOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function ActivityItem({ activity }) {
  const navigate = useNavigate();
  const { id, status, guests, numNights } = activity;

  return (
    <div className="flex items-center justify-between gap-3 py-3 px-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
      {/* Left Side - Icon & Guest Info */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Status Icon */}
        <div
          className={`p-2 rounded-full ${
            status === "unconfirmed"
              ? "bg-green-100"
              : "bg-blue-100"
          }`}
        >
          {status === "unconfirmed" ? (
            <HiMiniArrowDownOnSquare
              className="text-green-600"
              size={18}
            />
          ) : (
            <HiMiniArrowUpOnSquare className="text-blue-600" size={18} />
          )}
        </div>

        {/* Guest Info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">
            {guests.fullName}
          </p>
          <p className="text-xs text-gray-500">
            {status === "unconfirmed" ? "Arriving" : "Departing"} • {numNights}{" "}
            night{numNights > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Right Side - Country Flag & Button */}
      <div className="flex items-center gap-3">
        {guests.countryFlag && (
          <img
            src={guests.countryFlag}
            alt={`${guests.nationality} flag`}
            className="w-6 h-4 object-cover rounded shadow-sm hidden sm:block"
          />
        )}
        <button
          onClick={() => navigate(`/bookings/${id}`)}
          className="text-xs font-semibold px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors whitespace-nowrap"
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default ActivityItem;