import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useBouquetsStore } from "../../state/BouquetsState";
import { toast } from "react-toastify";
import "./FormCart.css";
import { ThankYou } from "./thankYou/ThankYou";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  messenger: string;
  comment: string;
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
};

interface Prop {
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Обязательное поле")
    .matches(/^[а-яА-Яa-zA-Z]{1,15}$/, "Только буквы, не более 15 символов")
    .max(15, "Не более 15 символов"),
  lastName: Yup.string()
    .required("Обязательное поле")
    .matches(/^[а-яА-Яa-zA-Z]{1,15}$/, "Только буквы, не более 15 символов")
    .max(15, "Не более 15 символов"),
  phone: Yup.string()
    .required("Обязательное поле")
    .matches(
      /^(?:\+?38)?(?:\([0-9]{3}\)|[0-9]{3})[0-9]{7}$/,
      "Неверный формат номера"
    ),
  messenger: Yup.string(),
  comment: Yup.string().max(300, "Не более 300 символов"),
});

export const FormCart: React.FC<Prop> = ({ onClose }: Prop) => {
  const bouquets = useBouquetsStore((state) => state.bouquets);
  const removeAll = useBouquetsStore((state) => state.removeAll);
  const [hasFirstNameText, setHasFirstNameText] = useState(false);
  const [hasLastNameText, setHasLastNameText] = useState(false);
  const [hasPhoneText, setHasPhoneText] = useState(false);
  const [hasMessengerText, setHasMessengerText] = useState(false);
  const [hasCommentText, setHasCommentText] = useState(false);
  const [buyBouquets, setBuyBouquets] = useState({});
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const onSubmit: OnSubmitType = async (
    values: FormData,
    formikHelpers: FormikHelpers<FormData>
  ) => {
    if (bouquets.length === 0) {
      return toast.info("Корина пустая");
    }
    console.log("заказ:", buyBouquets);
    console.log("валуе:", values);
    removeAll();
    formikHelpers.resetForm();
    setShowThankYouModal(true);
  };

  useEffect(() => {
    const names: string[] = bouquets.map((bouquet) => bouquet.name);
    const prices: string[] = bouquets.map((bouquet) => bouquet.price);
    const counts: string[] = bouquets.map((bouquet) => bouquet.count);
    const order = {
      names,
      prices,
      counts,
    };
    setBuyBouquets(order);
  }, [bouquets]);

  return (
    <div className="wraper_form">
      {showThankYouModal ? (
        <ThankYou
          onClose={onClose}
          setShowThankYouModal={setShowThankYouModal}
        />
      ) : null}
      <h2 className="title_form_cart">Ваши контакты</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
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
                Имя*
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
                Фамилия*
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
                Телеграм или Вайбер
              </label>
              <ErrorMessage
                name="messenger"
                component="div"
                className="error-message"
              />
            </div>
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
              Комментарий
            </label>
            <ErrorMessage
              name="comment"
              component="div"
              className="error-message"
            />
          </div>

          <button className="buttom_submit_form" type="submit">
            Подтвердить заказ
          </button>
        </Form>
      </Formik>
    </div>
  );
};
