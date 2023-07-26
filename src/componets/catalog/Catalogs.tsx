import "./Catalogs.css";
import "../ui/Container.css";
import alco from "../../util/alcoholic.json";
import sweet from "../../util/sweet.json";
import fruits from "../../util/fruits.json";
import { Card } from "../card/Сard";
import { useEffect, useState } from "react";

export const Catalogs = () => {
  const [catalog, setCatalog] = useState("alco");
  const [test, setTest] = useState(alco);

  const styles = {
    color: "white",
    backgroundColor: "#598d66",
  };

  useEffect(() => {
    if (catalog === "alco") {
      setTest(alco);
    }
    if (catalog === "sweet") {
      setTest(sweet);
    }
    if (catalog === "fruits") {
      setTest(fruits);
    }
  }, [catalog]);

  return (
    <section className="section" id="Catalog">
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
          {test.map((bouquet) => {
            return (
              <li className="item_bouquet_category" key={bouquet.id}>
                <Card
                  src={bouquet.src}
                  alt={bouquet.Alt}
                  name={bouquet.name}
                  material={bouquet.material}
                  price={bouquet.price}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
