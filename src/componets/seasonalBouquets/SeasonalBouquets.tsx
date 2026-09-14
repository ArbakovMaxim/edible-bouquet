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
            <h2 className="title_new">Скоро 1 вересня!</h2>
          </div>
          <p className="text_new">
            Перше, про що замислюються батьки, — що ось-ось діти підуть до школи
            і треба купувати букет для вчителя. Але як відреагує вчитель,
            побачивши не звичайний букет, а їстівний? Правильно, він
            запам'ятається надовго і точно забереться додому. Подаруйте
            незвичайний і корисний букет одночасно!
          </p>
          <p className="text_new">
            А друге — на носі холодна пора року, і саме час запасатися
            вітамінами. Найкориснішим букетом буде фруктовий або овочевий!
          </p>
          <button className="button_new">
            <a className="link_new" href="#Catalog">
              Ознайомитися
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};
