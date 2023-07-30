import "./Card.css";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useState, useEffect } from "react";
import { useBouquetsStore } from "../../state/BouquetsState";
import { toast } from "react-toastify";

interface Props {
  images: Array<{ original: string; thumbnail: string; alt: string }>;
  name: string;
  material: string;
  price: string;
  allInfo: {
    id: string;
    images: { original: string; thumbnail: string; alt: string }[];
    name: string;
    count: string;
    material: string;
    price: string;
  };
}

export const Card = ({ images, name, material, price, allInfo }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const setBouquets = useBouquetsStore((state) => state.setBouquets);

  useEffect(() => {
    const imgLoaded: { [key: string]: boolean } = {};
    const loadImage = (url: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          imgLoaded[url] = true;
          resolve();
        };
        img.onerror = (err) => {
          reject(err);
        };
        img.src = url;
      });
    };

    const promises = images.map((img) => loadImage(img.original));

    Promise.all(promises)
      .then(() => {
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Error loading images:", err);
      });
  }, [images]);

  if (!isLoaded) {
    return <div className="spinner"></div>;
  }

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
      {/* <button className="" onClick={handleClick}>
        Состав
      </button> */}
      <p className="name_card">{name}</p>
      <p className="material_card">{material}</p>
      <p className="priсe_card">{price} грн</p>
      <button
        className="button_card"
        onClick={() => {
          setBouquets([allInfo]);
          toast.info("Добавлено в корзину");
        }}
      >
        В корзину
      </button>
    </div>
  );
};
