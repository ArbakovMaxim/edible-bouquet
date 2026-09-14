import "./Cart.css";
import "../ui/Container.css";
import ReactDOM from "react-dom";
import { useCallback, useEffect } from "react";
import { FormCart } from "../formCart/FormCart";
import { SelectedProducts } from "../selectedProducts/SelectedProducts";
import { Close } from "../../img/svg/Close";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: Props) => {
  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("modal-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") as Element | null;

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <section className="section section_wrapper">
      <div className="modal_bg_cart" onClick={closeModal}></div>
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
