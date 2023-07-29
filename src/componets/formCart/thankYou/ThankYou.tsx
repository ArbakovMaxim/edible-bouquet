import { Close } from "../../../img/svg/Close";
import "../../ui/Container.css";
import "./ThankYou.css";

interface Prop {
  onClose: () => void;
  setShowThankYouModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThankYou = ({ onClose, setShowThankYouModal }: Prop) => {
  return (
    <div className="modal_bg">
      <div className="thank_you_container">
        <button
          className="button_close_thanks"
          onClick={() => {
            onClose();
            setShowThankYouModal(false);
          }}
        >
          <Close />
        </button>
        <div className="wrapper_text_thanks">
          <p className="text_thanks_one">Ваш заказ успешно принят.</p>
          <p className="text_thanks">
            Мы скоро с вами свяжемся, для уточнения заказа.
          </p>
        </div>
      </div>
    </div>
  );
};
