// apis/auth.js
import { authClient, client } from './instance';

export const signUpApi = (formData) =>
  client.post('/accounts/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const loginApi = (data) => client.post('/accounts/login', data);

export const getMyInfoApi = () => authClient.get('/accounts');
