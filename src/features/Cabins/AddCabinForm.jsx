import { useForm } from "react-hook-form";
import { RiCloseLargeLine } from "react-icons/ri";
import useCreateCabin from "./useCreateCabin";
import { div } from "framer-motion/client";
import useEditCabin from "./useEditCabin";

function AddCabinForm({ cabinToEdit = {}, onClose }) {
  const { creatCabin, isCreating } = useCreateCabin();
  const { isEditing, EditCabin } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isEditing;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      EditCabin(
        { newCabinData: { ...data, image:image }, id:editId },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      creatCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset(); // يرجع الفورم فاضي

            onClose();
          },
        }
      );
    }
  }

  return (
    <div>
      <div className="absolute top-5 right-5 cursor-pointer" onClick={onClose}>
        <RiCloseLargeLine size={25} />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 w-full flex flex-col gap-5 text-sm"
      >
        {/* أول صف */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-600 font-medium mb-1">Cabin name</label>
            <input
              type="text"
              placeholder="e.g., Deluxe Suite"
              disabled={isWorking}
              {...register("name", { required: "Cabin name is required" })}
              className={`border rounded-md px-2 py-1.5 outline-none w-full ${
                errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#4f46e5]"
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-600 font-medium mb-1">
              Maximum capacity
            </label>
            <input
              type="number"
              placeholder="e.g., 4 people"
              disabled={isWorking}
              {...register("maxCapacity", {
                required: "Maximum capacity is required",
                min: { value: 1, message: "Minimum capacity is 1" },
              })}
              className={`border rounded-md px-2 py-1.5 outline-none w-full ${
                errors.maxCapacity
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#4f46e5]"
              }`}
            />
            {errors.maxCapacity && (
              <span className="text-red-500 text-xs mt-1">
                {errors.maxCapacity.message}
              </span>
            )}
          </div>
        </div>

        {/* ثاني صف */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-600 font-medium mb-1">
              Regular price
            </label>
            <input
              type="number"
              placeholder="e.g., $120"
              disabled={isWorking}
              {...register("regularPrice", {
                required: "Price is required",
                min: { value: 1, message: "Price must be positive" },
              })}
              className={`border rounded-md px-2 py-1.5 outline-none w-full ${
                errors.regularPrice
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#4f46e5]"
              }`}
            />
            {errors.regularPrice && (
              <span className="text-red-500 text-xs mt-1">
                {errors.regularPrice.message}
              </span>
            )}
          </div>

          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-gray-600 font-medium mb-1">Discount</label>
            <input
              type="number"
              placeholder="e.g., 10%"
              disabled={isWorking}
              {...register("discount", {
                min: { value: 0, message: "Cannot be negative" },
              })}
              className={`border rounded-md px-2 py-1.5 outline-none w-full ${
                errors.discount
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#4f46e5]"
              }`}
            />
            {errors.discount && (
              <span className="text-red-500 text-xs mt-1">
                {errors.discount.message}
              </span>
            )}
          </div>
        </div>

        {/* الوصف */}
        <div className="flex flex-col w-full">
          <label className="text-gray-600 font-medium mb-1">
            Description for website
          </label>
          <textarea
            placeholder="Write a short description..."
            disabled={isWorking}
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            className={`resize-none border rounded-md outline-none p-2 min-h-24 text-sm w-full ${
              errors.description
                ? "border-red-500"
                : "border-gray-300 focus:border-[#4f46e5]"
            }`}
          ></textarea>
          {errors.description && (
            <span className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* رفع الصورة */}
        <div className="flex flex-col w-full">
          <label className="text-gray-600 font-medium mb-1">
            Upload cabin photo
          </label>
          <input
            type="file"
            disabled={isWorking}
            accept="image/*"
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
            className="border border-gray-300 rounded-md px-2 py-1.5 w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-md 
                       file:border-0 file:text-sm file:font-semibold file:bg-[#4f46e5] file:text-white 
                       hover:file:bg-[#4338ca] cursor-pointer"
          />
          {errors.image && (
            <span className="text-red-500 text-xs mt-1">
              {errors.image.message}
            </span>
          )}
        </div>

        {/* زرار الإرسال */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={isWorking}
            type="submit"
            className="bg-[#4f46e5] text-white px-4 py-2 rounded-md hover:bg-[#4338ca] transition-colors text-sm font-medium cursor-pointer"
          >
            {isEditSession ? "Edit cabin" : " Create New Cabin"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCabinForm;
