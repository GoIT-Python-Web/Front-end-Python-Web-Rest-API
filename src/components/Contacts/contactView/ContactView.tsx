import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import s from "./ContactView.module.css";
import { BiInfoSquare } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectContacts } from "../../../store/contacts/selectors";
import { clearItem } from "../../../store/contacts/slice";
import {
  deleteContactById,
  fetchContactById,
} from "../../../store/contacts/operations";
import { formatDate } from "../../../helpers/formatDate";
import DeletePopUp from "../../UI/popup/DeletePopUp";

export default function ContactView() {
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchContactById({ id }));
    }
  }, [dispatch, id]);

  const contact = useAppSelector(selectContacts) ?? {};

  useEffect(() => {
    return () => {
      dispatch(clearItem());
    };
  }, [dispatch]);

  const handleEdit = () => {
    if (id) {
      navigate(`/contacts/${id}/edit`);
    }
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deleteContactById({ id }));
      navigate("/");
    }
  };

  return (
    <div className={s.div}>
      <div className={s.absolute} onClick={() => navigate(-1)}>
        <FaArrowLeft className={s.arrow} />
        <p>Назад</p>
      </div>
      <p className={s.name}>
        {contact.first_name} {contact?.last_name}
      </p>
      <div className={s.div}>
        <p className={s.label}>Дата додавання</p>
        <p className={s.p}>{formatDate(contact.created_at)}</p>
        <p className={s.label}>Дата народження</p>
        <p className={s.p}>{formatDate(contact.birthdate)}</p>
        <div className={s.infoDiv}>
          <div className={s.email}>
            <p className={s.label}>Email</p>
            <p className={s.p}>{contact.email}</p>
          </div>
          <div className={s.email}>
            <p className={s.label}>Телефон</p>
            <p className={s.p}>{contact.phone}</p>
          </div>
        </div>
      </div>
      <div className={s.textareaDiv}>
        <p className={s.label}>Інформація про контакт</p>
        <BiInfoSquare className={s.icon} />
      </div>
      <textarea
        defaultValue={contact.description ?? ""}
        className={s.textarea}
        readOnly
      ></textarea>
      <div className={s.buttons}>
        <button className={s.edit} onClick={() => handleEdit()} type="button">
          Редагувати контакт
        </button>
        <button
          className={s.delete}
          onClick={() => setIsDeletePopupOpen(true)}
          type="button"
        >
          Видалити контакт
        </button>
      </div>
      {isDeletePopupOpen && (
        <DeletePopUp
          onConfirm={handleDelete}
          onCancel={() => setIsDeletePopupOpen(false)}
        />
      )}
    </div>
  );
}
