import "./Footer.css";
import "../ui/Container.css";
import { Star } from "../../img/svg/Star";
import { FaceBook } from "../../img/svg/FaceBook";
import { Instagram } from "../../img/svg/Instagram";
import { YouTube } from "../../img/svg/YouTube";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container container_footer">
        <div className="wrapper_footer">
          <div className="wrapper_logo_and_telefon_footer">
            <div className="wrapper_logo_footer ">
              <Star />
              <p className="logo-text_footer">S.esh Menya</p>
            </div>
            <div>
              <a href="tel:+380635*34545" className="tel_footer">
                +38 (063) 5*3-45-45
              </a>
              <p className="text_footer">Мастерская</p>
            </div>
          </div>
          <div className="wrapper_bouquets_and_aboutUS_footer">
            <div className="wrapper_bouquets_footer">
              <h2 className="title_block_footer">Букеты</h2>
              <ul>
                <li className="text_block_footer">Алкогольные</li>
                <li className="text_block_footer">Сладкие</li>
                <li className="text_block_footer">Фруктовые</li>
              </ul>
            </div>
            <div className="wrapper_aboutUS_footer">
              <h2 className="title_block_footer">О нас</h2>
              <p className="text_block_footer">Мастер</p>
            </div>
          </div>
        </div>
        <div className="wrapper_list_social_footer ">
          <ul className="list_social_footer">
            <li>
              <a href="https://www.facebook.com/S.esh.menyaa">
                <FaceBook />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/s.esh.menya">
                <Instagram />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/">
                <YouTube />
              </a>
            </li>
          </ul>
          <p className="text_in_soc_block_footer">S.esh Menya ®</p>
          <p className="text_in_soc_block_footer">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};
