import "./Hero.css";
import "../ui/Container.css";
import { HeroSlider } from "./heroSlide/HeroSlider";

export const Hero = () => {
  return (
    <section className="hero_section">
      <div className="container hero_Container">
        <div className="wrapper_slider">
          <HeroSlider />
        </div>
        <div className="wrapper_hero">
          <h1 className="titleHero">
            Съедобные букеты от <span className="spanHero">S.esh Menya</span>{" "}
          </h1>
          <p className="textHero">
            Высокое качество букетов из свежих продуктов и сладостей. Уникальные
            произведения искуства, заменят обычные букеты, доступные цены.
          </p>
          <button className="button_hero">
            <a className="link_hero" href="#New">
              Рекомендуемые
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};
