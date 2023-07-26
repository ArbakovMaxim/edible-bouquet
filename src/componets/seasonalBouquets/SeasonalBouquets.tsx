import "./SeasonalBouquets.css";
import "../ui/Container.css";
import { Star2 } from "../../img/svg/Star2";

export const SeasonalBouquets = () => {
  return (
    <section className="section section_new" id="New">
      <div className="overlay"></div>
      <div className="container container_new">
        <div className="wrapper_new">
          <div className="wrapper_title_new">
            <div className="wrapper_svg_new">
              <Star2 />
            </div>
            <h2 className="title_new">Новая коллекция французских авторов</h2>d
          </div>
          <p className="text_new">
            Сложно сказать, почему акционеры крупнейших компаний призывают нас к
            новым свершениям, которые, в свою очередь, должны быть заблокированы
            в рамках своих собственных рациональных ограничений.
          </p>
          <p className="text_new">
            Принимая во внимание показатели успешности, граница обучения кадров
            предопределяет высокую востребованность направлений прогрессивного
            развития.
          </p>
          <button className="button_new">Ознакомиться</button>
        </div>
      </div>
    </section>
  );
};
