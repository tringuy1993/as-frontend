import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import axios from "axios";
import { BASE_URL } from "./apiURLs";
import { useAuth } from "@/auth/context";
import { useFirebaseAuth } from "@/auth/firebase";

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  //   withCredentials: true,
});
const useAxiosPrivate = () => {
  const { user } = useAuth();
  const refresh = useRefreshToken();
  // console.log(auth?.user?.accessToken);
  // const accessToken = auth?.user?.accessToken;
  const accessToken = user?.accessToken;
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log("User:", accessToken);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("Attempting to refresh token");
        const prevRequest = error?.config;
        console.log(error);
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          console.log("HERE");
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
