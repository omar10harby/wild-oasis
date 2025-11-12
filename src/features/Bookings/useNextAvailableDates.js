import { useQuery } from "@tanstack/react-query";
import { getNextAvailableDates } from "../../services/apiBookings";

function useNextAvailableDates(numGuests) {
  const { data: cabinsWithDates, isLoading } = useQuery({
    queryKey: ["next-available-dates", numGuests],
    queryFn: () => getNextAvailableDates(numGuests),
    enabled: !!numGuests && numGuests > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // ترتيب حسب أقرب تاريخ متاح
  const sortedCabins = cabinsWithDates?.sort((a, b) => {
    if (a.isAvailableNow && !b.isAvailableNow) return -1;
    if (!a.isAvailableNow && b.isAvailableNow) return 1;
    return new Date(a.nextAvailableDate) - new Date(b.nextAvailableDate);
  });

  return {
    cabinsWithDates: sortedCabins || [],
    isLoading,
  };
}

export default useNextAvailableDates;
