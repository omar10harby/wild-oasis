import supabase from "./supabase";

// Get all guests
export async function getGuests() {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .order("fullName");

  if (error) {
    console.error(error);
    throw new Error("Guests could not be loaded");
  }

  return data;
}

// Get single guest
export async function getGuest(id) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest not found");
  }

  return data;
}

// Create new guest
export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([newGuest])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

// Check if guest exists by email
export async function getGuestByEmail(email) {
  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Error checking guest");
  }

  return data;
}