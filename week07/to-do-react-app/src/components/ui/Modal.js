import styles from "./Modal.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

import styled from "styled-components";

import { updateTodo } from "../../services/api/todoAPI";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

const cx = classNames.bind(styles);

export default function Modal({ isDisplay, onClose, todoId }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  ////custom flatpickr
  function customFlatpickr(id, fieldName) {
    const currentDateTime = new Date();
    var h = currentDateTime.getHours(),
      m = currentDateTime.getMinutes();

    function formatDateTime(date) {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(date);

      return formattedDate;
    }

    flatpickr(id, {
      enableTime: true,
      dateFormat: "m/d/Y, H:i:S",
      minDate: "today",
      enableSeconds: true,
      time_24hr: true,
      defaultHour: h,
      defaultMinute: m,
      onChange: (selectedDates) => {
        setValue(fieldName, formatDateTime(selectedDates[0]));
      },
    });
  }
  useEffect(() => {
    customFlatpickr("#begin-date-time-modal");
    customFlatpickr("#due-date-time-modal");
  }, []);

  //submit data
  function onSubmit(data) {
    dispatch(updateTodo({ id: todoId, ...data }));
  }

  return (
    <StyledModal
      onSubmit={handleSubmit((data) => onSubmit(data))}
      id="modal-form"
      className={cx("modal")}
      style={{ display: isDisplay ? "flex" : "none" }}
    >
      <div
        className={cx([
          "modal-content",
          "flex flex-col bg-white rounded-xl p-8",
        ])}
      >
        <span className={cx("close")} onClick={onClose}>
          <i className={cx(["fa-regular fa-rectangle-xmark"])}></i>
        </span>
        <div className={cx(["add-box", "h-full flex items-center gap-5"])}>
          <input
            {...register("name", { required: true })}
            type="text"
            id="myInputModal"
            placeholder="Update task"
            className="h-10 bg-white"
          />
          {/* <div
            className={cx([
              "start-time-box",
              "flex flex-row items-center p-2 pl-5 rounded-xl bg-white gap-3",
            ])}
          >
            <i
              className={cx(["fa-solid fa-hourglass-start"])}
              style={{ color: "#068995" }}
            ></i>
            <input
              {...register("beginDate")}
              id="begin-date-time-modal"
              placeholder="Begin date-time"
              className="bg-none outline-none"
            />
          </div>
          <div
            className={cx([
              "end-time-box",
              "flex flex-row items-center p-2 pl-5 rounded-xl bg-white gap-3",
            ])}
          >
            <i
              className={cx(["fa-solid fa-hourglass-end"])}
              style={{ color: "#068995" }}
            ></i>
            <input
              {...register("dueDate")}
              id="due-date-time-modal"
              placeholder="Due date-time"
              className="bg-none outline-none"
            />
          </div> */}
          <input
            className={cx([
              "updateBtn",
              "p-2 w-25 h-10 text-center text-white cursor-pointer rounded-lg",
            ])}
            value="UPDATE"
            type="submit"
          />
        </div>
      </div>
    </StyledModal>
  );
}

const StyledModal = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;
