import useSWR from "swr";
import { axiosPrivateInstance, axiosPublicInstance } from "./axiosInstances";
import { use } from "react";
import { useAuth } from "@/auth/context";

const useCustomSWR = (
  url,
  params,
  refreshInterval = 60000 * 10,
  token = true
) => {
  const auth = useAuth();
  const accessToken = auth?.user?.accessToken;
  const fetcher = (url: string, params: any, accessToken) => {
    if (token) {
      return axiosPrivateInstance?.get(url, {
        params: params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    } else {
      return axiosPublicInstance?.get(url, { params: params });
    }
  };

  const { data, error, isLoading } = useSWR(
    [url, params, accessToken],
    ([url, params, accessToken]) => {
      return fetcher(url, params, accessToken);
    },
    {
      refreshInterval: refreshInterval,
    }
  );
  return { data, error, isLoading };
};

export default useCustomSWR;
