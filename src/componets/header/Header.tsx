import { Shopping } from "../../img/svg/Shopping";
import { Star } from "../../img/svg/Star";
import "../ui/Container.css";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header-section">
      <div className="container header-container">
        <div className="wrapper-logo">
          <Star />
          <p className="logo-text ">S.esh Menya</p>
        </div>
        <ul className="list_navigation">
          <li>Букеты</li>
          <li>Новинки</li>
          <li>О нас</li>
          <li>
            <Shopping />
          </li>
        </ul>
      </div>
    </header>
  );
};
