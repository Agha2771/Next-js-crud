import axios, { AxiosRequestConfig } from 'axios'
import { showError, showValidationErrors } from './toast'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status
    const message = error.response?.data?.message || 'An unexpected error occurred.'

    if (status === 422 && Array.isArray(error.response?.data?.errors)) {
      showValidationErrors(error.response.data.errors)
    } else {
      showError(message)
    }

    return Promise.reject(error)
  }
)

interface ApiResponse<T> {
  data: T
}

export const get = (url: string, config = {}) => api.get(url, config)
export const post = async <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig): Promise<T> => {
  const response = await api.post<ApiResponse<T>>(url, data, config)
  return response.data.data
}
