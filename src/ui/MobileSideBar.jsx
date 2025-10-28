import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function MobileSideBar({ isOpen ,onClose}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity:0}}
            transition={{ duration: 0.3 }}
            className=" absolute inset-0 bg-[#00000040] z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{x:'100%'}}
            transition={{ type: "tween", duration: 0.3, delay: 0.3 }}
            className="fixed top-0 right-0 w-2/3 h-dvh z-50 bg-white"
          >
            side
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileSideBar;
