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

export const createContactValidationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^\S+\s+\S+/, "Введіть ім’я та прізвище")
    .required("Обов’язкове поле"),
  email: Yup.string().email("Некоректний email").required("Обов’язкове поле"),
  phone: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Некоректний телефонний номер")
    .required("Обов’язкове поле"),
  description: Yup.string().max(500, "Максимальна довжина – 500 символів"),
});

export const editContactValidationSchema = Yup.object({
  fullName: Yup.string().matches(/^\S+\s+\S+/, "Введіть ім’я та прізвище"),
  email: Yup.string().email("Некоректний email"),
  phone: Yup.string().matches(/^\+?\d{10,15}$/, "Некоректний телефонний номер"),
  description: Yup.string().max(500, "Максимальна довжина – 500 символів"),
});
