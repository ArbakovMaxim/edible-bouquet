import "./Cart.css";
import "../ui/Container.css";
import ReactDOM from "react-dom";
import { FormCart } from "../formCart/FormCart";
import { SelectedProducts } from "../selectedProducts/SelectedProducts";
import { Close } from "../../img/svg/Close";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;
  const modalRoot = document.getElementById("modal-root") as Element | null;

  if (!modalRoot) return null;

  document.body.classList.add("modal-open");

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    onClose();
  };

  return ReactDOM.createPortal(
    <section className="section section_wrapper">
      <div className="container container_wrapper__cart">
        <div className="wrapper_cart">
          <div>
            <FormCart onClose={closeModal} />
          </div>
          <div>
            <SelectedProducts />
          </div>
        </div>
        <button className="button_close_cart" onClick={closeModal}>
          <Close />
        </button>
      </div>
    </section>,
    modalRoot
  );
};
