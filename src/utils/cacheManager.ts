import AsyncStorage from '@react-native-async-storage/async-storage';

// Önbellek anahtarları
const CACHE_KEYS = {
  API_RESPONSES: 'api_cache_',
  USER_DATA: 'user_data_',
  EXERCISE_DATA: 'exercise_data_',
};

// Önbellek süreleri (milisaniye)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 dakika
  MEDIUM: 30 * 60 * 1000, // 30 dakika
  LONG: 24 * 60 * 60 * 1000, // 24 saat
};

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresIn: number;
}

export class CacheManager {
  // API yanıtlarını önbellekleme
  static async cacheAPIResponse<T>(
    key: string,
    data: T,
    duration: number = CACHE_DURATION.MEDIUM
  ): Promise<void> {
    const cacheKey = `${CACHE_KEYS.API_RESPONSES}${key}`;
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: duration,
    };

    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Önbellekleme hatası:', error);
    }
  }

  // Önbellekten API yanıtı alma
  static async getCachedAPIResponse<T>(key: string): Promise<T | null> {
    const cacheKey = `${CACHE_KEYS.API_RESPONSES}${key}`;

    try {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      if (!cachedData) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cachedData);
      const isExpired = Date.now() - cacheItem.timestamp > cacheItem.expiresIn;

      if (isExpired) {
        await AsyncStorage.removeItem(cacheKey);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Önbellek okuma hatası:', error);
      return null;
    }
  }

  // Kullanıcı verilerini önbellekleme
  static async cacheUserData<T>(
    userId: string,
    data: T,
    duration: number = CACHE_DURATION.LONG
  ): Promise<void> {
    const cacheKey = `${CACHE_KEYS.USER_DATA}${userId}`;
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: duration,
    };

    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Kullanıcı verisi önbellekleme hatası:', error);
    }
  }

  // Önbellekten kullanıcı verisi alma
  static async getCachedUserData<T>(userId: string): Promise<T | null> {
    const cacheKey = `${CACHE_KEYS.USER_DATA}${userId}`;

    try {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      if (!cachedData) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cachedData);
      const isExpired = Date.now() - cacheItem.timestamp > cacheItem.expiresIn;

      if (isExpired) {
        await AsyncStorage.removeItem(cacheKey);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Kullanıcı verisi okuma hatası:', error);
      return null;
    }
  }

  // Egzersiz verilerini önbellekleme
  static async cacheExerciseData<T>(
    exerciseId: string,
    data: T,
    duration: number = CACHE_DURATION.MEDIUM
  ): Promise<void> {
    const cacheKey = `${CACHE_KEYS.EXERCISE_DATA}${exerciseId}`;
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresIn: duration,
    };

    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheItem));
    } catch (error) {
      console.error('Egzersiz verisi önbellekleme hatası:', error);
    }
  }

  // Önbellekten egzersiz verisi alma
  static async getCachedExerciseData<T>(exerciseId: string): Promise<T | null> {
    const cacheKey = `${CACHE_KEYS.EXERCISE_DATA}${exerciseId}`;

    try {
      const cachedData = await AsyncStorage.getItem(cacheKey);
      if (!cachedData) return null;

      const cacheItem: CacheItem<T> = JSON.parse(cachedData);
      const isExpired = Date.now() - cacheItem.timestamp > cacheItem.expiresIn;

      if (isExpired) {
        await AsyncStorage.removeItem(cacheKey);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.error('Egzersiz verisi okuma hatası:', error);
      return null;
    }
  }

  // Belirli bir önbelleği temizleme
  static async clearCache(type: keyof typeof CACHE_KEYS, identifier?: string): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cachePrefix = CACHE_KEYS[type];
      
      const keysToRemove = identifier
        ? [`${cachePrefix}${identifier}`]
        : keys.filter(key => key.startsWith(cachePrefix));

      await AsyncStorage.multiRemove(keysToRemove);
    } catch (error) {
      console.error('Önbellek temizleme hatası:', error);
    }
  }

  // Tüm önbelleği temizleme
  static async clearAllCache(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => 
        Object.values(CACHE_KEYS).some(prefix => key.startsWith(prefix))
      );
      
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Tüm önbelleği temizleme hatası:', error);
    }
  }
} 