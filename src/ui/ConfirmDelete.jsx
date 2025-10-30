import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function ConfirmDelete({ isOpen, onClose, onConfirm, resourceName }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-10  w-[95%] md:w-2/6 rounded-md shadow"
          >
            <h3 className="text-xl text-gray-700 font-semibold  text-center mb-5">
              Delete {resourceName}
            </h3>
            <p className="text-gray-400 font-medium">
              Are you sure you want to delete this {resourceName} permanently?
              This action cannot be undone.
            </p>
              <div className="flex gap-3 justify-end mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all font-medium"
            >
              Delete
            </button>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ConfirmDelete;
