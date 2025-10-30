import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function Modal({ isOpen, onClose, size = "form", children }) {
  const sizes = {
    form: "w-[95%] md:w-5/6 lg:w-3/5 xl:w-1/2 ",
    delete:""
  };
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0  backdrop-blur-sm z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed z-50 ${sizes[size]}   bg-white p-10 rounded-xl shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Modal;
