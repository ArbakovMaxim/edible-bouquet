import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useBouquetsStore } from "../../state/BouquetsState";
import { toast } from "react-toastify";
import "./FormCart.css";
import { ThankYou } from "./thankYou/ThankYou";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  messenger: string;
  comment: string;
  selectedDate: Date | null;
}

type OnSubmitType = (
  values: FormData,
  formikHelpers: FormikHelpers<FormData>
) => void | Promise<any>;

const initialValues: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  messenger: "",
  comment: "",
  selectedDate: null,
};

interface Prop {
  onClose: () => void;
}

const getMinDate = () => {
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  minDate.setHours(0, 0, 0, 0);
  return minDate;
};

/**
 * Formik хранит тексты ошибок в своём состоянии с момента последней проверки,
 * поэтому при смене языка уже показанные сообщения остались бы на прежнем.
 * Перезапускаем валидацию — но только если ошибки реально показаны.
 */
const RevalidateOnLanguageChange = ({
  language,
  formik,
}: {
  language: string;
  formik: FormikProps<FormData>;
}) => {
  const previousLanguage = useRef(language);
  const { validateForm, errors, submitCount } = formik;

  useEffect(() => {
    if (previousLanguage.current === language) return;
    previousLanguage.current = language;

    if (submitCount > 0 || Object.keys(errors).length > 0) {
      validateForm();
    }
  }, [language, validateForm, errors, submitCount]);

  return null;
};

export const FormCart: React.FC<Prop> = ({ onClose }: Prop) => {
  const { t, i18n } = useTranslation();
  const bouquets = useBouquetsStore((state) => state.bouquets);
  const removeAll = useBouquetsStore((state) => state.removeAll);
  const [hasFirstNameText, setHasFirstNameText] = useState(false);
  const [hasLastNameText, setHasLastNameText] = useState(false);
  const [hasPhoneText, setHasPhoneText] = useState(false);
  const [hasMessengerText, setHasMessengerText] = useState(false);
  const [hasCommentText, setHasCommentText] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const minDate = getMinDate();

  // Схему пересобираем при смене языка, иначе тексты ошибок останутся на прежнем
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        firstName: Yup.string()
          .required(t("form.validation.required"))
          .matches(
            /^[а-яА-ЯіІїЇєЄґҐa-zA-Z'-]{1,15}$/,
            t("form.validation.lettersOnly")
          )
          .max(15, t("form.validation.max15")),
        lastName: Yup.string()
          .required(t("form.validation.required"))
          .matches(
            /^[а-яА-ЯіІїЇєЄґҐa-zA-Z'-]{1,15}$/,
            t("form.validation.lettersOnly")
          )
          .max(15, t("form.validation.max15")),
        phone: Yup.string()
          .required(t("form.validation.required"))
          .matches(
            /^(?:\+?38)?(?:\([0-9]{3}\)|[0-9]{3})[0-9]{7}$/,
            t("form.validation.phoneFormat")
          ),
        messenger: Yup.string(),
        comment: Yup.string().max(300, t("form.validation.max300")),
        selectedDate: Yup.date()
          .nullable()
          .required(t("form.validation.dateRequired"))
          .min(getMinDate(), t("form.validation.dateMin")),
      }),
    [t]
  );

  const onSubmit: OnSubmitType = async (
    values: FormData,
    formikHelpers: FormikHelpers<FormData>
  ) => {
    if (bouquets.length === 0) {
      return toast.info(t("cart.empty"));
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          messenger: values.messenger,
          comment: values.comment,
          selectedDate: values.selectedDate,
          language: i18n.resolvedLanguage,
          items: bouquets.map((bouquet) => ({
            // в состоянии лежат ключи каталога — отправляем читаемое название
            name: t(bouquet.name, { ns: "catalog" }),
            price: bouquet.price,
            count: bouquet.count,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      removeAll();
      formikHelpers.resetForm();
      setShowThankYouModal(true);
    } catch (error) {
      console.error("Не вдалося надіслати замовлення:", error);
      toast.error(t("form.error"));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="wraper_form">
      {showThankYouModal ? (
        <ThankYou
          onClose={onClose}
          setShowThankYouModal={setShowThankYouModal}
        />
      ) : null}
      <h2 className="title_form_cart">{t("form.title")}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form autoComplete="off">
            <RevalidateOnLanguageChange
              language={i18n.resolvedLanguage || ""}
              formik={formik}
            />
            <div className="wrapper_input">
              <div className="form-field">
                <Field
                  type="text"
                  name="firstName"
                  placeholder=" "
                  className="input-field"
                  autoComplete="off"
                  onFocus={() => setHasFirstNameText(true)}
                  onBlur={(e: { target: { value: string } }) => {
                    const trimmedValue = e.target.value.trim();
                    setHasFirstNameText(!!trimmedValue);
                    e.target.value = trimmedValue;
                  }}
                />
                <label
                  htmlFor="firstName"
                  className={`input-label ${
                    hasFirstNameText ? "input-label-active" : ""
                  }`}
                >
                  {t("form.firstName")}
                </label>
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-field">
                <Field
                  type="text"
                  name="lastName"
                  placeholder=" "
                  className="input-field"
                  autoComplete="off"
                  onFocus={() => setHasLastNameText(true)}
                  onBlur={(e: { target: { value: string } }) => {
                    const trimmedValue = e.target.value.trim();
                    setHasLastNameText(!!trimmedValue);
                    e.target.value = trimmedValue;
                  }}
                />
                <label
                  htmlFor="lastName"
                  className={`input-label ${
                    hasLastNameText ? "input-label-active" : ""
                  }`}
                >
                  {t("form.lastName")}
                </label>
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="wrapper_input">
              <div className="form-field">
                <Field
                  type="text"
                  name="phone"
                  placeholder=" "
                  className="input-field"
                  autoComplete="off"
                  onFocus={() => setHasPhoneText(true)}
                  onBlur={(e: { target: { value: string } }) => {
                    const trimmedValue = e.target.value.trim();
                    setHasPhoneText(!!trimmedValue);
                    e.target.value = trimmedValue;
                  }}
                />
                <label
                  htmlFor="phone"
                  className={`input-label ${
                    hasPhoneText ? "input-label-active" : ""
                  }`}
                >
                  {t("form.phone")}
                </label>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="form-field">
                <Field
                  type="text"
                  name="messenger"
                  placeholder=" "
                  className="input-field"
                  autoComplete="off"
                  onFocus={() => setHasMessengerText(true)}
                  onBlur={(e: { target: { value: string } }) => {
                    const trimmedValue = e.target.value.trim();
                    setHasMessengerText(!!trimmedValue);
                    e.target.value = trimmedValue;
                  }}
                />
                <label
                  htmlFor="messenger"
                  className={`input-label ${
                    hasMessengerText ? "input-label-active" : ""
                  }`}
                >
                  {t("form.messenger")}
                </label>
                <ErrorMessage
                  name="messenger"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="form-field form-field_piker">
              <DatePicker
                className="data_picker"
                selected={formik.values.selectedDate}
                onChange={(date) => formik.setFieldValue("selectedDate", date)}
                dateFormat="dd.MM.yyyy"
                placeholderText={t("form.date")}
                minDate={minDate}
                withPortal
                portalId="root-portal"
              />
              <ErrorMessage
                name="selectedDate"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-field">
              <Field
                as="textarea"
                name="comment"
                placeholder=" "
                className="input-field__texteria"
                autoComplete="off"
                onFocus={() => setHasCommentText(true)}
                onBlur={(e: { target: { value: string } }) => {
                  const trimmedValue = e.target.value.trim();
                  setHasCommentText(!!trimmedValue);
                  e.target.value = trimmedValue;
                }}
              />
              <label
                htmlFor="comment"
                className={`input-label ${
                  hasCommentText ? "input-label-active" : ""
                }`}
              >
                {t("form.comment")}
              </label>
              <ErrorMessage
                name="comment"
                component="div"
                className="error-message"
              />
            </div>

            <button
              className="buttom_submit_form"
              type="submit"
              disabled={isSending}
            >
              {isSending ? t("form.sending") : t("form.submit")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
