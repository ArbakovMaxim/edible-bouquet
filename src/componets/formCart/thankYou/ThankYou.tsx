import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Close } from "../../../img/svg/Close";
import "../../ui/Container.css";
import "./ThankYou.css";

interface Prop {
  onClose: () => void;
  setShowThankYouModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThankYou = ({ onClose, setShowThankYouModal }: Prop) => {
  const { t } = useTranslation();
  const handleClose = useCallback(() => {
    onClose();
    setShowThankYouModal(false);
  }, [onClose, setShowThankYouModal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <div className="modal_bg" onClick={handleClose}>
      <div
        className="thank_you_container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="button_close_thanks" onClick={handleClose}>
          <Close />
        </button>
        <div className="wrapper_text_thanks">
          <p className="text_thanks_one">{t("thankYou.title")}</p>
          <p className="text_thanks">{t("thankYou.text")}</p>
        </div>
      </div>
    </div>
  );
};
