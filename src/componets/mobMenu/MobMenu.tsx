import { useEffect } from "react";
import { Close } from "../../img/svg/Close";
import { Navigation } from "../navigation/Navigation";
import "./MobMenu.css";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const MobMenu = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  if (!isOpen) return null;

  const modalRoot = document.getElementById("modal-root") as Element | null;

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className="wraper_navigation_mobMenu ">
      <div className="container container_mob_menu">
        <button className="buttons_navigation_mobMenu" onClick={onClose}>
          <Close />
        </button>
        <Navigation onClose={onClose} />
      </div>
    </div>,
    modalRoot
  );
};
