import { ProgressBar } from "react-loader-spinner";
import s from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={s.div}>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
