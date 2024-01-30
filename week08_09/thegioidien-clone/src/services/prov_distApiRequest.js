import axios from "axios";
import axiosInstance from "../configs/axiosConfig";

import { PROVINCES_URL } from "../constants/apiUrl";

export const handleFetchProvinces = async (setProvinces) => {
  try {
    // const res = await axios.get(`${PROVINCES_URL}?depth=2`);
    // setProvinces(res.data);
    const res = await axios.get(`${PROVINCES_URL}/api/province`);
    setProvinces(res.data.results);
  } catch (error) {
    console.error("Error fetching provinces:", error);
  }
};

export const handleFetchDistricts = async (
  value,
  provinces,
  setDistricts,
  setSelectedProvince
) => {
  // const provObj = provinces.find((item) => item.name === value);
  // if (provObj) setDistricts(provObj.districts);
  const provObj = provinces.find((item) => item.province_id === value);
  if (!provObj) return;
  try {
    const res = await axios.get(
      `${PROVINCES_URL}/api/province/district/${provObj.province_id}`
    );
    setDistricts(res.data.results);
    setSelectedProvince(true);

    return res.data.results;
  } catch (error) {
    console.error("Error fetching districts:", error);
  }
};
