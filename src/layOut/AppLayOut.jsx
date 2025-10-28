import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../ui/NavBar";
import SideBar from "../ui/SideBar";
import MobileSideBar from "../ui/MobileSideBar";

function AppLayOut() {
  const [isSideBarOpen,setIsSideBarOpen]=useState(false)
  return (
    <div className="flex h-dvh text-gray-700">
      <SideBar />
      <MobileSideBar isOpen={isSideBarOpen} onClose={()=>setIsSideBarOpen(false)}/>
      <div className="flex-1 flex flex-col overflow-x-hidden ">
        <NavBar onBarClick={()=>setIsSideBarOpen(true)}/>
        <div className="flex-1 text-center md:text-left px-2 py-8 md:px-10 md:py-12 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayOut;
