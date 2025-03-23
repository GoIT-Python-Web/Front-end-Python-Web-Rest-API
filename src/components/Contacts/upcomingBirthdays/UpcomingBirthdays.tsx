import { RxEyeOpen } from "react-icons/rx";
import s from "./UpcomingBirthdays.module.css";
import { useNavigate } from "react-router-dom";
import { IContacts } from "../../../interfaces/interfaces";
import { formatDate } from "../../../helpers/formatDate";

interface UpcomingBirthdaysProps {
  birthdays: IContacts[];
}

export default function UpcomingBirthdays({
  birthdays,
}: UpcomingBirthdaysProps) {
  const navigate = useNavigate();

  const onViewClick = (id: string) => {
    if (id) navigate(`/contacts/${id}/view`);
  };

  return (
    <div>
      {birthdays && birthdays.length > 0 && (
        <ul className={s.ul}>
          {birthdays.map((b, index: number) => (
            <li key={index} className={s.li}>
              <div className={s.wrapper}>
                <div className={s.info}>
                  <p className={s.name}>
                    {b.first_name} {b.last_name}
                  </p>
                  <p className={s.birthday}>{formatDate(b.birthdate, "iso")}</p>
                </div>
                <div className={s.eye}>
                  <RxEyeOpen
                    className={s.eyeIcon}
                    onClick={() => onViewClick(b.id)}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
