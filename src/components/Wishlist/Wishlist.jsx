import React, { useContext, useEffect, useState } from "react";
import style from "./Wishlist.module.css";
import { ListContext } from "../../Context/ListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Wishlist() {
  let [ListDstails, setListDstails] = useState(null);
  let { getLoggedUserList, deleteListProduct } = useContext(ListContext);
  let { addProductToCart, CountItems, setCountItems } = useContext(CartContext);

  async function AddToCart(id) {
    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      setCountItems(CountItems + 1);

      toast.success("It has been successfully added. 🛺", {
        position: "top-right",
        style: {
          background: "#4fa74f",
          padding: "16px",
          color: "white",
        },
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        style: {
          background: "#4fa74f",
          padding: "16px",
          color: "white",
        },
      });
    }
  }

  async function getListItem() {
    let response = await getLoggedUserList();
    setListDstails(response.data);
  }

  async function removeListItem(id) {
    let response = await deleteListProduct(id);

    if (response.data.status == "success") {
      setListDstails(response.data);
      toast.success("product done remove ¬_¬");
    } else {
      toast.error("fe error ya fnan");
    }
  }

  useEffect(() => {
    getListItem();
  }, []);

  return (
    <>
      <div className=" bg-gray-100 py-20">
      <h1 className="mb-10 text-center text-3xl font-bold">My wish List</h1>
      {ListDstails?.data.length > 0 ? (<>
        <div className="mx-auto  justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {ListDstails?.data.map((product) => (
              <div
              key={product.id}
                className="justify-between mb-6 rounded-lg bg-white p-6
                     shadow-md sm:flex sm:justify-start"
              >
                <img
                  src={product.imageCover}
                  alt="product-image"
                  className="w-full rounded-lg sm:w-40"
                />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-700">
                      {product.price} EGP
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <button
                        onClick={() => AddToCart(product.id)}
                        className="btn"
                      >
                        Add To Cart
                      </button>
                    </div>
                    <div className="flex items-center space-x-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        onClick={() => removeListItem(product.id)}
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>): (
          <h2 className="text-3xl text-red-800 font-bold my-8">
            There are no favorite items.
          </h2>
        )}
      </div>
    </>
  );
}
