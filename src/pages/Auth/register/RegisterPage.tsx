import RegisterForm from "../../../components/Forms/registerForm/RegisterForm";
import regimg from "../../../assets/images/authpages/authpic@2x.png";
import s from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <div className={s.div}>
      <img
        className={s.img}
        src={regimg}
        width={636}
        height={636}
        alt="Decorative image of person managing contacts"
      />
      <RegisterForm />
    </div>
  );
}
