import { useState } from "react";
import { RxMagnifyingGlass } from "react-icons/rx";
import s from "./FilterInput.module.css";
import { useAppDispatch } from "../../../store/hooks";
import {
  fetchContacts,
  fetchContactsByKeyword,
} from "../../../store/contacts/operations";

export default function FilterInput() {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);

    if (keyword.trim()) {
      dispatch(fetchContactsByKeyword({ keyword }));
    } else {
      dispatch(fetchContacts());
    }
  };

  return (
    <div className={s.wrapper}>
      <RxMagnifyingGlass className={s.icon} />
      <input
        className={s.input}
        type="text"
        placeholder="Пошук за ім'ям, прізвищем, email або телефоном"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
