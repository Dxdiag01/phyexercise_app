import { InteractionManager, Platform } from 'react-native';
import { PerformanceObserver, performance } from 'perf_hooks';

interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
  name: string;
  type: 'render' | 'api' | 'load' | 'interaction';
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics[] = [];
  private isEnabled: boolean = __DEV__;

  private constructor() {
    if (Platform.OS !== 'web') {
      this.setupPerformanceObserver();
    }
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private setupPerformanceObserver() {
    if (typeof PerformanceObserver !== 'undefined') {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.logMetric({
            startTime: entry.startTime,
            endTime: entry.startTime + entry.duration,
            duration: entry.duration,
            name: entry.name,
            type: 'render'
          });
        });
      });

      observer.observe({ entryTypes: ['measure'] });
    }
  }

  // Performans metriğini kaydet
  private logMetric(metric: PerformanceMetrics) {
    if (!this.isEnabled) return;

    this.metrics.push(metric);
    console.log(`Performans Metriği - ${metric.name}:`, {
      süre: `${metric.duration.toFixed(2)}ms`,
      tip: metric.type
    });
  }

  // Render performansını ölç
  public measureRender(componentName: string, callback: () => void) {
    if (!this.isEnabled) {
      callback();
      return;
    }

    const startTime = performance.now();
    callback();

    InteractionManager.runAfterInteractions(() => {
      const endTime = performance.now();
      this.logMetric({
        startTime,
        endTime,
        duration: endTime - startTime,
        name: `${componentName} Render`,
        type: 'render'
      });
    });
  }

  // API isteği performansını ölç
  public async measureAPI<T>(
    name: string,
    apiCall: () => Promise<T>
  ): Promise<T> {
    if (!this.isEnabled) {
      return apiCall();
    }

    const startTime = performance.now();
    try {
      const result = await apiCall();
      const endTime = performance.now();
      
      this.logMetric({
        startTime,
        endTime,
        duration: endTime - startTime,
        name: `API: ${name}`,
        type: 'api'
      });

      return result;
    } catch (error) {
      const endTime = performance.now();
      this.logMetric({
        startTime,
        endTime,
        duration: endTime - startTime,
        name: `API Error: ${name}`,
        type: 'api'
      });
      throw error;
    }
  }

  // Yükleme performansını ölç
  public measureLoad(name: string): () => void {
    if (!this.isEnabled) {
      return () => {};
    }

    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      this.logMetric({
        startTime,
        endTime,
        duration: endTime - startTime,
        name: `Load: ${name}`,
        type: 'load'
      });
    };
  }

  // Kullanıcı etkileşimi performansını ölç
  public measureInteraction(name: string, callback: () => void) {
    if (!this.isEnabled) {
      callback();
      return;
    }

    const startTime = performance.now();
    callback();

    InteractionManager.runAfterInteractions(() => {
      const endTime = performance.now();
      this.logMetric({
        startTime,
        endTime,
        duration: endTime - startTime,
        name: `Interaction: ${name}`,
        type: 'interaction'
      });
    });
  }

  // Tüm metrikleri getir
  public getMetrics(): PerformanceMetrics[] {
    return this.metrics;
  }

  // Belirli bir tip için ortalama süreyi hesapla
  public getAverageTime(type: PerformanceMetrics['type']): number {
    const typeMetrics = this.metrics.filter(m => m.type === type);
    if (typeMetrics.length === 0) return 0;

    const totalTime = typeMetrics.reduce((sum, m) => sum + m.duration, 0);
    return totalTime / typeMetrics.length;
  }

  // Metrikleri temizle
  public clearMetrics(): void {
    this.metrics = [];
  }

  // Performans izlemeyi aç/kapat
  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance(); 