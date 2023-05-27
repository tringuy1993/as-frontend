import axios from "axios";
import { BASE_URL, ES_URL, GAMMA_URL } from "./apiURLs";
// import { useSWRConfig } from "swr";
import useSWR from "swr";

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const fetcher = async (params, url) => {
  // const fullUrl = `${BASE_URL}${url}`;
  console.log(params);
  // // console.log("url:", url)
  // return await axiosPrivate
  // .get(`${BASE_URL}${url}`)
  // .then(res => res.data)
  // .catch(error => {
  //   if (error.response.status !== 409) throw error
  // })
  const response = await axiosPrivate(params.url, params.url);
  if (response.statusText !== "OK") {
    // console.log(response.statusText)
    throw new Error("An error occurred while fetching the data.");
  }
  console.log(response.json());
  return response.json();
};
export default useFetch2 = (params, url) => {
  const { data, error } = useSWR({ url: url, params }, fetcher);
  // console.log("UseFetch2:", data)
};
