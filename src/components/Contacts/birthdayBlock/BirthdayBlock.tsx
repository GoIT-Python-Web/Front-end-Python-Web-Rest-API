import { getToday } from "../../../helpers/getToday.js";
import { formatDate } from "../../../helpers/formatDate.js";
import s from "./BirthdayBlock.module.css";
import UpcomingBirthdays from "../../Contacts/upcomingBirthdays/UpcomingBirthdays.js";
import { getUpcomingBirthdays } from "../../../helpers/getUpcomingBirthday.js";
import { useAppSelector } from "../../../store/hooks.js";
import { selectContacts } from "../../../store/contacts/selectors.js";

export default function BirthdayBlock() {
  const contacts = useAppSelector(selectContacts);
  const birthdays = getUpcomingBirthdays(contacts);
  return (
    <div className={s.wrapper}>
      <div className={s.headerWrapper}>
        <h3 className={s.heading}>Найближчі дні народження</h3>

        {contacts && contacts.length ? (
          <div className={s.dateWrapper}>
            <p className={s.paragraph}>Сьогодні:</p>
            <p className={s.today}>{formatDate(getToday(), "dot")}</p>
          </div>
        ) : (
          ""
        )}
      </div>

      {contacts && contacts.length ? (
        <>
          <UpcomingBirthdays birthdays={birthdays} />
          <div className={s.dateDeskWrapper}>
            <p className={s.paragraph}>Сьогодні:</p>
            <p className={s.today}>{formatDate(getToday(), "dot")}</p>
          </div>
        </>
      ) : (
        <div className={s.div}>
          <p className={s.p}>
            Немає найближчих днів народжень. Додайте контакти, щоб не пропустити
            свята!
          </p>
        </div>
      )}
    </div>
  );
}
