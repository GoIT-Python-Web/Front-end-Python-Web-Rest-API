import { useMediaQuery } from "react-responsive";
import s from "./DeletePopUp.module.css";

export default function DeletePopUp({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <div className={s.popupOverlay}>
      <div className={s.popupContent}>
        <h2 className={s.text}>
          {isTablet
            ? "Ви впевнені, що хочете видалити цей контакт?"
            : "Впевнені, що хочете видалити Контакт?"}
        </h2>
        <div className={s.buttons}>
          <button onClick={onConfirm} className={s.delete}>
            {isTablet ? "Видалити" : "Так"}
          </button>
          <button onClick={onCancel} className={s.cancel}>
            {isTablet ? "Скасувати" : "Ні"}
          </button>
        </div>
      </div>
    </div>
  );
}
