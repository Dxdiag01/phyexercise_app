import { CacheManager } from './cacheManager';
import { exerciseService } from '../services/exerciseService';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Image } from 'react-native';
import { images } from '../assets';

interface LoadingState {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

type LoadingSubscriber = (state: LoadingState) => void;

class LoadingManager {
  private static instance: LoadingManager;
  private subscribers: LoadingSubscriber[] = [];
  private state: LoadingState = {
    isLoading: true,
    progress: 0,
    error: null,
  };

  private constructor() {}

  public static getInstance(): LoadingManager {
    if (!LoadingManager.instance) {
      LoadingManager.instance = new LoadingManager();
    }
    return LoadingManager.instance;
  }

  subscribe(subscriber: LoadingSubscriber) {
    this.subscribers.push(subscriber);
    subscriber(this.state);
    return () => {
      this.subscribers = this.subscribers.filter(s => s !== subscriber);
    };
  }

  private setState(newState: Partial<LoadingState>) {
    this.state = { ...this.state, ...newState };
    this.notifySubscribers();
  }

  private notifySubscribers() {
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  // İlerleme güncelleme
  private updateProgress(loaded: number, total: number) {
    const progress = Math.min(loaded / total, 1);
    this.setState({ progress });
  }

  // Fontları yükle
  private async loadFonts(): Promise<void> {
    await Font.loadAsync({
      'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
      'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
      'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
      'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    });
  }

  // Görüntüleri önbelleğe al
  private async cacheImages(): Promise<void> {
    const imageAssets = Object.values(images).map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });

    await Promise.all(imageAssets);
  }

  // Video önbelleğe alma
  private async cacheVideos(): Promise<void> {
    // Video önbelleğe alma işlemleri burada yapılacak
    // Örnek: const videoAssets = videos.map(video => Video.loadAsync(video));
    // await Promise.all(videoAssets);
  }

  // Tüm kaynakları yükle
  public async loadResources(): Promise<void> {
    try {
      this.setState({ isLoading: true, error: null });

      const totalTasks = 3; // Font, görüntü ve video yükleme
      let completedTasks = 0;

      // Fontları yükle
      await this.loadFonts();
      completedTasks++;
      this.updateProgress(completedTasks, totalTasks);

      // Görüntüleri önbelleğe al
      await this.cacheImages();
      completedTasks++;
      this.updateProgress(completedTasks, totalTasks);

      // Videoları önbelleğe al
      await this.cacheVideos();
      completedTasks++;
      this.updateProgress(completedTasks, totalTasks);

      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu',
      });
    }
  }

  // Yükleme durumunu kontrol et
  public getLoadingState(): LoadingState {
    return this.state;
  }

  // Yükleme hatası varsa temizle
  public clearError(): void {
    this.setState({ error: null });
  }

  // Kaynakları yeniden yükle
  public async reload(): Promise<void> {
    await this.loadResources();
  }
}

export const loadingManager = LoadingManager.getInstance(); 