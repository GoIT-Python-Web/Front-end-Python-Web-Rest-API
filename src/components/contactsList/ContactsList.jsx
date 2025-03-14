import list from "../../data.json";
import ContactItem from "../ContactItem/ContactItem.jsx";
import s from "./ContactsList.module.css";

export default function ContactsList() {
  const contacts = list;
  return (
    <div className="container">
      <p className={s.p}>
        {contacts ? contacts.length + " Контактів" : "Немає Контактів"}
      </p>
      {contacts ? (
        <ul className={s.list}>
          {contacts.map((contact, i) => {
            return <ContactItem contact={contact} key={i} />;
          })}
        </ul>
      ) : (
        <p>
          У вас ще немає контактів. Додайте нові, щоб бути на зв'язку з
          важливими людьми!
        </p>
      )}
    </div>
  );
}
