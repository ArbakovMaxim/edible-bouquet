import "./Hero.css";
import "../ui/Container.css";
import { useTranslation } from "react-i18next";
import { HeroSlider } from "./heroSlide/HeroSlider";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero_section">
      <div className="container hero_Container">
        <div className="wrapper_slider">
          <HeroSlider />
        </div>
        <div className="wrapper_hero">
          <h1 className="titleHero">
            {t("hero.titlePrefix")}{" "}
            <span className="spanHero">S.esh Menya</span>
          </h1>
          <p className="textHero">{t("hero.text")}</p>
          <button className="button_hero">
            <a className="link_hero" href="#New">
              {t("hero.cta")}
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};
