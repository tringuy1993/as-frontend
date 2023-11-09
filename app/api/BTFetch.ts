import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate.tsxz";

export type paramsProps = {
  trade_date: string;
  expiration: string;
  quote_datetime: string;
  option_legs: [];
};

type updateParamProps = (Date[] | string)[];

export default function BTFetch(params: paramsProps, url: string) {
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

  return { fetchData, data, isLoading, error };
}
