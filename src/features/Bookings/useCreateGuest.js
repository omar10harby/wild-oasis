import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGuest } from "../../services/apiGuests";
import toast from "react-hot-toast";

function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutateAsync: createNewGuest, isPending: isCreating } = useMutation({
    mutationFn: (newGuest) => createGuest(newGuest),
    onSuccess: (data) => {
      toast.success(`Guest ${data.fullName} created successfully`);
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createNewGuest, isCreating };
}

export default useCreateGuest