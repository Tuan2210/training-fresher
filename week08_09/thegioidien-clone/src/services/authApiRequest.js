import axios from "axios";
import { API_URL } from "../constants/apiUrl";

export const registerUser = async (account) => {
  try {
    const res = await axios.post(`${API_URL}/api/v1/register`, account);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
