import styled from "styled-components";

export default function TodoItem({ id, name, beginDate, dueDate }) {
  return (
    <StyledTodoItem className="item-to-do bg-white flex flex-col justify-between p-5 rounded-xl text-sm">
      <div className="item-box w-full h-full flex justify-between">
        <div className="item-id text-white fixed">{id}</div>
        <div className="item-details flex flex-col justify-between gap-5">
          <div className="item-name h-20 overflow-y-auto">{name}</div>
          <div className="item-date flex flex-col gap-2">
            <div className="item-begin-date-time">{beginDate}</div>
            <div className="item-due-date-time">{dueDate}</div>
          </div>
        </div>
        <div className="item-options flex flex-col gap-8 items-center">
          <i className="fa-solid fa-trash fa-xl" />
          <button
            className="penBtn"
            data-toggle="modal"
            data-target="#modal-form"
            type="button"
          >
            <i className="fa-solid fa-pen fa-xl" />
          </button>
        </div>
      </div>
    </StyledTodoItem>
  );
}

const StyledTodoItem = styled.li`
  height: 220px;
  font-weight: 700;
  line-height: 20px;
  box-shadow: 0 0 15px 2px #0e1538;
  .item-id {
    z-index: -1;
  }
  .initial-date {
    color: #068995;
  }
  .item-details {
    width: 90%;
    overflow-wrap: break-word;
    text-align: justify;
    .item-begin-date-time,
    .item-due-date-time {
      color: #09cbd0;
    }
  }
  .fa-trash,
  .fa-pen {
    color: #068995;
  }
  .fa-trash {
    margin-top: 10px;
  }
  .fa-trash:hover,
  .fa-pen:hover {
    color: #09cbd0;
    cursor: pointer;
  }
`;
