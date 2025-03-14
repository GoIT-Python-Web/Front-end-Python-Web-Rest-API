import s from "./ContactItem.module.css";
import { BiInfoSquare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "../../helpers/formatDate.js";

export default function ContactItem({ contact }) {
  return (
    <li className={s.li}>
      <div className={s.wrapper}>
        {contact.information && <BiInfoSquare className={s.infoIcon} />}
        <BsThreeDotsVertical className={s.dotsIcon} />
        <p className={s.name}>{contact.name}</p>
        <div className={s.infoDiv}>
          <p className={s.phone}>{contact.phone}</p>
          <p className={s.birthday}>{formatDate(contact.birthday)}</p>
        </div>
      </div>
    </li>
  );
}
