import React from "react";
import useSettings from "./useSettings";
import { useForm } from "react-hook-form";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { settings, error, isLoading } = useSettings();
  const { updateSetting, isPending } = useUpdateSettings();
  function handleUpdateSetting(e, field) {
    const { value } = e.target;
    if (!value) return null;
    updateSetting({ [field]: value });
  }
  if (isLoading) return <div>loding....</div>;
  return (
    <form className="bg-white p-5 mt-10 rounded-md ">
      <div className="flex flex-col md:flex-row  gap-5 items-start md:items-center py-4 border-b border-gray-200 ">
        <label htmlFor="min-nights" className="font-semibold md:w-52">
          Minimum nights/booking
        </label>
        <input
          type="number"
          id="min-nights"
          className="w-full md:w-2/4 px-4 py-2 border border-gray-300 focus:border-[#4f46e5] outline-none rounded-md"
          defaultValue={settings?.minBookingLength}
          disabled={isPending}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </div>

      <div className="flex flex-col md:flex-row  gap-5 items-start md:items-center py-4 border-b border-gray-200 ">
        <label htmlFor="max-nights" className="font-semibold md:w-52">
          Maximum nights/booking
        </label>
        <input
          type="number"
          id="max-nights"
          className="w-full md:w-2/4 px-4 py-2 border border-gray-300 focus:border-[#4f46e5] outline-none rounded-md"
          defaultValue={settings?.maxBookingLength}
          disabled={isPending}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </div>

      <div className="flex flex-col md:flex-row  gap-5 items-start md:items-center py-4 border-b border-gray-200 ">
        <label htmlFor="max-guests" className="font-semibold md:w-52">
          Maximum guests/booking
        </label>
        <input
          type="number"
          id="max-guests"
          className="w-full md:w-2/4 px-4 py-2 border border-gray-300 focus:border-[#4f46e5] outline-none rounded-md"
          defaultValue={settings?.maxGuestsPerBooking}
          disabled={isPending}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerBooking")}
        />
      </div>

      <div className="flex flex-col md:flex-row  gap-5 items-start md:items-center py-4 ">
        <label htmlFor="breakfast-price" className="font-semibold md:w-52">
          Breakfast price
        </label>
        <input
          type="number"
          id="breakfast-price"
          className="w-full md:w-2/4 px-4 py-2 border border-gray-300 focus:border-[#4f46e5] outline-none rounded-md"
          defaultValue={settings?.breakfastPrice}
          disabled={isPending}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </div>
    </form>
  );
}

export default UpdateSettingsForm;
