import React from "react";
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. عدد الحجوزات
  const numBookings = bookings?.length;

  // 2. إجمالي المبيعات
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3. عدد الليالي المحجوزة
  const checkIns = confirmedStays?.length;

  // 4. معدل الإشغال (Occupancy rate)
  const occupation=confirmedStays.reduce((acc,cur)=>acc + cur.numNights,0)/(numDays +cabinCount)
  
  const occupancyRate = Math.round(occupation * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase className="text-2xl md:text-3xl" />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes className="text-2xl md:text-3xl" />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays className="text-2xl md:text-3xl" />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar className="text-2xl md:text-3xl" />}
        value={`${occupancyRate}%`}
      />
    </div>
  );
}

export default Stats;