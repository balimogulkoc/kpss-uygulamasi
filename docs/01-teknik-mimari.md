# Teknik Mimari — KPSS Hazırlık Uygulaması

**Doküman:** 01 / 09  
**Konu:** Frontend ve Backend Teknoloji Seçimleri  
**Versiyon:** 1.0

---

## 1. Genel Mimari Yaklaşımı

### Modüler Monolit (Başlangıç Fazı)

Uygulama başlangıçta mikroservis mimarisi yerine **modüler monolit** yaklaşımıyla geliştirilecektir.

**Gerekçe:**
- Küçük ekip için daha hızlı geliştirme döngüsü
- Daha düşük operasyonel karmaşıklık ve maliyet
- Kullanıcı tabanı büyüdükçe mikroservislere kademeli geçiş imkânı
- Ortak veritabanı ile tutarlı veri yönetimi

**Geçiş Planı (Ay 12+):**
Kullanıcı sayısı 500.000'i aştığında, yüksek yük altındaki modüller (soru servisi, analitik servisi) ayrı mikroservislere taşınacaktır.

---

## 2. Frontend — React Native (Expo)

### 2.1 Teknoloji Seçim Gerekçesi

| Kriter | React Native | Flutter | Native (iOS+Android) |
|--------|-------------|---------|----------------------|
| Tek kod tabanı | ✅ | ✅ | ❌ |
| Türkiye'de geliştirici havuzu | Geniş | Orta | Geniş |
| Ekosistem olgunluğu | Yüksek | Orta | Çok Yüksek |
| Performans | İyi | Çok İyi | Mükemmel |
| Geliştirme hızı | Hızlı | Orta | Yavaş |
| Maliyet | Düşük | Düşük | Yüksek |

React Native, Türkiye'deki Android ağırlıklı kullanıcı kitlesine (%72 Android, %28 iOS) uygun, maliyet-etkin ve hızlı geliştirme imkânı sunan en uygun seçenektir.

### 2.2 Expo Managed Workflow

Expo Managed Workflow tercih edilmesinin nedenleri:
- OTA (Over-the-Air) güncellemeler — App Store onayı beklemeden küçük güncellemeler
- EAS Build ile bulut tabanlı derleme
- Expo Go ile hızlı prototipleme
- Yerleşik kütüphane desteği (kamera, bildirim, konum vb.)

### 2.3 Temel Kütüphane Yığını

```
Navigasyon:
└── React Navigation v6
    ├── Stack Navigator (ekran geçişleri)
    ├── Bottom Tab Navigator (ana menü)
    └── Drawer Navigator (yan menü)

State Yönetimi:
├── Redux Toolkit (global uygulama durumu)
│   ├── Auth slice
│   ├── User slice
│   ├── Exam slice
│   └── Settings slice
└── React Query v5 (sunucu durumu, cache)
    ├── Soru listesi sorguları
    ├── Analitik verileri
    └── İçerik sorguları

Offline Depolama:
├── WatermelonDB (SQLite üstünde reaktif ORM)
│   ├── Sorular tablosu
│   ├── Kullanıcı cevapları
│   └── İndirilen içerikler
└── React Native MMKV (hızlı key-value)
    ├── Kullanıcı tercihleri
    ├── Auth token'ları
    └── Uygulama ayarları

Medya:
├── react-native-video (video oynatıcı)
│   ├── ExoPlayer (Android)
│   └── AVPlayer (iOS)
└── react-native-pdf (PDF görüntüleyici)

UI & Animasyon:
├── React Native Reanimated v3 (performanslı animasyonlar)
├── Lottie (JSON animasyonları — rozet, başarı ekranları)
└── React Native Skia (özel grafik çizimi)

Grafikler:
├── Victory Native (çizgi, çubuk, radar grafikleri)
└── React Native Skia Charts (ısı haritası)

Form & Validasyon:
├── React Hook Form (form yönetimi)
└── Zod (şema validasyonu)

Ağ:
├── Axios (HTTP istemci)
└── React Query (cache, refetch, optimistic updates)

Bildirimler:
├── Expo Notifications (yerel bildirimler)
└── Firebase Cloud Messaging (push bildirimler)

Ödeme:
└── react-native-iap (In-App Purchase)
    ├── Apple StoreKit
    └── Google Play Billing

Analitik & İzleme:
├── Firebase Analytics (kullanıcı davranışı)
├── Mixpanel (funnel analizi)
└── Sentry (hata takibi)
```

### 2.4 Proje Klasör Yapısı

```
src/
├── api/
│   ├── client.ts              → Axios instance, interceptor'lar
│   ├── auth.api.ts            → Auth endpoint'leri
│   ├── questions.api.ts       → Soru endpoint'leri
│   ├── exams.api.ts           → Sınav endpoint'leri
│   ├── analytics.api.ts       → Analitik endpoint'leri
│   └── subscriptions.api.ts   → Abonelik endpoint'leri
│
├── assets/
│   ├── images/                → PNG, JPG görseller
│   ├── fonts/                 → Inter font ailesi
│   ├── animations/            → Lottie JSON dosyaları
│   └── icons/                 → SVG ikonlar
│
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── EmptyState.tsx
│   ├── question/
│   │   ├── QuestionCard.tsx
│   │   ├── OptionButton.tsx
│   │   ├── SolutionView.tsx
│   │   └── QuestionTimer.tsx
│   ├── exam/
│   │   ├── ExamHeader.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuestionNavigator.tsx
│   │   └── ExamResultCard.tsx
│   └── analytics/
│       ├── RadarChart.tsx
│       ├── HeatMap.tsx
│       ├── TrendChart.tsx
│       └── StatCard.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useQuestions.ts
│   ├── useExam.ts
│   ├── useAnalytics.ts
│   ├── useOffline.ts
│   └── useNotifications.ts
│
├── navigation/
│   ├── RootNavigator.tsx
│   ├── AuthNavigator.tsx
│   ├── MainTabNavigator.tsx
│   └── types.ts
│
├── screens/
│   ├── auth/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── onboarding/
│   │   ├── WelcomeScreen.tsx
│   │   ├── CategorySelectScreen.tsx
│   │   ├── ExamDateScreen.tsx
│   │   └── LevelTestScreen.tsx
│   ├── home/
│   │   └── HomeScreen.tsx
│   ├── content/
│   │   ├── TopicListScreen.tsx
│   │   ├── TopicDetailScreen.tsx
│   │   └── VideoPlayerScreen.tsx
│   ├── questions/
│   │   ├── QuestionBankScreen.tsx
│   │   ├── QuestionSolveScreen.tsx
│   │   └── SolutionScreen.tsx
│   ├── exams/
│   │   ├── ExamListScreen.tsx
│   │   ├── ExamSessionScreen.tsx
│   │   └── ExamResultScreen.tsx
│   ├── analytics/
│   │   └── AnalyticsDashboardScreen.tsx
│   ├── profile/
│   │   ├── ProfileScreen.tsx
│   │   └── SettingsScreen.tsx
│   └── premium/
│       ├── PremiumScreen.tsx
│       └── PaymentScreen.tsx
│
├── store/
│   ├── index.ts               → Redux store konfigürasyonu
│   ├── auth.slice.ts
│   ├── user.slice.ts
│   ├── exam.slice.ts
│   └── settings.slice.ts
│
├── services/
│   ├── auth.service.ts
│   ├── exam.service.ts        → Puanlama algoritması
│   ├── analytics.service.ts   → Performans hesaplama
│   ├── notification.service.ts
│   └── offline.service.ts     → WatermelonDB işlemleri
│
├── utils/
│   ├── formatters.ts          → Tarih, sayı formatlama
│   ├── validators.ts          → Form validasyon kuralları
│   ├── constants.ts           → Uygulama sabitleri
│   └── helpers.ts             → Genel yardımcı fonksiyonlar
│
├── constants/
│   ├── colors.ts              → Renk paleti
│   ├── typography.ts          → Font boyutları
│   ├── spacing.ts             → Boşluk değerleri
│   └── api.ts                 → API URL'leri
│
└── types/
    ├── auth.types.ts
    ├── question.types.ts
    ├── exam.types.ts
    ├── analytics.types.ts
    └── api.types.ts
```

---

## 3. Backend — Node.js / NestJS

### 3.1 Teknoloji Seçim Gerekçesi

NestJS, TypeScript tabanlı, Angular'dan ilham alan modüler bir Node.js framework'üdür.

**Avantajları:**
- Güçlü Dependency Injection sistemi
- Modüler mimari (her özellik kendi modülünde)
- Yerleşik test desteği (Jest entegrasyonu)
- OpenAPI/Swagger otomatik dokümantasyon
- Geniş ekosistem (Guards, Interceptors, Pipes)
- TypeScript ile tam tip güvenliği

### 3.2 API Katmanları

```
REST API (ana iletişim protokolü)
├── /api/v1/auth          → Kimlik doğrulama
├── /api/v1/users         → Kullanıcı yönetimi
├── /api/v1/categories    → Sınav kategorileri
├── /api/v1/subjects      → Dersler
├── /api/v1/topics        → Konular
├── /api/v1/questions     → Soru bankası
├── /api/v1/exams         → Deneme sınavları
├── /api/v1/analytics     → Performans verileri
├── /api/v1/notifications → Bildirimler
└── /api/v1/subscriptions → Abonelik yönetimi

GraphQL API (içerik sorgulama)
└── /graphql
    ├── Query: topics, questions, content
    └── Mutation: userAnswer, examSession

WebSocket (gerçek zamanlı)
└── /ws
    ├── exam-session      → Canlı sınav oturumu
    └── notifications     → Anlık bildirimler
```

### 3.3 Backend Modül Yapısı

```
src/
├── app.module.ts              → Ana modül
├── main.ts                    → Uygulama başlangıç noktası
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/
│   │   ├── jwt.strategy.ts
│   │   └── google.strategy.ts
│   └── guards/
│       ├── jwt-auth.guard.ts
│       └── roles.guard.ts
│
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── questions/
│   ├── questions.module.ts
│   ├── questions.controller.ts
│   ├── questions.service.ts
│   └── dto/
│
├── exams/
│   ├── exams.module.ts
│   ├── exams.controller.ts
│   ├── exams.service.ts
│   ├── scoring.service.ts     → Puanlama algoritması
│   └── dto/
│
├── analytics/
│   ├── analytics.module.ts
│   ├── analytics.controller.ts
│   ├── analytics.service.ts
│   └── percentile.service.ts  → Yüzdelik dilim hesaplama
│
├── notifications/
│   ├── notifications.module.ts
│   ├── notifications.service.ts
│   └── fcm.service.ts         → Firebase Cloud Messaging
│
├── subscriptions/
│   ├── subscriptions.module.ts
│   ├── subscriptions.controller.ts
│   ├── subscriptions.service.ts
│   ├── iyzico.service.ts      → iyzico ödeme entegrasyonu
│   └── iap.service.ts         → Apple/Google IAP doğrulama
│
├── search/
│   ├── search.module.ts
│   └── elasticsearch.service.ts
│
├── admin/
│   ├── admin.module.ts
│   ├── admin.controller.ts    → CMS API endpoint'leri
│   └── import.service.ts      → Toplu soru yükleme
│
└── common/
    ├── decorators/
    ├── filters/               → Exception filter'lar
    ├── interceptors/          → Logging, transform
    ├── pipes/                 → Validasyon pipe'ları
    └── middleware/            → Rate limiting, logging
```

---

## 4. Veritabanı Katmanı

### 4.1 PostgreSQL 16

**Kullanım Alanları:**
- Kullanıcı verileri ve profiller
- Soru bankası (59.000+ soru)
- Kullanıcı cevapları ve oturumlar
- Abonelik ve ödeme kayıtları
- Analitik verileri

**Bağlantı Yönetimi:**
- PgBouncer ile connection pooling (max 100 bağlantı)
- Read replica (yoğun okuma sorguları için)
- Otomatik yedekleme (günlük, 30 gün saklama)

### 4.2 Redis 7

**Kullanım Alanları:**

```
Cache:
├── Soru listesi cache (TTL: 1 saat)
├── Kullanıcı profili cache (TTL: 15 dakika)
└── Sınav sonuçları cache (TTL: 24 saat)

Sorted Sets (Liderlik Tabloları):
├── weekly_leaderboard:{category}
├── monthly_leaderboard:{category}
└── friends_leaderboard:{userId}

Rate Limiting:
├── API rate limit (100 istek/dakika/kullanıcı)
└── Auth brute force koruması (5 deneme/15 dakika)

Queue (Bull):
├── notification_queue    → Push bildirim gönderimi
├── email_queue          → E-posta gönderimi
└── analytics_queue      → Analitik hesaplama
```

### 4.3 Elasticsearch 8

**Kullanım Alanları:**
- Soru tam metin arama
- Konu ve içerik arama
- Otomatik tamamlama (autocomplete)
- Benzer soru tespiti (duplicate kontrolü)

**Index Yapısı:**
```json
{
  "questions": {
    "mappings": {
      "properties": {
        "question_text": { "type": "text", "analyzer": "turkish" },
        "topic_name": { "type": "keyword" },
        "difficulty": { "type": "keyword" },
        "source_year": { "type": "integer" }
      }
    }
  }
}
```

---

## 5. Dosya Depolama ve CDN

### 5.1 Cloudflare R2 (Birincil Seçenek)

AWS S3 uyumlu, egress ücreti olmayan nesne depolama.

**Maliyet Avantajı:**
- AWS S3'e kıyasla %0 egress ücreti
- Türkiye'ye yakın Cloudflare PoP'ları
- Cloudflare Stream ile entegre video streaming

**Klasör Yapısı:**
```
kpss-app-storage/
├── videos/
│   ├── {categoryId}/{subjectId}/{topicId}/
│   │   ├── lesson.m3u8          → HLS manifest
│   │   ├── segment_001.ts       → Video segmentleri
│   │   └── thumbnail.jpg
├── pdfs/
│   └── {categoryId}/{subjectId}/
│       └── summary.pdf
├── images/
│   ├── questions/{questionId}.jpg
│   └── avatars/{userId}.jpg
└── exports/
    └── {userId}/performance_report.pdf
```

### 5.2 Video Streaming Mimarisi

```
Kaynak Video (MP4, 1080p)
    ↓
FFmpeg Transcoding (Lambda/ECS)
    ├── 360p segment
    ├── 480p segment
    ├── 720p segment
    └── 1080p segment
    ↓
HLS Paketleme (.m3u8 + .ts)
    ↓
Cloudflare R2 (depolama)
    ↓
Cloudflare CDN (dağıtım)
    ↓
Mobil Uygulama (react-native-video)
```

---

## 6. Altyapı ve DevOps

### 6.1 Ortam Yapılandırması

```
Development:
├── Docker Compose (yerel)
├── PostgreSQL container
├── Redis container
└── Elasticsearch container

Staging:
├── AWS ECS Fargate (t3.small)
├── RDS PostgreSQL (db.t3.micro)
├── ElastiCache Redis (cache.t3.micro)
└── Elasticsearch Service (t3.small)

Production:
├── AWS ECS Fargate (auto-scaling, 2-10 task)
├── RDS PostgreSQL (db.r6g.large + read replica)
├── ElastiCache Redis (cache.r6g.large)
└── Elasticsearch Service (r6g.large)
```

### 6.2 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml (özet)
name: Deploy Pipeline

on:
  push:
    branches: [main, staging]

jobs:
  test:
    - Lint & TypeScript check
    - Unit tests (Jest)
    - Integration tests

  build:
    - Docker image build
    - Push to ECR

  deploy-staging:
    - ECS task definition güncelle
    - Rolling deployment
    - E2E tests (Detox - simulator)

  deploy-production:
    - Manuel onay gerekli
    - Blue-green deployment
    - Health check doğrulama

  mobile-build:
    - Expo EAS Build (iOS + Android)
    - TestFlight / Internal Testing
```

### 6.3 İzleme ve Alarm Yapısı

```
Katman 1 — Uygulama Hataları:
└── Sentry
    ├── Frontend crash raporları
    ├── Backend exception'ları
    └── Performance monitoring

Katman 2 — Altyapı Metrikleri:
└── Datadog
    ├── CPU, bellek, disk kullanımı
    ├── API yanıt süreleri (p50, p95, p99)
    ├── Veritabanı sorgu süreleri
    └── Cache hit/miss oranları

Katman 3 — Erişilebilirlik:
└── Uptime Robot
    ├── API health check (her 1 dakika)
    ├── Uygulama endpoint'leri
    └── SMS + e-posta alarm

Katman 4 — İş Metrikleri:
└── Firebase Analytics + Mixpanel
    ├── Günlük aktif kullanıcı
    ├── Oturum süresi
    └── Dönüşüm hunisi
```

### 6.4 Güvenlik Yapılandırması

```
Ağ Güvenliği:
├── VPC ile izole edilmiş altyapı
├── Security Group kuralları (minimum erişim)
├── WAF (Web Application Firewall) — Cloudflare
└── DDoS koruması — Cloudflare

Uygulama Güvenliği:
├── HTTPS zorunlu (TLS 1.3)
├── JWT + Refresh Token rotasyonu
├── Rate limiting (Redis)
├── SQL injection koruması (TypeORM parametreli sorgular)
├── XSS koruması (Helmet.js)
└── CORS yapılandırması

Veri Güvenliği:
├── Şifreler: bcrypt (salt rounds: 12)
├── Hassas veriler: AES-256 şifreleme
├── Veritabanı: Şifreli bağlantı (SSL)
└── Yedekler: Şifreli S3 bucket
```

---

## 7. Performans Hedefleri ve SLA

| Metrik | Hedef | Kritik Eşik |
|--------|-------|-------------|
| API yanıt süresi (p95) | < 500ms | > 1000ms alarm |
| API yanıt süresi (p99) | < 1000ms | > 2000ms alarm |
| Uygulama başlatma | < 2 saniye | > 4 saniye alarm |
| Soru geçiş süresi | < 300ms | > 600ms alarm |
| Video başlatma | < 3 saniye | > 6 saniye alarm |
| Sistem erişilebilirliği | %99.5 | < %99 kritik |
| Hata oranı | < %0.1 | > %1 alarm |

---

*Son güncelleme: Mayıs 2026*