# EGZERSİZ SİSTEMİ GELİŞTİRME PLANI

## 1. VERİTABANI YAPISI

### Firestore Koleksiyonları
```typescript
// categories koleksiyonu
interface Category {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  parentId?: string;
  order: number;
  isActive: boolean;
  metadata: {
    targetMuscles?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    equipment?: string[];
    tags?: string[];
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// exercises koleksiyonu
interface Exercise {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  media: {
    videoUrl: string;
    thumbnailUrl: string;
    previewGifUrl?: string;
    additionalImages?: string[];
  };
  instructions: {
    steps: string[];
    tips: string[];
    warnings: string[];
  };
  details: {
    equipment: string[];
    targetMuscles: string[];
    secondaryMuscles: string[];
    duration: number;
    calories: number;
    sets: number;
    reps: number;
    restTime: number;
  };
  metadata: {
    views: number;
    likes: number;
    rating: number;
    tags: string[];
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// userExercises koleksiyonu
interface UserExercise {
  id: string;
  userId: string;
  exerciseId: string;
  progress: {
    lastPerformed: Timestamp;
    totalSessions: number;
    totalDuration: number;
    averageAccuracy?: number;
    personalBest?: {
      date: Timestamp;
      value: number;
    };
  };
  history: {
    date: Timestamp;
    sets: number;
    reps: number;
    duration: number;
    accuracy?: number;
    notes?: string;
  }[];
  settings: {
    customSets?: number;
    customReps?: number;
    reminders?: {
      enabled: boolean;
      frequency: 'daily' | 'weekly';
      time: string;
    };
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## 2. UYGULAMA MİMARİSİ

### Klasör Yapısı
```
src/
├── features/
│   └── exercises/
│       ├── components/
│       │   ├── ExerciseCard.tsx
│       │   ├── ExerciseList.tsx
│       │   ├── ExerciseDetail.tsx
│       │   ├── VideoPlayer.tsx
│       │   └── ProgressTracker.tsx
│       ├── screens/
│       │   ├── ExercisesScreen.tsx
│       │   ├── ExerciseDetailScreen.tsx
│       │   ├── ExercisePlayerScreen.tsx
│       │   └── ExerciseHistoryScreen.tsx
│       ├── services/
│       │   ├── exercise.service.ts
│       │   └── category.service.ts
│       ├── hooks/
│       │   ├── useExercises.ts
│       │   ├── useCategories.ts
│       │   └── useExerciseProgress.ts
│       ├── store/
│       │   ├── exerciseSlice.ts
│       │   └── categorySlice.ts
│       └── utils/
│           ├── exerciseHelpers.ts
│           └── videoCache.ts
```

### Temel Komponentler

#### ExerciseCard
```typescript
interface ExerciseCardProps {
  exercise: Exercise;
  onPress: () => void;
  showProgress?: boolean;
  compact?: boolean;
}
```
- Egzersiz önizleme kartı
- Thumbnail gösterimi
- Temel bilgiler (başlık, süre, zorluk)
- İlerleme durumu (opsiyonel)
- Skeleton loading desteği

#### VideoPlayer
```typescript
interface VideoPlayerProps {
  videoUrl: string;
  autoPlay?: boolean;
  showControls?: boolean;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}
```
- Custom kontroller
- Progress tracking
- Offline cache desteği
- Picture-in-Picture modu
- Orientation handling

## 3. ÖZELLİKLER VE AKIŞLAR

### Egzersiz Listeleme
1. Kategoriye göre filtreleme
   - Ana kategoriler
   - Alt kategoriler
   - Çoklu filtreleme

2. Arama ve Filtreleme
   - Full-text search (Algolia)
   - Zorluk seviyesi
   - Süre
   - Ekipman
   - Hedef kas grubu

3. Sıralama Seçenekleri
   - Popülerlik
   - Yeni eklenenler
   - Zorluk seviyesi
   - Süre

### Egzersiz Detay Sayfası
1. Üst Bölüm
   - Video/Thumbnail
   - Temel bilgiler
   - Başlat/Kaydet butonları

2. Bilgi Kartları
   - Hedef kas grupları
   - Gerekli ekipmanlar
   - Süre ve set bilgisi
   - Zorluk seviyesi

3. Talimatlar Bölümü
   - Adım adım açıklamalar
   - İpuçları
   - Dikkat edilecekler
   - Görsel destekler

4. İlerleme Bölümü
   - Geçmiş performans
   - İstatistikler
   - Grafikler

### Egzersiz Uygulama Ekranı
1. Video Bölümü
   - Tam ekran video
   - Kontrol butonları
   - Form analizi (opsiyonel)

2. Kontrol Paneli
   - Set sayacı
   - Süre sayacı
   - Duraklatma/devam
   - Form puanı

3. Tamamlama Ekranı
   - Performans özeti
   - İlerleme kaydı
   - Paylaşım seçenekleri

## 4. PERFORMANS OPTİMİZASYONU

### Video Optimizasyonu
1. Önbellek Stratejisi
   - Video chunk'ları
   - Thumbnail cache
   - Offline erişim

2. Lazy Loading
   - Liste görünümünde
   - Detay sayfasında
   - Placeholder kullanımı

3. Kompresyon
   - Video kalite seçenekleri
   - Adaptive streaming
   - Thumbnail optimizasyonu

### Liste Performansı
1. Virtualization
   - FlashList kullanımı
   - Sayfalama
   - Pull-to-refresh

2. Veri Önbelleği
   - Redux persist
   - Offline first yaklaşımı
   - Background sync

## 5. TEST STRATEJİSİ

### Unit Testler
```typescript
describe('ExerciseCard', () => {
  it('should render exercise information correctly', () => {
    // Test implementation
  });

  it('should handle press events', () => {
    // Test implementation
  });

  it('should show progress when enabled', () => {
    // Test implementation
  });
});
```

### Integration Testler
1. Veri Akışı
   - API çağrıları
   - State yönetimi
   - Cache mekanizması

2. Kullanıcı Akışları
   - Liste navigasyonu
   - Detay görüntüleme
   - Egzersiz tamamlama

### E2E Testler
1. Kritik Akışlar
   - Kategori filtreleme
   - Egzersiz arama
   - Video oynatma
   - İlerleme kaydetme

## 6. GÜVENLİK

### Veri Erişimi
1. Firestore Kuralları
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /exercises/{exerciseId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
    match /userExercises/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

2. Storage Kuralları
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /exercises/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

## 7. MONITORING

### Analytics Events
1. Kullanıcı Etkileşimi
   - exercise_view
   - exercise_start
   - exercise_complete
   - exercise_share

2. Performans Metrikleri
   - video_load_time
   - video_buffer_ratio
   - exercise_completion_rate

### Error Tracking
1. Sentry Entegrasyonu
   - Video playback hataları
   - API hataları
   - UI hataları

## 8. GELİŞTİRME ADIMLARI

### Hafta 1
1. Veritabanı Yapısı
   - [ ] Firestore şemalarının oluşturulması
   - [ ] Test verilerinin hazırlanması
   - [ ] Temel CRUD operasyonları

2. Temel Komponentler
   - [ ] ExerciseCard komponenti
   - [ ] Liste görünümü
   - [ ] Filtreleme sistemi

### Hafta 2
1. Video Sistemi
   - [ ] VideoPlayer komponenti
   - [ ] Cache mekanizması
   - [ ] Offline destek

2. Detay Sayfası
   - [ ] UI implementasyonu
   - [ ] İlerleme takibi
   - [ ] Performans optimizasyonu 

## 9. GELİŞMİŞ KULLANICI DENEYİMİ

### Egzersiz Keşif ve Liste Deneyimi
```typescript
interface ExerciseDiscovery {
  // Kişiselleştirilmiş Liste
  personalizedList: {
    recentExercises: Exercise[];
    recommendedExercises: Exercise[];
    favoriteExercises: Exercise[];
    sortingPreference: 'recent' | 'popular' | 'difficulty';
  };

  // Hızlı Önizleme
  previewFeatures: {
    thumbnailType: 'gif' | 'short-video';
    autoplayDuration: number;
    preloadStrategy: 'on-hover' | 'on-scroll' | 'manual';
  };

  // Akıllı Filtreleme
  smartFilters: {
    quickFilters: {
      name: string;
      criteria: {
        duration?: number;
        difficulty?: string;
        equipment?: string[];
        bodyPart?: string[];
      };
    }[];
    combinations: {
      popular: FilterCombination[];
      userPreferred: FilterCombination[];
    };
  };
}
```

### Detaylı Egzersiz Görünümü
```typescript
interface ExerciseDetail {
  // Üst Bölüm Bilgileri
  header: {
    title: string;
    thumbnail: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    rating: {
      score: number;
      totalVotes: number;
    };
    tags: string[];
  };

  // Video Oynatıcı ve Kontroller
  videoPlayer: {
    mainVideo: {
      url: string;
      quality: VideoQuality[];
      subtitles?: SubtitleTrack[];
      thumbnails: string[];  // Video timeline için
    };
    controls: {
      playbackSpeed: number[];
      loopSection: {
        start: number;
        end: number;
        active: boolean;
      };
      viewAngles?: string[];  // Farklı açılardan kayıtlar
      mirrorView: boolean;    // Görüntüyü yansıtma
    };
    progress: {
      watched: number;
      bookmarks: number[];
      notes: {
        timestamp: number;
        text: string;
      }[];
    };
  };

  // Adım Adım Talimatlar
  instructions: {
    steps: {
      order: number;
      title: string;
      description: string;
      image?: string;
      duration?: number;
      tips?: string[];
      commonMistakes?: string[];
      videoTimestamp: number;
    }[];
    preparation: {
      equipment: Equipment[];
      space: string;
      precautions: string[];
    };
    variations: {
      easier: Exercise[];
      harder: Exercise[];
      alternatives: Exercise[];
    };
  };

  // Kas ve Anatomi Bilgisi
  anatomy: {
    targetMuscles: {
      primary: Muscle[];
      secondary: Muscle[];
    };
    muscleMap: {
      highlighted: string[];
      intensity: 'high' | 'medium' | 'low';
    };
    jointMovements: {
      type: string;
      range: string;
      cautions: string[];
    }[];
  };

  // İlerleme ve Kayıt
  progressTracking: {
    todaySession: {
      sets: number;
      reps: number;
      weight?: number;
      duration: number;
      feedback: {
        difficulty: number;
        pain: number;
        notes: string;
      };
    };
    history: {
      lastSessions: Session[];
      improvements: {
        metric: string;
        change: number;
        trend: 'up' | 'down' | 'stable';
      }[];
      personalBests: Record[];
    };
    goals: {
      current: Goal[];
      achieved: Goal[];
      suggestions: Goal[];
    };
  };

  // Uzman Bilgileri
  expertInfo: {
    tips: {
      category: 'form' | 'breathing' | 'progression';
      content: string;
      importance: 'critical' | 'helpful' | 'optional';
    }[];
    modifications: {
      condition: string;
      adjustment: string;
      reason: string;
    }[];
    contraindications: {
      condition: string;
      risk: string;
      alternative: string;
    }[];
  };

  // Topluluk ve Geri Bildirim
  community: {
    reviews: {
      rating: number;
      comment: string;
      user: UserBasicInfo;
      date: Timestamp;
      helpful: number;
    }[];
    questions: {
      query: string;
      answers: Answer[];
      tags: string[];
    }[];
    successStories: {
      user: UserBasicInfo;
      before: ImageInfo;
      after: ImageInfo;
      story: string;
      duration: number;
    }[];
  };

  // İlgili İçerikler
  relatedContent: {
    similarExercises: Exercise[];
    nextInProgram?: Exercise;
    complementaryExercises: Exercise[];
    recommendedSequence: {
      before: Exercise[];
      after: Exercise[];
    };
  };

  // Güvenlik ve Uyarılar
  safetyGuidelines: {
    warnings: {
      type: 'posture' | 'breathing' | 'movement';
      message: string;
      severity: 'info' | 'warning' | 'critical';
    }[];
    formChecklist: {
      point: string;
      description: string;
      visualGuide: string;
    }[];
    emergencyStops: {
      condition: string;
      action: string;
      contact?: string;
    }[];
  };
}
```

## 10. MOTİVASYON SİSTEMİ

### Gamification Özellikleri
```typescript
interface GamificationSystem {
  // Bildirim Sistemi
  notifications: {
    reminders: {
      type: 'daily' | 'streak' | 'milestone';
      message: string;
      time: string;
      customizable: boolean;
    }[];
    achievements: {
      type: 'completion' | 'streak' | 'improvement';
      title: string;
      description: string;
      icon: string;
      reward?: Reward;
    }[];
  };

  // Challenge Sistemi
  challenges: {
    active: Challenge[];
    completed: Challenge[];
    available: Challenge[];
    custom: {
      title: string;
      duration: number;
      goals: Goal[];
      rewards: Reward[];
    }[];
  };
}
```

### İlerleme Görselleştirmesi
```typescript
interface ProgressVisualization {
  // Gelişmiş Grafikler
  charts: {
    type: 'muscle-development' | 'endurance' | 'flexibility';
    data: TimeSeriesData;
    comparison: {
      personal: PersonalRecord[];
      average: AverageMetric[];
    };
  };

  // Başarı Özetleri
  achievements: {
    personalBests: Record[];
    streaks: StreakData[];
    milestones: Milestone[];
    nextGoals: Goal[];
  };
}
```

## 11. PERFORMANS OPTİMİZASYONU

### Yükleme ve Önbellek Stratejisi
```typescript
interface LoadingStrategy {
  // Adaptif Video
  videoStreaming: {
    quality: {
      auto: boolean;
      levels: VideoQuality[];
      currentLevel: number;
    };
    caching: {
      strategy: 'aggressive' | 'conservative';
      maxSize: number;
      priority: 'recent' | 'popular' | 'custom';
    };
  };

  // Önbellek Yönetimi
  prefetchStrategy: {
    triggers: {
      onCategoryView: boolean;
      onSearch: boolean;
      onUserPattern: boolean;
    };
    limits: {
      maxConcurrent: number;
      maxSize: number;
      timeToLive: number;
    };
  };
}
```

### Akıllı Arama ve Keşif
```typescript
interface SmartDiscovery {
  // Sesli Komutlar
  voiceCommands: {
    supported: VoiceCommand[];
    customCommands: CustomCommand[];
    language: string[];
    accuracy: number;
  };

  // İlgili İçerik
  relatedContent: {
    similarExercises: {
      byMuscle: Exercise[];
      byEquipment: Exercise[];
      byDifficulty: Exercise[];
    };
    recommendations: {
      nextBest: Exercise[];
      alternative: Exercise[];
      progression: Exercise[];
    };
  };
}
```

## 1. KULLANICI GEREKSİNİMLERİ

### Hasta İhtiyaçları
- Görsel ve sesli egzersiz rehberleri
- Gerçek zamanlı form kontrolü
- Kişiselleştirilmiş zorluk seviyeleri
- İlerleme takibi ve motivasyon sistemi
- Offline kullanım desteği
- Hatırlatıcı bildirimler

### Fizyoterapist İhtiyaçları
- Program oluşturma ve düzenleme araçları
- Hasta uyum takibi
- Detaylı ilerleme raporları
- Uzaktan form düzeltme imkanı
- Toplu hasta yönetimi
- Otomatik raporlama sistemi

## 2. EGZERSİZ KATEGORİLERİ

### Rahatsızlık Bazlı
- Bel problemleri
- Boyun problemleri
- Omuz problemleri
- Diz problemleri
- Postür bozuklukları

### Seviye Bazlı
- Başlangıç seviyesi
- Orta seviye
- İleri seviye
- Profesyonel seviye

## 12. GELİŞTİRME ADIMLARI

### Hafta 3
1. Kullanıcı Deneyimi
   - [ ] Kullanıcı profili ve ayarları
   - [ ] İlerleme takibi ve motivasyon sistemi
   - [ ] İzleme ve analiz araçları

2. İşlevsellik Geliştirmeleri
   - [ ] Yeni egzersiz kategorileri
   - [ ] Yeni egzersiz türleri
   - [ ] Yeni özellikler ve işlevler

### Hafta 4
1. Test ve İzleme
   - [ ] Yeni işlevlerin testi
   - [ ] Kullanıcı deneyiminin izlenmesi
   - [ ] Performans ve güvenlik analizleri

2. Son Kullanıcı Deneyimi
   - [ ] Kullanıcı geri bildirimlerinin toplanması
   - [ ] Kullanıcı deneyiminin iyileştirilmesi
   - [ ] Son kullanıcı testleri

## 13. GELİŞMİŞ KULLANICI DENEYİMİ

### Egzersiz Keşif ve Liste Deneyimi
```typescript
interface ExerciseDiscovery {
  // Kişiselleştirilmiş Liste
  personalizedList: {
    recentExercises: Exercise[];
    recommendedExercises: Exercise[];
    favoriteExercises: Exercise[];
    sortingPreference: 'recent' | 'popular' | 'difficulty';
  };

  // Hızlı Önizleme
  previewFeatures: {
    thumbnailType: 'gif' | 'short-video';
    autoplayDuration: number;
    preloadStrategy: 'on-hover' | 'on-scroll' | 'manual';
  };

  // Akıllı Filtreleme
  smartFilters: {
    quickFilters: {
      name: string;
      criteria: {
        duration?: number;
        difficulty?: string;
        equipment?: string[];
        bodyPart?: string[];
      };
    }[];
    combinations: {
      popular: FilterCombination[];
      userPreferred: FilterCombination[];
    };
  };
}
```

### Detaylı Egzersiz Görünümü
```typescript
interface ExerciseDetail {
  // Üst Bölüm Bilgileri
  header: {
    title: string;
    thumbnail: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number;
    rating: {
      score: number;
      totalVotes: number;
    };
    tags: string[];
  };

  // Video Oynatıcı ve Kontroller
  videoPlayer: {
    mainVideo: {
      url: string;
      quality: VideoQuality[];
      subtitles?: SubtitleTrack[];
      thumbnails: string[];  // Video timeline için
    };
    controls: {
      playbackSpeed: number[];
      loopSection: {
        start: number;
        end: number;
        active: boolean;
      };
      viewAngles?: string[];  // Farklı açılardan kayıtlar
      mirrorView: boolean;    // Görüntüyü yansıtma
    };
    progress: {
      watched: number;
      bookmarks: number[];
      notes: {
        timestamp: number;
        text: string;
      }[];
    };
  };

  // Adım Adım Talimatlar
  instructions: {
    steps: {
      order: number;
      title: string;
      description: string;
      image?: string;
      duration?: number;
      tips?: string[];
      commonMistakes?: string[];
      videoTimestamp: number;
    }[];
    preparation: {
      equipment: Equipment[];
      space: string;
      precautions: string[];
    };
    variations: {
      easier: Exercise[];
      harder: Exercise[];
      alternatives: Exercise[];
    };
  };

  // Kas ve Anatomi Bilgisi
  anatomy: {
    targetMuscles: {
      primary: Muscle[];
      secondary: Muscle[];
    };
    muscleMap: {
      highlighted: string[];
      intensity: 'high' | 'medium' | 'low';
    };
    jointMovements: {
      type: string;
      range: string;
      cautions: string[];
    }[];
  };

  // İlerleme ve Kayıt
  progressTracking: {
    todaySession: {
      sets: number;
      reps: number;
      weight?: number;
      duration: number;
      feedback: {
        difficulty: number;
        pain: number;
        notes: string;
      };
    };
    history: {
      lastSessions: Session[];
      improvements: {
        metric: string;
        change: number;
        trend: 'up' | 'down' | 'stable';
      }[];
      personalBests: Record[];
    };
    goals: {
      current: Goal[];
      achieved: Goal[];
      suggestions: Goal[];
    };
  };

  // Uzman Bilgileri
  expertInfo: {
    tips: {
      category: 'form' | 'breathing' | 'progression';
      content: string;
      importance: 'critical' | 'helpful' | 'optional';
    }[];
    modifications: {
      condition: string;
      adjustment: string;
      reason: string;
    }[];
    contraindications: {
      condition: string;
      risk: string;
      alternative: string;
    }[];
  };

  // Topluluk ve Geri Bildirim
  community: {
    reviews: {
      rating: number;
      comment: string;
      user: UserBasicInfo;
      date: Timestamp;
      helpful: number;
    }[];
    questions: {
      query: string;
      answers: Answer[];
      tags: string[];
    }[];
    successStories: {
      user: UserBasicInfo;
      before: ImageInfo;
      after: ImageInfo;
      story: string;
      duration: number;
    }[];
  };

  // İlgili İçerikler
  relatedContent: {
    similarExercises: Exercise[];
    nextInProgram?: Exercise;
    complementaryExercises: Exercise[];
    recommendedSequence: {
      before: Exercise[];
      after: Exercise[];
    };
  };

  // Güvenlik ve Uyarılar
  safetyGuidelines: {
    warnings: {
      type: 'posture' | 'breathing' | 'movement';
      message: string;
      severity: 'info' | 'warning' | 'critical';
    }[];
    formChecklist: {
      point: string;
      description: string;
      visualGuide: string;
    }[];
    emergencyStops: {
      condition: string;
      action: string;
      contact?: string;
    }[];
  };
}
``` 