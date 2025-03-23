import UserForm from "../../../components/Forms/userForm/UserForm";
import s from "./UserPage.module.css";

export default function UserPage() {
  return (
    <div className={s.div}>
      <UserForm />
    </div>
  );
}
