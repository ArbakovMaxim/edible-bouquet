import "./SelectedProducts.css";
import { useBouquetsStore } from "../../state/BouquetsState";
import { Close } from "../../img/svg/Close";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Add } from "../../img/svg/Add";
import { Minus } from "../../img/svg/Minus";

export const SelectedProducts = () => {
  const { t } = useTranslation();
  // названия и alt хранятся в состоянии как ключи каталога
  const tc = useTranslation("catalog").t;
  const [totalPrice, setTotalPrice] = useState(Number);
  const [totalBouquets, setTotalBouquets] = useState(Number);
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

  return (
    <div className="wrapper_product">
      <h2 className="title_select_cart">{t("cart.title")}</h2>
      <ul className="list_product">
        {bouquets.map((bouquet) => {
          const sum = Number(bouquet.price) * Number(bouquet.count);
          return (
            <li key={bouquet.id} className="item_product">
              <img
                className="img_product"
                src={bouquet.images[0].thumbnail}
                alt={tc(bouquet.images[0].alt)}
              />
              <div className="wrapper_allInfo_product">
                <p className="name_product">{tc(bouquet.name)}</p>
                <div className="wrapper_price__product">
                  <p className="sum_products">
                    {sum} {t("cart.currency")}
                  </p>
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
          {t("cart.together")}{" "}
          <span className="span_container">
            {totalBouquets} {t("cart.bouquets", { count: totalBouquets })}
          </span>
        </p>
        <p className="text_count_container">
          {t("cart.sum")} <span className="span_container">{totalPrice}</span>{" "}
          {t("cart.currency")}
        </p>
      </div>
    </div>
  );
};
