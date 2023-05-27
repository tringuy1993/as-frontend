import { getCookie } from "cookies-next";

const privateFetcher = async ({ url, method, token, json = true }) => {
  const res = await fetch(url, {
    method,
    // body: body && JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data.data;
  }
};

export const privatefetchData = async (url, params) => {
  const queryParams = new URLSearchParams(params);
  const fullUrl = `https://www.alpha-seekers.com/${url}?${queryParams.toString()}`;
  const token = getCookie("IdToken");
  return await privateFetcher({
    url: fullUrl,
    method: "GET",
    token: token,
    json: true,
  });
};

export const sendContactForm = async (data) => {
  const response = await fetch("http://localhost:3000/api/contact", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  if (!response.ok) {
    // console.log;
    throw new Error("API Error");
  }
};
