import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAvailableCabins } from "../../services/apiBookings";

function useAvailableCabins(startDate, endDate, numGuests) {
  const { data, isLoading } = useQuery({
    queryKey: ["available-cabins", startDate, endDate, numGuests],
    queryFn: () => getAvailableCabins(startDate, endDate, numGuests),
    enabled: !!startDate && !!endDate && !!numGuests,
    staleTime: 1000 * 60 * 2,
  });
  return {
    availableCabins: data?.availableCabins || [],
    allCabins: data?.allCabins || [],
    bookedCabinIds: data?.bookedCabinsIds || [],
    isLoading,
  };
}

export default useAvailableCabins;
