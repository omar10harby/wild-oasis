import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineUsers } from "react-icons/hi";
import { IoCalendarOutline, IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineOtherHouses } from "react-icons/md";
import { NavLink } from "react-router-dom";
function MobileSideBar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=" absolute inset-0  z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, delay: 0.3 }}
            className="fixed top-0 right-0 w-2/3 h-dvh z-50 bg-white pt-10 px-5"
          >
            <div className="links">
              <ul className="flex flex-col gap-2">
                <li className="w-full">
                  <NavLink
                    to={"/"}
                    className={
                      " text-base font-semibold flex items-center gap-2 px-6 py-3 hover:bg-gray-200 transition-all duration-200   rounded-md"
                    }
                     onClick={onClose}
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
                    onClick={onClose}
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
                     onClick={onClose}
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
                     onClick={onClose}
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
                     onClick={onClose}
                  >
                    <IoSettingsOutline size={20} />
                    Settings
                  </NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileSideBar;
