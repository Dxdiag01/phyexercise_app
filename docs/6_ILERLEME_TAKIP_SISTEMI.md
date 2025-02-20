# İLERLEME TAKİP SİSTEMİ

## 1. İLERLEME TAKİP GEREKSİNİMLERİ

### Hasta İhtiyaçları
- Görsel ilerleme grafikleri
- Anlaşılır metrikler
- Motivasyon bildirimleri
- Başarı rozetleri
- Hedef takibi
- Karşılaştırmalı analizler

### Fizyoterapist İhtiyaçları
- Detaylı ilerleme raporları
- Hasta uyum metrikleri
- Karşılaştırmalı analizler
- Program etkinlik ölçümü
- Otomatik raporlama
- Toplu hasta analizi

## 2. ÖLÇÜM METRİKLERİ

### Temel Metrikler
- Ağrı seviyesi (1-10)
- Hareket açıklığı
- Egzersiz tamamlama oranı
- Düzenlilik skoru
- Uyum yüzdesi
- Genel ilerleme puanı

### İleri Metrikler
- Fonksiyonel iyileşme
- Yaşam kalitesi skorları
- Performans metrikleri
- Yorgunluk analizi
- Risk faktörleri
- Trend analizleri

## 1. VERİTABANI YAPISI

### Firestore Koleksiyonları
```typescript
// progress koleksiyonu
interface Progress {
  id: string;
  userId: string;
  type: 'exercise' | 'program' | 'goal';
  referenceId: string; // exerciseId, programId veya goalId
  data: {
    startDate: Timestamp;
    lastUpdateDate: Timestamp;
    completionDate?: Timestamp;
    status: 'active' | 'completed' | 'abandoned';
    metrics: {
      [key: string]: number; // dinamik metrikler
    };
  };
  history: {
    date: Timestamp;
    metrics: {
      [key: string]: number;
    };
    notes?: string;
  }[];
}

// goals koleksiyonu
interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'exercise' | 'measurement' | 'habit';
  target: {
    metric: string;
    value: number;
    unit: string;
  };
  timeline: {
    startDate: Timestamp;
    targetDate: Timestamp;
    milestones?: {
      date: Timestamp;
      value: number;
    }[];
  };
  status: 'pending' | 'active' | 'completed' | 'failed';
  progress: {
    currentValue: number;
    percentage: number;
    lastUpdate: Timestamp;
  };
}

// measurements koleksiyonu
interface Measurement {
  id: string;
  userId: string;
  date: Timestamp;
  type: 'weight' | 'bodyFat' | 'muscle' | 'flexibility' | 'strength' | 'custom';
  value: number;
  unit: string;
  metadata?: {
    method: string;
    location?: string;
    notes?: string;
  };
}
```

## 2. UYGULAMA MİMARİSİ

### Klasör Yapısı
```
src/
├── features/
│   └── progress/
│       ├── components/
│       │   ├── ProgressChart.tsx
│       │   ├── GoalCard.tsx
│       │   ├── MetricDisplay.tsx
│       │   ├── ProgressCalendar.tsx
│       │   └── MeasurementForm.tsx
│       ├── screens/
│       │   ├── ProgressDashboardScreen.tsx
│       │   ├── GoalsScreen.tsx
│       │   ├── MeasurementsScreen.tsx
│       │   └── ProgressDetailScreen.tsx
│       ├── services/
│       │   ├── progress.service.ts
│       │   ├── goals.service.ts
│       │   └── measurements.service.ts
│       ├── hooks/
│       │   ├── useProgress.ts
│       │   ├── useGoals.ts
│       │   └── useMeasurements.ts
│       ├── store/
│       │   └── progressSlice.ts
│       └── utils/
│           ├── calculations.ts
│           ├── formatters.ts
│           └── validators.ts
```

### Temel Komponentler

#### ProgressChart
```typescript
interface ProgressChartProps {
  data: {
    date: Date;
    value: number;
  }[];
  type: 'line' | 'bar' | 'area';
  metric: string;
  unit: string;
  goal?: number;
  trendline?: boolean;
}
```

#### GoalCard
```typescript
interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
  showProgress?: boolean;
  style?: ViewStyle;
}
```

## 3. VERİ VİZUALİZASYONU

### Chart Tipleri
1. Zaman Bazlı Grafikler
   - Günlük ilerleme
   - Haftalık trend
   - Aylık özet
   - Yıllık karşılaştırma

2. Karşılaştırma Grafikleri
   - Hedef vs gerçekleşen
   - Önceki dönem vs şu an
   - Ortalama vs kişisel

3. Dağılım Grafikleri
   - Aktivite dağılımı
   - Egzersiz türü dağılımı
   - Zorluk seviyesi dağılımı

### Veri Formatlama
```typescript
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color?: string;
    strokeWidth?: number;
  }[];
  legend?: string[];
}

function formatChartData(progress: Progress[]): ChartData {
  // Implementation
}
```

## 4. İLERLEME HESAPLAMALARI

### Metrik Hesaplamaları
```typescript
interface MetricCalculation {
  current: number;
  previous: number;
  change: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
}

function calculateMetric(
  data: number[],
  type: 'average' | 'total' | 'max' | 'min'
): MetricCalculation {
  // Implementation
}
```

### Trend Analizi
1. Hareketli Ortalama
   - 7 günlük
   - 30 günlük
   - Ağırlıklı ortalama

2. İlerleme Hızı
   - Günlük değişim
   - Haftalık değişim
   - Trend yönü

3. Tahminsel Analiz
   - Hedef tahminleri
   - İlerleme projeksiyonu
   - Başarı olasılığı

## 5. HEDEF YÖNETİMİ

### Hedef Tipleri
1. Sayısal Hedefler
   - Ağırlık hedefleri
   - Set/tekrar hedefleri
   - Süre hedefleri

2. Alışkanlık Hedefleri
   - Günlük egzersiz
   - Haftalık aktivite
   - Aylık değerlendirme

3. Program Hedefleri
   - Program tamamlama
   - Form geliştirme
   - Seviye atlama

### Hedef Takibi
```typescript
interface GoalProgress {
  goal: Goal;
  progress: number;
  remaining: number;
  projectedCompletion: Date;
  status: 'ahead' | 'onTrack' | 'behind';
  recommendations: string[];
}

function trackGoalProgress(goal: Goal, measurements: Measurement[]): GoalProgress {
  // Implementation
}
```

## 6. GAMIFICATION

### Başarı Sistemi
1. Rozetler
   - İlerleme rozetleri
   - Tutarlılık rozetleri
   - Özel başarı rozetleri

2. Seviye Sistemi
   - XP hesaplaması
   - Seviye atlama
   - Ödül mekanizması

3. Meydan Okumalar
   - Günlük görevler
   - Haftalık hedefler
   - Özel etkinlikler

## 7. MONITORING

### Analytics Events
1. İlerleme Olayları
   - progress_update
   - goal_achieved
   - measurement_added
   - milestone_reached

2. Kullanıcı Etkileşimi
   - chart_interaction
   - goal_creation
   - progress_share

### Error Tracking
1. Veri Hataları
   - Invalid measurements
   - Calculation errors
   - Sync failures

## 8. GELİŞTİRME ADIMLARI

### Hafta 1
1. Temel Altyapı
   - [ ] Veri modellerinin oluşturulması
   - [ ] CRUD operasyonları
   - [ ] Temel UI komponentleri

2. Veri Görselleştirme
   - [ ] Chart komponentleri
   - [ ] Progress göstergeleri
   - [ ] İstatistik kartları

### Hafta 2
1. Hedef Sistemi
   - [ ] Hedef oluşturma
   - [ ] İlerleme takibi
   - [ ] Bildirimler

2. Gamification
   - [ ] Rozet sistemi
   - [ ] Seviye sistemi
   - [ ] Başarı tracking 