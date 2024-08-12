import { BACKEND_URL } from "./consts";

export const superfetch = async (url, options) => {
  const token = localStorage.getItem("token");
  if (!url.startsWith("http")) {
    url = BACKEND_URL + url;
  }
  if (token && options) {
    options.headers = {
      ...options?.headers,
      Authorization: token,
    };
  } else if (!options) {
    options = {};
    options.headers = {
      Authorization: token,
    };
  } else {
    options.headers = {
      ...options?.headers,
      Authorization: token,
    };
  }
  const res = await fetch(url, options);
  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    window.location.reload();
  }
  return res;
};
