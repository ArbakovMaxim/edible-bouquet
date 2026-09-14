import "./Navigation.css";
import { useTranslation } from "react-i18next";

interface Prop {
  onClose: () => void;
}

export const Navigation = ({ onClose }: Prop) => {
  const { t } = useTranslation();

  return (
    <ul className="list_navigation">
      <li onClick={onClose}>
        <a className="link_header" href="#Catalog">
          {t("nav.bouquets")}
        </a>
      </li>
      <li className="item_navigation" onClick={onClose}>
        <a className="link_header" href="#New">
          {t("nav.new")}
        </a>
      </li>
      <li className="item_navigation" onClick={onClose}>
        <a className="link_header" href="#AboutUs">
          {t("nav.about")}
        </a>
      </li>
    </ul>
  );
};
