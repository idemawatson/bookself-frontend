import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export default class BaseAPIServiceClient {
  _client: AxiosInstance
  constructor(option: AxiosRequestConfig) {
    this._client = axios.create(option)
  }
  async get<T>(path: string): Promise<AxiosResponse<T>> {
    return await this._client.get(path)
  }
  async post<T, U>(path: string, body: T): Promise<AxiosResponse<U>> {
    return await this._client.post(path, body)
  }
  async patch<T, U>(path: string, body: T): Promise<AxiosResponse<U>> {
    return await this._client.patch(path, body)
  }
  async put<T, U>(path: string, body: T): Promise<AxiosResponse<U>> {
    return await this._client.put(path, body)
  }
  async delete<T, U>(path: string): Promise<AxiosResponse<U>> {
    return await this._client.delete(path)
  }
}
