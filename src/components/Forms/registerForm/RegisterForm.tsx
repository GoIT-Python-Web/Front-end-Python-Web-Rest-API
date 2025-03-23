import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import regicon from "../../../assets/images/authpages/regicon.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidationSchema } from "../../../validation/schemas";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { registerUser } from "../../../store/auth/operations";
import s from "./RegisterForm.module.css";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(registerUser(values));
  };
  return (
    <div className={s.formContainer}>
      <img src={regicon} alt="Lock icon" width={56} height={54} />
      <h2>Створіть обліковий запис</h2>
      <p className={s.join}>Приєднуйтесь та керуйте контактами легко!</p>

      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={s.form}>
            <div className={s.inputContainer}>
              <label htmlFor="username">
                Username<span>*</span>
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                placeholder="Введіть свій username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className={s.error}
              />
            </div>

            <div className={s.inputContainer}>
              <label htmlFor="email">
                Email<span>*</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Введіть свій email"
              />
              <ErrorMessage name="email" component="div" className={s.error} />
            </div>

            <div className={s.inputContainer}>
              <label htmlFor="password">
                Пароль<span>*</span>
              </label>
              <div className={s.passwordContainer}>
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Придумайте пароль"
                />
                {showPassword ? (
                  <FaEyeSlash
                    className={s.icon}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye
                    className={s.icon}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className={s.error}
              />
            </div>

            <button type="submit">Створити обліковий запис</button>
            <div className={s.divLink}>
              <p className={s.pLink}>Вже маєте обліковий запис?</p>
              <Link className={s.link} to="/login">
                Увійти
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
