import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CacheManager } from './cacheManager';
import NetInfo from '@react-native-community/netinfo';
import { performanceMonitor } from './performanceMonitor';

interface APIClientConfig extends AxiosRequestConfig {
  useCache?: boolean;
  cacheDuration?: number;
}

class APIClient {
  private static instance: APIClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_URL || 'https://api.phyexercise.com',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private setupInterceptors(): void {
    // İstek öncesi interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // İnternet bağlantısı kontrolü
        const netInfo = await NetInfo.fetch();
        if (!netInfo.isConnected) {
          throw new Error('İnternet bağlantısı yok');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Yanıt interceptor'ı
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token yenileme işlemi
          // await this.refreshToken();
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(
    url: string,
    config: APIClientConfig = {}
  ): Promise<T> {
    const { useCache = true, cacheDuration, ...axiosConfig } = config;

    if (useCache) {
      // Önbellekten veri kontrolü
      const cachedData = await CacheManager.getCachedAPIResponse<T>(url);
      if (cachedData) {
        return cachedData;
      }
    }

    return performanceMonitor.measureAPI(`GET ${url}`, async () => {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, axiosConfig);
        
        if (useCache) {
          // Yanıtı önbelleğe alma
          await CacheManager.cacheAPIResponse(url, response.data, cacheDuration);
        }

        return response.data;
      } catch (error) {
        console.error(`API isteği başarısız: ${url}`, error);
        throw error;
      }
    });
  }

  public async post<T>(
    url: string,
    data: any,
    config: APIClientConfig = {}
  ): Promise<T> {
    return performanceMonitor.measureAPI(`POST ${url}`, async () => {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
        return response.data;
      } catch (error) {
        console.error(`API isteği başarısız: ${url}`, error);
        throw error;
      }
    });
  }

  public async put<T>(
    url: string,
    data: any,
    config: APIClientConfig = {}
  ): Promise<T> {
    return performanceMonitor.measureAPI(`PUT ${url}`, async () => {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
        return response.data;
      } catch (error) {
        console.error(`API isteği başarısız: ${url}`, error);
        throw error;
      }
    });
  }

  public async delete<T>(
    url: string,
    config: APIClientConfig = {}
  ): Promise<T> {
    return performanceMonitor.measureAPI(`DELETE ${url}`, async () => {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
        return response.data;
      } catch (error) {
        console.error(`API isteği başarısız: ${url}`, error);
        throw error;
      }
    });
  }
}

export const apiClient = APIClient.getInstance(); 