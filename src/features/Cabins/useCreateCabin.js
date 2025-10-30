import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const query = useQueryClient();
  const { mutate: creatCabin, isPending: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("new cabin successfully created");
      query.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { creatCabin, isCreating };
}

export default useCreateCabin;
