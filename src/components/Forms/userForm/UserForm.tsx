import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { uploadUserPhoto } from "../../../store/auth/operations";
import { selectUser, selectUserPic } from "../../../store/auth/selectors";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import img from "../../../assets/images/icon.webp";
import s from "./UserForm.module.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../helpers/formatDate";

export default function UserForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const userPic = useAppSelector(selectUserPic) ?? img;

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log(file);
      dispatch(uploadUserPhoto({ file: selectedFile }));
    }
  };

  return (
    <div className={s.relative}>
      <div className={s.absolute} onClick={() => navigate(-1)}>
        <FaArrowLeft className={s.arrow} />
        <p>Назад</p>
      </div>
      <label htmlFor="file-input">
        <FiUpload size={24} className={s.uploadIcon} />
      </label>
      <input
        id="file-input"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className={s.invisible}
      />
      <div className={s.picDiv}>
        <img
          src={userPic}
          className={s.pic}
          alt="User profile picture"
          width={90}
          height={90}
        />

        <p className={s.name}>{user.username}</p>
      </div>
      <div className={s.infoDiv}>
        <div>
          <p className={s.label}>Дата додавання</p>
          <p className={s.data}>{formatDate(user.created_at)}</p>
        </div>
        <div>
          <p className={s.label}>Email</p>
          <p className={s.data}>{user.email}</p>
        </div>
      </div>
    </div>
  );
}
