import React, { useState } from "react";
import {
  HiOutlineDotsVertical,
  HiOutlineDuplicate,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import DropMenu from "../../ui/DropMenu";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteCabin from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import useEditCabin from "./useEditCabin";
import Modal from "../../ui/Modal";
import AddCabinForm from "./AddCabinForm";
import useCreateCabin from "./useCreateCabin";

function CabinRow({ cabin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { creatCabin } = useCreateCabin();
  function handleDuplicate() {
    creatCabin({
      name: `copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      image: cabin.image,
      discount: cabin.discount,
      description: cabin.description,
    });
    setIsMenuOpen(false)
  }
  return (
    <>
      <tr
        key={cabin.id}
        className="border-b border-gray-200 hover:bg-gray-50 py-10"
      >
        <td className="py-3 px-3">
          <img
            src={cabin.image}
            alt={cabin.name}
            className="w-16 h-12 object-cover scale-[1.4]"
          />
        </td>
        <td className="py-3 px-3 font-semibold">{cabin.name}</td>
        <td className="py-3 px-3">Fits up to {cabin.maxCapacity} guests</td>
        <td className="py-3 px-3 font-semibold">
          {formatCurrency(cabin.regularPrice)}
        </td>
        <td className="py-3 px-3 text-green-600 font-medium">
          {cabin.discount ? `${formatCurrency(cabin.discount)}` : "—"}
        </td>
        <td className="py-3 px-3 text-right">
          <div className=" relative inline-block">
            <button
              onClick={() => setIsMenuOpen((isMenuOpen) => !isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              <HiOutlineDotsVertical size={25} />
            </button>
            <DropMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                onClick={() => {
                  setIsEditModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <HiOutlinePencil size={25} className="text-gray-500" />
                <span>Edit</span>
              </button>

              <button
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                onClick={handleDuplicate}
              >
                <HiOutlineDuplicate size={25} className="text-gray-500" />
                <span>Duplicate</span>
              </button>

              <button
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
              >
                <HiOutlineTrash size={25} className="text-gray-500" />
                <span>Delete</span>
              </button>
            </DropMenu>
          </div>
        </td>
      </tr>
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        resourceName={cabin.name}
        onConfirm={() => deleteCabin(cabin.id)}
      />
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <AddCabinForm
          cabinToEdit={cabin}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default CabinRow;
