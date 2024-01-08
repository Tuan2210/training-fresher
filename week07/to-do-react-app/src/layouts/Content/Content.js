import styles from "./Content.module.scss";
import classNames from "classnames/bind";

import styled from "styled-components";

import { useSelector } from "react-redux";
import TodoItem from "../../components/ui/TodoItem";

const cx = classNames.bind(styles);

export default function Content() {
  // const todos = useSelector((state) => state.todos.value);
  const todos = useSelector((state) => state.todos);
  if (todos.length === 0) console.log("data empty");
  console.log(todos);

  return (
    <StyledContent
      className={cx([
        "content-container",
        "grid grid-cols-3 gap-10 p-5 relative",
      ])}
    >
      {/* col-done */}
      <div className={cx(["done-wrapper", "flex flex-col pb-12"])}>
        <span
          className={cx(["title-wrapper", "flex justify-center items-center"])}
        >
          <i
            className="fa-solid fa-clipboard-check fa-xl"
            style={{ color: "#09CBD0" }}
          />
          <div className={cx(["title", "text-2xl font-bold p-5"])}>DONE</div>
        </span>
        <ul className="items-done-list item-drag-list w-full h-full flex flex-col"></ul>
      </div>

      {/* col-to-do */}
      <div className={cx(["to-do-wrapper", "flex flex-col pb-12"])}>
        <span
          className={cx(["title-wrapper", "flex justify-center items-center"])}
        >
          <i
            className="fa-solid fa-clipboard-list fa-xl"
            style={{ color: "#09CBD0" }}
          />
          <div className={cx(["title", "text-center text-2xl font-bold p-5"])}>
            TO DO
          </div>
        </span>
        <ul className="items-to-do-list item-drag-list w-full h-full flex flex-col">
          {todos.map((todo) => {
            {
              /* <li key={todo.id}>{todo.name}</li>; */
            }
            <TodoItem
              id={todo.id}
              name={todo.name}
              beginDate={todo.beginDate}
              dueDate={todo.dueDate}
            />;
          })}
        </ul>
      </div>

      {/* col-doing */}
      <div className={cx(["doing-wrapper", "flex flex-col pb-12"])}>
        <span
          className={cx(["title-wrapper", "flex justify-center items-center"])}
        >
          <i
            className="fa-solid fa-spinner fa-xl"
            style={{ color: "#09CBD0" }}
          />
          <div className={cx(["title", "text-center text-2xl font-bold p-5"])}>
            DOING
          </div>
        </span>
        <ul className="items-doing-list item-drag-list w-full h-full flex flex-col"></ul>
      </div>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  background: none;
  height: 100dvh;
  overflow-y: auto;
`;
