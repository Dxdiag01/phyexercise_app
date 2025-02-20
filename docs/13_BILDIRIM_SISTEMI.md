# BİLDİRİM SİSTEMİ

## 1. VERİTABANI YAPISI

### Firestore Koleksiyonları
```typescript
// notifications koleksiyonu
interface Notification {
  id: string;
  userId: string;
  type: 'exercise' | 'progress' | 'goal' | 'system' | 'social';
  title: string;
  body: string;
  data?: {
    [key: string]: any; // Dinamik veri
  };
  status: 'sent' | 'delivered' | 'read' | 'failed';
  priority: 'high' | 'default' | 'low';
  scheduling: {
    sendAt: Timestamp;
    expireAt?: Timestamp;
    recurring?: {
      frequency: 'daily' | 'weekly' | 'monthly';
      days?: number[]; // [1,3,5] for MWF
      time?: string; // "HH:mm"
      endDate?: Timestamp;
    };
  };
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    readAt?: Timestamp;
    deviceToken?: string;
    platform?: 'ios' | 'android';
  };
}

// notificationSettings koleksiyonu
interface NotificationSettings {
  userId: string;
  preferences: {
    exercises: {
      enabled: boolean;
      reminders: boolean;
      frequency: 'daily' | 'weekly' | 'custom';
      customDays?: number[];
      customTime?: string;
    };
    progress: {
      enabled: boolean;
      milestones: boolean;
      weeklyReport: boolean;
      monthlyReport: boolean;
    };
    goals: {
      enabled: boolean;
      reminders: boolean;
      achievements: boolean;
    };
    system: {
      enabled: boolean;
      updates: boolean;
      maintenance: boolean;
    };
    social: {
      enabled: boolean;
      mentions: boolean;
      comments: boolean;
      follows: boolean;
    };
    quiet: {
      enabled: boolean;
      start: string; // "HH:mm"
      end: string; // "HH:mm"
      timezone: string;
    };
  };
  devices: {
    token: string;
    platform: 'ios' | 'android';
    model: string;
    lastActive: Timestamp;
  }[];
}

// notificationTemplates koleksiyonu
interface NotificationTemplate {
  id: string;
  type: string;
  title: string;
  body: string;
  variables: string[]; // ["{userName}", "{exerciseName}"]
  localization: {
    [key: string]: {
      title: string;
      body: string;
    };
  };
  metadata: {
    category: string;
    priority: 'high' | 'default' | 'low';
    badge?: number;
    sound?: string;
  };
}
```

## 2. UYGULAMA MİMARİSİ

### Klasör Yapısı
```
src/
├── features/
│   └── notifications/
│       ├── components/
│       │   ├── NotificationList.tsx
│       │   ├── NotificationCard.tsx
│       │   ├── NotificationBadge.tsx
│       │   └── NotificationSettings.tsx
│       ├── screens/
│       │   ├── NotificationsScreen.tsx
│       │   └── NotificationSettingsScreen.tsx
│       ├── services/
│       │   ├── notification.service.ts
│       │   ├── fcm.service.ts
│       │   └── scheduler.service.ts
│       ├── hooks/
│       │   ├── useNotifications.ts
│       │   ├── useNotificationSettings.ts
│       │   └── usePushNotifications.ts
│       ├── store/
│       │   └── notificationSlice.ts
│       └── utils/
│           ├── notificationHelpers.ts
│           ├── templateEngine.ts
│           └── schedulingUtils.ts
```

### Temel Komponentler

#### NotificationCard
```typescript
interface NotificationCardProps {
  notification: Notification;
  onPress: () => void;
  onDismiss?: () => void;
  style?: ViewStyle;
}
```

#### NotificationSettings
```typescript
interface NotificationSettingsProps {
  settings: NotificationSettings;
  onUpdate: (settings: Partial<NotificationSettings>) => Promise<void>;
  loading?: boolean;
}
```

## 3. PUSH NOTIFICATION SİSTEMİ

### Firebase Cloud Messaging
```typescript
interface FCMConfig {
  apiKey: string;
  projectId: string;
  messagingSenderId: string;
  appId: string;
}

interface FCMMessage {
  token: string;
  notification: {
    title: string;
    body: string;
  };
  data?: {
    [key: string]: string;
  };
  android?: {
    priority: 'high' | 'normal';
    notification: {
      channelId: string;
      sound?: string;
      color?: string;
    };
  };
  apns?: {
    payload: {
      aps: {
        alert: {
          title: string;
          body: string;
        };
        badge?: number;
        sound?: string;
      };
    };
  };
}
```

### Bildirim Kanalları
1. Android Channels
```typescript
const notificationChannels = [
  {
    id: 'exercises',
    name: 'Egzersiz Bildirimleri',
    description: 'Egzersiz hatırlatıcıları ve güncellemeleri',
    importance: 'high',
    sound: true,
    vibration: true,
  },
  {
    id: 'progress',
    name: 'İlerleme Bildirimleri',
    description: 'İlerleme ve başarı bildirimleri',
    importance: 'default',
    sound: true,
    vibration: false,
  },
  // Diğer kanallar...
];
```

2. iOS Categories
```typescript
const notificationCategories = [
  {
    id: 'EXERCISE_REMINDER',
    actions: [
      {
        id: 'start',
        title: 'Başlat',
        options: ['foreground'],
      },
      {
        id: 'snooze',
        title: 'Ertele',
        options: ['destructive'],
      },
    ],
  },
  // Diğer kategoriler...
];
```

## 4. ZAMANLAMA SİSTEMİ

### Scheduler Service
```typescript
interface SchedulerJob {
  id: string;
  type: string;
  data: any;
  schedule: {
    type: 'once' | 'recurring';
    date?: Date;
    pattern?: string; // cron pattern
  };
}

class NotificationScheduler {
  scheduleNotification(job: SchedulerJob): Promise<void>;
  cancelNotification(jobId: string): Promise<void>;
  updateNotification(jobId: string, updates: Partial<SchedulerJob>): Promise<void>;
}
```

### Cron Patterns
```typescript
const cronPatterns = {
  daily: '0 {minute} {hour} * * *',
  weekly: '0 {minute} {hour} * * {dayOfWeek}',
  monthly: '0 {minute} {hour} {dayOfMonth} * *',
};
```

## 5. TEMPLATE SİSTEMİ

### Template Engine
```typescript
interface TemplateEngine {
  compile(template: string, variables: object): string;
  validateTemplate(template: string, requiredVariables: string[]): boolean;
}

const templateExamples = {
  exerciseReminder: {
    title: 'Egzersiz Zamanı!',
    body: 'Merhaba {userName}, {exerciseName} egzersizini yapma zamanı geldi.',
    variables: ['userName', 'exerciseName'],
  },
  goalAchieved: {
    title: 'Tebrikler!',
    body: '{goalName} hedefine ulaştın! {achievement} başarısını kazandın.',
    variables: ['goalName', 'achievement'],
  },
};
```

## 6. MONITORING

### Analytics Events
1. Bildirim Metrikleri
   - notification_sent
   - notification_delivered
   - notification_opened
   - notification_action
   - notification_dismissed

2. Engagement Metrikleri
   - open_rate
   - click_through_rate
   - opt_out_rate
   - delivery_rate

### Error Tracking
1. Delivery Errors
   - token_expired
   - invalid_token
   - network_error
   - rate_limit

2. Scheduling Errors
   - schedule_conflict
   - invalid_time
   - timezone_error

## 7. GÜVENLİK

### Token Yönetimi
```typescript
interface TokenManager {
  registerToken(userId: string, token: string, platform: string): Promise<void>;
  removeToken(token: string): Promise<void>;
  refreshToken(oldToken: string, newToken: string): Promise<void>;
  validateToken(token: string): boolean;
}
```

### Veri Güvenliği
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notifications/{notificationId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if false;
    }
    match /notificationSettings/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## 8. GELİŞTİRME ADIMLARI

### Hafta 1
1. Temel Altyapı
   - [ ] FCM kurulumu
   - [ ] Notification permissions
   - [ ] Token yönetimi

2. Bildirim Yönetimi
   - [ ] Bildirim gönderme
   - [ ] Bildirim listeleme
   - [ ] Bildirim ayarları

### Hafta 2
1. Zamanlama Sistemi
   - [ ] Scheduler service
   - [ ] Recurring notifications
   - [ ] Template engine

2. Monitoring
   - [ ] Analytics events
   - [ ] Error tracking
   - [ ] Performance monitoring 