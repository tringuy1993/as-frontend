import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

export default function useFetch(params, url, updatevalues, updateInterval) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosPrivate(url, { params });
      setData(response?.data);
    } catch (error) {
      console.error(error);
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();

    if (updateInterval > 0) {
      const intervalId = setInterval(fetchData, updateInterval);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line
  }, [...updatevalues]);

  return { data, isLoading, error };
}
