import React from 'react'
import CreateBookingForm from '../features/Bookings/CreateBookingForm'

function CreateBooking() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Create New Booking</h2>
      <CreateBookingForm/>
    </div>
  )
}

export default CreateBooking
