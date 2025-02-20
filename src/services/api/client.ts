import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { createError, handleError } from '../../utils/errors';

export interface RequestConfig extends AxiosRequestConfig {
  requiresAuth?: boolean;
}

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if ((config as RequestConfig).requiresAuth) {
          // Token eklenecek
          const token = await this.getAuthToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error: unknown) => {
        return Promise.reject(handleError(error));
      }
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: unknown) => {
        if (axios.isAxiosError(error) && error.response) {
          // API'den gelen hata
          return Promise.reject(
            createError(
              String(error.response.status),
              error.response.data?.message || 'API hatası',
              error.response.data
            )
          );
        }
        if (axios.isAxiosError(error) && error.request) {
          // İstek yapıldı ama cevap alınamadı
          return Promise.reject(
            createError('NETWORK_ERROR', 'Ağ bağlantısı hatası')
          );
        }
        // İstek oluşturulurken hata
        return Promise.reject(handleError(error));
      }
    );
  }

  private async getAuthToken(): Promise<string | null> {
    // Token yönetimi burada implement edilecek
    return null;
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }
}

// API istemcisini oluştur
const apiClient = new ApiClient(process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000');

export default apiClient; 