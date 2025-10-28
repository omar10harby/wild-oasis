import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

function CabinsTable() {
  const { cabins, isLoading, error } = useCabins();
  
  if (isLoading) return <div>.....</div>;
  console.log(error);

  return (
<div className="mt-10">
  {/* ✅ نضيف هنا overflow-x-auto ونعزلها في div خاص */}
  <div className="overflow-x-scroll border border-gray-200 rounded-md">
    <table className="min-w-[800px] w-full table-fixed">
      <thead className="bg-gray-200">
        <tr>
          <th className="text-xs md:text-base font-semibold uppercase py-3 px-3 text-left w-[80px]"></th>
          <th className="text-xs md:text-base font-semibold uppercase py-3 px-3 text-left w-[150px]">
            Cabin
          </th>
          <th className="text-xs md:text-base font-semibold uppercase py-3 px-3 text-left w-[250px]">
            Capacity
          </th>
          <th className="text-xs md:text-base font-semibold uppercase py-3 px-3 text-left w-[120px]">
            Price
          </th>
          <th className="text-xs md:text-base font-semibold uppercase py-3 px-3 text-left w-[120px]">
            Discount
          </th>
          <th className="text-xs md:text-base font-semibold uppercase py-3 px-3 text-right w-[80px]"></th>
        </tr>
      </thead>

      <tbody>
        {cabins?.map((cabin) => (
            <CabinRow cabin={cabin}/>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default CabinsTable;