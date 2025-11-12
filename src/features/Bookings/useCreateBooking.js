import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useCreateBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: createNewBooking, isPaused: isCreatingBooking } = useMutation(
    {
      mutationFn: (newBooking) => createBooking(newBooking),
      onSuccess: (data) => {
        toast.success(`booking ${data.id} successfully created`);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        navigate("/bookings");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
  return {createNewBooking,isCreatingBooking}
}

export default useCreateBooking;
