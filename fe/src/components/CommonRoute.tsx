import Card from "./Card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from "react";

function CommonRoutes() {
  const [numberSlide, setNumberSlide] = useState(4);
  useEffect(() => {
    const setWidthNumber = () => {
      const width = window.innerWidth;
      if (width < 768 && width > 425) {
        setNumberSlide(2);
      } else if (width >= 768) {
        setNumberSlide(4);
      } else {
        setNumberSlide(1);
      }
    };
    window.addEventListener("resize", setWidthNumber);

    return () => {
      window.removeEventListener("resize", setWidthNumber);
    };
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: numberSlide,
    slidesToScroll: 1,
  };
  return (
    <>
      <div className="w-full px-5 lg:px-0 flex justify-center  my-10">
        <div className="w-full lg:w-10/12 xl:w-7/12 gap-5 flex flex-col">
          <p className="text-xl">Tuyến đường phổ biến</p>

          <Slider {...settings} className="">
            <div className="px-2">
              <Card color="9E947C"></Card>
            </div>
            <div className="px-2">
              <Card color="9E947C"></Card>
            </div>
            <div className="px-2">
              <Card color="9E947C"></Card>
            </div>
            <div className="px-2">
              <Card color="9E947C"></Card>
            </div>
          </Slider>
        </div>
      </div>
    </>
  );
}

export default CommonRoutes;
