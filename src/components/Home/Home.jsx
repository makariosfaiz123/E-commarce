import React, { useContext } from "react";
import style from "./Home.module.css";
import RecantProducts from "./../RecantProducts/RecantProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <RecantProducts />
    </>
  );
}
