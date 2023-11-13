import { useEffect, useState } from "react";
import { axiosPrivateInstance, axiosPublicInstance } from "./axios";

const useFetch = (
  url: string,
  params: object,
  privateMethod: true,
  updateInterval = 1000 * 60 * 60
) => {
  let axios;
  if (privateMethod) {
    axios = axiosPrivateInstance();
  } else {
    axios = axiosPublicInstance;
  }
  const [dataState, setDataState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          params: params,
        });
        setDataState({ data: response.data, loading: false, error: null });
      } catch (error: any) {
        setDataState({
          data: null,
          loading: false,
          error: error,
        });
        console.log("FETCH ERROR");
      }
    };

    fetchData();
    console.log(updateInterval);
    const intervalId = setInterval(() => {
      fetchData();
    }, updateInterval);

    return () => clearInterval(intervalId);
  }, [params]);

  return dataState;
};

export default useFetch;
