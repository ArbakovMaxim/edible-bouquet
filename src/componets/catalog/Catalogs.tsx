import "./Catalogs.css";
import "../ui/Container.css";
import alco from "../../util/alcoholic.json";
import { Card } from "../card/Сard";

export const Catalogs = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="wrapper_category">
          <h2 className="title_category">Букеты</h2>
          <ul className="list_category ">
            <li>
              <button className="button_catalog">Алкогольные</button>
            </li>
            <li className="item_category">
              <button className="button_catalog">Сладкие</button>
            </li>
            <li className="item_category">
              <button className="button_catalog">Фруктовые</button>
            </li>
          </ul>
        </div>
        <ul className="list_bouquet_category">
          {alco.map((bouquet) => {
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
