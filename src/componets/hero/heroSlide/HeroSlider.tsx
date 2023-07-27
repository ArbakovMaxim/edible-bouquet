import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// import Hero_1 from "../../../img/Hero_img.png";
// import Hero_2 from "../../../img/Hero_2.jpg";
// import Hero_3 from "../../../img/Hero_3.jpg";

import "./HeroSlider.css";

export const HeroSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="Slider1"></div>
        <div className="Slider2"></div>
        <div className="Slider3"></div>
      </Slider>
    </div>
  );
};
