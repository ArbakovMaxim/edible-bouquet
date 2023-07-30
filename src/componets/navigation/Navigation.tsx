import "./Navigation.css";

interface Prop {
  onClose: () => void;
}

export const Navigation = ({ onClose }: Prop) => {
  return (
    <ul className="list_navigation">
      <li onClick={onClose}>
        <a className="link_header" href="#Catalog">
          Букеты
        </a>
      </li>
      <li className="item_navigation" onClick={onClose}>
        <a className="link_header" href="#New">
          Новинки
        </a>
      </li>
      <li className="item_navigation" onClick={onClose}>
        <a className="link_header" href="#AboutUs">
          О нас
        </a>
      </li>
    </ul>
  );
};
