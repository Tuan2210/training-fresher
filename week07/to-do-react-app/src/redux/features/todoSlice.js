import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, addTodo } from "../../services/api/todoAPI";

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    // reserved: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        const newTodo = {
          id: action.payload.id,
          name: action.payload.name,
          beginDate: action.payload.beginDate,
          dueDate: action.payload.dueDate,
          // initialDate: action.payload.initialDate,
          status: "to-do",
        };
        state.data.push(newTodo);
      });
  },
});

export const selectAllTodos = (state) => state.todos.data;
export const getTodosStatus = (state) => state.todos.status;
// export const getTodosError = (state) => state.todos.error;
// export const getReservedTodos = (state) => state.todos.reserved;
// export const { reserveTodo, myReservedTodos } = todoSlice.actions;

export default todoSlice.reducer;
