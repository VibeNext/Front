import axios from "axios";
import { clientInterceptor, authClientInterceptor } from "./interceptor";

/**
 * 일반 요청
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
});
client.interceptors.request.use(
  clientInterceptor.request.onFulfilled,
  clientInterceptor.request.onRejected,
  clientInterceptor.request.options
);
client.interceptors.response.use(
  clientInterceptor.response.onFulfilled,
  clientInterceptor.response.onRejected,
  clientInterceptor.response.options
);

/**
 * 인증이 필요한 요청 (일반 요청을 상속함)
 */
const authClient = client.create({
  withCredentials: true,
});
authClient.interceptors.request.use(
  authClientInterceptor.request.onFulfilled,
  authClientInterceptor.request.onRejected,
  authClientInterceptor.request.options
);
authClient.interceptors.response.use(
  authClientInterceptor.response.onFulfilled,
  authClientInterceptor.response.onRejected,
  authClientInterceptor.response.options
);

export { client, authClient };
