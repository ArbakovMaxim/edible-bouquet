import "./Hero.css";
import "../ui/Container.css";
import { HeroSlider } from "./heroSlide/HeroSlider";
// import HeroImg from "../../img/Hero_img.png";

export const Hero = () => {
  return (
    <div className="container hero_Container">
      <div className="wrapper_slider">
        <HeroSlider />
      </div>
      {/* <img src={HeroImg} alt="Букет из киндеров" /> */}
      <div className="wrapper_hero">
        <h1 className="titleHero">
          Съедобные букеты от <span className="spanHero">S.esh Menya</span>{" "}
        </h1>
        <p className="textHero">
          Высокое качество букетов из свежих продуктов и сладостей. Уникальные
          произведения искуства, заменят обычные букеты, доступные цены.
        </p>
        <button className="button_hero">Продукция</button>
      </div>
    </div>
  );
};
