import { applyInterceptors } from './axiosInterceptors'
import axios from 'axios'

const axi = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const axiosInstance = applyInterceptors(axi)
