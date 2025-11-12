import { PAGE_SIZE } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName,email)", { count: "exact" });

  //1)filter
  if (filter) query = query[filter.method || "eq"](filter.field, filter.value);

  //2)sortBy
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data: bookings, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Bookings could not be loaded");
  }
  return { bookings, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
import { isToday } from "date-fns"; // مهم جدًا

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .in("status", ["unconfirmed", "checked-in"])
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // فلترة في الكود نفسه بدل SQL
  const todayActivities = data.filter(
    (stay) =>
      (stay.status === "unconfirmed" && isToday(new Date(stay.startDate))) ||
      (stay.status === "checked-in" && isToday(new Date(stay.endDate)))
  );

  return todayActivities;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

// Get bookings for a specific cabin
// export async function getCabinBookings(cabinId) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("startDate, endDate, status")
//     .eq("cabinId", cabinId)
//     .in("status", ["unconfirmed", "checked-in"]) // فقط الحجوزات النشطة
//     .order("startDate");

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin bookings could not be loaded");
//   }

//   return data;
// }

// // Check if cabin is available for date range
// export async function checkCabinAvailability(cabinId, startDate, endDate) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("id, startDate, endDate")
//     .eq("cabinId", cabinId)
//     .in("status", ["unconfirmed", "checked-in"])
//     .or(`and(startDate.lte.${endDate},endDate.gte.${startDate})`);

//   if (error) {
//     console.error(error);
//     throw new Error("Could not check availability");
//   }

//   // إذا في bookings متداخلة = الكابينة مش متاحة
//   return data.length === 0;
// }

export async function getAvailableCabins(startDate, endDate, numGuests) {
  const { data: allCabins, error: cabinsError } = await supabase
    .from("cabins")
    .select("*")
    .gte("maxCapacity", numGuests)
    .order("regularPrice");
  if (cabinsError) {
    console.log(cabinsError);
    throw new Error("could not load cabins");
  }
  const { data: conflictingBookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("cabinId,startDate,endDate")
    .in("status", ["unconfirmed", "checked-in"])
    .lte("startDate", endDate)
    .gte("endDate", startDate);

  if (bookingsError) {
    console.log(bookingsError);
    throw new Error("could not load bookings");
  }
  const bookedCabinsIds = conflictingBookings.map((b) => b.cabinId);
  const availableCabins = allCabins.filter(
    (cabin) => !bookedCabinsIds.includes(cabin.id)
  );
  return {
    availableCabins,
    allCabins,
    bookedCabinsIds,
  };
}

export async function getNextAvailableDates(numGuests) {
  const today = new Date().toISOString().split("T")[0];
  const { data: cabins, error: cabinsError } = await supabase
    .from("cabins")
    .select("*")
    .gte("maxCapacity", numGuests);

  if (cabinsError) {
    console.log(cabinsError);
    throw new Error("could not load cabins");
  }

  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("cabinId, startDate, endDate")
    .in("status", ["unconfirmed", "checked-in"])
    .gte("endDate", today)
    .order("startDate");

  if (bookingsError) {
    console.error(bookingsError);
    throw new Error("Could not load bookings");
  }

  const cabinsWithAvailability = cabins.map((cabin) => {
    const cabinBookings = bookings
      .filter((b) => b.cabinId === cabin.id)
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    let nextAvailable = today;
    if (cabinBookings.length === 0) {
      return { ...cabin, nextAvailableDate: today, isAvailableNow: true };
    }

    for (let i = 0; i < cabinBookings.length; i++) {
      const booking = cabinBookings[i];
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      const currentDate = nextAvailable;

      if (currentDate < bookingStart) {
        return {
          ...cabin,
          nextAvailableDate: nextAvailable,
          isAvailableNow: nextAvailable === today,
        };
      }
      const dayAfterBooking = new Date(bookingEnd);
      dayAfterBooking.setDate(dayAfterBooking.getDate() + 1);
      nextAvailable = dayAfterBooking.toISOString().split("T")[0];
    }

    return {
      ...cabin,
      nextAvailableDate: nextAvailable,
      isAvailableNow: false,
    };
  });

  return cabinsWithAvailability;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}
