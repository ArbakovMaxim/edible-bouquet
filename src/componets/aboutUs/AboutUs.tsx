import "./AboutUs.css";
import "../ui/Container.css";
import ImgAbout from "../../img/about.jpg";
import Img1 from "../../img/Ellipse_30.png";
import Img2 from "../../img/Ellipse_31.jpg";
import Img3 from "../../img/Ellipse-32.jpg";

export const AboutUs = () => {
  return (
    <section className="section" id="AboutUs">
      <div className="container conteiner_aboutUs">
        <img src={ImgAbout} alt="Девушка со съедобным букетом"></img>
        <div className="wrapper_aboutUs">
          <h2>Наша команда</h2>
          <p className="text_aboutUs">
            Значимость этих проблем настолько очевидна, что базовый вектор
            развития позволяет оценить значение экспериментов, поражающих по
            своей масштабности и грандиозности. Мы вынуждены отталкиваться от
            того, что консультация с широким активом.
          </p>
          <ul className="list_aboutUs">
            <li>
              <img src={Img1} alt="фото"></img>
            </li>
            <li className="item_aboutUs">
              <img src={Img2} alt="фото"></img>
            </li>
            <li className="item_aboutUs">
              <img src={Img3} alt="фото"></img>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
