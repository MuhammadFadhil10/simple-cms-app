import axios from "axios";
import { User } from "./user";

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_API_URL,
});

if (typeof window !== "undefined") {
  const authData = localStorage.getItem("authUser");

  if (authData) {
    Api.defaults.headers.common.Authorization = `Bearer ${
      JSON.parse(authData).token
    }`;
  }
}

Api.interceptors.response.use(
  (response) => response,
  async (err) => {
    // refresh token
    const originalRequest = err.config;

    if (err?.response?.status === 401 && !originalRequest._retry) {
      try {
        const currentToken = JSON.parse(localStorage.authUser)?.token;
        const response = await User.refreshtoken(currentToken);

        originalRequest._retry = true;

        localStorage.setItem("authUser", JSON.stringify(response?.data.data));

        await Api(originalRequest);

        return err;
      } catch (error) {
        window.location.href = "/signin";
        return Promise.reject(error);
      }
    }
  }
);

export const setApiToken = (token: string) => {
  Api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// // interceptors
// Api.interceptors.request.use((req) => {
//   console.log("this is interceptor that run before request, req: ", req);
//   return req;
// });

// (async () => {
//   try {
//     console.log("from IIFE");
//   } catch (error) {
//     console.log("error: ", error);
//   }
// })();
