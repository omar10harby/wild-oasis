import React, { useEffect, useState } from "react";
import BookingDataBox from "../Bookings/BookingDataBox";
import useBooking from "../Bookings/useBooking";
import useSettings from "../Settings/useSettings";
import useCheckIn from "./useCheckIn";
import { useMoveBack } from "../../hooks/useMoveBack";
import { HiArrowLeft, HiMiniArrowDownOnSquare } from "react-icons/hi2";
import ConfirmPaymentBox from "./ConfirmPaymentBox";
import { formatCurrency } from "../../utils/helpers";
import Spinner from "../../ui/Spinner";

function CheckInBooking() {
  const [isPaid, setIsPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { settings } = useSettings();
  const { CheckIn, isLoading: isCheckIn } = useCheckIn();
  const moveBack = useMoveBack();

  // ✅ Destruct booking values once loaded
  const {
    id:bookingId,
    totalPrice,
    hasBreakfast,
    numNights,
    guests: { fullName } = {},
  } = booking || {};

  useEffect(() => {
    setIsPaid(booking?.isPaid);
  }, [booking]);

if (isLoading || !settings) return <Spinner/>;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights;

  function handleCheckIn() {
    if (addBreakfast) {
      CheckIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      CheckIn({ bookingId ,breakfast:{}});
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Check in booking #{bookingId}
        </h1>

        <div className="hidden md:flex gap-2">
          <button
            onClick={moveBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 text-sm"
          >
            <HiArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={moveBack}
            className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            <HiArrowLeft size={20} />
          </button>
        </div>
      </div>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className="flex items-center gap-2 py-5 px-5 border border-gray-200 rounded-md">
          <input
            id="breakfast"
            type="checkbox"
            onChange={() => {
              setIsPaid((prev) => !prev);
              setAddBreakfast((prev) => !prev);
            }}
            className="w-12 h-5"
          />
          <label htmlFor="breakfast">
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </label>
        </div>
      )}

      <div
        className={`flex items-center gap-2 py-5 px-5 border border-gray-200 rounded-md ${
          isPaid ? " bg-gray-100 border-gray-300" : ""
        } `}
      >
        <input
          id="paid"
          type="checkbox"
          disabled={isPaid}
          checked={isPaid}
          onChange={() => setIsPaid((prev) => !prev)}
          className="w-12 h-5 disabled:cursor-not-allowed"
        />
        <label htmlFor="paid">
          I confirm that {fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </label>
      </div>

      <div className="flex justify-end">
        <button
          disabled={!isPaid}
          onClick={handleCheckIn}
          className="flex items-center gap-2 px-4 py-4 bg-[#4f46e5] text-white rounded-lg font-semibold hover:bg-[#4338ca] transition-all duration-200 shadow-sm hover:shadow-md text-sm disabled:cursor-not-allowed"
        >
          <HiMiniArrowDownOnSquare size={18} />
          <span>Check in booking #{bookingId}</span>
        </button>
      </div>
    </div>
  );
}

export default CheckInBooking;
