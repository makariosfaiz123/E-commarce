import React, { useState } from "react";
import style from "./Categories.module.css";
import useCategories from "../../Hooks/useCategories";
import { X } from "lucide-react";

export default function Categories() {
  const [SelectedCategorie, setSelectedCategorie] = useState(null);
  let { data, isError, error, isLoading, isFetching } = useCategories();

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <div className="spinner"></div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 ">
        {data?.data?.data.map((categorie) => (
          <>
            <div
              onClick={() => setselectedCategorie(categorie)}
              key={categorie._id}
              className=" bg-white rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.1)] 
           hover:shadow-[0_0_15px_rgba(0,0,0,0.15)] hover:shadow-[#4fa74f] transition-shadow duration-300 "
            >
              <div className="">
                <div className="w-full  overflow-hidden">
                <img src={categorie.image} className="w-full h-[300px] object-cover" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-emerald-600  p-4">
                  {categorie.name}
                </h3>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
