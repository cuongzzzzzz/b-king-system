// @ts-nocheck

import axios from 'axios';
import { BASE_URL } from '@/constants';
import { persistor, store } from '@/redux/storage';
import { updateAccessToken } from '@/redux/authSlice';


async function waitForPersistor() {
  return new Promise((resolve) => {
    persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        resolve("");
      }
    });
  });
}

async function createAxiosInstance() {
  await waitForPersistor();
  const state = store.getState();
  const currentUser = state.auth.login.currentUser;


  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "x-client-key": currentUser ? currentUser._id : '',
      "authorization": currentUser ? currentUser.accessToken : '',
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      const currentUser = state.auth.login.currentUser;
      if (currentUser && currentUser.accessToken) {
        config.headers['authorization'] = currentUser.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const state = store.getState();
        const currentUser = state.auth.login.currentUser;
        if (currentUser && currentUser.refreshToken) {
          try {
            const response = await axios.post(`${BASE_URL}/refreshToken`, {
              refreshToken: currentUser.refreshToken,
            });
            const newAccessToken = response.data.accessToken;
            store.dispatch(updateAccessToken(newAccessToken));
            originalRequest.headers['authorization'] = newAccessToken;
            return axios(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
}

export const instance = await createAxiosInstance();

