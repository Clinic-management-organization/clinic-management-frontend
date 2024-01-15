import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    common: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  },
});

export default axiosInstance;
