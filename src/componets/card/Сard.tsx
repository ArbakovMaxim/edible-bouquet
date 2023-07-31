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
  const [isFlipped, setIsFlipped] = useState(false);
  const setBouquets = useBouquetsStore((state) => state.setBouquets);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

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
      <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card__face">
          <ReactImageGallery
            items={images}
            showFullscreenButton={false}
            showNav={false}
            showBullets={true}
            showThumbnails={false}
            showPlayButton={false}
          />
          <p className="name_card">{name}</p>
          <button className="button_compound_card" onClick={handleClick}>
            Состав
          </button>
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
        <div className="card__face card__face--back">
          <p className="material_card">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            dignissimos minima, illum expedita tenetur cum deserunt eius
            perspiciatis aliquam earum ratione, ipsa neque unde nihil quasi,
            placeat sit voluptatibus? Quos?
          </p>
          <button className="button_back_card" onClick={handleClick}>
            назад
          </button>
        </div>
      </div>
    </div>
  );
};
