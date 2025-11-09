import React from "react";
import SignUpForm from "../features/Authentication/SignUpForm";

function Users() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700">Create a new user</h2>
      <div className="w-full  mt-10 mx-auto bg-white shadow rounded-lg">
        <SignUpForm />
      </div>
    </div>
  );
}

export default Users;
