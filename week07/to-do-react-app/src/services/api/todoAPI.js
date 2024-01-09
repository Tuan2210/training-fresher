import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TODO_URL } from "../../constants/apiUrl.js";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(TODO_URL);
  return res.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(TODO_URL, todo);
  return response.data;
});

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (todoId) => {
    await axios.delete(`${TODO_URL}/${todoId}`);
    return todoId;
  }
);
