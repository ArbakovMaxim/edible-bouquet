import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./FormCart.css";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  messenger: string;
  comment: string;
}

const initialValues: FormData = {
  firstName: "",
  lastName: "",
  phone: "",
  messenger: "",
  comment: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("Обязательное поле")
    .matches(/^[а-яА-Яa-zA-Z]{1,10}$/, "Только буквы, не более 10 символов"),
  lastName: Yup.string()
    .required("Обязательное поле")
    .matches(/^[а-яА-Яa-zA-Z]{1,10}$/, "Только буквы, не более 10 символов"),
  phone: Yup.string()
    .required("Обязательное поле")
    .matches(
      /^(?:\+?38)?(?:\([0-9]{3}\)|[0-9]{3})[0-9]{7}$/,
      "Неверный формат номера"
    ),
  messenger: Yup.string().required("Обязательное поле"),
  comment: Yup.string(),
});

export const FormCart: React.FC = () => {
  const onSubmit = (values: FormData) => {
    console.log(values);
    // Здесь можно отправить данные на сервер или выполнить другие действия с данными формы
  };
  return (
    <>
      <h2>Ваши контакты</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="wrapper_input">
            <div className="form-field">
              <Field
                type="text"
                name="firstName"
                placeholder=" "
                className="input-field"
              />
              <label htmlFor="firstName" className="input-label">
                Имя
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
              />
              <label htmlFor="lastName" className="input-label">
                Фамилия
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
              />
              <label htmlFor="phone" className="input-label">
                Телефон
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
              />
              <label htmlFor="messenger" className="input-label">
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
            />
            <label htmlFor="comment" className="input-label">
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
    </>
  );
};
