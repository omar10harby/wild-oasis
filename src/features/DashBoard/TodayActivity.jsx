// src/features/dashboard/TodayActivity.jsx
import React from "react";
import { useTodayActivity } from "./useTodayActivity";
import ActivityItem from "./ActivityItem";
import Spinner from "../../ui/Spinner";
import { HiOutlineClipboardList } from "react-icons/hi";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-2">
          <HiOutlineClipboardList className="text-white text-2xl" />
          <h3 className="text-lg md:text-xl font-bold text-white">
            Today's Activity
          </h3>
        </div>
      </div>

      {/* Activities List */}
      <div className="max-h-96 overflow-y-auto">
        {!activities || activities.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-400 font-medium">
              No activities for today
            </p>
          </div>
        ) : (
          <div>
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TodayActivity;