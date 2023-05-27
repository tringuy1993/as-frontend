import axios from "axios";
import { BASE_URL } from "../../constants";

// const axiosInstance = axios.create({
//   BASE_URL,
// });

export const getMusicData = async ({ url, params }) => {
  try {
    const response = await axios.get(BASE_URL + url, params);
    return response;
  } catch (error) {
    console.error(error);
  }
};
