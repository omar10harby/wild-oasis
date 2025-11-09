import React from "react";
import UpdateUserData from "../features/Authentication/UpdateUserData";
import UpdatePasswordFrom from "../features/Authentication/UpdatePasswordFrom";

function Account() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-700">Update your account </h2>
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-5">Update user data</h3>
        <div className="bg-white rounded-lg shadow ">
          <UpdateUserData />
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-5">Update user password</h3>
        <div className="bg-white rounded-lg shadow ">
          <UpdatePasswordFrom />
        </div>
      </div>
    </div>
  );
}

export default Account;
