import React, { useState } from "react";
import Modal from "../../ui/Modal";
import AddCabinForm from "./AddCabinForm";

function AddCabin() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  return (
    <>
      <button
        className="bg-[#4f46e5] px-4 py-3 mt-5 text-white rounded-md font-semibold "
        onClick={() => setIsCreateOpen(true)}
      >
        Add new Cabin
      </button>
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)}>
        <AddCabinForm onClose={() => setIsCreateOpen(false)} />
      </Modal>
    </>
  );
}

export default AddCabin;
