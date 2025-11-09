import { useMutation } from "@tanstack/react-query";
import React from "react";
import { SignUp } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: SignUp,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! please verfiy the new account from the user's"
      );
    },
    onError: (err) => {
      console.error("⚠️ Signup failed:", err.message);

      toast.error(err.message);
    },
  });
return {signUp,isSigningUp}
}

export default useSignUp;
