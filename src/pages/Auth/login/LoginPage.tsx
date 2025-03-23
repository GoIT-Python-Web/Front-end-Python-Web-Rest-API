import LoginForm from "../../../components/Forms/loginForm/LoginForm";
import regimg from "../../../assets/images/authpages/authpic@2x.png";
import s from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={s.div}>
      <img
        className={s.img}
        src={regimg}
        width={636}
        height={636}
        alt="Decorative image of person managing contacts"
      />
      <LoginForm />
    </div>
  );
}
