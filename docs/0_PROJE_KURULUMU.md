# PROJE KURULUMU VE TEMEL ALTYAPI

## 1. GELİŞTİRME ORTAMI

### Gerekli Araçlar
```bash
# Node.js ve npm versiyonları
node >= 18.0.0
npm >= 9.0.0

# Global paketler
react-native-cli
expo-cli
typescript
```

### IDE Kurulumu
- VS Code Extensions
  - ESLint
  - Prettier
  - TypeScript
  - React Native Tools
  - GitLens

### Environment Kurulumu
```bash
# Development
REACT_APP_ENV=development
API_URL=http://localhost:3000
FIREBASE_CONFIG={...}

# Production
REACT_APP_ENV=production
API_URL=https://api.fiziktedavi.com
FIREBASE_CONFIG={...}
```

## 2. PROJE MİMARİSİ

### Klasör Yapısı
```
src/
├── assets/          # Statik dosyalar
├── components/      # Shared components
├── config/          # Konfigürasyon dosyaları
├── features/        # Feature-based modüller
├── hooks/           # Custom hooks
├── navigation/      # Router ve navigation
├── services/        # API ve servisler
├── store/          # State management
├── theme/          # UI theme sistemi
├── types/          # TypeScript types
└── utils/          # Utility fonksiyonları
```

### Core Paketler
```json
{
  "dependencies": {
    "react-native": "^0.72.0",
    "expo": "^49.0.0",
    "firebase": "^10.0.0",
    "react-navigation": "^6.0.0",
    "redux-toolkit": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

## 3. TEMEL ALTYAPI SİSTEMLERİ

### Theme Sistemi
```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    // ...
  };
  typography: {
    h1: TextStyle;
    body: TextStyle;
    // ...
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    // ...
  };
}
```

### Error Handling
```typescript
interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorResponse {
  code: string;
  message: string;
  details?: any;
}
```

### Network Katmanı
```typescript
interface ApiClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<T>;
  delete<T>(url: string, config?: RequestConfig): Promise<T>;
}
```

## 4. CI/CD PIPELINE

### GitHub Actions Workflow
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install dependencies
      - name: Run tests
      - name: Build
```

### Quality Gates
- Test coverage > 80%
- No critical sonar issues
- All e2e tests passing
- Bundle size limits
- Performance metrics

## 5. GIT WORKFLOW

### Branch Stratejisi
- main: Production branch
- develop: Development branch
- feature/*: Yeni özellikler
- bugfix/*: Bug fixes
- release/*: Release hazırlıkları

### Commit Conventions
```
feat: Yeni özellik
fix: Bug fix
docs: Dokümantasyon
style: Kod stili
refactor: Kod refactoring
test: Test ekleme/güncelleme
chore: Tooling, config vs.
```

## 6. MONITORING VE ANALYTICS

### Error Tracking
- Sentry.io kurulumu
- Error grouping
- Performance monitoring
- Release tracking

### Analytics
- Firebase Analytics
- Custom events
- User properties
- Conversion tracking

## 7. DEPLOYMENT

### App Store
- Certificates
- Provisioning profiles
- App Store Connect setup
- TestFlight

### Play Store
- Keystore
- Google Play Console
- Internal testing
- Staged rollouts 

## 8. GELİŞTİRME ARAÇLARI VE KALİTE KONTROL

### Kod Kalitesi
```typescript
// Husky Konfigürasyonu
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md}": [
      "prettier --write"
    ]
  }
}
```

### Network Katmanı
```typescript
// Axios Konfigürasyonu
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// React Query Setup
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000
    }
  }
});
```

### Performance Monitoring
```typescript
// Sentry Konfigürasyonu
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.ReactNativeTracing()
  ]
});

// LogRocket Setup
LogRocket.init('app/id');
LogRocket.identify('USER_ID', {
  name: 'User Name',
  email: 'user@email.com'
});
```

## 9. PERFORMANS OPTİMİZASYONU

### Bundle Size Optimizasyonu
- Code splitting
- Tree shaking
- Dynamic imports
- Asset optimization

### Runtime Performans
- Memo ve useMemo kullanımı
- Virtual list implementasyonu
- Image lazy loading
- Service worker cache

### Network Optimizasyonu
- API response caching
- Prefetching
- Progressive image loading
- Offline first yaklaşımı 