import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://127.0.0.1:8080/',
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export default axiosInstance;
