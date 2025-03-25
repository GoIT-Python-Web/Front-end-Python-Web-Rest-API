import s from "./ContactItem.module.css";
import { TbInfoSquare } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "../../../helpers/formatDate.js";
import { RxEyeOpen } from "react-icons/rx";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { IContacts } from "../../../interfaces/interfaces.js";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks.js";
import { deleteContactById } from "../../../store/contacts/operations.js";
import { useState } from "react";
import DeletePopUp from "../../UI/popup/DeletePopUp.js";

interface ContactItemProps {
  contact: IContacts;
}

export default function ContactItem({ contact }: ContactItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onEditClick = () => {
    navigate(`/contacts/${contact.id}/edit`);
  };

  const onViewClick = () => {
    navigate(`contacts/${contact.id}/view`);
  };

  const onDeleteClick = () => {
    setIsDeletePopUpOpen(true);
  };

  const onConfirmDelete = () => {
    dispatch(deleteContactById({ id: contact.id }));
    setIsDeletePopUpOpen(false);
  };

  const onCancelDelete = () => {
    setIsDeletePopUpOpen(false);
  };

  return (
    <li className={s.li}>
      <div className={s.wrapper}>
        {contact.description && <TbInfoSquare className={s.infoIcon} />}
        <BsThreeDotsVertical
          className={s.dotsIcon}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className={s.menuWrapper}>
            <div className={s.menuButtons}>
              <div className={s.menuButton}>
                <RxEyeOpen className={s.icon} onClick={() => onViewClick()} />
              </div>
              <div className={s.menuButton}>
                <GoPencil className={s.icon} onClick={() => onEditClick()} />
              </div>
              <div className={s.menuButton}>
                <FaRegTrashAlt className={s.icon} onClick={onDeleteClick} />
              </div>
            </div>
          </div>
        )}
        <p className={s.name}>
          {contact.first_name} {contact.last_name}
        </p>
        <div className={s.infoDiv}>
          <p className={s.phone}>{contact.phone}</p>
          <p className={s.birthday}>{formatDate(contact.birthdate)}</p>
        </div>
        <div className={s.buttons}>
          <div className={s.button}>
            <RxEyeOpen className={s.icon} onClick={() => onViewClick()} />
          </div>
          <div className={s.button}>
            <GoPencil className={s.icon} onClick={() => onEditClick()} />
          </div>
          <div className={s.button}>
            <FaRegTrashAlt className={s.icon} onClick={onDeleteClick} />
          </div>
        </div>
      </div>

      {isDeletePopUpOpen && (
        <DeletePopUp onConfirm={onConfirmDelete} onCancel={onCancelDelete} />
      )}
    </li>
  );
}
