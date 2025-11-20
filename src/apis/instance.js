import axios from 'axios';
import { authClientInterceptor, clientInterceptor } from './interceptor';

/**
 * 일반 요청
 */
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});
client.interceptors.request.use(
  clientInterceptor.request.onFulfilled,
  clientInterceptor.request.onRejected,
);
client.interceptors.response.use(
  clientInterceptor.response.onFulfilled,
  clientInterceptor.response.onRejected,
);

/**
 * 인증 요청
 */
const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  withCredentials: true,
});
authClient.interceptors.request.use(
  authClientInterceptor.request.onFulfilled,
  authClientInterceptor.request.onRejected,
);
authClient.interceptors.response.use(
  authClientInterceptor.response.onFulfilled,
  authClientInterceptor.response.onRejected,
);

export { authClient, client };
