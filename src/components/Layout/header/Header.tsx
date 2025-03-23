import {
  selectIsRefreshing,
  selectUser,
  selectUserPic,
} from "../../../store/auth/selectors";
import { useAppSelector } from "../../../store/hooks";
import { FaPlus } from "react-icons/fa6";
import s from "./Header.module.css";
import img from "../../../assets/images/icon.webp";
import { selectContacts } from "../../../store/contacts/selectors";
import { Link } from "react-router-dom";
import Loader from "../../UI/loader/Loader";

export default function Header() {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsRefreshing);
  const userPic = useAppSelector(selectUserPic) ?? img;

  const contacts = useAppSelector(selectContacts) ?? [];
  if (isLoading) return <Loader />;
  return (
    <>
      <div className={s.header}>
        <div className={s.div}>
          <Link to="/user">
            <img src={userPic} alt="User picture" />
          </Link>
          <div className={s.userInfo}>
            <p className={s.name}>{user?.username ?? "Username"}</p>
            <p className={s.email}>{user?.email ?? "User email"}</p>
          </div>
        </div>

        <p className={s.p2}>
          {contacts === undefined
            ? "Завантаження..."
            : contacts.length === 0
            ? "Немає контактів"
            : contacts.length === 1
            ? "1 Контакт"
            : `${contacts.length} Контактів`}
        </p>
        <button className={s.btn}>
          <Link className={s.link} to="/contacts/create">
            Додати контакт
            <FaPlus />
          </Link>
        </button>
      </div>
      <p className={s.p1}>
        {contacts?.length === 1
          ? "1 Контакт"
          : contacts?.length > 1
          ? `${contacts.length} Контактів`
          : "Немає контактів"}
      </p>
    </>
  );
}
