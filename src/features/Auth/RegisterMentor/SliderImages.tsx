import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  let settings = {
      dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,           
  autoplaySpeed: 2000,    
  arrows : false
  };

  return (
    <>
      <div className="slider rounded-r-4xl bg-blue-50 py-8">
        <h3 className="my-4">هل أنت مستعد تصنع فرق؟</h3>
        <Slider {...settings}>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <img
              src="/slider-1.png"
              alt=""
              className="w-full h-auto object-contain"
            />
            <div className="image-content">
              أحدث فرقًا في مسيرة أحدهم المهنية أكثر من ٣٣,٤٥٩ متدربًا يطوّرون
              مهاراتهم يوميًا على Guidor
            </div>
          </div>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <img
              src="/slider-2.png"
              alt=""
              className="w-full h-auto object-contain"
            />
            <div className="image-content">
              أحدث فرقًا في مسيرة أحدهم المهنية أكثر من ٣٣,٤٥٩ متدربًا يطوّرون
              مهاراتهم يوميًا على Guidor
            </div>
          </div>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <img
              src="/slider-3.png"
              alt=""
              className="w-full h-auto object-contain"
            />
            <div className="image-content">
              أحدث فرقًا في مسيرة أحدهم المهنية أكثر من ٣٣,٤٥٩ متدربًا يطوّرون
              مهاراتهم يوميًا على Guidor
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}
