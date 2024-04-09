
import axios from 'axios'
import { environmentalVariable } from './environment-variable';

const apiClient =  axios.create({
  baseURL: environmentalVariable.BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export default apiClient;
  