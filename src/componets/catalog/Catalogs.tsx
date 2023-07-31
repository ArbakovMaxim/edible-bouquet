import "./Catalogs.css";
import "../ui/Container.css";
import alco from "../../util/alcoholic.json";
import sweet from "../../util/sweet.json";
import fruits from "../../util/fruits.json";
import { Card } from "../card/Сard";
import { SetStateAction, useEffect, useState } from "react";

export const Catalogs = () => {
  const [catalog, setCatalog] = useState("fruits");
  const [data, setData] = useState(alco);
  const [isLoading, setIsLoading] = useState(false);

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
                style={catalog === "alco" ? styles : undefined}
                className="button_catalog"
                onClick={() => {
                  setCatalog("alco");
                }}
              >
                Алкогольные
              </button>
            </li>
            <li className="item_category">
              <button
                style={catalog === "sweet" ? styles : undefined}
                className="button_catalog"
                onClick={() => {
                  setCatalog("sweet");
                }}
              >
                Сладкие
              </button>
            </li>
            <li className="item_category">
              <button
                style={catalog === "fruits" ? styles : undefined}
                className="button_catalog"
                onClick={() => {
                  setCatalog("fruits");
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
