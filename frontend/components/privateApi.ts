import axios from 'axios';
import { store } from '@/app/redux/store';
import { logout } from '@/app/redux/features/users/userSlice';

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Session expired → logging out');
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);
