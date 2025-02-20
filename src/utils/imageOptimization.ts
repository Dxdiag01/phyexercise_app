import { Image, ImageURISource, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

// Görüntü boyutları için sabit değerler
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  medium: { width: 300, height: 300 },
  large: { width: 600, height: 600 },
  profile: { width: 200, height: 200 },
  exercise: { width: 400, height: 300 },
};

// Görüntü kalitesi için sabit değerler
export const IMAGE_QUALITY = {
  low: 0.3,
  medium: 0.6,
  high: 0.9,
};

// Görüntü önbellek kontrolü
export const checkImageCache = async (uri: string): Promise<string> => {
  if (Platform.OS === 'web') return uri;

  const cacheKey = uri.split('/').pop() || '';
  const cacheDir = `${FileSystem.cacheDirectory}images/`;
  const cacheFilePath = `${cacheDir}${cacheKey}`;

  try {
    // Önbellek dizinini kontrol et
    const dirInfo = await FileSystem.getInfoAsync(cacheDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(cacheDir);
    }

    // Önbellekteki dosyayı kontrol et
    const fileInfo = await FileSystem.getInfoAsync(cacheFilePath);
    if (fileInfo.exists) {
      return `file://${cacheFilePath}`;
    }

    // Dosyayı indir ve önbelleğe al
    await FileSystem.downloadAsync(uri, cacheFilePath);
    return `file://${cacheFilePath}`;
  } catch (error) {
    console.error('Görüntü önbellek hatası:', error);
    return uri;
  }
};

// Görüntü boyutlandırma
export const resizeImage = async (
  uri: string,
  size: keyof typeof IMAGE_SIZES,
  quality: keyof typeof IMAGE_QUALITY = 'high'
): Promise<string> => {
  try {
    const { width, height } = IMAGE_SIZES[size];
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width, height } }],
      { compress: IMAGE_QUALITY[quality], format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  } catch (error) {
    console.error('Görüntü boyutlandırma hatası:', error);
    return uri;
  }
};

// Görüntü boyutlarını al
export const getImageDimensions = async (uri: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => resolve({ width, height }),
      (error) => {
        console.error('Görüntü boyutu alma hatası:', error);
        reject(error);
      }
    );
  });
};

// Görüntü önbellek temizleme
export const clearImageCache = async (): Promise<void> => {
  if (Platform.OS === 'web') return;

  try {
    const cacheDir = `${FileSystem.cacheDirectory}images/`;
    await FileSystem.deleteAsync(cacheDir, { idempotent: true });
  } catch (error) {
    console.error('Önbellek temizleme hatası:', error);
  }
};

// Optimize edilmiş görüntü kaynağı oluştur
export const createOptimizedSource = (
  uri: string,
  size: keyof typeof IMAGE_SIZES
): ImageURISource => ({
  uri,
  width: IMAGE_SIZES[size].width,
  height: IMAGE_SIZES[size].height,
  cache: 'force-cache',
});

// Görüntü önbellek durumunu kontrol et
export const getImageCacheStatus = async (uri: string): Promise<boolean> => {
  if (Platform.OS === 'web') return false;

  try {
    const cacheKey = uri.split('/').pop() || '';
    const cacheDir = `${FileSystem.cacheDirectory}images/`;
    const cacheFilePath = `${cacheDir}${cacheKey}`;
    const fileInfo = await FileSystem.getInfoAsync(cacheFilePath);
    return fileInfo.exists;
  } catch (error) {
    console.error('Önbellek durumu kontrol hatası:', error);
    return false;
  }
}; 