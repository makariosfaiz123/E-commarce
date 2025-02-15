import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { ListContext } from "../../Context/ListContext";

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 
    3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
    />
  </svg>
);

export default function RecantProducts() {
  let { data, isError, error, isLoading, isFetching } = useProducts();
  let { addProductToCart, setCountItems, CountItems } = useContext(CartContext);
  let { addProductToList } = useContext(ListContext);

  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

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

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <div className="spinner"></div>;
  }

  async function AddToList(id) {
    let response = await addProductToList(id);
    console.log(response);

    if (response.data.status == "success") {
      toast.success("Product added successfully to your wishlist", {
        position: "top-right",
        style: {
          background: "#4fa74f",
          padding: "16px",
          color: "white",
        },
        icon: "💚",
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

  return (
    <>
      <h4 className="mt-16 text-2xl text-left capitalize  text-gray-800">
        Frequently Bought Products
      </h4>
      <div className="row">
        {data?.data?.data.map((product) => (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
            <div className="product relative rounded-lg hover:border-[#0aad0a] hover:border-2 p-3">
              <Link
                to={`productdetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full" alt="" />
                <h3 className="text-emerald-500 text-left ">
                  {product.category.name}
                </h3>
                <h2 className="text-left font-semibold mb-3">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <div className="flex justify-between">
                  <span className="text-xs">{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-300"></i>
                    {product.ratingsAverage}
                  </span>
                </div>
              </Link>
              <button onClick={() => AddToCart(product.id)} className="btn">
                Add To Cart
              </button>
              <button
                onClick={() => {
                  toggleFavorite(product.id);
                  AddToList(product.id);
                }}
                className="  absolute top-4 right-4  bg-white
               rounded-full p-2 shadow hover:scale-110 transition-transform"
              >
                <HeartIcon
                  filled={favorites[product.id]}
                  className={
                    favorites[product.id] ? "text-red-500" : "text-gray-400"
                  }
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
