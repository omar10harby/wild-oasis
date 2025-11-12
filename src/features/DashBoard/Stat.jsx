// src/features/dashboard/Stat.jsx
import React from "react";

function Stat({ icon, title, value, color }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    indigo: "bg-indigo-100 text-indigo-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col xl:flex-row items-center gap-4">
        {/* Icon */}
        <div className={`${colorClasses[color]} p-3 md:p-4 rounded-full`}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wide font-medium mb-1">
            {title}
          </p>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Stat;