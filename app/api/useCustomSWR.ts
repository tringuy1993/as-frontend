import useSWR from "swr";
import { axiosPrivateInstance, axiosPublicInstance } from "./axiosInstances";
import { useAuth } from "@/auth/context";
import { useRouter } from "next/navigation";

const useCustomSWR = (
  url,
  params,
  refreshInterval = 60000 * 10,
  token = true
) => {
  const router = useRouter();
  const auth = useAuth();
  const accessToken = auth?.user?.accessToken;
  const fetcher = async (url: string, params: any, accessToken) => {
    if (token) {
      const response = await axiosPrivateInstance?.get(url, {
        params: params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(response?.data);
      return response?.data;
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

  if (error?.response?.status === 500) {
    router.refresh();
  }
  return { data, error, isLoading };
};

export default useCustomSWR;
