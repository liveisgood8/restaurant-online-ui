import Axios from 'axios';
import { apiUrl } from '../config';

export const AxiosInstance = Axios.create({
  baseURL: apiUrl,
});