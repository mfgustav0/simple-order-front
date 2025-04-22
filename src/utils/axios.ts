import axios, { AxiosError } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(response => response, function (error: AxiosError) {
  let message = error.message;
  if(error.response?.data) {
    const messagesResponse = error.response.data?.message as Array<string> | string | null;
    if(messagesResponse) {
      if(typeof messagesResponse === 'string') {
        message = messagesResponse;
      } else if(messagesResponse.length > 0) {
        message = messagesResponse.join(';\n');
      }
    }
  }

  return Promise.reject({
    ...error,
    message,
  });
});

export default instance;
