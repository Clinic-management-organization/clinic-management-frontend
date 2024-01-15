import axios from 'axios';

// -- Axios

const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'application/json',
  }
})


export default axiosInstance;
