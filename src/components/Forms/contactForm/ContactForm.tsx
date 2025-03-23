import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { BiInfoSquare } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  fetchContactById,
  updateContactById,
  createContact,
  deleteContactById,
  fetchContacts,
} from "../../../store/contacts/operations";
import s from "./ContactForm.module.css";
import { selectContact } from "../../../store/contacts/selectors";
import { clearItem } from "../../../store/contacts/slice";
import DeletePopUp from "../../UI/popup/DeletePopUp";
import { FaArrowLeft } from "react-icons/fa";

export default function ContactForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = location.pathname.endsWith("/edit");
  const contact = useAppSelector(selectContact);

  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchContactById({ id }));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(clearItem());
      dispatch(fetchContacts());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (contact?.birthdate) {
      setBirthdate(new Date(contact.birthdate));
    }
  }, [contact]);

  const initialValues = {
    fullName: contact
      ? `${contact.first_name ?? ""} ${contact.last_name ?? ""}`
      : "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    description: contact?.description || "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    const [first_name, ...lastNameParts] = values.fullName.trim().split(" ");
    const last_name = lastNameParts.join(" ") || "";
    const formattedBirthdate = birthdate ? format(birthdate, "MM/dd/yyyy") : "";

    const formattedValues = {
      id,
      first_name,
      last_name,
      birthdate: formattedBirthdate,
      email: values.email,
      phone: values.phone,
      description: values.description,
    };

    if (isEditMode && id) {
      dispatch(updateContactById({ id, updatedData: formattedValues }));
    } else {
      dispatch(createContact(formattedValues));
    }
    navigate("/");
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deleteContactById({ id }));
      navigate("/");
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.absolute} onClick={() => navigate(-1)}>
        <FaArrowLeft className={s.arrow} />
        <p>Назад</p>
      </div>
      <div className={s.div}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className={s.form}>
              <div className={s.inputContainer}>
                <label htmlFor="fullName">Ім’я Та прізвище</label>
                <Field type="text" id="fullName" name="fullName" />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.inputContainer}>
                <label htmlFor="birthdate">Дата Народження</label>
                <DatePicker
                  selected={birthdate}
                  onChange={(date) => {
                    setBirthdate(date);
                    setFieldValue(
                      "birthdate",
                      date ? format(date, "MM/dd/yyyy") : ""
                    );
                  }}
                  dateFormat="MM/dd/yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  className={s.datePicker}
                />
              </div>

              <div className={s.inputContainer}>
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.inputContainer}>
                <label htmlFor="phone">Телефон</label>
                <Field type="tel" id="phone" name="phone" />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.inputContainer}>
                <div className={s.infoDiv}>
                  <label htmlFor="description">Інформація Про Контакт</label>
                  <BiInfoSquare className={s.icon} />
                </div>
                <Field as="textarea" id="description" name="description" />
                <ErrorMessage
                  name="description"
                  component="div"
                  className={s.error}
                />
              </div>

              <div className={s.buttons}>
                <button className={s.saveBtn} type="submit">
                  Зберегти
                </button>
                {isEditMode && (
                  <button
                    className={s.delete}
                    type="button"
                    onClick={() => setIsDeletePopupOpen(true)}
                  >
                    Видалити контакт
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>

        {isDeletePopupOpen && (
          <DeletePopUp
            onConfirm={handleDelete}
            onCancel={() => setIsDeletePopupOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
