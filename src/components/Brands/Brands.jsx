import React, { useState } from "react";
import useBrands from "../../Hooks/useBrands";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

export default function Brands() {
  const [selectedBrand, setselectedBrand] = useState(null);
  let { data, isError, error, isLoading, isFetching } = useBrands();

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <h1 className="text-4xl text-[#4fa74f] font-bold  my-4">All Brands</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data?.data.map((brand) => (
          <>
            <div
              onClick={() => setselectedBrand(brand)}
              key={brand._id}
              className=" bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] p-2
           hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:shadow-[#4fa74f] transition-shadow duration-300 "
            >
              
                <div className="p-3">
                  <img
                    src={brand.image}
                    className="w-full h-full object-cover"
                  />
                  <h3 className="text-lg font-semibold text-center text-gray-900">
                    {brand.name}
                  </h3>
                </div>
              
            </div>
          </>
        ))}
      </div>

      {selectedBrand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setselectedBrand(null)}
              className="absolute right-4 top-4"
            >
              <X />
            </button>
            <div className="flex gap-6">
              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
                className="w-1/2 rounded-lg object-cover"
              />
              <div className="flex items-center">
                <h2 className="text-2xl font-bold">{selectedBrand.name}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
