import styles from "./Header.module.scss";
import classNames from "classnames/bind";

import LinkBtn from "../../components/ui/LinkBtn.js";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { addTodo } from "../../services/api/todoAPI.js";

import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

const cx = classNames.bind(styles);

export default function Header() {
  ////react-redux
  const dispatch = useDispatch();
  ////

  ////refresh-real-time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function formatTime() {
    const day = currentTime.getDay();
    const date = currentTime.getDate();
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];

    const formattedTime = `${days[day]} | ${date}/${months[month]}/${year}`;
    const formattedClock =
      hours < 10
        ? `0${hours}`
        : hours +
          `:${minutes < 10 ? `0${minutes}` : minutes}:${
            seconds < 10 ? `0${seconds}` : seconds
          }`;

    return { formattedTime, formattedClock };
  }

  const { formattedTime, formattedClock } = formatTime();
  ////

  ////react-hook-form
  const { register, handleSubmit, setValue } = useForm();
  ////

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
    customFlatpickr("#begin-date-time", "beginDate");
    customFlatpickr("#due-date-time", "dueDate");

    // customFlatpickr("#begin-date-time-modal");
    // customFlatpickr("#due-date-time-modal");
  }, []);
  ////

  ////submit data
  function onSubmit(data) {
    const newTodo = {
      id: Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0"),
      ...data,
    };
    // console.log(newTodo);
    dispatch(addTodo(newTodo));
  }
  ////

  return (
    <header className="w-full h-20 p-3 flex justify-between">
      {/* link-btns */}
      <div className={cx(["", "flex justify-center items-center gap-5"])}>
        <LinkBtn to="/" label="Home" className="HomeBtn" />
        <LinkBtn to="/to-do" label="To do" className="ToDoBtn active" />
      </div>

      {/* add-box */}
      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className={cx(["add-box", "p-3 flex items-center gap-5"])}
      >
        {/* input new task */}
        <input
          {...register("name", { required: true })}
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
            {...register("beginDate")}
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
            {...register("dueDate")}
            id="due-date-time"
            placeholder="Due date-time"
            className="bg-none outline-none"
          />
        </div>
        {/* addBtn */}
        <input
          className={cx([
            "addBtn",
            "p-2 w-5 h-10 text-center cursor-pointer rounded-lg text-white",
          ])}
          value="ADD"
          type="submit"
        />
      </form>

      {/* time-box */}
      <div
        className={cx([
          "time-box",
          "w-72 flex flex-row text-white font-bold gap-4",
        ])}
      >
        {/* day-time-box */}
        <div
          className={cx(["day-time-box", "flex flex-row items-center gap-4"])}
        >
          <i
            className="fa-solid fa-calendar-days"
            style={{ color: "#068995" }}
          />
          <div id="day-time">{formattedTime}</div>
        </div>
        {/* clock-time-box */}
        <div
          className={cx(["clock-time-box", "flex flex-row items-center gap-4"])}
        >
          <i className="fa-regular fa-clock" style={{ color: "#068995" }} />
          <div id="clock-time">{formattedClock}</div>
        </div>
      </div>
    </header>
  );
}
