import React from "react";
import { useForm } from "react-hook-form";
import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";
import FormError from "./FormError";
function UpdateUserData() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      fullName: user?.user_metadata.fullName || "",
      avatar: "",
    },
  });

function onSubmit({ fullName, avatar }) {
  const avatarFile = avatar && avatar.length > 0 ? avatar[0] : null;

  if (!avatarFile) updateUser({ fullName });
  else updateUser({ fullName, avatar: avatarFile });
}

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 p-6 rounded-lg mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-medium">
          Email address
        </label>
        <input
          type="text"
          id="email"
          disabled
          className="border border-gray-300 rounded-md px-3 py-2 outline-none  transition disabled:bg-gray-300 cursor-not-allowed"
          {...register("email")}
        />
        <FormError error={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fullName" className="font-medium">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-indigo-600 transition"
          {...register("fullName", {
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters",
            },
          })}
        />
        <FormError error={errors.fullName?.message} />
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <label htmlFor="avatar" className="font-medium">
            Profile picture{" "}
            <span className="text-gray-400 text-sm">(Optional)</span>
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            className="border border-gray-300 rounded-md px-2 py-1.5 w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-md 
                     file:border-0 file:text-sm file:font-semibold file:bg-[#4f46e5] file:text-white 
                     hover:file:bg-[#4338ca] cursor-pointer"
            {...register("avatar")}
          />
        </div>
      </div>
      {/* Submit */}
      <div className="flex justify-end">
        <button
          disabled={isUpdating}
          className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md w-fit  disabled:opacity-50 transition active:scale-95"
        >
          {isUpdating ? "Updating" : "Update account"}
        </button>
      </div>
    </form>
  );
}

export default UpdateUserData;
