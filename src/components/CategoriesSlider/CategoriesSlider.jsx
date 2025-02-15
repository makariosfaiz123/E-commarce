import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  let [Categories, setCategories] = useState([]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 200,
  };
  
  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((res) => {});
  }
  return (
    <>
    
      <h4 className="my-3 text-2xl text-left capitalize  text-gray-800">
        shop popular Categories
      </h4>
      <Slider {...settings}>
        {Categories.map((category) => (
          <div key={category.id} >
            <img
              src={category.image}
              className="w-full h-[200px] object-cover rounded-lg"
              alt=""
            />
            <h4>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </>
  );
}
