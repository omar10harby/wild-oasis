import React from "react";
import logo from "../data/img/logo-light.png";
import LoginForm from "../features/Authentication/LoginForm";
function Login() {
  return (
    <div className="h-dvh flex justify-center items-center">
      <div className="flex flex-col w-[90%] md:w-2/3 lg:w-1/3 border border-gray-300 rounded-lg overflow-hidden ">
        <div className="flex flex-col items-center p-6 bg-linear-to-br from-[#4f46e5] to-[#6366f1] text-white">
          <div className="w-36 mb-3">
            <img src={logo} alt="logo" className="w-full" />
          </div>
          <p className="text-3xl font-semibold">Log in to your account</p>
        </div>
        <div className="bg-gray-50 px-8 py-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
