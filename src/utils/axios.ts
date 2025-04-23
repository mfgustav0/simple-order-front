import { store as authStore } from '@/plugins/vuex/auth-store';
import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(response => response, function (error: AxiosError) {
  if(error.status == 401 && authStore.state.isAuthenticated) {
    authStore.dispatch('logout');
  }

  const message = sanitizeMessageError(error);

  return Promise.reject({
    ...error,
    message,
  });
});

function sanitizeMessageError (error: AxiosError): string {
  if(!error.response?.data) {
    return error.message;
  }

  const messagesResponse = error.response.data?.message as Array<string> | string | null;
  if(!messagesResponse) {
    return error.message;
  }

  if(typeof messagesResponse === 'string') {
    return messagesResponse;
  }

  if(messagesResponse.length > 0) {
    return messagesResponse.join(';\n');
  }

  return error.message;
}

export default instance;
