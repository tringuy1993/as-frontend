import axios from "axios";
import { BASE_URL } from "./apiURLs";
import refreshToken from "./useRefreshToken";

async function GetCurrentToken() {
  const fetchcurrentToken = await fetch("/api/tokens");
  const currentToken = await fetchcurrentToken.json().then((data) => {
    return data?.token;
  });
  return currentToken;
}

const createAxiosInstance = (withAuth = false) => {
  const axiosInstance = axios.create({
    headers: { "Content-Type": "application/json" },
    baseURL: BASE_URL,
  });

  if (withAuth) {
    axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = await GetCurrentToken();
        console.log(`${new Date()} InsideACCESSTOKEN:`, accessToken);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (
          (error?.response?.status === 403 && !prevRequest?.sent) ||
          (error?.response?.status === 401 && !prevRequest?.sent)
        ) {
          prevRequest.sent = true;
          // const newAccessToken = await refreshIdToken();
          console.log(
            `Error Code: ${error?.response?.status}, attempting renewing Token!`
          );
          const accessToken =
            prevRequest.headers["Authorization"]?.split(" ")[1];
          const newAccessToken = await refreshToken(accessToken);

          console.log(`${new Date()} OldToken: ${accessToken}`);
          console.log(`${new Date()} NewToken: ${newAccessToken}`);

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosInstance(prevRequest);
        } else if (error?.response?.status > 405) {
          // logoutUser();
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance;
  }
};

export const axiosPrivateInstance = createAxiosInstance(true);
export const axiosPublicInstance = createAxiosInstance();
