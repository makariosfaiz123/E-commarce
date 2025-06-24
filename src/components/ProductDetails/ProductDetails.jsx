import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  let [product, setproduct] = useState(null);
  let [relatedProducts, setrelatedProducts] = useState([]); 
  let { id, category } = useParams();
  let { addProductToCart,CountItems,setCountItems } = useContext(CartContext);

  async function AddToCart(id) {
    let response = await addProductToCart(id);

    if (response.data.status == "success") {
      setCountItems(CountItems+1)
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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 900,
  };

  useEffect(() => {
    getProduct(id);
    getAllProduct();
  }, [id, category]);
  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setproduct(res.data.data);
      })
      .catch((res) => {});
  }
  function getAllProduct() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedProducts(related);
        // console.log(related);
      })
      .catch((res) => {});
  }

  return (
    <>
      <div className="row items-center">
        <div className="w-1/4">
          <Slider {...settings}>
            {product?.images.map((src) => (
              <img src={src} className="w-full" />
            ))}
          </Slider>
        </div>
        <div className="w-3/4 p-8">
          <h3 className="text-left pb-3 font-semibold capitalize text-2xl">
            {product?.title}
          </h3>
          <p className="text-left text-xs pl-3 pb-4 text-gray-400 font-semibold">
            {product?.description}
          </p>
          <h3 className="text-gray-500 py-1 text-left ">
            {product?.category.name}
          </h3>
          <div className="flex justify-between pb-5">
            <span className="text-gray-500 ">{product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-300"></i>
              {product?.ratingsAverage}
            </span>
          </div>
          <button onClick={() => AddToCart(product.id)} className="btn">
            Add To Cart
          </button>
        </div>
      </div>
      
      <div className="row">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div key={product.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/6">
              <div className="product rounded-lg hover:border-[#0aad0a] hover:border-2 p-3">
                <Link 
                  to={`/productdetails/${product.id}/${product.category.name}`}
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
                <button onClick={()=>AddToCart(product.id)} className="btn">Add To Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
}
