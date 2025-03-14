import { getToday } from "../../helpers/birthday.js";
import { formatDate } from "../../helpers/formatDate.js";

export default function BirthdayBlock() {
  return (
    <div className="container">
      <h3>Найближчі дні народження</h3>
      <p>Сьогодні:</p>
      <p>{formatDate(getToday())}</p>
    </div>
  );
}
