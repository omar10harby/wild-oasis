import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: DeleteBooking, isPending: isDeleteing } = useMutation({
    mutationFn: (bookingId) => deleteBooking(bookingId),
    onSuccess: (_, bookingId) => {
      toast.success(`Booking #${bookingId} successfully deleted`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { DeleteBooking, isDeleteing };
}

export default useDeleteBooking;
