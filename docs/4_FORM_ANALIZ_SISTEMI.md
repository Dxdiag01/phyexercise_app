# FORM ANALİZ SİSTEMİ

## 1. VERİTABANI YAPISI

### Firestore Koleksiyonları
```typescript
// formAnalysis koleksiyonu
interface FormAnalysis {
  id: string;
  userId: string;
  exerciseId: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  createdAt: Timestamp;
  analysis: {
    overallScore: number;
    keyPoints: {
      timestamp: number;
      score: number;
      feedback: string;
      screenshot?: string;
    }[];
    metrics: {
      angleAccuracy: number;
      movementSmoothing: number;
      tempo: number;
      rangeOfMotion: number;
    };
  };
  feedback: {
    strengths: string[];
    improvements: string[];
    recommendations: string[];
  };
  metadata: {
    deviceInfo: {
      platform: string;
      model: string;
      osVersion: string;
    };
    settings: {
      resolution: string;
      fps: number;
      quality: 'low' | 'medium' | 'high';
    };
  };
}

// formTemplates koleksiyonu
interface FormTemplate {
  id: string;
  exerciseId: string;
  name: string;
  description: string;
  keyPoints: {
    timestamp: number;
    description: string;
    targetAngles: {
      joint: string;
      min: number;
      max: number;
    }[];
    visualGuides: {
      type: 'line' | 'angle' | 'zone';
      points: Point[];
      color: string;
    }[];
  }[];
  requirements: {
    minResolution: string;
    minFps: number;
    cameraPosition: 'front' | 'side' | 'any';
    distance: {
      min: number;
      max: number;
      unit: 'cm' | 'm';
    };
  };
}

// Point type for coordinates
interface Point {
  x: number;
  y: number;
  confidence?: number;
}
```

## 2. UYGULAMA MİMARİSİ

### Klasör Yapısı
```
src/
├── features/
│   └── formAnalysis/
│       ├── components/
│       │   ├── CameraView.tsx
│       │   ├── PoseDetection.tsx
│       │   ├── AnalysisOverlay.tsx
│       │   ├── FeedbackDisplay.tsx
│       │   └── ResultsSummary.tsx
│       ├── screens/
│       │   ├── FormAnalysisScreen.tsx
│       │   ├── AnalysisResultScreen.tsx
│       │   └── HistoryScreen.tsx
│       ├── services/
│       │   ├── camera.service.ts
│       │   ├── poseDetection.service.ts
│       │   └── analysis.service.ts
│       ├── hooks/
│       │   ├── useCamera.ts
│       │   ├── usePoseDetection.ts
│       │   └── useAnalysis.ts
│       ├── store/
│       │   └── formAnalysisSlice.ts
│       └── utils/
│           ├── angleCalculations.ts
│           ├── poseProcessing.ts
│           └── videoProcessing.ts
```

### Temel Komponentler

#### CameraView
```typescript
interface CameraViewProps {
  onFrame: (frame: Frame) => void;
  resolution: {
    width: number;
    height: number;
  };
  fps: number;
  cameraPosition: 'front' | 'back';
}

interface Frame {
  uri: string;
  width: number;
  height: number;
  timestamp: number;
}
```

#### PoseDetection
```typescript
interface PoseDetectionProps {
  frame: Frame;
  template: FormTemplate;
  onPoseDetected: (pose: Pose) => void;
  onError: (error: Error) => void;
}

interface Pose {
  keypoints: {
    position: Point;
    part: string;
    score: number;
  }[];
  score: number;
}
```

## 3. TENSORFLOW LITE ENTEGRASYONU

### Model Yapılandırması
```typescript
interface ModelConfig {
  modelPath: string;
  numThreads: number;
  delegate: 'GPU' | 'NNAPI' | 'CPU';
  inputShape: number[];
  outputShape: number[];
}

const defaultConfig: ModelConfig = {
  modelPath: 'models/posenet_mobilenet_v1_100_257x257_multi_kpt_stripped.tflite',
  numThreads: 4,
  delegate: 'GPU',
  inputShape: [1, 257, 257, 3],
  outputShape: [1, 17, 17, 3]
};
```

### Model Optimizasyonu
1. Quantization
   - 8-bit integer quantization
   - Float16 quantization
   - Model pruning

2. Hardware Acceleration
   - GPU delegation
   - NNAPI (Android)
   - Core ML (iOS)

## 4. FORM ANALİZ ALGORİTMALARI

### Açı Hesaplamaları
```typescript
interface Joint {
  start: Point;
  middle: Point;
  end: Point;
}

function calculateAngle(joint: Joint): number {
  // Vector calculations
  const vector1 = {
    x: joint.start.x - joint.middle.x,
    y: joint.start.y - joint.middle.y
  };
  
  const vector2 = {
    x: joint.end.x - joint.middle.x,
    y: joint.end.y - joint.middle.y
  };
  
  // Angle calculation using dot product
  const dot = vector1.x * vector2.x + vector1.y * vector2.y;
  const mag1 = Math.sqrt(vector1.x * vector1.x + vector1.y * vector1.y);
  const mag2 = Math.sqrt(vector2.x * vector2.x + vector2.y * vector2.y);
  
  return Math.acos(dot / (mag1 * mag2)) * (180 / Math.PI);
}
```

### Hareket Analizi
1. Tempo Analizi
   - Frame başına hareket
   - Hareket hızı
   - Ritim tutarlılığı

2. ROM (Range of Motion) Analizi
   - Minimum açı
   - Maksimum açı
   - Hareket aralığı

3. Smoothness Analizi
   - Hareket düzgünlüğü
   - Titreme tespiti
   - Hız değişimi

## 5. PERFORMANS OPTİMİZASYONU

### Kamera Optimizasyonu
1. Frame Processing
   - Frame skipping
   - Resolution scaling
   - Buffer management

2. Memory Management
   - Frame pooling
   - Garbage collection
   - Memory leaks prevention

### Model Optimizasyonu
1. Inference Optimization
   - Batch processing
   - Threading
   - Delegate selection

2. Cache Strategy
   - Model caching
   - Result caching
   - Warm-up strategy

## 6. GÜVENLİK

### Veri Güvenliği
1. Video Storage
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /formAnalysis/{userId}/{videoId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

2. Analysis Data
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /formAnalysis/{analysisId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 7. MONITORING

### Performance Metrics
1. Camera Metrics
   - FPS
   - Frame drop rate
   - Resolution accuracy

2. Model Metrics
   - Inference time
   - Memory usage
   - Battery impact

### Error Tracking
1. Camera Errors
   - Permission errors
   - Hardware errors
   - Memory errors

2. Model Errors
   - Loading errors
   - Inference errors
   - Out of memory errors

## 8. GELİŞTİRME ADIMLARI

### Hafta 1
1. Kamera Sistemi
   - [ ] Kamera permissionları
   - [ ] Frame capture
   - [ ] Preview sistemi

2. TensorFlow Lite
   - [ ] Model entegrasyonu
   - [ ] Basic inference
   - [ ] Performance testing

### Hafta 2
1. Pose Detection
   - [ ] Keypoint detection
   - [ ] Confidence scoring
   - [ ] Real-time processing

2. Analysis System
   - [ ] Angle calculations
   - [ ] Movement analysis
   - [ ] Feedback generation 

## 1. FORM ANALİZ GEREKSİNİMLERİ

### Hasta Perspektifi
- Anlık form geri bildirimi
- Anlaşılır düzeltme önerileri
- Sesli komut desteği
- Basit ve kullanıcı dostu arayüz
- İlerleme göstergeleri
- Motivasyon mesajları

### Fizyoterapist Perspektifi
- Detaylı hareket analizi
- Açısal ölçümler
- İlerleme raporları
- Uzaktan düzeltme imkanı
- Hasta uyum takibi
- Video kayıt ve analiz

## 2. ANALİZ KRİTERLERİ

### Temel Ölçümler
- Eklem açıları
- Hareket hızı
- Hareket simetrisi
- Denge kontrolü
- Postür analizi
- ROM (Range of Motion)

### İleri Analizler
- Hareket kalitesi
- Kompansasyon hareketleri
- Kas aktivasyon sırası
- Ritim ve tempo
- Yorgunluk belirtileri 