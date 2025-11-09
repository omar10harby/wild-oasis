import React from "react";
import logo from "../data/img/logo-light.png";
import userAvatar from "../data/img/default-user.jpg";
import { NavLink } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { HiBars3 } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";

import useUser from "../features/Authentication/useUser";
import { li } from "framer-motion/client";
import useLogout from "../features/Authentication/useLogout";
function NavBar({ onBarClick }) {
  const { user } = useUser();
  const {logout}=useLogout()
  return (
    <div className="flex justify-between items-center md:justify-end px-5 md:px-[5vw] py-4 border-b border-gray-100">
      <div className="w-16 md:hidden">
        <img src={logo} alt="" className="w-full" />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <div className="w-8 md:w-10">
            <img
              src={user?.user_metadata.avatar || userAvatar}
              alt=""
              className="w-full rounded-full"
            />
          </div>
          <p>{user?.user_metadata.fullName}</p>
          <ul className="flex items-center gap-3">
            <li>
              <NavLink to={'/account'}>
                <CiUser size={25} />
              </NavLink>
            </li>
            {user?.user_metadata.avatar && <li>
                <IoLogOutOutline size={25} className=" cursor-pointer" onClick={()=>logout()}/>
              </li>}
            <li className="md:hidden">
              <HiBars3 size={25} onClick={() => onBarClick()} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
