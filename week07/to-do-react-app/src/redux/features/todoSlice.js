import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      id: "001",
      beginDate: "2024/01/09 12:04:00",
      dueDate: "2024/01/10 12:04:00",
      initialDate: "2024/01/08 15:25:01",
      name: "hello",
      status: "to-do",
    },
    {
      id: "002",
      beginDate: "2024/01/10 12:04:00",
      dueDate: "2024/01/11 12:04:00",
      initialDate: "2024/01/08 15:30:01",
      name: "hello2",
      status: "to-do",
    },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: action.payload.id,
        beginDate: action.payload.beginDate,
        dueDate: action.payload.dueDate,
        initialDate: action.payload.initialDate,
        name: action.payload.name,
        status: action.payload.status,
      };
      state.push(newTodo);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
