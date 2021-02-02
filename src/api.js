import axios from 'axios';

const APIkey = process.env.REACT_APP_API_KEY;

const API = axios.create({
  baseURL: ``
});

API.interceptors.response.use(response => {
  return response;
}, error => {
    console.error(error.response);
    throw error;

})
export default API;