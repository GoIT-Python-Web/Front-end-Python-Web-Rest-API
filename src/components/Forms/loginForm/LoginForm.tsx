import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import logicon from "../../../assets/images/authpages/logicon.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "../../../validation/schemas";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginUser } from "../../../store/auth/operations";
import s from "./LoginForm.module.css";
import { selectError } from "../../../store/auth/selectors";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    dispatch(loginUser(values));
  };

  return (
    <div className={s.formContainer}>
      <img src={logicon} alt="Lock icon" width={56} height={54} />
      <h2>Увійти в обліковий запис</h2>
      <p className={s.join}>Увійдіть і керуйте контактами швидко!</p>

      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
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
              <ErrorMessage name="name" component="div" className={s.error} />
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
                  placeholder="Введіть свій пароль"
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

            {error?.includes("401") && (
              <p className={s.error}>Імʼя користувача або пароль невірний</p>
            )}

            <button className={s.submit} type="submit">
              Увійти в систему
            </button>
            <div className={s.divLink}>
              <p className={s.pLink}>Немає облікового запису?</p>
              <Link className={s.link} to="/register">
                Зареєструватися
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
