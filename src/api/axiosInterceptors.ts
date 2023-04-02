import {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios'

const logPrefix = 'axios:'

const onRequestFulfilledLogConfig = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  console.debug(`${logPrefix} ${JSON.stringify(config)}`)
  return config
}

const onRequestRejectedLogError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`${logPrefix} ${JSON.stringify(error)}`)
  return Promise.reject(error)
}

const onResponseFulfilledLogResponse = (
  response: AxiosResponse,
): AxiosResponse => {
  console.debug(`${logPrefix} ${JSON.stringify(response)}`)
  return response
}

const onResponseUnauthenticatedRedirectToLogin = (
  error: AxiosError,
): Promise<AxiosError> => {
  if (error.response?.status === 401) {
    // Handle unauthenticated response by redirecting to login.
    window.location.href = import.meta.env.VITE_LOGIN_URL
  }

  return Promise.reject(error)
}

const onResponseRejectedLogError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`${logPrefix} ${JSON.stringify(error)}`)
  return Promise.reject(error)
}

export function applyInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.response.use(
    (x) => x,
    onResponseUnauthenticatedRedirectToLogin,
  )

  if (!import.meta.env.PROD) {
    axiosInstance.interceptors.request.use(
      onRequestFulfilledLogConfig,
      onRequestRejectedLogError,
    )
    axiosInstance.interceptors.response.use(
      onResponseFulfilledLogResponse,
      onResponseRejectedLogError,
    )
  }

  return axiosInstance
}
