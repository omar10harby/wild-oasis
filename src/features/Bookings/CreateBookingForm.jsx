import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useCabins } from "../Cabins/useCabins";
import useCreateBooking from "./useCreateBooking";
import useGuests from "./useGuests";
import useCreateGuest from "./useCreateGuest";
import useSettings from "../Settings/useSettings";
import useAvailableCabins from "./useAvailableCabins";
import useNextAvailableDates from "./useNextAvailableDates";
import CountrySelectSearchable from "../../ui/CountrySelectSearchable";
import { RiCloseLargeLine } from "react-icons/ri";
import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { format, parseISO } from "date-fns";
import toast from "react-hot-toast";

function CreateBookingForm() {
  const { guests } = useGuests();
  const { settings } = useSettings();
  const { createNewBooking, isCreating: isCreatingBooking } =
    useCreateBooking();
  const { createNewGuest, isCreating: isCreatingGuest } = useCreateGuest();

  const [isNewGuest, setIsNewGuest] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const isWorking = isCreatingBooking || isCreatingGuest;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const numGuests = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const selectedCabinId = watch("cabinId");

  // جلب الـ Cabins المتاحة بناءً على التواريخ وعدد الضيوف
  const {
    availableCabins,
    allCabins,
    bookedCabinIds,
    isLoading: isCheckingAvailability,
  } = useAvailableCabins(startDate, endDate, numGuests);

  // جلب أقرب تاريخ متاح لكل Cabin (لو مفيش متاح)
  const { cabinsWithDates, isLoading: isLoadingDates } =
    useNextAvailableDates(numGuests);

  // Calculate nights and prices
  const numNights =
    startDate && endDate
      ? Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const selectedCabin = availableCabins?.find(
    (cabin) => cabin.id === Number(selectedCabinId)
  );
  const cabinPrice = selectedCabin ? selectedCabin.regularPrice * numNights : 0;
  const extrasPrice =
    hasBreakfast && settings ? settings.breakfastPrice * numNights : 0;
  const totalPrice = cabinPrice + extrasPrice;

  // Reset cabin selection when dates or guests change
  useEffect(() => {
    if (selectedCabinId && bookedCabinIds.includes(Number(selectedCabinId))) {
      setValue("cabinId", "");
    }
  }, [startDate, endDate, numGuests]);

  async function onSubmit(data) {
    // Early validation
    if (!selectedCabinId) {
      toast.error("Please select a cabin");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select dates");
      return;
    }

    if (!numGuests) {
      toast.error("Please enter number of guests");
      return;
    }

    let guestId;

    try {
      // إذا كان guest جديد، ننشئه الأول
      if (isNewGuest) {
        // Validate guest fields
        if (!data.fullName || !data.email || !data.nationalId) {
          toast.error("Please fill all guest information");
          return;
        }

        if (!data.nationality) {
          toast.error("Please select a country");
          return;
        }

        const newGuestData = {
          fullName: data.fullName,
          email: data.email,
          nationalId: data.nationalId,
          nationality: data.nationality,
          countryFlag: data.countryFlag || "",
        };

        // استخدام mutateAsync للحصول على الـ result مباشرة
        const createdGuest = await createNewGuest(newGuestData);

        if (!createdGuest || !createdGuest.id) {
          throw new Error("Guest creation failed - no ID returned");
        }

        guestId = createdGuest.id;
      } else {
        if (!data.guestId) {
          toast.error("Please select a guest");
          return;
        }
        guestId = Number(data.guestId);
        console.log("✅ Existing Guest ID:", guestId);
      }

      // إنشاء الـ booking
      const bookingData = {
        startDate: data.startDate,
        endDate: data.endDate,
        numNights,
        numGuests: Number(data.numGuests),
        cabinPrice,
        extrasPrice,
        totalPrice,
        status: "unconfirmed",
        hasBreakfast: data.hasBreakfast || false,
        isPaid: data.isPaid || false,
        observations: data.observations || "",
        cabinId: Number(data.cabinId),
        guestId: guestId,
      };

      createNewBooking(bookingData, {
        onSuccess: (result) => {
          reset();
        },
      });

      console.log("✅ Booking creation initiated");
    } catch (error) {
      console.error("❌ ERROR in onSubmit:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      toast.error(
        "Failed to create guest: " + (error.message || "Unknown error")
      );
    }
  }

  const canSelectCabin = startDate && endDate && numGuests > 0;
  const hasAvailableCabins = availableCabins.length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
   
      {/* Step 1: Number of Guests */}
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
        <h3 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
          <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
            1
          </span>
          Number of Guests
        </h3>
        <div>
          <input
            type="number"
            {...register("numGuests", {
              required: "Number of guests is required",
              min: { value: 1, message: "At least 1 guest required" },
            })}
            className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
            disabled={isWorking}
            placeholder="How many guests?"
          />
          {errors.numGuests && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.numGuests.message}
            </span>
          )}
        </div>
      </div>

      {/* Step 2: Select Dates */}
      <div
        className={`p-4 rounded-lg border ${
          numGuests > 0
            ? "bg-indigo-50 border-indigo-200"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <h3
          className={`text-sm font-bold mb-3 flex items-center gap-2 ${
            numGuests > 0 ? "text-indigo-900" : "text-gray-400"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              numGuests > 0
                ? "bg-indigo-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </span>
          Select Dates
        </h3>

        {!numGuests && (
          <p className="text-sm text-gray-500 italic">
            Please enter number of guests first
          </p>
        )}

        {numGuests > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate", {
                  required: "Start date is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
                disabled={isWorking}
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.startDate && (
                <span className="text-red-500 text-xs">
                  {errors.startDate.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                {...register("endDate", { required: "End date is required" })}
                className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
                disabled={isWorking}
                min={startDate}
              />
              {errors.endDate && (
                <span className="text-red-500 text-xs">
                  {errors.endDate.message}
                </span>
              )}
            </div>
          </div>
        )}

        {numNights > 0 && (
          <p className="mt-2 text-sm text-green-700 font-semibold">
            ✓ {numNights} night{numNights > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {/* Step 3: Select Cabin */}
      <div
        className={`p-4 rounded-lg border ${
          canSelectCabin
            ? "bg-indigo-50 border-indigo-200"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <h3
          className={`text-sm font-bold mb-3 flex items-center gap-2 ${
            canSelectCabin ? "text-indigo-900" : "text-gray-400"
          }`}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              canSelectCabin
                ? "bg-indigo-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            3
          </span>
          Select Cabin
        </h3>

        {!canSelectCabin && (
          <p className="text-sm text-gray-500 italic">
            Please select dates and number of guests first
          </p>
        )}

        {canSelectCabin && isCheckingAvailability && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">
              Checking availability...
            </p>
          </div>
        )}

        {canSelectCabin && !isCheckingAvailability && (
          <>
            {hasAvailableCabins ? (
              <>
                <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                  ✓ {availableCabins.length} cabin
                  {availableCabins.length > 1 ? "s" : ""} available for your
                  dates
                </div>

                <select
                  {...register("cabinId", { required: "Cabin is required" })}
                  className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
                  disabled={isWorking}
                >
                  <option value="">Choose a cabin...</option>
                  {availableCabins.map((cabin) => (
                    <option key={cabin.id} value={cabin.id}>
                      {cabin.name} - ${cabin.regularPrice}/night (Max{" "}
                      {cabin.maxCapacity} guests)
                    </option>
                  ))}
                </select>
                {errors.cabinId && (
                  <span className="text-red-500 text-xs">
                    {errors.cabinId.message}
                  </span>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800 font-semibold mb-2">
                    ⚠️ No cabins available for selected dates
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowAvailability(!showAvailability)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    <FaInfoCircle size={14} />
                    {showAvailability ? "Hide" : "Show"} next available dates
                  </button>
                </div>

                {showAvailability &&
                  !isLoadingDates &&
                  cabinsWithDates.length > 0 && (
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Next Available Dates for {numGuests} Guest
                          {numGuests > 1 ? "s" : ""}:
                        </h4>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {cabinsWithDates.map((cabin) => (
                          <div
                            key={cabin.id}
                            className="px-3 py-2 border-b border-gray-100 hover:bg-gray-50 flex items-center justify-between"
                          >
                            <div>
                              <p className="font-semibold text-gray-800">
                                {cabin.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                ${cabin.regularPrice}/night • Max{" "}
                                {cabin.maxCapacity} guests
                              </p>
                            </div>
                            <div className="text-right">
                              <p
                                className={`text-sm font-semibold ${
                                  cabin.isAvailableNow
                                    ? "text-green-600"
                                    : "text-orange-600"
                                }`}
                              >
                                {cabin.isAvailableNow
                                  ? "Available Now"
                                  : format(
                                      parseISO(cabin.nextAvailableDate),
                                      "MMM dd, yyyy"
                                    )}
                              </p>
                              {!cabin.isAvailableNow && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setValue(
                                      "startDate",
                                      cabin.nextAvailableDate
                                    );
                                    setValue("endDate", "");
                                    setShowAvailability(false);
                                  }}
                                  className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                                >
                                  Select this date
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {showAvailability && isLoadingDates && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Step 4: Guest Information */}
      {selectedCabinId && (
        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
          <h3 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
            <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
              4
            </span>
            Guest Information
          </h3>

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => setIsNewGuest(false)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                !isNewGuest
                  ? "bg-[#4f46e5] text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              Existing Guest
            </button>
            <button
              type="button"
              onClick={() => setIsNewGuest(true)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                isNewGuest
                  ? "bg-[#4f46e5] text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
            >
              New Guest
            </button>
          </div>

          {!isNewGuest && (
            <div>
              <select
                {...register("guestId", {
                  required: !isNewGuest && "Guest is required",
                })}
                className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
                disabled={isWorking}
              >
                <option value="">Choose a guest...</option>
                {guests?.map((guest) => (
                  <option key={guest.id} value={guest.id}>
                    {guest.fullName} ({guest.email})
                  </option>
                ))}
              </select>
              {errors.guestId && (
                <span className="text-red-500 text-xs">
                  {errors.guestId.message}
                </span>
              )}
            </div>
          )}

          {isNewGuest && (
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("fullName", {
                    required: isNewGuest && "Name is required",
                  })}
                  className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
                  disabled={isWorking}
                  placeholder="e.g., John Doe"
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: isNewGuest && "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
                  disabled={isWorking}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    National ID
                  </label>
                  <input
                    type="text"
                    {...register("nationalId", {
                      required: isNewGuest && "ID is required",
                    })}
                    className="w-full px-3 py-2 border border-gray-300 outline-indigo-500 rounded-md"
                    disabled={isWorking}
                    placeholder="12345678"
                  />
                  {errors.nationalId && (
                    <span className="text-red-500 text-xs">
                      {errors.nationalId.message}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Country
                  </label>
                  <CountrySelectSearchable
                    value={watch("nationality")}
                    onChange={({ nationality, countryFlag, countryCode }) => {
                      setValue("nationality", nationality);
                      setValue("countryFlag", countryFlag);
                      setValue("countryCode", countryCode);
                    }}
                    error={errors.nationality?.message}
                    disabled={isWorking}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Booking Options */}
      {selectedCabinId && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="hasBreakfast"
              {...register("hasBreakfast")}
              disabled={isWorking}
              className="w-4 h-4 accent-indigo-600"
            />
            <label htmlFor="hasBreakfast" className="text-sm">
              Include breakfast{" "}
              {settings && `(+$${settings.breakfastPrice}/night)`}
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPaid"
              {...register("isPaid")}
              disabled={isWorking}
              className="w-4 h-4 accent-indigo-600"
            />
            <label htmlFor="isPaid" className="text-sm">
              Paid in advance
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Observations (Optional)
            </label>
            <textarea
              {...register("observations")}
              className="w-full px-3 py-2 border rounded-md resize-none"
              rows="3"
              disabled={isWorking}
              placeholder="Any special requests or notes..."
            />
          </div>
        </div>
      )}

      {/* Price Summary */}
      {numNights > 0 && selectedCabin && (
        <div className="bg-linear-to-r from-green-50 to-indigo-50 p-4 rounded-lg border-2 border-green-200">
          <h3 className="font-semibold text-gray-700 mb-3 text-lg">
            Booking Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{selectedCabin.name}</span>
              <span className="font-semibold">
                {numNights} night{numNights > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cabin Price</span>
              <span className="font-semibold">${cabinPrice}</span>
            </div>
            {hasBreakfast && settings && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Breakfast</span>
                <span className="font-semibold">${extrasPrice}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t-2 border-green-300 text-lg font-bold">
              <span className="text-gray-800">Total Price</span>
              <span className="text-green-700">${totalPrice}</span>
            </div>
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className={`flex justify-end gap-3 pt-4 `}>
        {/* ${isInModal ? 'sticky bottom-0 bg-white pb-2' : ''} */}

        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 font-medium"
          disabled={isWorking}
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={() => console.log("🖱️ Button clicked!")}
          disabled={isWorking || !selectedCabinId}
          className="px-4 py-2 bg-[#4f46e5] text-white rounded-md hover:bg-[#4338ca] disabled:opacity-50 disabled:cursor-not-allowed font-medium min-w-[150px]"
        >
          {isCreatingGuest
            ? "Creating Guest..."
            : isCreatingBooking
            ? "Creating Booking..."
            : "Create Booking"}
        </button>
      </div>
    </form>
  );
}

export default CreateBookingForm;
