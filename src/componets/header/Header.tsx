import { useEffect, useState } from "react";
import { Shopping } from "../../img/svg/Shopping";
import { Star } from "../../img/svg/Star";
import { useBouquetsStore } from "../../state/BouquetsState";
import "../ui/Container.css";
import "./Header.css";
import { Cart } from "../Cart/Cart";
import { Navigation } from "../navigation/Navigation";
import { MobM } from "../../img/svg/MobM";
import { MobMenu } from "../mobMenu/MobMenu";

export const Header = () => {
  const [count, setCount] = useState(0);
  const [isOpenMobMenu, setIsOpenMobMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bouquets = useBouquetsStore((state) => state.bouquets);

  const handleMenuOpen = () => {
    setIsOpenMobMenu(true);
  };

  const handleMenuClose = () => {
    setIsOpenMobMenu(false);
  };

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
        <div className="wraper_navigation_shop">
          <div className="wraper_navigation_tab">
            <Navigation onClose={() => {}} />
          </div>
          <div className="wraper_navigation_mob">
            <button className="button_mob_menu_open" onClick={handleMenuOpen}>
              <MobM />
            </button>
          </div>
          <div className="item_shop" onClick={handleOpenModal}>
            <Shopping />
            {count ? <div className="buy_shop_count">{count}</div> : null}
          </div>
        </div>
        <MobMenu isOpen={isOpenMobMenu} onClose={handleMenuClose} />
        <Cart isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </header>
  );
};
