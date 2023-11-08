import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api/apiURLs";

const axiosBaseURL = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const useFetch = (url: string, initialParam: object) => {
  const [dataState, setDataState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async (params) => {
      setDataState({ data: null, loading: true, error: null });

      try {
        const response = await axiosBaseURL.get(url, {
          params: params,
          headers: { "Content-Type": "application/json" },
        });
        setDataState({ data: response.data, loading: false, error: null });
      } catch (error) {
        setDataState({
          data: null,
          loading: false,
          error: error.response.data,
        });
        console.log("FETCH ERROR");
      }
    };
    fetchData(initialParam);
  }, []);

  return dataState;
};

export default useFetch;
