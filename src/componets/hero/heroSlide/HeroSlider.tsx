import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
