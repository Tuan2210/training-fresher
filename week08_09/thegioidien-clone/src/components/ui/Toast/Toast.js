import styles from "./Toast.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Toast() {
  return (
    <div className={cx("toast-container")}>
      <div
        className={cx([
          "toast",
          "flex flex-col justify-between gap-4 p-3 rounded-xl",
        ])}
      >
        <div
          className={cx([
            "toast__header",
            " flex justify-between items-center",
          ])}
        >
          <div
            className={cx(["toast__left", "flex flex-row items-center gap-2"])}
          >
            <i className="fa-solid fa-bell"></i>
            <h3 className={cx("toast__title")}>Notification!</h3>
          </div>
          <div className={cx(["toast__close", " cursor-pointer"])}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className={cx("toast__content")}>
          <p className={cx(["toast__msg", "flex items-center gap-1"])}>
            <b>name</b>
            <span className="text-red-500">has reached its due date!</span>
          </p>
        </div>
      </div>
    </div>
  );
}
