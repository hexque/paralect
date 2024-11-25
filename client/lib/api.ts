import axios from 'axios';

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Pragma: 'no-cache'
  }
};

const api = axios.create(config);

export default api;
