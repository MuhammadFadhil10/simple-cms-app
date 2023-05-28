import axios from "axios";

export const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// const authData = localStorage?.getItem("authUser");

// Api.defaults.headers.common.Authorization = `Bearer ${
//   JSON.parse(authData as string).token
// }`;

// // interceptors
// Api.interceptors.request.use((req) => {
//   console.log("this is interceptor that run before request, req: ", req);
//   return req;
// });

// Api.interceptors.response.use(undefined, (err) => {
//   // refresh token
//   if (err.response.status === 401) {
//     Api.defaults.headers.common.Authorization = `Bearer ${
//       JSON.parse(authData as string).refreshToken
//     }`;
//   }
// });

// (async () => {
//   try {
//     console.log("from IIFE");
//   } catch (error) {
//     console.log("error: ", error);
//   }
// })();
