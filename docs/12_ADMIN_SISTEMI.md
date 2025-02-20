# ADMİN PANELİ

## 1. VERİTABANI YAPISI

### Firestore Koleksiyonları
```typescript
// adminUsers koleksiyonu
interface AdminUser {
  id: string;
  email: string;
  role: 'superadmin' | 'admin' | 'moderator' | 'support';
  permissions: {
    users: Permission;
    content: Permission;
    experts: Permission;
    reports: Permission;
    settings: Permission;
  };
  status: 'active' | 'inactive' | 'suspended';
  metadata: {
    createdAt: Timestamp;
    lastLogin: Timestamp;
    lastAction: Timestamp;
  };
}

interface Permission {
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  approve: boolean;
}

// adminLogs koleksiyonu
interface AdminLog {
  id: string;
  adminId: string;
  action: string;
  targetType: 'user' | 'content' | 'expert' | 'setting';
  targetId: string;
  changes: {
    before: any;
    after: any;
  };
  metadata: {
    timestamp: Timestamp;
    ip: string;
    userAgent: string;
  };
}

// adminSettings koleksiyonu
interface AdminSettings {
  id: string;
  category: string;
  key: string;
  value: any;
  description?: string;
  type: 'string' | 'number' | 'boolean' | 'json';
  metadata: {
    updatedAt: Timestamp;
    updatedBy: string;
    version: number;
  };
}

// adminStats koleksiyonu
interface AdminStats {
  id: string;
  type: 'daily' | 'weekly' | 'monthly';
  date: string;
  metrics: {
    users: {
      total: number;
      new: number;
      active: number;
    };
    content: {
      posts: number;
      comments: number;
      reports: number;
    };
    experts: {
      total: number;
      active: number;
      consultations: number;
    };
    engagement: {
      views: number;
      likes: number;
      shares: number;
    };
  };
}
```

## 2. UYGULAMA MİMARİSİ

### Klasör Yapısı
```
src/
├── features/
│   └── admin/
│       ├── components/
│       │   ├── AdminLayout.tsx
│       │   ├── Sidebar.tsx
│       │   ├── DataTable.tsx
│       │   ├── StatsCard.tsx
│       │   └── ActionLog.tsx
│       ├── screens/
│       │   ├── DashboardScreen.tsx
│       │   ├── UsersScreen.tsx
│       │   ├── ContentScreen.tsx
│       │   ├── ExpertsScreen.tsx
│       │   └── SettingsScreen.tsx
│       ├── services/
│       │   ├── admin.service.ts
│       │   ├── stats.service.ts
│       │   └── log.service.ts
│       ├── hooks/
│       │   ├── useAdmin.ts
│       │   ├── useStats.ts
│       │   └── useLogs.ts
│       ├── store/
│       │   └── adminSlice.ts
│       └── utils/
│           ├── permissions.ts
│           ├── validation.ts
│           └── formatters.ts
```

### Temel Komponentler

#### DataTable
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: TableColumn[];
  onSort?: (column: string) => void;
  onFilter?: (filters: Filter[]) => void;
  onAction?: (action: string, item: T) => void;
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  };
}

interface TableColumn {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}
```

#### StatsCard
```typescript
interface StatsCardProps {
  title: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  period?: string;
  loading?: boolean;
}
```

## 3. YETKİLENDİRME SİSTEMİ

### Rol Yönetimi
```typescript
interface RoleManager {
  createRole(role: AdminRole): Promise<void>;
  updateRole(id: string, updates: Partial<AdminRole>): Promise<void>;
  assignRole(userId: string, roleId: string): Promise<void>;
  checkPermission(userId: string, action: string, resource: string): Promise<boolean>;
}

interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: {
    [resource: string]: Permission;
  };
  level: number; // hiyerarşi seviyesi
}
```

### İzin Kontrolleri
```typescript
const permissionChecks = {
  canManageUsers: (user: AdminUser) => 
    user.permissions.users.view && user.permissions.users.edit,
  
  canModerateContent: (user: AdminUser) =>
    user.permissions.content.view && user.permissions.content.approve,
  
  canManageExperts: (user: AdminUser) =>
    user.permissions.experts.view && user.permissions.experts.edit,
  
  canChangeSettings: (user: AdminUser) =>
    user.permissions.settings.view && user.permissions.settings.edit,
};
```

## 4. İSTATİSTİK VE RAPORLAMA

### Veri Analizi
```typescript
interface StatsManager {
  generateDailyStats(): Promise<AdminStats>;
  generateReport(options: ReportOptions): Promise<Report>;
  getMetrics(type: string, period: string): Promise<Metrics>;
}

interface ReportOptions {
  type: 'users' | 'content' | 'experts' | 'engagement';
  period: {
    start: Date;
    end: Date;
  };
  metrics: string[];
  groupBy?: 'day' | 'week' | 'month';
}

interface Report {
  title: string;
  period: string;
  data: any[];
  summary: {
    [key: string]: number;
  };
  charts: ChartData[];
}
```

### Dashboard Widgets
```typescript
interface DashboardWidget {
  id: string;
  type: 'stats' | 'chart' | 'list' | 'table';
  title: string;
  data: any;
  settings: {
    refresh: number; // saniye
    size: 'small' | 'medium' | 'large';
    position: number;
  };
}
```

## 5. İÇERİK YÖNETİMİ

### Moderasyon Araçları
```typescript
interface ModerationTools {
  reviewContent(contentId: string, action: ModAction): Promise<void>;
  batchModerate(contentIds: string[], action: ModAction): Promise<void>;
  getModHistory(contentId: string): Promise<ModAction[]>;
}

interface ModAction {
  type: 'approve' | 'reject' | 'flag' | 'delete';
  reason: string;
  notes?: string;
  duration?: number; // geçici eylemler için süre
}
```

### İçerik Filtreleme
```typescript
interface ContentFilters {
  keywords: string[];
  categories: string[];
  status: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}
```

## 6. GÜVENLİK

### Veri Erişimi
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /adminUsers/{userId} {
      allow read: if isAdmin();
      allow write: if isSuperAdmin();
    }
    match /adminLogs/{logId} {
      allow read: if isAdmin();
      allow write: if false; // Sadece server-side yazma
    }
    match /adminSettings/{settingId} {
      allow read: if isAdmin();
      allow write: if isSuperAdmin();
    }
  }
}
```

### Audit Logging
```typescript
interface AuditLogger {
  logAction(action: AdminAction): Promise<void>;
  getActionHistory(filters: LogFilters): Promise<AdminLog[]>;
  exportLogs(period: DateRange): Promise<string>; // CSV export
}

interface AdminAction {
  type: string;
  description: string;
  details: any;
  severity: 'low' | 'medium' | 'high';
}
```

## 7. MONITORING

### Analytics Events
1. Admin Aktiviteleri
   - admin_login
   - admin_action
   - setting_change
   - user_manage

2. Sistem Metrikleri
   - api_latency
   - error_rate
   - active_sessions
   - resource_usage

### Error Tracking
1. Sistem Hataları
   - permission_error
   - validation_error
   - api_error

2. Güvenlik Olayları
   - unauthorized_access
   - suspicious_activity
   - multiple_failures

## 8. GELİŞTİRME ADIMLARI

### Hafta 1
1. Temel Admin Paneli
   - [ ] Layout tasarımı
   - [ ] Yetkilendirme sistemi
   - [ ] CRUD işlemleri

2. Dashboard
   - [ ] İstatistik kartları
   - [ ] Grafikler
   - [ ] Aktivite logları

### Hafta 2
1. Kullanıcı Yönetimi
   - [ ] Kullanıcı listesi
   - [ ] Rol yönetimi
   - [ ] Eylem logları

2. İçerik Yönetimi
   - [ ] Moderasyon araçları
   - [ ] Toplu işlemler
   - [ ] Raporlama sistemi 