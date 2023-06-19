import { useFBAuth } from "../(auth)/FBAuthContext";
import { useEffect } from "react";
import { axiosPrivate } from "./axios";
import { useAuth } from "@/auth/hooks";

const useAxiosPrivate = () => {
  const { user, logoutUser, refreshIdToken } = useFBAuth();
  const { tenant } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${tenant?.idToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refreshIdToken();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else if (error?.response?.status > 405) {
          logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, refreshIdToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
