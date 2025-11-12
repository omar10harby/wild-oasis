import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: CheckOut, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (_, bookingId) => {
      toast.success(`Booking ${bookingId} is successfully checked out `);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
      navigate("/bookings");
    },
  });
  return { CheckOut, isCheckingOut };
}

export default useCheckOut;
