import { AnimatePresence, motion } from "framer-motion";
import { useOutSideClick } from "../hooks/useOutSideClick";

function DropMenu({ isOpen, onClose, children }) {
  const ref = useOutSideClick(onClose);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="absolute top-[-200%] right-8 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export default DropMenu;