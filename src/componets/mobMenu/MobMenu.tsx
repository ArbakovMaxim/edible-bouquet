import { Close } from "../../img/svg/Close";
import { Navigation } from "../navigation/Navigation";
import "./MobMenu.css";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MobMenu = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") as Element | null;

  if (!modalRoot) return null;

  document.body.classList.add("modal-open");

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="wraper_navigation_mobMenu ">
      <div className="container container_mob_menu">
        <button className="buttons_navigation_mobMenu" onClick={closeModal}>
          <Close />
        </button>
        <Navigation onClose={closeModal} />
      </div>
    </div>,
    modalRoot
  );
};
