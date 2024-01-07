import styles from "./Header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className="w-full h-20 p-3 flex justify-between">
      {/* logo */}
      <a href="#" className="relative flex text-center">
        <img
          src="/assets/imgs/taskobey_line.png"
          alt="logo"
          width="200"
          height="200"
        />
      </a>

      {/* add-box */}
      <div className={cx(["add-box", "p-3 flex items-center gap-5"])}>
        {/* input new task */}
        <input
          type="text"
          id="myInput"
          placeholder="Type a new task..."
          className="h-10 rounded-xl bg-white"
        />
        {/* start-time-box */}
        <div
          className={cx([
            "start-time-box",
            "flex flex-row items-center p-2 pl-5 rounded-xl bg-white",
          ])}
        >
          <i
            className="fa-solid fa-hourglass-start"
            style={{ color: "#068995" }}
          />
          <input
            id="begin-date-time"
            placeholder="Begin date-time"
            className="bg-none outline-none"
          />
        </div>
        {/* end-time-box */}
        <div
          className={cx([
            "end-time-box",
            "flex flex-row items-center p-2 pl-5 rounded-xl bg-white",
          ])}
        >
          <i
            className="fa-solid fa-hourglass-end"
            style={{ color: "#068995" }}
          />
          <input
            id="due-date-time"
            placeholder="Due date-time"
            className="bg-none outline-none"
          />
        </div>
        {/* addBtn */}
        <span
          className={cx([
            "addBtn",
            "p-2 w-5 h-10 text-center text-white cursor-pointer rounded-lg",
          ])}
        >
          <b>ADD</b>
        </span>
      </div>
    </header>
  );
}

export default Header;
