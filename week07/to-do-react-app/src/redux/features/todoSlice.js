import { createSlice } from "@reduxjs/toolkit";

import { TodoData } from "../../../data/fakeData.js";

export const todoSlice = createSlice({
  name: "todos",
  // initialState: { value: TodoData },
  initialState: TodoData,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: action.payload.id,
        name: action.payload.name,
        beginDate: action.payload.beginDate,
        dueDate: action.payload.dueDate,
        // initialDate: action.payload.initialDate,
        status: "to-do",
      };
      state.push(newTodo);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;
