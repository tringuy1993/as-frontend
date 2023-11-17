import { useAuth } from "@/auth/context";
import axios, { AxiosStatic } from "axios";
import { useEffect } from "react";
import useSWR from "swr";

const axiosPrivateInstance = axios.create({
  //   headers: { "Content-Type": "application/json" },
  baseURL: "https://www.alpha-seekers.com",
});

async function GetCurrentToken() {
  const fetchcurrentToken = await fetch("/api/tokens");
  const currentToken = await fetchcurrentToken.json().then((token) => {
    return token?.tokens.token;
  });
  return currentToken;
}

const fetcher = async (url, token, params) => {
  const axiosPrivate = useAxiosPrivate(token);
  return axiosPrivate
    .get(url, {
      // headers: { Authorization: "Bearer " + token },
      params: params,
    })
    .then((res) => {
      console.log(
        `Inside Date: ${new Date()}`,
        `urlf: ${url}, fetcherToken: ${token}`
      );
      return res.data;
    });
};

const useAxiosPrivate = (token) => {
  // const refresh = useRefreshToken();
  // const { auth } = useAuth();
  console.log("InUSEAXIOS");
  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // const newAccessToken = await refresh();
          const newAccessToken = "test";
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  return axiosPrivateInstance;
};

function useFetcher(url, params, refreshInterval) {
  const auth = useAuth();
  const currentToken = auth?.user.accessToken;
  const { data, error, isLoading } = useSWR(
    [url, currentToken, params],
    ([url, currentToken, params]) => fetcher(url, currentToken, params),
    { refreshInterval: refreshInterval }
  );

  return { data, error, isLoading };
}

export default useFetcher;
