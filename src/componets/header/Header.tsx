import { useEffect, useState } from "react";
import { Shopping } from "../../img/svg/Shopping";
import { Star } from "../../img/svg/Star";
import { useBouquetsStore } from "../../state/BouquetsState";
import "../ui/Container.css";
import "./Header.css";
import { Cart } from "../Cart/Cart";

export const Header = () => {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bouquets = useBouquetsStore((state) => state.bouquets);

  useEffect(() => {
    const totalCount = bouquets.reduce(
      (total, bouquet) => total + Number(bouquet.count),
      0
    );
    setCount(totalCount);
  }, [bouquets]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          <li className="item_shop" onClick={handleOpenModal}>
            <Shopping />
            {count ? <div className="buy_shop_count">{count}</div> : null}
          </li>
        </ul>
        <Cart isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </header>
  );
};
