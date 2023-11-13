import axios from "axios";
import { BASE_URL } from "./apiURLs";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
