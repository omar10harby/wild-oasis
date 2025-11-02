import BookingDataBox from "../features/Bookings/BookingDataBox";
import useBooking from "../features/Bookings/useBooking";
import { useMoveBack } from "../hooks/useMoveBack";
function Booking() {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  if (isLoading) return <p>loading...</p>;

  const { id: bookingId } = booking;
  console.log(booking);
  
  const statusColors = {
    unconfirmed: "bg-[#e0f2fe] text-[#0369a1]",
    "checked-in": "bg-[#dcfce7] text-[#15803d]",
    "checked-out": "bg-[#e5e7eb] text-[#374151]",
  };
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              Booking #{bookingId}
            </h1>
            <p
              className={`${
                statusColors[booking.status]
              } text-xs px-2 py-1 rounded-lg font-semibold uppercase`}
            >
              {booking.status}
            </p>
          </div>
          <p
            className="text-[#4f46e5] font-bold flex items-center cursor-pointer mr-1 md:mr-0"
            onClick={moveBack}
          >
            <span className="text-xl px-2  rounded-md border border-gray-300 md:px-0 md:rounded-none md:border-none">&larr;</span> <span className="hidden md:block">Back</span>
          </p>
        </div>
        <BookingDataBox booking={booking}/>
      </div>
    </>
  );
}

export default Booking;
