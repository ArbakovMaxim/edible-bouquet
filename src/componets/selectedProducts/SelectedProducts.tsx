import "./SelectedProducts.css";
import { useBouquetsStore } from "../../state/BouquetsState";
import { Close } from "../../img/svg/Close";
import { useEffect, useState } from "react";
import { Add } from "../../img/svg/Add";
import { Minus } from "../../img/svg/Minus";

export const SelectedProducts = () => {
  const [totalPrice, setTotalPrice] = useState(Number);
  const [totalBouquets, setTotalBouquets] = useState(Number);
  const [titleBouquets, setTitleBouquets] = useState("Букет");
  const bouquets = useBouquetsStore((state) => state.bouquets);
  const removeItems = useBouquetsStore((state) => state.removeItems);
  const removeCount = useBouquetsStore((state) => state.removeCount);
  const addCount = useBouquetsStore((state) => state.addCount);

  useEffect(() => {
    const totalSum = bouquets.reduce(
      (total, bouquet) => total + Number(bouquet.price) * Number(bouquet.count),
      0
    );
    setTotalPrice(totalSum);
  }, [bouquets]);

  useEffect(() => {
    const totalCount = bouquets.reduce(
      (total, bouquet) => total + Number(bouquet.count),
      0
    );
    setTotalBouquets(totalCount);
  }, [bouquets]);

  useEffect(() => {
    let title = "Букет";
    if (totalBouquets === 0) {
      title = "Букетов";
    }
    if (totalBouquets === 1) {
      title = "Букет";
    }
    if (totalBouquets > 1) {
      title = "Букета";
    }
    if (totalBouquets > 4) {
      title = "Букетов";
    }
    setTitleBouquets(title);
  }, [bouquets, totalBouquets]);

  return (
    <div className="wrapper_product">
      <h2 className="title_select_cart">Товары в корзине</h2>
      <ul className="list_product">
        {bouquets.map((bouquet) => {
          const sum = Number(bouquet.price) * Number(bouquet.count);
          return (
            <li key={bouquet.id} className="item_product">
              <img
                className="img_product"
                src={bouquet.images[0].thumbnail}
                alt={bouquet.images[0].alt}
              />
              <div className="wrapper_allInfo_product">
                <p className="name_product">{bouquet.name}</p>
                <div className="wrapper_price__product">
                  <p className="sum_products">{sum} грн</p>
                  <button
                    className="button_add_and_remove"
                    onClick={() => {
                      addCount(bouquet.id);
                    }}
                  >
                    <Add />
                  </button>
                  <p className="count_products">x{bouquet.count}</p>
                  <button
                    className="button_add_and_remove"
                    onClick={() => {
                      removeCount(bouquet.id);
                    }}
                  >
                    <Minus />
                  </button>
                </div>
              </div>
              <div className="wrapper_button_product">
                <button
                  className="button_delete_product"
                  onClick={() => {
                    removeItems(bouquet.id);
                  }}
                >
                  <Close />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="wrapper_allSum_product">
        <p className="text_count_container">
          Вместе:{" "}
          <span className="span_container">
            {totalBouquets} {titleBouquets}
          </span>
        </p>
        <p className="text_count_container">
          На сумму <span className="span_container">{totalPrice}</span> грн
        </p>
      </div>
    </div>
  );
};
