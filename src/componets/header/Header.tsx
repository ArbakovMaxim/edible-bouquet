import { Shopping } from "../../img/svg/Shopping";
import { Star } from "../../img/svg/Star";
import { useBouquetsStore } from "../../state/BouquetsState";
import "../ui/Container.css";
import "./Header.css";

export const Header = () => {
  const bouquets = useBouquetsStore((state) => state.bouquets);
  return (
    <header className="header-section">
      <div className="container header-container">
        <div className="wrapper-logo">
          <Star />
          <p className="logo-text ">S.esh Menya</p>
        </div>
        <ul className="list_navigation">
          <li>
            <a className="link_header" href="#Catalog">
              Букеты
            </a>
          </li>
          <li>
            <a className="link_header" href="#New">
              Новинки
            </a>
          </li>
          <li>
            <a className="link_header" href="#AboutUs">
              О нас
            </a>
          </li>
          <li
            className="item_shop"
            onClick={() => {
              console.log(bouquets);
            }}
          >
            <Shopping />
          </li>
        </ul>
      </div>
    </header>
  );
};
