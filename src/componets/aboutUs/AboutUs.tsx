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
          alt="Девушка со съедобным букетом"
        ></img>
        <div className="wrapper_aboutUs">
          <h2 className="title_aboutUs">О себе</h2>
          <p className="text_aboutUs">
            Я мама двух деток и люблю свою работу. Как-то раз мне на день
            рождения подарили сьедобный букет и это был восторг. Я тоже захотела
            создавать оригинальные букеты и дарить такие же эмоции, как я
            испытала. Долгий тернистый путь проб и ошибок к своей цели, и вот я
            уже сама их создаю. В каждый букет я вкладываю радость, восторг и
            щепоточку любви.
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
