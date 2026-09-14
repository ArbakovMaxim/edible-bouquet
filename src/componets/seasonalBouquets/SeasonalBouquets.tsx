import "./SeasonalBouquets.css";
import "../ui/Container.css";
import { useTranslation } from "react-i18next";
import { Star2 } from "../../img/svg/Star2";

export const SeasonalBouquets = () => {
  const { t } = useTranslation();

  return (
    <section className="section section_new" id="New">
      <div className="overlay" />
      <div className="container container_new">
        <div className="wrapper_new">
          <div className="wrapper_title_new">
            <div className="wrapper_svg_new">
              <Star2 />
            </div>
            <h2 className="title_new">{t("seasonal.title")}</h2>
          </div>
          <p className="text_new">{t("seasonal.text1")}</p>
          <p className="text_new">{t("seasonal.text2")}</p>
          <button className="button_new">
            <a className="link_new" href="#Catalog">
              {t("seasonal.cta")}
            </a>
          </button>
        </div>
      </div>
    </section>
  );
};
