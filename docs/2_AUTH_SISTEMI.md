# KULLANICI YÖNETİM SİSTEMİ

## 1. VERİTABANI YAPISI

### Firestore Koleksiyonları
```typescript
// users koleksiyonu
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  role: 'user' | 'expert' | 'admin';
  metadata: {
    createdAt: Timestamp;
    lastLoginAt: Timestamp;
    isEmailVerified: boolean;
    deviceTokens: string[];
  };
  profile: {
    age?: number;
    gender?: 'male' | 'female' | 'other';
    height?: number;
    weight?: number;
    fitnessLevel?: 'beginner' | 'intermediate' | 'advanced';
    healthConditions?: string[];
    goals?: string[];
  };
  preferences: {
    language: string;
    theme: 'light' | 'dark' | 'system';
    notifications: {
      exercises: boolean;
      progress: boolean;
      reminders: boolean;
      marketing: boolean;
    };
    privacySettings: {
      showProgress: boolean;
      showActivity: boolean;
      allowMessages: boolean;
    };
  };
  subscription?: {
    plan: 'free' | 'premium' | 'professional';
    startDate: Timestamp;
    endDate: Timestamp;
    status: 'active' | 'cancelled' | 'expired';
    features: string[];
  };
}

// userSessions koleksiyonu
interface UserSession {
  id: string;
  userId: string;
  deviceInfo: {
    platform: string;
    deviceId: string;
    appVersion: string;
    osVersion: string;
  };
  loginAt: Timestamp;
  lastActiveAt: Timestamp;
  ipAddress: string;
  location?: {
    country: string;
    city: string;
  };
}
```

## 2. UYGULAMA MİMARİSİ

### Klasör Yapısı
```
src/
├── features/
│   └── auth/
│       ├── components/
│       │   ├── LoginForm.tsx
│       │   ├── RegisterForm.tsx
│       │   ├── ForgotPasswordForm.tsx
│       │   ├── ProfileForm.tsx
│       │   └── SettingsForm.tsx
│       ├── screens/
│       │   ├── LoginScreen.tsx
│       │   ├── RegisterScreen.tsx
│       │   ├── ForgotPasswordScreen.tsx
│       │   ├── ProfileScreen.tsx
│       │   └── SettingsScreen.tsx
│       ├── services/
│       │   ├── auth.service.ts
│       │   └── user.service.ts
│       ├── hooks/
│       │   ├── useAuth.ts
│       │   ├── useProfile.ts
│       │   └── useSettings.ts
│       ├── store/
│       │   └── authSlice.ts
│       └── utils/
│           ├── validators.ts
│           └── formatters.ts
```

### Temel Komponentler

#### LoginForm
```typescript
interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  loading?: boolean;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}
```

#### ProfileForm
```typescript
interface ProfileFormProps {
  user: User;
  onUpdate: (data: Partial<User>) => Promise<void>;
  loading?: boolean;
}
```

## 3. ÖZELLİKLER VE AKIŞLAR

### Kayıt Süreci
1. Email/Şifre Kaydı
   - Form validasyonu
   - Firebase Auth kaydı
   - Kullanıcı dokümanı oluşturma
   - Hoşgeldin emaili

2. Sosyal Medya ile Kayıt
   - Google
   - Apple
   - Facebook

### Giriş Süreci
1. Email/Şifre Girişi
   - Form validasyonu
   - Firebase Auth girişi
   - Session yönetimi

2. Sosyal Medya ile Giriş
   - Mevcut hesap kontrolü
   - Hesap birleştirme
   - Profil senkronizasyonu

### Profil Yönetimi
1. Profil Güncelleme
   - Temel bilgiler
   - Sağlık bilgileri
   - Tercihler

2. Güvenlik Ayarları
   - Şifre değiştirme
   - Email değiştirme
   - İki faktörlü doğrulama

## 4. GÜVENLİK

### Firebase Auth Kuralları
```javascript
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'",
        ".write": "$uid === auth.uid || root.child('users').child(auth.uid).child('role').val() === 'admin'"
      }
    }
  }
}
```

### Güvenlik Önlemleri
1. Password Policies
   - Minimum 8 karakter
   - Büyük/küçük harf
   - Sayı ve özel karakter
   - Yaygın şifre kontrolü

2. Rate Limiting
   - Login denemeleri
   - Şifre sıfırlama
   - Email değişikliği

## 5. MONITORING

### Analytics Events
1. Kullanıcı Aktiviteleri
   - user_register
   - user_login
   - user_logout
   - profile_update

2. Hata Takibi
   - login_error
   - register_error
   - auth_error

## 6. GELİŞTİRME ADIMLARI

### Hafta 1
1. Temel Auth
   - [ ] Firebase Auth kurulumu
   - [ ] Login/Register ekranları
   - [ ] Form validasyonları

2. Profil Yönetimi
   - [ ] Profil ekranı
   - [ ] Ayarlar ekranı
   - [ ] Veri modeli

### Hafta 2
1. Sosyal Medya Auth
   - [ ] Google entegrasyonu
   - [ ] Apple entegrasyonu
   - [ ] Hesap birleştirme

2. Güvenlik
   - [ ] İki faktörlü doğrulama
   - [ ] Session yönetimi
   - [ ] Güvenlik kuralları 

## 7. MODERN AUTH PRATİKLERİ

### Biometrik Doğrulama
```typescript
interface BiometricAuth {
  // Biometrik Kontroller
  biometricCheck: {
    type: 'fingerprint' | 'faceId';
    fallback: 'pin' | 'password';
    timeout: number;
  };

  // Güvenli Depolama
  secureStorage: {
    tokens: {
      access: string;
      refresh: string;
      biometric: string;
    };
    credentials: {
      email: string;
      deviceId: string;
    };
  };
}

// Biometrik Auth Hook
const useBiometricAuth = () => {
  const checkBiometrics = async () => {
    const available = await LocalAuthentication.hasHardwareAsync();
    if (!available) return false;

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) return false;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Biyometrik doğrulama',
      fallbackLabel: 'PIN kullan'
    });

    return result.success;
  };

  return { checkBiometrics };
};
```

### Güvenli Token Yönetimi
```typescript
// Token Service
class TokenService {
  // Token Encryption
  private async encryptToken(token: string): Promise<string> {
    const key = await this.getEncryptionKey();
    return await this.encrypt(token, key);
  }

  // Secure Storage
  private async storeTokens(tokens: AuthTokens): Promise<void> {
    const encryptedAccess = await this.encryptToken(tokens.access);
    const encryptedRefresh = await this.encryptToken(tokens.refresh);

    await SecureStore.setItemAsync('access_token', encryptedAccess);
    await SecureStore.setItemAsync('refresh_token', encryptedRefresh);
  }

  // Auto Refresh
  private async refreshTokens(): Promise<AuthTokens> {
    const refreshToken = await this.getRefreshToken();
    return await this.authApi.refresh(refreshToken);
  }
}
```

## 8. GÜVENLİK ÖNLEMLERİ

### Güvenli Oturum Yönetimi
```typescript
interface SessionSecurity {
  // Oturum Kontrolleri
  sessionChecks: {
    maxInactiveDuration: number;
    deviceFingerprint: string;
    locationCheck: boolean;
    suspiciousActivityDetection: boolean;
  };

  // Güvenlik Politikaları
  securityPolicies: {
    passwordPolicy: PasswordPolicy;
    mfaPolicy: MFAPolicy;
    devicePolicy: DevicePolicy;
    activityLogging: LoggingPolicy;
  };
}

// Güvenlik Monitörü
class SecurityMonitor {
  // Şüpheli Aktivite Tespiti
  private detectSuspiciousActivity(activity: UserActivity): boolean {
    return (
      this.checkLocationAnomaly(activity.location) ||
      this.checkDeviceAnomaly(activity.device) ||
      this.checkBehaviorAnomaly(activity.behavior)
    );
  }

  // Otomatik Güvenlik Önlemleri
  private async handleSuspiciousActivity(activity: UserActivity): Promise<void> {
    if (this.detectSuspiciousActivity(activity)) {
      await this.enforceAdditionalAuth();
      await this.notifyUser();
      await this.logSecurityEvent(activity);
    }
  }
}
```

### Veri Güvenliği
```typescript
interface DataSecurity {
  // Veri Şifreleme
  encryption: {
    algorithm: 'AES-256-GCM';
    keyDerivation: 'PBKDF2';
    saltLength: number;
  };

  // Güvenli İletişim
  communication: {
    ssl: boolean;
    certificatePinning: boolean;
    requestSigning: boolean;
  };
}

// Veri Güvenlik Servisi
class DataSecurityService {
  // Hassas Veri Şifreleme
  private async encryptSensitiveData(data: any): Promise<string> {
    const key = await this.generateEncryptionKey();
    const iv = await this.generateIV();
    
    return await this.encrypt(data, key, iv);
  }

  // Güvenli Veri Transferi
  private async secureTransfer(data: any): Promise<void> {
    const encrypted = await this.encryptSensitiveData(data);
    const signature = await this.signData(encrypted);
    
    await this.sendSecureData(encrypted, signature);
  }
} 