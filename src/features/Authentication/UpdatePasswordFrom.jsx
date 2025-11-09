import { useForm } from "react-hook-form";
import FormError from "./FormError";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordFrom() {
  const { updateUser, isUpdating } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const password=watch("password")
  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 p-6 rounded-lg mx-auto"
    >
      {/* Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-600 transition"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <FormError error={errors.password?.message} />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword" className="font-medium">
          Confirm password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-600 transition"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        <FormError error={errors.confirmPassword?.message} />
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <button
          disabled={isUpdating}
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md w-fit  disabled:opacity-50 transition active:scale-95"
        >
          {isUpdating ? "updating...." : "Update user"}
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordFrom;
