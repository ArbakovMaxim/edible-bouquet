import "./Catalogs.css";
import "../ui/Container.css";
import alco from "../../util/alcoholic.json";
import alcoMob from "../../util/alcoholicMob.json";
import sweet from "../../util/sweet.json";
import sweetMob from "../../util/sweetMob.json";
import fruits from "../../util/fruits.json";
import fruitsMob from "../../util/fruitsMob.json";
import { Card } from "../card/Сard";
import { SetStateAction, useEffect, useState } from "react";

export const Catalogs = () => {
  const [catalog, setCatalog] = useState("");
  const [data, setData] = useState(alco);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isMobileScreen = window.innerWidth <= 767;

  useEffect(() => {
    setIsMobile(isMobileScreen);
    isMobileScreen ? setCatalog("fruitsMob") : setCatalog("fruits");
  }, [isMobileScreen]);

  const styles = {
    color: "white",
    backgroundColor: "#598d66",
  };

  const loadData = async () => {
    setIsLoading(false);

    let newData: SetStateAction<
      {
        id: string;
        images: { original: string; thumbnail: string; alt: string }[];
        name: string;
        count: string;
        material: string;
        price: string;
      }[]
    > = [];
    if (catalog === "alco") {
      newData = alco;
    }
    if (catalog === "sweet") {
      newData = sweet;
    }
    if (catalog === "fruits") {
      newData = fruits;
    }
    if (catalog === "alcoMob") {
      newData = alcoMob;
    }
    if (catalog === "sweetMob") {
      newData = sweetMob;
    }
    if (catalog === "fruitsMob") {
      newData = fruitsMob;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    setData(newData);
    setIsLoading(true);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog]);

  return (
    <section className="section section_catalog" id="Catalog">
      <div className="container">
        <div className="wrapper_category">
          <h2 className="title_category">Букеты</h2>
          <ul className="list_category ">
            <li>
              <button
                style={
                  catalog === "alco" || catalog === "alcoMob"
                    ? styles
                    : undefined
                }
                className="button_catalog"
                onClick={() => {
                  isMobile ? setCatalog("alcoMob") : setCatalog("alco");
                }}
              >
                Алкогольные
              </button>
            </li>
            <li className="item_category">
              <button
                style={
                  catalog === "sweet" || catalog === "sweetMob"
                    ? styles
                    : undefined
                }
                className="button_catalog"
                onClick={() => {
                  isMobile ? setCatalog("sweetMob") : setCatalog("sweet");
                }}
              >
                Сладкие
              </button>
            </li>
            <li className="item_category">
              <button
                style={
                  catalog === "fruits" || catalog === "fruitsMob"
                    ? styles
                    : undefined
                }
                className="button_catalog"
                onClick={() => {
                  isMobile ? setCatalog("fruits") : setCatalog("fruitsMob");
                }}
              >
                Фруктовые
              </button>
            </li>
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
