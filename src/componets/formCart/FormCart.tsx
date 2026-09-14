import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
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

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Обов’язкове поле")
    .matches(/^[а-яА-ЯіІїЇєЄґҐa-zA-Z'-]{1,15}$/, "Лише літери, не більше 15 символів")
    .max(15, "Не більше 15 символів"),
  lastName: Yup.string()
    .required("Обов’язкове поле")
    .matches(/^[а-яА-ЯіІїЇєЄґҐa-zA-Z'-]{1,15}$/, "Лише літери, не більше 15 символів")
    .max(15, "Не більше 15 символів"),
  phone: Yup.string()
    .required("Обов’язкове поле")
    .matches(
      /^(?:\+?38)?(?:\([0-9]{3}\)|[0-9]{3})[0-9]{7}$/,
      "Невірний формат номера"
    ),
  messenger: Yup.string(),
  comment: Yup.string().max(300, "Не більше 300 символів"),
  selectedDate: Yup.date()
    .nullable()
    .required("Оберіть дату доставки")
    .min(getMinDate(), "Доставка можлива не раніше ніж через 3 дні"),
});

export const FormCart: React.FC<Prop> = ({ onClose }: Prop) => {
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

  const onSubmit: OnSubmitType = async (
    values: FormData,
    formikHelpers: FormikHelpers<FormData>
  ) => {
    if (bouquets.length === 0) {
      return toast.info("Кошик порожній");
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
          items: bouquets.map((bouquet) => ({
            name: bouquet.name,
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
      toast.error("Не вдалося надіслати замовлення. Зателефонуйте нам, будь ласка.");
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
      <h2 className="title_form_cart">Ваші контакти</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form autoComplete="off">
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
                  Ім’я*
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
                  Прізвище*
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
                  Телефон*
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
                  Телеграм або Вайбер
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
                selected={values.selectedDate}
                onChange={(date) => setFieldValue("selectedDate", date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="Оберіть дату*"
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
                Коментар
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
              {isSending ? "Надсилаємо..." : "Підтвердити замовлення"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
