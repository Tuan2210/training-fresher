import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import LinkBtn from "../../components/ui/LinkBtn.js";

const cx = classNames.bind(styles);

export default function Header() {
  return (
    <header className="w-full h-20 p-3 flex justify-between">
      {/* logo */}
      {/* <a href="#" className="relative flex text-center">
        <img
          src="/assets/imgs/taskobey_line.png"
          alt="logo"
          width="200"
          height="200"
        />
      </a> */}

      {/* link-btns */}
      <div className={cx(["", "flex justify-center items-center gap-5"])}>
        <LinkBtn to="/" label="Home" className="HomeBtn" />
        <LinkBtn to="/to-do" label="To do" className="ToDoBtn active" />
      </div>

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

      {/* time-box */}
      <div
        className={cx(["time-box", "flex flex-row text-white font-bold gap-4"])}
      >
        {/* day-time-box */}
        <div
          className={cx(["day-time-box", "flex flex-row items-center gap-4"])}
        >
          <i
            className="fa-solid fa-calendar-days"
            style={{ color: "#068995" }}
          />
          <div id="day-time"></div>
        </div>
        {/* clock-time-box */}
        <div
          className={cx(["clock-time-box", "flex flex-row items-center gap-4"])}
        >
          <i className="fa-regular fa-clock" style={{ color: "#068995" }} />
          <div id="clock-time"></div>
        </div>
      </div>
    </header>
  );
}
