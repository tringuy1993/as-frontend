import useSWR from "swr";
import { axiosPublicInstance } from "./axiosInstances";

const usePublicSWR = (url, params, refreshInterval = 60000 * 10) => {
  const fetcher = (url, params) => {
    return axiosPublicInstance.get(url, { params: params });
  };

  const { data, error, isLoading } = useSWR(
    [url, params],
    ([url, params]) => {
      return fetcher(url, params);
    },
    {
      refreshInterval: refreshInterval,
    }
  );

  return { data, error, isLoading };
};

export default usePublicSWR;
