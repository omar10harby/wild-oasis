// src/pages/DashBoard.jsx
import React from "react";
import Stats from "../features/DashBoard/Stats";
import DashboardFilter from "../features/DashBoard/DashboardFilter";
import { useRecentBookings } from "../features/DashBoard/useRecentBookings";
import { useCabins } from "../features/Cabins/useCabins";
import Spinner from "../ui/Spinner";
import { useRecentStays } from "../features/DashBoard/useRecentStays";
import TodayActivity from "../features/DashBoard/TodayActivity";
import DurationChart from "../features/DashBoard/DurationChart";

function DashBoard() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingStays, numDays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex  justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
          Dashboard
        </h2>
        <DashboardFilter />
      </div>

      {/* Statistics Cards */}
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />

      {/* Additional Dashboard Content (Charts, Tables, etc.) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* يمكنك إضافة Charts أو Today's Activity هنا */}
        <TodayActivity/>
        <DurationChart confirmedStays={confirmedStays}/>
      </div>
    </div>
  );
}

export default DashBoard;