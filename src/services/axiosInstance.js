import axios from 'axios';

const axiosInstance = axios.create({
  
  headers: {
    common: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  },
});

export default axiosInstance;
