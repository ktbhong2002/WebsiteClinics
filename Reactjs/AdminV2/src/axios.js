import axios from 'axios';
// import config from './config';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  // withCredentials: true
});

console.log(instance);
instance.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});

export default instance;
