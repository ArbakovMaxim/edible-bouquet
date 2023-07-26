import "./Card.css";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface Props {
  images: Array<{ original: string; thumbnail: string; alt: string }>;
  name: string;
  material: string;
  price: string;
}

export const Card = ({ images, name, material, price }: Props) => {
  return (
    <div className="wrapper_card">
      <ReactImageGallery
        items={images}
        showFullscreenButton={false}
        showNav={false}
        showBullets={true}
        showThumbnails={false}
        showPlayButton={false}
      />
      <p className="author_card">Марсель Руссо</p>
      <p className="name_card">{name}</p>
      <p className="material_card">{material}</p>
      <p className="priсe_card">{price}</p>
      <button className="button_card">В корзину</button>
    </div>
  );
};
