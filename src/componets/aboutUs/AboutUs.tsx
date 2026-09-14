import "./AboutUs.css";
import "../ui/Container.css";
import ImgAbout from "../../img/about.jpg";
import Img1 from "../../img/Ellipse_30.png";
import Img2 from "../../img/Ellipse_31.png";
import Img3 from "../../img/Ellipse-32.png";

export const AboutUs = () => {
  return (
    <section className="section" id="AboutUs">
      <div className="container conteiner_aboutUs">
        <img
          className="img_aboutUs"
          src={ImgAbout}
          alt="Дівчина з їстівним букетом"
        ></img>
        <div className="wrapper_aboutUs">
          <h2 className="title_aboutUs">Про себе</h2>
          <p className="text_aboutUs">
            Я мама двох діток і люблю свою роботу. Якось мені на день народження
            подарували їстівний букет — і це був захват. Я теж захотіла
            створювати оригінальні букети й дарувати такі самі емоції, які
            відчула сама. Довгий тернистий шлях спроб і помилок до своєї мети — і
            ось я вже створюю їх сама. У кожен букет я вкладаю радість, захват і
            дрібку любові.
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
