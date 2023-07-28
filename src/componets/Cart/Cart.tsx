import "./Cart.css";
import "../ui/Container.css";
import { FormCart } from "../formCart/FormCart";
import { SelectedProducts } from "../selectedProducts/SelectedProducts";

export const Cart = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="wrapper_cart">
          <div>
            <FormCart />
          </div>
          <div>
            <SelectedProducts />
          </div>
        </div>
      </div>
    </section>
  );
};
