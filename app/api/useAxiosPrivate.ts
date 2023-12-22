import { useEffect } from "react";
import { axiosPrivate } from "./axios";
import { useFBAuth } from "@/auth/FBAuthContext";

import { FBAuth } from "@/auth/FBfirebase";

const useAxiosPrivate = () => {
  // const { user, logoutUser, refreshIdToken } = useFBAuth();
  const { user, refreshIdToken } = useFBAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (config) => {
        if (!config.headers["Authorization"]) {
          const token = await FBAuth.currentUser?.getIdToken();
          config.headers["Authorization"] = `Bearer ${token}`;
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
          const newAccessToken = await FBAuth.currentUser?.getIdToken();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        } else if (error?.response?.status > 405) {
          // logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.accessToken]);

  return axiosPrivate;
};

export default useAxiosPrivate;
