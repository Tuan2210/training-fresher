// import styled from "styled-components";

// export default function InputForm({ register, onSubmit }) {
//   return (
//     <StyledInputForm
//       onSubmit={onSubmit}
//       className={"add-box p-3 flex items-center gap-5"}
//     >
//       {/* input new task */}
//       <input
//         {...register("name", { required: true })}
//         type="text"
//         id="myInput"
//         placeholder="Type a new task..."
//         className="h-10 rounded-xl bg-white"
//       />
//       {/* start-time-box */}
//       <div
//         className={
//           "start-time-box flex flex-row items-center p-2 pl-5 rounded-xl bg-white"
//         }
//       >
//         <i
//           className="fa-solid fa-hourglass-start"
//           style={{ color: "#068995" }}
//         />
//         <input
//           {...register("beginDate")}
//           id="begin-date-time"
//           placeholder="Begin date-time"
//           className="bg-none outline-none"
//         />
//       </div>
//       {/* end-time-box */}
//       <div
//         className={
//           "end-time-box flex flex-row items-center p-2 pl-5 rounded-xl bg-white"
//         }
//       >
//         <i className="fa-solid fa-hourglass-end" style={{ color: "#068995" }} />
//         <input
//           {...register("dueDate")}
//           id="due-date-time"
//           placeholder="Due date-time"
//           className="bg-none outline-none"
//         />
//       </div>
//       {/* addBtn */}
//       <input
//         className={
//           "addBtn p-2 w-5 h-10 text-center cursor-pointer rounded-lg text-white"
//         }
//         value="ADD"
//         type="submit"
//       />
//     </StyledInputForm>
//   );
// }

// const StyledInputForm = styled.form`
//   width: 60%;
//   input {
//     width: 30%;
//     padding: 0 20px 0 20px;
//   }
//   .start-time-box,
//   .end-time-box {
//     max-width: 310px;
//     input {
//       width: 100%;
//       height: 100%;
//       color: #068995;
//     }
//   }
//   .addBtn {
//     width: 100px;
//     color: $bg-content;
//     background: #068995;
//     &:hover {
//       color: #09cbd0;
//       background: #0e1538;
//     }
//   }
//   &::after {
//     content: "";
//     display: table;
//     clear: both;
//   }
// `;
