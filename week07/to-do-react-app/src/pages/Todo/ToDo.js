import styles from "./Todo.module.scss";
import classNames from "classnames/bind";

import Header from "../../layouts/Header/Header.js";
import Content from "../../layouts/Content/Content.js";

const cx = classNames.bind(styles);

export default function Todo() {
  return (
    <main className={cx(["container", "max-w-full max-h-full"])}>
      <Header />
      <Content />
    </main>
  );
}
