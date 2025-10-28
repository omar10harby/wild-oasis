import { RiCloseLargeLine } from "react-icons/ri";

function AddCabinForm() {
  return (
    <>
      <div>
        <div className=" absolute top-3 right-3">
          <RiCloseLargeLine size={25} />
        </div>
        <form className="mt-10 w-full flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              placeholder="Cabin name"
              className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#4f46e5]"
            />
            <input
              type="text"
              placeholder="Maximum capacity"
              className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#4f46e5]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <input
              type="text"
              placeholder="Regular price"
              className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#4f46e5]"
            />
            <input
              type="number"
              placeholder="Discount"
              className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#4f46e5]"
            />
          </div>
          <textarea
            name=""
            id=""
            placeholder="Description for website"
            className="w-[90%] resize-none border border-gray-200 outline-none focus:border-[#4f46e5] p-2 min-h-30  "
          ></textarea>
        </form>
      </div>
    </>
  );
}

export default AddCabinForm;
