import axios from "axios";

const axiosApiInstance = axios.create({
  headers: { "Content-Type": "application/json" },
  baseURL: "https://www.alpha-seekers.com",
});

const AxiosPrivate = () => {
  async function GetCurrentToken() {
    const fetchcurrentToken = await fetch("/api/tokens");
    const currentToken = await fetchcurrentToken.json().then((token) => {
      return token?.tokens.token;
    });
    return currentToken;
  }
  axiosApiInstance.interceptors.request.use(
    async (config) => {
      const currentToken = await GetCurrentToken();
      console.log("CurrentToken:", currentToken);
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${currentToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosApiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 403 && !prevRequest?.sent) {
        prevRequest.sent = true;
        const currentToken = await GetCurrentToken();
        const GetNewIdToken = await fetch(
          "http://localhost:3000/api/refresh-tokens/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          }
        );

        const newIdToken = await GetNewIdToken.json().then((newToken) => {
          return newToken?.NewIdToken;
        });
        console.log(
          "Completed Token Renewal",
          "Old Token:",
          currentToken,
          "New Token",
          newIdToken
        );
        prevRequest.headers["Authorization"] = `Bearer ${newIdToken}`;
        return axiosApiInstance(prevRequest);
      } else if (error?.response?.status > 405) {
        // logoutUser();
      }
      return Promise.reject(error);
    }
  );

  return axiosApiInstance;
};

export default AxiosPrivate;
