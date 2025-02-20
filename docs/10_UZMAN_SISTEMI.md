# UZMAN VE EĞİTİM SİSTEMİ

## 1. UZMAN YÖNETİMİ

### Uzman Profil Yönetimi
```typescript
// experts koleksiyonu
interface Expert {
  id: string;
  userId: string;
  personalInfo: {
    fullName: string;
    title: string;
    bio: string;
    photoURL: string;
    contactEmail: string;
    phoneNumber?: string;
  };
  professionalInfo: {
    specializations: string[];
    experience: number; // yıl
    education: {
      degree: string;
      institution: string;
      year: number;
    }[];
    certifications: {
      name: string;
      issuer: string;
      date: Timestamp;
      expiryDate?: Timestamp;
      verificationUrl?: string;
    }[];
    languages: {
      language: string;
      level: 'basic' | 'intermediate' | 'fluent' | 'native';
    }[];
  };
  verification: {
    status: 'pending' | 'verified' | 'rejected';
    documents: {
      type: string;
      url: string;
      uploadDate: Timestamp;
      verifiedAt?: Timestamp;
    }[];
    notes?: string;
  };
  practice: {
    availability: {
      schedule: {
        dayOfWeek: number;
        startTime: string; // "HH:mm"
        endTime: string; // "HH:mm"
      }[];
      exceptions: {
        date: Timestamp;
        available: boolean;
        reason?: string;
      }[];
    };
    consultation: {
      online: boolean;
      inPerson: boolean;
      locations?: {
        name: string;
        address: string;
        coordinates: {
          latitude: number;
          longitude: number;
        };
      }[];
    };
    pricing: {
      currency: string;
      rates: {
        type: 'initial' | 'followUp' | 'package';
        duration: number; // dakika
        price: number;
      }[];
    };
  };
  stats: {
    rating: number;
    reviewCount: number;
    consultationCount: number;
    successRate: number;
    responseRate: number;
  };
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastActive: Timestamp;
    status: 'active' | 'inactive' | 'suspended';
  };
}

// appointments koleksiyonu
interface Appointment {
  id: string;
  expertId: string;
  userId: string;
  type: 'initial' | 'followUp';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  datetime: {
    start: Timestamp;
    end: Timestamp;
  };
  mode: 'online' | 'inPerson';
  location?: {
    name: string;
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  payment: {
    amount: number;
    currency: string;
    status: 'pending' | 'completed' | 'refunded';
    transactionId?: string;
  };
  consultation: {
    reason?: string;
    notes?: string;
    attachments?: {
      type: string;
      url: string;
      name: string;
    }[];
    recommendations?: string[];
    followUpNeeded?: boolean;
  };
  feedback?: {
    rating: number;
    review?: string;
    anonymous: boolean;
    createdAt: Timestamp;
  };
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    cancelledAt?: Timestamp;
    cancelReason?: string;
  };
}

// expertReviews koleksiyonu
interface ExpertReview {
  id: string;
  expertId: string;
  userId: string;
  appointmentId: string;
  rating: number;
  review?: string;
  anonymous: boolean;
  helpful: number;
  reported: boolean;
  status: 'pending' | 'approved' | 'rejected';
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    moderatedAt?: Timestamp;
  };
}
```

## 2. RANDEVU SİSTEMİ

### Randevu Yönetimi
```typescript
interface AppointmentManager {
  checkAvailability(expertId: string, date: Date): Promise<TimeSlot[]>;
  createAppointment(data: Partial<Appointment>): Promise<string>;
  updateAppointment(id: string, updates: Partial<Appointment>): Promise<void>;
  cancelAppointment(id: string, reason: string): Promise<void>;
}

interface TimeSlot {
  start: string; // "HH:mm"
  end: string; // "HH:mm"
  available: boolean;
  price: number;
}
```

### Video Konsültasyon
```typescript
interface ConsultationRoom {
  id: string;
  appointmentId: string;
  participants: {
    userId: string;
    role: 'expert' | 'user';
    stream?: MediaStream;
  }[];
  status: 'waiting' | 'active' | 'ended';
  startTime: Date;
  endTime?: Date;
  recording?: boolean;
}

interface ConsultationService {
  createRoom(appointmentId: string): Promise<string>;
  joinRoom(roomId: string, role: 'expert' | 'user'): Promise<void>;
  leaveRoom(roomId: string): Promise<void>;
  toggleAudio(enabled: boolean): void;
  toggleVideo(enabled: boolean): void;
  shareScreen(enabled: boolean): void;
}
```

## 3. EĞİTİM VE BİLGİLENDİRME

### Uzman İçerik Yönetimi
```typescript
interface ExpertContent {
  // Uzman Eğitim İçerikleri
  content: {
    title: string;
    type: 'video' | 'article' | 'guide' | 'case-study';
    description: string;
    content: string;
    media?: {
      type: string;
      url: string;
    }[];
    tags: string[];
  };

  // İçerik Doğrulama
  verification: {
    status: 'draft' | 'review' | 'approved' | 'rejected';
    reviewedBy?: string;
    reviewDate?: Timestamp;
    comments?: string[];
  };

  // Etkileşim Metrikleri
  engagement: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    averageRating: number;
  };
}
```

### Eğitim Materyalleri
```typescript
interface EducationalMaterial {
  // Materyal Detayları
  details: {
    title: string;
    description: string;
    type: 'exercise' | 'technique' | 'theory' | 'research';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    duration: number; // dakika
  };

  // İçerik Yapısı
  content: {
    sections: {
      title: string;
      content: string;
      order: number;
    }[];
    resources: {
      type: string;
      url: string;
      description: string;
    }[];
  };

  // Öğrenim Hedefleri
  learningObjectives: {
    objectives: string[];
    prerequisites?: string[];
    outcomes: string[];
  };
}
```

### Vaka Çalışmaları
```typescript
interface CaseStudy {
  // Vaka Bilgileri
  case: {
    title: string;
    patientProfile: {
      age: number;
      gender: string;
      condition: string;
      history: string;
    };
    initialAssessment: {
      symptoms: string[];
      observations: string[];
      measurements: Record<string, number>;
    };
  };

  // Tedavi Süreci
  treatment: {
    approach: string;
    methodology: string;
    timeline: {
      phase: string;
      duration: string;
      activities: string[];
      outcomes: string[];
    }[];
  };

  // Sonuçlar ve Öğrenimler
  outcomes: {
    results: {
      metric: string;
      initial: number;
      final: number;
      improvement: string;
    }[];
    keyLearnings: string[];
    recommendations: string[];
  };
}
```

## 4. KALİTE KONTROL VE DEĞERLENDİRME

### Uzman Performans Değerlendirmesi
```typescript
interface ExpertEvaluation {
  // Performans Metrikleri
  metrics: {
    patientSatisfaction: number;
    treatmentSuccess: number;
    communicationQuality: number;
    timeManagement: number;
    documentationQuality: number;
  };

  // Geri Bildirimler
  feedback: {
    fromPatients: Review[];
    fromPeers: PeerReview[];
    fromSystem: SystemMetrics;
  };

  // Gelişim Planı
  developmentPlan: {
    areas: string[];
    goals: string[];
    timeline: string;
    resources: string[];
  };
}
```

### İçerik Kalite Kontrolü
```typescript
interface ContentQuality {
  // Kalite Kriterleri
  criteria: {
    accuracy: boolean;
    completeness: boolean;
    clarity: boolean;
    relevance: boolean;
    evidence: boolean;
  };

  // Değerlendirme Süreci
  review: {
    reviewers: string[];
    comments: string[];
    revisions: number;
    status: 'pending' | 'approved' | 'rejected';
  };

  // İyileştirme Önerileri
  improvements: {
    required: string[];
    suggested: string[];
    deadline?: Timestamp;
  };
}
```

## 5. DEĞERLENDİRME SİSTEMİ

### Review Yönetimi
```typescript
interface ReviewManager {
  submitReview(review: Partial<ExpertReview>): Promise<void>;
  updateReview(id: string, updates: Partial<ExpertReview>): Promise<void>;
  deleteReview(id: string): Promise<void>;
  reportReview(id: string, reason: string): Promise<void>;
}

interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    [key: number]: number; // 1-5 yıldız dağılımı
  };
  recentReviews: ExpertReview[];
}
```

## 6. GÜVENLİK

### Veri Erişimi
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /experts/{expertId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.userId;
    }
    match /appointments/{appointmentId} {
      allow read: if request.auth.uid in [resource.data.userId, resource.data.expertId];
      allow write: if request.auth.uid in [resource.data.userId, resource.data.expertId];
    }
    match /expertReviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth.uid == request.resource.data.userId;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 7. MONITORING

### Analytics Events
1. Uzman Metrikleri
   - expert_view
   - expert_contact
   - expert_book
   - consultation_complete

2. Randevu Metrikleri
   - appointment_created
   - appointment_completed
   - appointment_cancelled
   - consultation_duration

### Error Tracking
1. Randevu Hataları
   - booking_error
   - payment_error
   - consultation_error

2. Video Hataları
   - connection_error
   - stream_error
   - quality_issues

## 8. GELİŞTİRME ADIMLARI

### Hafta 1
1. Uzman Profil Sistemi
   - [ ] Profil oluşturma
   - [ ] Doğrulama sistemi
   - [ ] Takvim yönetimi

2. Randevu Sistemi
   - [ ] Randevu oluşturma
   - [ ] Ödeme entegrasyonu
   - [ ] Bildirim sistemi

### Hafta 2
1. Konsültasyon Sistemi
   - [ ] Video altyapısı
   - [ ] Chat sistemi
   - [ ] Dosya paylaşımı

2. Değerlendirme Sistemi
   - [ ] Review sistemi
   - [ ] Rating hesaplaması
   - [ ] Moderasyon araçları 