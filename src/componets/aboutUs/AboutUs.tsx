import "./AboutUs.css";
import "../ui/Container.css";
import { useTranslation } from "react-i18next";
import ImgAbout from "../../img/about.jpg";
import Img1 from "../../img/Ellipse_30.png";
import Img2 from "../../img/Ellipse_31.png";
import Img3 from "../../img/Ellipse-32.png";

export const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <section className="section" id="AboutUs">
      <div className="container conteiner_aboutUs">
        <img className="img_aboutUs" src={ImgAbout} alt={t("about.imgAlt")}></img>
        <div className="wrapper_aboutUs">
          <h2 className="title_aboutUs">{t("about.title")}</h2>
          <p className="text_aboutUs">{t("about.text")}</p>
          <ul className="list_aboutUs">
            <li>
              <img src={Img1} alt={t("about.photoAlt")}></img>
            </li>
            <li className="item_aboutUs">
              <img src={Img2} alt={t("about.photoAlt")}></img>
            </li>
            <li className="item_aboutUs">
              <img src={Img3} alt={t("about.photoAlt")}></img>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
