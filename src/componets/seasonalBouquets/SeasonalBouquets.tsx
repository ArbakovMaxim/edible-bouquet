import "./SeasonalBouquets.css";
import "../ui/Container.css";
import { Star2 } from "../../img/svg/Star2";

export const SeasonalBouquets = () => {
  return (
    <section className="section section_new" id="New">
      <div className="overlay" />
      <div className="container container_new">
        <div className="wrapper_new">
          <div className="wrapper_title_new">
            <div className="wrapper_svg_new">
              <Star2 />
            </div>
            <h2 className="title_new">Скоро 1 сентября!</h2>
          </div>
          <p className="text_new">
            Первое о чём задумываются родители, что вот-вот дети пойдут в школу
            и нужно покупать букет для учителя. Но как отреагирует учитель,
            увидев не обычный букет, а сьедобный? Правильно, он запомнится на
            долго и точно заберется домой. Подарите необычный и полезный букет
            одновременно!
          </p>
          <p className="text_new">
            А второе, это на носу холодная пора года и самое время запасаться
            витаминами. Самым полезным букетом будет фруктовый или овощной!
          </p>
          <button className="button_new">
            <a className="link_new" href="#Catalog">
              Ознакомиться
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};
