# TOPLULUK VE SOSYAL SİSTEM

## 1. TOPLULUK PLATFORMU

### Veritabanı Yapısı
```typescript
// posts koleksiyonu
interface Post {
  id: string;
  userId: string;
  type: 'story' | 'question' | 'achievement' | 'progress';
  content: {
    title?: string;
    text: string;
    media?: {
      type: 'image' | 'video';
      url: string;
      thumbnail?: string;
    }[];
    tags: string[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
  visibility: 'public' | 'followers' | 'private';
  status: 'active' | 'archived' | 'reported' | 'removed';
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    lastActivity: Timestamp;
  };
}

// comments koleksiyonu
interface Comment {
  id: string;
  postId: string;
  userId: string;
  parentId?: string;
  content: string;
  likes: number;
  status: 'active' | 'removed';
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
    editedAt?: Timestamp;
  };
}

// groups koleksiyonu
interface Group {
  id: string;
  name: string;
  description: string;
  coverImage?: string;
  type: 'public' | 'private' | 'secret';
  category: string;
  rules: string[];
  members: {
    count: number;
    roles: {
      [userId: string]: 'admin' | 'moderator' | 'member';
    };
  };
  settings: {
    postApproval: boolean;
    memberApproval: boolean;
    allowInvites: boolean;
    contentTypes: ('post' | 'question' | 'event')[];
  };
  metadata: {
    createdAt: Timestamp;
    createdBy: string;
    updatedAt: Timestamp;
    lastActivity: Timestamp;
  };
}

// userConnections koleksiyonu
interface UserConnection {
  id: string;
  followerId: string;
  followingId: string;
  status: 'pending' | 'accepted' | 'blocked';
  metadata: {
    createdAt: Timestamp;
    updatedAt: Timestamp;
  };
}

// reports koleksiyonu
interface Report {
  id: string;
  reporterId: string;
  targetType: 'post' | 'comment' | 'user' | 'group';
  targetId: string;
  reason: string;
  details?: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  metadata: {
    createdAt: Timestamp;
    reviewedAt?: Timestamp;
    reviewedBy?: string;
    resolution?: string;
  };
}
```

### Sosyal Etkileşimler
```typescript
interface SocialInteractions {
  // Kullanıcı Etkileşimleri
  interactions: {
    likes: Like[];
    comments: Comment[];
    shares: Share[];
    saves: Save[];
  };

  // Bağlantılar
  connections: {
    friends: Friend[];
    followers: Follower[];
    blocking: BlockedUser[];
  };

  // Bildirimler
  notifications: {
    type: 'like' | 'comment' | 'follow' | 'mention';
    actor: User;
    target: ContentType;
    read: boolean;
    createdAt: Timestamp;
  }[];
}
```

## 2. İÇERİK YÖNETİMİ

### Paylaşım Sistemi
```typescript
interface ContentManagement {
  // İçerik Tipleri
  content: {
    type: 'post' | 'story' | 'achievement' | 'question';
    text: string;
    media?: Media[];
    tags: string[];
    visibility: 'public' | 'friends' | 'private';
  };

  // Moderasyon
  moderation: {
    status: 'active' | 'pending' | 'rejected';
    reports: Report[];
    actions: ModAction[];
  };
}
```

### Başarı Hikayeleri
```typescript
interface SuccessStory {
  // Hikaye Detayları
  details: {
    title: string;
    journey: string;
    duration: string;
    challenges: string[];
    outcomes: string[];
  };

  // Doğrulama
  verification: {
    expert: Expert;
    proofs: Proof[];
    status: 'verified' | 'pending';
  };

  // Etkileşim
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    inspiration: number;
  };
}
```

## 3. GRUP YÖNETİMİ

### Grup Yapısı
```typescript
interface Group {
  // Temel Bilgiler
  info: {
    name: string;
    description: string;
    type: 'public' | 'private';
    category: string;
    rules: string[];
  };

  // Üyelik
  membership: {
    members: Member[];
    roles: {
      admins: string[];
      moderators: string[];
      members: string[];
    };
    requests: JoinRequest[];
  };

  // Aktiviteler
  activities: {
    posts: Post[];
    events: Event[];
    announcements: Announcement[];
  };
}
```

## 4. ETKİLEŞİM VE MOTİVASYON

### Başarı Sistemi
```typescript
interface AchievementSystem {
  // Rozetler ve Seviyeler
  progression: {
    level: number;
    experience: number;
    badges: Badge[];
    achievements: Achievement[];
  };

  // Meydan Okumalar
  challenges: {
    active: Challenge[];
    completed: Challenge[];
    rewards: Reward[];
  };

  // Liderlik Tablosu
  leaderboard: {
    global: Ranking[];
    friends: Ranking[];
    weekly: Ranking[];
  };
}
```

## 5. TOPLULUK ANALİTİĞİ

### Performans Metrikleri
```typescript
interface CommunityAnalytics {
  // Etkileşim Metrikleri
  engagement: {
    activeUsers: number;
    postFrequency: number;
    responseTime: number;
    retentionRate: number;
  };

  // İçerik Analizi
  content: {
    popularTopics: Topic[];
    trendingPosts: Post[];
    contentQuality: QualityMetrics;
  };

  // Topluluk Sağlığı
  health: {
    toxicityLevel: number;
    reportFrequency: number;
    moderationEfficiency: number;
    memberSatisfaction: number;
  };
}
```

## 6. UYGULAMA MİMARİSİ

### Klasör Yapısı
```
src/
├── features/
│   └── community/
│       ├── components/
│       │   ├── PostCard.tsx
│       │   ├── CommentList.tsx
│       │   ├── GroupCard.tsx
│       │   ├── UserList.tsx
│       │   └── ContentEditor.tsx
│       ├── screens/
│       │   ├── FeedScreen.tsx
│       │   ├── PostDetailScreen.tsx
│       │   ├── GroupScreen.tsx
│       │   ├── GroupListScreen.tsx
│       │   └── UserProfileScreen.tsx
│       ├── services/
│       │   ├── post.service.ts
│       │   ├── group.service.ts
│       │   └── moderation.service.ts
│       ├── hooks/
│       │   ├── usePosts.ts
│       │   ├── useComments.ts
│       │   └── useGroups.ts
│       ├── store/
│       │   └── communitySlice.ts
│       └── utils/
│           ├── contentFormatter.ts
│           ├── moderationRules.ts
│           └── engagement.ts
```

### Temel Komponentler

#### PostCard
```typescript
interface PostCardProps {
  post: Post;
  onPress: () => void;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  showActions?: boolean;
  style?: ViewStyle;
}
```

#### ContentEditor
```typescript
interface ContentEditorProps {
  initialContent?: string;
  onSubmit: (content: PostContent) => Promise<void>;
  allowedMedia?: ('image' | 'video')[];
  maxMediaCount?: number;
  placeholder?: string;
  loading?: boolean;
}

interface PostContent {
  text: string;
  media?: File[];
  tags: string[];
}
```

## 7. İÇERİK YÖNETİMİ

### İçerik Oluşturma
```typescript
interface ContentManager {
  createPost(content: PostContent): Promise<string>;
  updatePost(id: string, updates: Partial<Post>): Promise<void>;
  deletePost(id: string): Promise<void>;
  moderatePost(id: string, action: ModerateAction): Promise<void>;
}

type ModerateAction = {
  type: 'approve' | 'reject' | 'flag' | 'remove';
  reason?: string;
  duration?: number; // geçici kaldırma için süre (saat)
};
```

### Medya İşleme
```typescript
interface MediaProcessor {
  uploadMedia(file: File, type: 'image' | 'video'): Promise<string>;
  generateThumbnail(mediaUrl: string): Promise<string>;
  optimizeMedia(mediaUrl: string, options: OptimizeOptions): Promise<string>;
}

interface OptimizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}
```

## 8. ETKİLEŞİM SİSTEMİ

### Engagement Tracking
```typescript
interface EngagementTracker {
  trackView(postId: string): Promise<void>;
  trackLike(postId: string): Promise<void>;
  trackShare(postId: string, platform: string): Promise<void>;
  trackSave(postId: string): Promise<void>;
}

interface EngagementStats {
  views: number;
  uniqueViews: number;
  likes: number;
  shares: {
    total: number;
    platforms: {
      [platform: string]: number;
    };
  };
  engagement: number; // engagement rate
}
```

### Bildirim Entegrasyonu
```typescript
interface SocialNotification {
  type: 'like' | 'comment' | 'mention' | 'follow' | 'groupInvite';
  actor: {
    id: string;
    name: string;
    avatar: string;
  };
  target: {
    type: 'post' | 'comment' | 'user' | 'group';
    id: string;
    preview?: string;
  };
  metadata: {
    createdAt: Timestamp;
    read: boolean;
  };
}
```

## 9. MODERASYON SİSTEMİ

### İçerik Filtreleme
```typescript
interface ContentFilter {
  checkText(text: string): Promise<FilterResult>;
  checkMedia(mediaUrl: string): Promise<FilterResult>;
  checkUser(userId: string): Promise<UserTrust>;
}

interface FilterResult {
  safe: boolean;
  score: number;
  flags: {
    spam?: boolean;
    offensive?: boolean;
    inappropriate?: boolean;
  };
  action?: 'approve' | 'review' | 'reject';
}

interface UserTrust {
  score: number;
  level: 'new' | 'trusted' | 'verified' | 'flagged';
  flags: string[];
}
```

### Raporlama Sistemi
```typescript
interface ReportManager {
  submitReport(report: Partial<Report>): Promise<void>;
  reviewReport(id: string, decision: ReportDecision): Promise<void>;
  getReportHistory(targetId: string): Promise<Report[]>;
}

interface ReportDecision {
  action: 'approve' | 'dismiss' | 'ban';
  reason: string;
  duration?: number; // ban süresi (gün)
}
```

## 10. GÜVENLİK

### Veri Erişimi
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if isPublicPost() || isGroupMember() || isOwner();
      allow write: if isOwner() || isModerator();
    }
    match /comments/{commentId} {
      allow read: if canViewParentPost();
      allow write: if request.auth != null;
    }
    match /groups/{groupId} {
      allow read: if isPublicGroup() || isGroupMember();
      allow write: if isGroupAdmin();
    }
  }
}
```

## 11. MONITORING

### Analytics Events
1. İçerik Metrikleri
   - post_create
   - post_view
   - post_engage
   - content_share

2. Topluluk Metrikleri
   - group_join
   - group_activity
   - user_connection
   - moderation_action

### Error Tracking
1. İçerik Hataları
   - upload_error
   - processing_error
   - moderation_error

2. Etkileşim Hataları
   - engagement_error
   - notification_error
   - report_error

## 12. GELİŞTİRME ADIMLARI

### Hafta 1
1. Temel İçerik Sistemi
   - [ ] Post oluşturma
   - [ ] Medya yükleme
   - [ ] Feed sistemi

2. Etkileşim Sistemi
   - [ ] Like/Comment
   - [ ] Share sistemi
   - [ ] Bildirimler

### Hafta 2
1. Grup Sistemi
   - [ ] Grup oluşturma
   - [ ] Üyelik yönetimi
   - [ ] İçerik yönetimi

2. Moderasyon Sistemi
   - [ ] İçerik filtreleme
   - [ ] Raporlama sistemi
   - [ ] Moderatör araçları 