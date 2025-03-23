import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  username: Yup.string().required("Обов'язкове поле"),
  email: Yup.string()
    .email("Невірний формат email")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Обов'язкове поле"),
});

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Мінімум 6 символів")
    .required("Обов'язкове поле"),
});
