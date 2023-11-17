import { useState, useEffect } from "react";
import { AxiosPrivate } from "./axiosInstances";
// import useAxiosPrivate from "./useAxiosPrivate";

export type resultparamsProps = {
  und_symbol: string[] | string;
  greek?: string;
  startDate?: string;
  endDate?: string;
  date?: string;
};

type updateParamProps = (Date[] | string)[];

export default function useFetch(
  params: resultparamsProps,
  url?: string,
  updatevalues?: updateParamProps,
  updateInterval?: number
) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = AxiosPrivate;
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

    if (updateInterval && updateInterval > 0) {
      const intervalId = setInterval(fetchData, updateInterval);
      return () => clearInterval(intervalId);
    }
    // eslint-disable-next-line
  }, [...updatevalues]);

  return { data, isLoading, error };
}
