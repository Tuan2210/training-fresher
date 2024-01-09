import styles from "./Content.module.scss";
import classNames from "classnames/bind";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchTodos, deleteTodo } from "../../services/api/todoAPI";
import { getTodosStatus, selectAllTodos } from "../../redux/features/todoSlice";

import TodoItem from "../../components/ui/TodoItem";

const cx = classNames.bind(styles);

export default function Content() {
  const dispatch = useDispatch();
  const todos = useSelector(selectAllTodos);
  const todoStatus = useSelector(getTodosStatus);
  // const err = useSelector(getTodosError);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (todoStatus === "idle") dispatch(fetchTodos());
  }, [todoStatus, dispatch]);

  //delete item todo
  function handledeleteTodo(id) {
    dispatch(deleteTodo(id));
  }

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
        <ul className="items-to-do-list w-full h-full flex flex-col pt-7 pb-7 gap-7">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              name={todo.name}
              beginDate={todo.beginDate}
              dueDate={todo.dueDate}
              onClickDelete={() => handledeleteTodo(todo.id)}
            />
          ))}
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
