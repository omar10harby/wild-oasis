import React from "react";
import logo from "../data/img/logo-light.png";
import { NavLink } from "react-router-dom";
import {
  IoCalendarOutline,
  IoHomeOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineOtherHouses } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import Uploader from "../data/Uploader";
function SideBar() {
  return (
    <div className="hidden w-60 md:flex flex-col  gap-10 py-8 px-6 h-full border-r border-gray-100">
      <div className="flex justify-center">
        {" "}
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <div className="links">
        <ul className="flex flex-col gap-2">
          <li className="w-full">
            <NavLink
              to={"/"}
              className={
                " text-base font-semibold flex items-center gap-2 px-6 py-3 hover:bg-gray-200 transition-all duration-200   rounded-md"
              }
            >
              <IoHomeOutline size={20} />
              DashBoard
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"bookings"}
              className={
                "font-semibold flex items-center gap-2 pl-5 pr-6 py-3 hover:bg-gray-200 transition-all duration-200 rounded-md"
              }
            >
              <IoCalendarOutline size={20} />
              Bookings
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"cabins"}
              className={
                "font-semibold flex items-center gap-2 pl-5 pr-6 py-3 hover:bg-gray-200 transition-all duration-200  rounded-md"
              }
            >
              <MdOutlineOtherHouses size={20} />
              Cabins
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"users"}
              className={
                "font-semibold flex items-center gap-2 pl-5 pr-6 py-3 hover:bg-gray-200 transition-all duration-200 rounded-md"
              }
            >
              <HiOutlineUsers size={20} />
              Users
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"settings"}
              className={
                "font-semibold flex items-center gap-2 pl-5 pr-6 py-3 hover:bg-gray-200 transition-all duration-200  rounded-md"
              }
            >
              <IoSettingsOutline size={20} />
              Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
