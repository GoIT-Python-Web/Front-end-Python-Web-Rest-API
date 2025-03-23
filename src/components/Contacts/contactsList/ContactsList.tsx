import { AiOutlinePlus } from "react-icons/ai";
import s from "./ContactsList.module.css";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { selectContacts } from "../../../store/contacts/selectors";
import { IContacts } from "../../../interfaces/interfaces";
import ContactItem from "../contactItem/ContactItem";

export default function ContactsList() {
  const contacts = useAppSelector(selectContacts);
  return (
    <div>
      {contacts && contacts.length ? (
        <>
          <p className={s.p}>Контакти</p>
          <ul className={s.list}>
            {contacts.map((contact: IContacts, i: number) => {
              return <ContactItem contact={contact} key={i} />;
            })}
          </ul>
        </>
      ) : (
        <div className={s.div}>
          <p>
            У вас ще немає контактів. Додайте нові, щоб бути на зв'язку з
            важливими людьми!
          </p>
          <Link className={s.link} to="contacts/create" type="button">
            Додати Контакт <AiOutlinePlus className={s.plus} />
          </Link>
        </div>
      )}
    </div>
  );
}
