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
            Їстівні букети від <span className="spanHero">S.esh Menya</span>
          </h1>
          <p className="textHero">
            Висока якість букетів зі свіжих продуктів і солодощів. Унікальні
            витвори мистецтва, які замінять звичайні букети, за доступними
            цінами.
          </p>
          <button className="button_hero">
            <a className="link_hero" href="#New">
              Рекомендовані
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};
