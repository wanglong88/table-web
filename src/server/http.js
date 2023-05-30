import axios from "axios";

const service = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  timeout: '5000'
})

service.interceptors.request.use((config) => {
  return config
})

service.interceptors.response.use((response) => {
  return response.data
}, error => {
  Promise.reject(error)
})

export default service