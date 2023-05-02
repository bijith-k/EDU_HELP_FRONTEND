import axios from "axios";


const axiosInstance = (tokenName) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_PATH}`,
    // timeout:10000,
    headers:{
      'Content-Type' : 'application/json'
    }
  })

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName)
    request.headers.Authorization = `Bearer ${token}`
    return request
  })

  return instance

}

export default axiosInstance

