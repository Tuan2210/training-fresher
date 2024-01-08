import styles from "./Home.module.scss";
import classNames from "classnames/bind";

import LinkBtn from "../../components/ui/LinkBtn.js";

const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div
      className={cx([
        "container",
        "w-full h-full flex flex-col justify-center items-center gap-10",
      ])}
    >
      <div className="flex justify-center items-center gap-5">
        <LinkBtn to="/" label="Home" className="HomeBtn active" />
        <LinkBtn to="/to-do" label="To do" className="ToDoBtn" />
      </div>
      <p className="h-10 flex items-center">
        <b>Demo ReactJS</b>
      </p>
    </div>
  );
}
