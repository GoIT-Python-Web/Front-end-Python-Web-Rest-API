import ContactsList from "../../../components/Contacts/contactsList/ContactsList.tsx";
import BirthdayBlock from "../../../components/Contacts/birthdayBlock/BirthdayBlock.tsx";
import s from "./MainPage.module.css";
import FilterInput from "../../../components/Forms/filterinput/FilterInput.tsx";
import { useAppDispatch } from "../../../store/hooks.ts";
import { useEffect } from "react";
import { fetchContacts } from "../../../store/contacts/operations.ts";
import Header from "../../../components/Layout/header/Header.tsx";
import { refreshUser } from "../../../store/auth/operations.ts";
export default function MainPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className={s.input}>
        <FilterInput />
      </div>
      <div className={s.div}>
        <ContactsList />
        <BirthdayBlock />
      </div>
    </>
  );
}
