import "./Catalogs.css";
import "../ui/Container.css";
import alco from "../../util/alcoholic.json";
import alcoMob from "../../util/alcoholicMob.json";
import sweet from "../../util/sweet.json";
import sweetMob from "../../util/sweetMob.json";
import fruits from "../../util/fruits.json";
import fruitsMob from "../../util/fruitsMob.json";
import { Card } from "../card/Сard";
import { useEffect, useState } from "react";
import { Bouquet } from "../../state/BouquetsState";
import { withAssetUrls } from "../../util/assetUrl";

type Category = "alco" | "sweet" | "fruits";

const categories: { key: Category; label: string }[] = [
  { key: "alco", label: "Алкогольні" },
  { key: "sweet", label: "Солодкі" },
  { key: "fruits", label: "Фруктові" },
];

const catalogData: Record<Category, { desktop: Bouquet[]; mobile: Bouquet[] }> =
  {
    alco: { desktop: withAssetUrls(alco), mobile: withAssetUrls(alcoMob) },
    sweet: { desktop: withAssetUrls(sweet), mobile: withAssetUrls(sweetMob) },
    fruits: { desktop: withAssetUrls(fruits), mobile: withAssetUrls(fruitsMob) },
  };

export const Catalogs = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 767);
  const [category, setCategory] = useState<Category>("fruits");
  const [data, setData] = useState<Bouquet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    color: "white",
    backgroundColor: "#598d66",
  };

  useEffect(() => {
    let cancelled = false;
    setIsLoading(false);

    const newData = isMobile
      ? catalogData[category].mobile
      : catalogData[category].desktop;

    const timer = setTimeout(() => {
      if (cancelled) return;
      setData(newData);
      setIsLoading(true);
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [category, isMobile]);

  return (
    <section className="section section_catalog" id="Catalog">
      <div className="container">
        <div className="wrapper_category">
          <h2 className="title_category">Букети</h2>
          <ul className="list_category ">
            {categories.map(({ key, label }, index) => (
              <li key={key} className={index === 0 ? undefined : "item_category"}>
                <button
                  style={category === key ? styles : undefined}
                  className="button_catalog"
                  onClick={() => setCategory(key)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <ul className="list_bouquet_category">
          {isLoading ? (
            data.map((bouquet) => {
              return (
                <li className="item_bouquet_category" key={bouquet.id}>
                  <Card
                    allInfo={bouquet}
                    images={bouquet.images}
                    name={bouquet.name}
                    material={bouquet.material}
                    price={bouquet.price}
                  />
                </li>
              );
            })
          ) : (
            <div className="spinner"></div>
          )}
        </ul>
      </div>
    </section>
  );
};
