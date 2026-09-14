import "./LangSwitch.css";
import { useTranslation } from "react-i18next";
import { LANGUAGES, Language } from "../../i18n";

interface Props {
  /** В мобильном меню переключатель растягивается на всю ширину. */
  variant?: "header" | "mobile";
}

export const LangSwitch = ({ variant = "header" }: Props) => {
  const { t, i18n } = useTranslation();
  const current = (i18n.resolvedLanguage || "uk") as Language;

  return (
    <div
      className={`lang_switch lang_switch--${variant}`}
      role="group"
      aria-label={t("lang.switch")}
    >
      {LANGUAGES.map((lng) => (
        <button
          key={lng}
          type="button"
          className={`lang_switch__button${
            current === lng ? " lang_switch__button--active" : ""
          }`}
          aria-pressed={current === lng}
          onClick={() => i18n.changeLanguage(lng)}
        >
          {t(`lang.${lng}`)}
        </button>
      ))}
    </div>
  );
};
