import React from 'react'
import style from "./MainSlider.module.css"
import Slider from "react-slick";
import slide1 from '../../assets/slider1.860e420bf177333981ac.png';
import slide2 from '../../assets/slider2.d8676ba52f7250332261.png';
import slide3 from '../../assets/slider3.28dd6c841fae0c6901ab.png';
import slide4 from '../../assets/slider4.2acfbfb197ea9ce40bff.png';
// import slide5 from '../../assets/grocery-banner-2.jpeg';
export default function MainSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:400,
  };


  return <>
  <div className="row">
    <div className="w-full">
    <Slider {...settings}> 

    <img src={slide1} className="w-full h-[300px] object-cover" alt="" />
    <img src={slide2} className="w-full h-[300px] object-cover" alt="" />
    <img src={slide3} className="w-full h-[300px] object-cover" alt="" />
    <img src={slide4} className="w-full h-[300px] object-cover" alt="" />
  </Slider>
    </div>
    
  </div>
  
  </>
}
