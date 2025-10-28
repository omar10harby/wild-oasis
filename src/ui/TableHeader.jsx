import React from "react";

function TableHeader({ columns, data }) {
  return <div className="bg-gray-200 py-3 px-3 rounded-t-md mt-10 grid gap-4" style={{gridTemplateColumns: columns }}>
        {data.map((d)=>(
            <div className="text-xs md:text-base  font-semibold uppercase">
                {d}
            </div>
        ))}
  </div>;
}

export default TableHeader;
