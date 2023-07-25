import "./Card.css";

interface Props {
  src: string;
  alt: string;
  name: string;
  material: string;
  price: string;
}

export const Card = ({ src, alt, name, material, price }: Props) => {
  return (
    <div className="wrapper_card">
      <img className="img_card" src={src} alt={alt} />
      <p className="author_card">Марсель Руссо</p>
      <p className="name_card">{name}</p>
      <p className="material_card">{material}</p>
      <p className="priсe_card">{price}</p>
      <button className="button_card">В корзину</button>
    </div>
  );
};
