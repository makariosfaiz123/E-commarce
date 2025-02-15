import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Cart() {
  let [CartDstails, setCartDstails] = useState(null);
  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    deleteCartProduct,
    clearAllProducts,
    CountItems,
    setCountItems,
  } = useContext(CartContext);

  async function getCartItem() {
    let response = await getLoggedUserCart();
    
    setCartDstails(response.data.data);
  }
  async function updateCartItem(id, count) {
    if (count == 0) {
      removeCartItem(id);
    } else {
      let response = await updateCartProductQuantity(id, count);

      if (response.data.status == "success") {
        setCartDstails(response.data.data);
        toast.success("product done updateing ^_~");
        // console.log(response.data.data);
      } else {
        toast.error("fe error ya fnan");
      }
    }
  }
  async function removeCartItem(id) {
    let response = await deleteCartProduct(id);

    if (response.data.status == "success") {
      setCountItems(CountItems - 1);
      setCartDstails(response.data.data);
      toast.success("product done remove ¬_¬");
    } else {
      toast.error("fe error ya fnan");
    }
  }
  async function deleteAllCartItems() {
    let response = await clearAllProducts();
    setCartDstails(response.data.data);
    setCountItems(0);
  }

  useEffect(() => {
    getCartItem();
  }, []);

  return (
    <>
      <div className=" bg-gray-100 py-20">
        <h1 className="mb-10 text-center text-3xl font-bold">Cart Shop</h1>
        {CartDstails?.products.length > 0 ? (
          <>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {CartDstails?.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                  >
                    <img
                      src={product.product.imageCover}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {product.product.title
                            .split(" ")
                            .slice(0, 2)
                            .join(" ")}
                        </h2>
                        <p className="mt-1 text-sm text-gray-700">
                          {product.price} EGP
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span
                            onClick={() =>
                              updateCartItem(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5
               duration-100 hover:bg-emerald-600 hover:text-blue-50"
                          >
                            {" "}
                            -{" "}
                          </span>
                          <div>
                            <span className="p-[8.5px] border bg-white text-center text-xs outline-none">
                              {product.count}
                            </span>
                          </div>
                          <span
                            onClick={() =>
                              updateCartItem(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            className="cursor-pointer rounded-r
               bg-gray-100 py-1 px-3 duration-100 hover:bg-emerald-600 hover:text-blue-50"
                          >
                            {" "}
                            +{" "}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            {product.price * product.count} EGP
                          </p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            onClick={() => removeCartItem(product.product.id)}
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
                <div className="my-8">
                  <Link
                    onClick={() => deleteAllCartItems()}
                    className="rounded-md bg-emerald-600 py-3 px-16 font-medium text-white
       hover:bg-emerald-700 my-8 hover:text-white"
                    to={"/"}
                  >
                    Clear Your Cart
                  </Link>
                </div>
              </div>

              <div className="Sub mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">
                    {" "}
                    {CartDstails?.totalCartPrice} 🇪🇬
                  </p>
                </div>
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">total number of items</p>
                  <p className="text-gray-700"> {CountItems}</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                  <p className="text-lg font-bold">Total</p>
                  <div className>
                    <p className="mb-1 text-lg font-bold">
                      {CartDstails?.totalCartPrice} 🇪🇬
                    </p>
                    <p className="text-sm text-gray-700">including VAT</p>
                  </div>
                </div>
                <Link
                  to={"/checkout"}
                  className=" rounded-md bg-emerald-600 py-3 lg:px-16 md:px-10 sm:px-10 font-medium text-white
       hover:bg-emerald-700 hover:text-white"
                >
                  Check Out
                </Link>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-3xl text-red-800 font-bold my-8">
            there is not items to show
          </h2>
        )}
      </div>
    </>
  );
}
