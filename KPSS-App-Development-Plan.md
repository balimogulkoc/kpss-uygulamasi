# KPSS Hazırlık Mobil Uygulaması — Kapsamlı Geliştirme Planı

**Versiyon:** 1.0  
**Tarih:** Mayıs 2026  
**Hazırlayan:** Mobil Uygulama Geliştirme Danışmanlığı  
**Hedef Pazar:** Türkiye — KPSS Adayları

---

## İçindekiler

1. [Yönetici Özeti](#1-yönetici-özeti)
2. [Pazar Analizi](#2-pazar-analizi)
3. [Teknik Mimari](#3-teknik-mimari)
4. [Uygulama Modülleri ve Özellikler](#4-uygulama-modülleri-ve-özellikler)
5. [Veritabanı Tasarımı](#5-veritabanı-tasarımı)
6. [UI/UX Tasarım İlkeleri](#6-uiux-tasarım-i̇lkeleri)
7. [İçerik Yönetim Stratejisi](#7-i̇çerik-yönetim-stratejisi)
8. [Monetizasyon Modeli](#8-monetizasyon-modeli)
9. [Kullanıcı Bağlılığı ve Elde Tutma](#9-kullanıcı-bağlılığı-ve-elde-tutma)
10. [Analitik ve Performans Takibi](#10-analitik-ve-performans-takibi)
11. [Bildirim Sistemi](#11-bildirim-sistemi)
12. [Kalite Güvence ve Test](#12-kalite-güvence-ve-test)
13. [Lansman ve Pazarlama Stratejisi](#13-lansman-ve-pazarlama-stratejisi)
14. [Geliştirme Takvimi](#14-geliştirme-takvimi)
15. [Bakım ve Güncelleme Yol Haritası](#15-bakım-ve-güncelleme-yol-haritası)
16. [Risk Analizi](#16-risk-analizi)
17. [Ekip Yapısı ve Kaynaklar](#17-ekip-yapısı-ve-kaynaklar)
18. [Bütçe Tahmini](#18-bütçe-tahmini)

---

## 1. Yönetici Özeti

KPSS (Kamu Personeli Seçme Sınavı), Türkiye'de her yıl yaklaşık 2-3 milyon adayın katıldığı, kamu sektörüne giriş için zorunlu olan ulusal bir sınavdır. Mevcut dijital hazırlık araçları parçalı, kullanıcı deneyimi zayıf ve içerik kalitesi tutarsızdır.

Bu proje, Türkiye'nin en kapsamlı, kullanıcı odaklı ve veri destekli KPSS hazırlık mobil uygulamasını geliştirmeyi hedeflemektedir. Uygulama; yapay zeka destekli kişiselleştirme, kapsamlı soru bankası, video içerik ve gerçek zamanlı analitik ile rakiplerinden ayrışacaktır.

### Temel Hedefler
- İlk 12 ayda 500.000 aktif kullanıcıya ulaşmak
- %8-12 ücretli dönüşüm oranı elde etmek
- App Store ve Google Play'de KPSS kategorisinde ilk 3'e girmek
- Kullanıcı başına aylık ortalama 45 dakika aktif kullanım sağlamak

---

## 2. Pazar Analizi

### Hedef Kitle Segmentleri

**Birincil Segment — Aktif KPSS Adayları**
- Yaş: 20-35
- Eğitim: Üniversite öğrencisi veya mezunu
- Davranış: Günde 2-4 saat çalışma, mobil ağırlıklı kullanım
- Motivasyon: Kamu sektöründe istihdam güvencesi

**İkincil Segment — Öğretmen Adayları (ÖABT)**
- Yaş: 22-35
- Eğitim: Eğitim fakültesi mezunu veya öğrencisi
- Özel ihtiyaç: Alan bilgisi + pedagoji kombinasyonu

**Üçüncül Segment — Ortaöğretim Mezunları**
- Yaş: 18-25
- Eğitim: Lise mezunu
- Davranış: Daha kısa çalışma seansları, oyunlaştırmaya daha duyarlı

### Rekabet Analizi

| Rakip | Güçlü Yönler | Zayıf Yönler |
|-------|-------------|--------------|
| Mevcut uygulamalar | Marka bilinirliği | Kötü UX, eski içerik |
| YouTube kanalları | Ücretsiz, geniş içerik | Yapılandırılmamış, takip yok |
| Dershane uygulamaları | Güvenilir içerik | Pahalı, mobil optimizasyonu zayıf |
| Web siteleri | Kapsamlı arşiv | Mobil deneyim yetersiz |

### Pazar Fırsatı
- Türkiye'de 85 milyon nüfus, yüksek akıllı telefon penetrasyonu (%85+)
- Yıllık KPSS aday sayısı: ~2.5 milyon
- Mevcut dijital hazırlık pazarı: ~500 milyon TL (büyüme potansiyeli yüksek)
- Mobil eğitim uygulamaları segmenti yıllık %25 büyüme

---

## 3. Teknik Mimari

### 3.1 Genel Mimari Yaklaşımı

Uygulama, **mikroservis mimarisi** yerine başlangıçta **modüler monolit** yaklaşımıyla geliştirilecektir. Bu yaklaşım:
- Daha hızlı geliştirme döngüsü sağlar
- Operasyonel karmaşıklığı azaltır
- Kullanıcı tabanı büyüdükçe mikroservislere geçişe olanak tanır

### 3.2 Frontend — React Native (Expo)

**Teknoloji Seçim Gerekçesi:**
React Native, tek kod tabanıyla iOS ve Android'e çıkış imkânı sunar. Türkiye'deki Android ağırlıklı kullanıcı kitlesine (%72 Android, %28 iOS) uygun maliyet-etkin bir çözümdür.

**Temel Kütüphaneler:**

```
Navigasyon:       React Navigation v6 (Stack + Tab + Drawer)
State Yönetimi:   Redux Toolkit + React Query v5
Offline Depolama: WatermelonDB (SQLite üstünde reaktif ORM)
Hızlı Depolama:   React Native MMKV (key-value)
Video:            react-native-video + ExoPlayer/AVPlayer
Animasyon:        React Native Reanimated v3 + Lottie
Grafikler:        Victory Native / Skia Charts
Form Yönetimi:    React Hook Form + Zod (validasyon)
HTTP İstemci:     Axios + React Query
Push Bildirim:    Expo Notifications + Firebase Cloud Messaging
Ödeme:            react-native-iap (In-App Purchase)
Analitik:         Firebase Analytics + Mixpanel
Hata Takibi:      Sentry
```

**Proje Klasör Yapısı:**

```
src/
├── api/              → API istemcileri ve endpoint tanımları
├── assets/           → Görseller, fontlar, animasyonlar
├── components/       → Yeniden kullanılabilir UI bileşenleri
│   ├── common/       → Button, Input, Card, Modal vb.
│   ├── question/     → Soru kartı, seçenek, çözüm bileşenleri
│   ├── exam/         → Sınav zamanlayıcı, ilerleme çubuğu
│   └── analytics/    → Grafik ve istatistik bileşenleri
├── hooks/            → Özel React hook'ları
├── navigation/       → Navigasyon yapılandırması
├── screens/          → Ekran bileşenleri
│   ├── auth/         → Giriş, kayıt, şifre sıfırlama
│   ├── home/         → Ana sayfa, dashboard
│   ├── content/      → Konu anlatımları, videolar
│   ├── questions/    → Soru çözme, soru bankası
│   ├── exams/        → Deneme sınavları
│   ├── analytics/    → Performans analizi
│   ├── profile/      → Kullanıcı profili, ayarlar
│   └── premium/      → Abonelik ekranları
├── store/            → Redux store, slice'lar
├── services/         → İş mantığı servisleri
├── utils/            → Yardımcı fonksiyonlar
├── constants/        → Sabitler, renkler, boyutlar
└── types/            → TypeScript tip tanımları
```

### 3.3 Backend — Node.js / NestJS

**Teknoloji Seçim Gerekçesi:**
NestJS, TypeScript tabanlı, modüler ve test edilebilir bir backend framework'üdür. Büyük ölçekli uygulamalar için kanıtlanmış mimari desenleri (DI, modüler yapı) sunar.

**API Tasarımı:**
- **REST API:** Kimlik doğrulama, kullanıcı işlemleri, soru çözme
- **GraphQL:** İçerik sorgulama (esnek filtreleme için)
- **WebSocket:** Canlı sınav oturumları, gerçek zamanlı bildirimler

**Backend Modülleri:**

```
src/
├── auth/             → JWT, OAuth, refresh token
├── users/            → Kullanıcı CRUD, profil yönetimi
├── categories/       → Sınav kategorileri
├── subjects/         → Dersler ve konular
├── questions/        → Soru bankası yönetimi
├── exams/            → Deneme sınavı motoru
├── analytics/        → Performans hesaplama
├── notifications/    → Push bildirim servisi
├── subscriptions/    → Abonelik ve ödeme
├── content/          → Video ve metin içerik
├── search/           → Elasticsearch entegrasyonu
└── admin/            → CMS API endpoint'leri
```

### 3.4 Veritabanı Katmanı

```
PostgreSQL 16
├── Ana uygulama veritabanı
├── Kullanıcı verileri, soru bankası, analitik
└── Read replica (yoğun okuma işlemleri için)

Redis 7
├── Oturum cache
├── Sıralama tabloları (Sorted Sets)
├── Rate limiting
└── Bildirim kuyruğu (Bull Queue)

Elasticsearch 8
├── Soru tam metin arama
├── Konu arama
└── Otomatik tamamlama (autocomplete)
```

### 3.5 Dosya Depolama ve CDN

```
AWS S3 / Cloudflare R2
├── Video içerikler (HLS formatında)
├── PDF dokümanlar
├── Görsel içerikler
└── Kullanıcı avatarları

Cloudflare CDN
├── Statik varlıklar
├── Video streaming (Cloudflare Stream)
└── DDoS koruması
```

### 3.6 Altyapı ve DevOps

**Ortamlar:**
- Development → Yerel Docker Compose
- Staging → AWS ECS Fargate (küçük instance)
- Production → AWS ECS Fargate (auto-scaling)

**CI/CD Pipeline:**

```
GitHub Push
    ↓
GitHub Actions
    ├── Lint & Type Check
    ├── Unit Tests
    ├── Integration Tests
    └── Build
         ↓
    Staging Deploy
         ↓
    E2E Tests (Detox)
         ↓
    Production Deploy (manuel onay)
         ↓
    Expo EAS Build
         ↓
    App Store / Google Play
```

**İzleme ve Gözlemlenebilirlik:**

```
Sentry          → Hata takibi (frontend + backend)
Datadog         → APM, altyapı metrikleri
Firebase        → Kullanıcı analitik, crash reporting
Uptime Robot    → Servis erişilebilirlik izleme
PagerDuty       → Kritik alarm yönetimi
```

---

## 4. Uygulama Modülleri ve Özellikler

### 4.1 Kimlik Doğrulama Modülü

**Kayıt Seçenekleri:**
- E-posta + şifre (zorunlu e-posta doğrulama)
- Google OAuth
- Apple Sign In (iOS için zorunlu)
- Telefon numarası (SMS OTP — Türkiye'de yaygın tercih)

**Güvenlik:**
- JWT Access Token (15 dakika ömür)
- Refresh Token rotasyonu (30 gün)
- Brute force koruması (Redis rate limiting)
- Şifre politikası: min 8 karakter, büyük/küçük harf + rakam

### 4.2 Sınav Kategorisi Modülü

Her sınav kategorisi için ayrı içerik ağacı:

```
KPSS Lisans
├── Genel Yetenek
│   ├── Türkçe
│   │   ├── Sözcük Bilgisi
│   │   ├── Cümle Bilgisi
│   │   └── Paragraf
│   └── Matematik
│       ├── Sayılar
│       ├── Kesirler
│       └── Problemler
└── Genel Kültür
    ├── Tarih
    ├── Coğrafya
    ├── Vatandaşlık
    └── Güncel Bilgiler

ÖABT (Alan Bazlı)
├── Matematik Öğretmenliği
├── Türkçe Öğretmenliği
├── Fen Bilimleri Öğretmenliği
├── Sosyal Bilgiler Öğretmenliği
└── [Diğer 17 alan...]
```

### 4.3 İçerik Teslim Modülü

**Video İçerik:**
- HLS (HTTP Live Streaming) formatı
- Çözünürlük seçenekleri: 360p, 480p, 720p, 1080p
- Otomatik kalite ayarı (ağ hızına göre)
- Offline indirme (premium kullanıcılar)
- Oynatma hızı: 0.75x, 1x, 1.25x, 1.5x, 2x
- Altyazı desteği (Türkçe)
- Bölüm işaretleri (chapter markers)

**Metin İçerik:**
- Zengin metin editörü (başlık, liste, tablo, formül)
- LaTeX matematik formülü desteği (KaTeX)
- Görseller ve diyagramlar
- Vurgulama ve not alma özelliği
- Offline erişim

**PDF Dokümanlar:**
- Konu özet notları
- Formül tabloları
- Hızlı tekrar kılavuzları

### 4.4 Soru Bankası Modülü

**Soru Özellikleri:**
- Benzersiz soru ID'si
- Sınav kategorisi ve dersi
- Konu ve alt konu etiketleri
- Zorluk seviyesi (Kolay / Orta / Zor / Çok Zor)
- Kaynak yılı (geçmiş yıl soruları için)
- Soru tipi (tek doğru, çoktan seçmeli)
- Görsel içerik (şekil, grafik, tablo)
- Çözüm (metin + adım adım + video çözüm)
- Çözüm süresi tahmini

**Filtreleme Seçenekleri:**
- Sınav kategorisi
- Ders ve konu
- Zorluk seviyesi
- Yıl aralığı
- Çözülmüş / çözülmemiş / yanlış cevaplananlar
- Favorilere eklenenler

**Soru Bankası Hedefleri:**

| Kategori | Hedef Soru Sayısı |
|----------|-------------------|
| KPSS Lisans | 15.000+ |
| KPSS Önlisans | 8.000+ |
| KPSS Ortaöğretim | 6.000+ |
| ÖABT (tüm alanlar) | 25.000+ |
| Eğitim Bilimleri | 5.000+ |
| **Toplam** | **59.000+** |

### 4.5 Pratik Test Modülü

**Test Türleri:**

1. **Konu Testi** — Belirli bir konudan 10-20 soru, süresiz veya süreli
2. **Karma Test** — Birden fazla konudan rastgele soru seçimi
3. **Zayıf Konu Testi** — Analitik veriye göre otomatik oluşturulan test
4. **Yanlış Sorular Testi** — Daha önce yanlış cevaplanan sorular
5. **Hızlı Test** — 5 dakikalık 10 soruluk mini test

**Test Motoru Özellikleri:**
- Gerçek sınav arayüzü simülasyonu
- Soru başına süre takibi
- Soru işaretleme (geri dönmek için)
- Soru atlama
- Anlık geri bildirim modu veya sınav sonu değerlendirme modu
- Cevap değiştirme geçmişi

### 4.6 Deneme Sınavı Modülü

**Tam Deneme Sınavı:**
- Gerçek KPSS soru sayısı ve süresi
- Resmi sınav formatına birebir uyum
- Otomatik puanlama (ham puan + ağırlıklı puan)
- Yanlış cevap kesintisi hesaplama
- Sınav sonrası detaylı analiz raporu

**Deneme Sınavı Takvimi:**
- Haftalık yeni deneme sınavı yayını
- Geçmiş yıl sınavlarının tam simülasyonu
- Özel deneme sınavı oluşturma (konu seçimi)

**Sınav Sonrası Rapor:**
- Toplam puan ve yüzdelik dilim
- Konu bazlı doğruluk oranı
- Süre analizi (soru başına harcanan süre)
- Karşılaştırmalı analiz (diğer kullanıcılarla)
- Zayıf konu önerileri

---

## 5. Veritabanı Tasarımı

### 5.1 Ana Tablolar

```sql
-- Kullanıcılar
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    phone           VARCHAR(20) UNIQUE,
    full_name       VARCHAR(100) NOT NULL,
    avatar_url      TEXT,
    exam_category   VARCHAR(50),        -- Seçilen sınav kategorisi
    target_exam_date DATE,              -- Hedef sınav tarihi
    subscription_tier VARCHAR(20) DEFAULT 'free',
    is_verified     BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Sınav Kategorileri
CREATE TABLE exam_categories (
    id          SERIAL PRIMARY KEY,
    code        VARCHAR(50) UNIQUE NOT NULL,  -- 'lisans', 'onlisans', 'oabt' vb.
    name        VARCHAR(100) NOT NULL,
    description TEXT,
    is_active   BOOLEAN DEFAULT TRUE
);

-- Dersler
CREATE TABLE subjects (
    id              SERIAL PRIMARY KEY,
    category_id     INTEGER REFERENCES exam_categories(id),
    name            VARCHAR(100) NOT NULL,
    code            VARCHAR(50),
    icon_url        TEXT,
    display_order   INTEGER DEFAULT 0
);

-- Konular (Hiyerarşik)
CREATE TABLE topics (
    id              SERIAL PRIMARY KEY,
    subject_id      INTEGER REFERENCES subjects(id),
    parent_id       INTEGER REFERENCES topics(id),  -- Alt konu için
    name            VARCHAR(200) NOT NULL,
    description     TEXT,
    display_order   INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE
);

-- Sorular
CREATE TABLE questions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id        INTEGER REFERENCES topics(id),
    question_text   TEXT NOT NULL,
    option_a        TEXT NOT NULL,
    option_b        TEXT NOT NULL,
    option_c        TEXT NOT NULL,
    option_d        TEXT NOT NULL,
    option_e        TEXT,               -- Bazı sınavlarda 5 seçenek
    correct_answer  CHAR(1) NOT NULL,   -- 'A', 'B', 'C', 'D', 'E'
    difficulty      VARCHAR(20) NOT NULL, -- 'easy', 'medium', 'hard', 'very_hard'
    source_year     INTEGER,            -- Geçmiş yıl sorusu ise yılı
    source_exam     VARCHAR(100),       -- Hangi sınavdan
    image_url       TEXT,               -- Soru görseli
    estimated_time  INTEGER DEFAULT 60, -- Saniye cinsinden tahmini çözüm süresi
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Soru Çözümleri
CREATE TABLE solutions (
    id              SERIAL PRIMARY KEY,
    question_id     UUID REFERENCES questions(id),
    solution_text   TEXT NOT NULL,      -- Adım adım metin çözüm
    solution_video_url TEXT,            -- Video çözüm URL'i
    key_concept     TEXT,               -- Temel kavram açıklaması
    common_mistakes TEXT,               -- Sık yapılan hatalar
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Kullanıcı Cevapları
CREATE TABLE user_answers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    question_id     UUID REFERENCES questions(id),
    session_id      UUID,               -- Test oturumu ID'si
    given_answer    CHAR(1),            -- Kullanıcının verdiği cevap
    is_correct      BOOLEAN,
    time_spent      INTEGER,            -- Saniye cinsinden
    answered_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Deneme Sınavı Tanımları
CREATE TABLE mock_exams (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id     INTEGER REFERENCES exam_categories(id),
    title           VARCHAR(200) NOT NULL,
    description     TEXT,
    duration_minutes INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    is_premium      BOOLEAN DEFAULT FALSE,
    publish_date    DATE,
    is_active       BOOLEAN DEFAULT TRUE
);

-- Kullanıcı Sınav Oturumları
CREATE TABLE user_exam_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    exam_id         UUID REFERENCES mock_exams(id),
    started_at      TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    raw_score       DECIMAL(5,2),
    weighted_score  DECIMAL(5,2),
    percentile      DECIMAL(5,2),
    status          VARCHAR(20) DEFAULT 'in_progress'  -- 'in_progress', 'completed', 'abandoned'
);

-- Abonelikler
CREATE TABLE subscriptions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    plan_type       VARCHAR(50) NOT NULL,   -- 'monthly', 'quarterly', 'annual'
    start_date      DATE NOT NULL,
    end_date        DATE NOT NULL,
    amount          DECIMAL(10,2),
    currency        VARCHAR(3) DEFAULT 'TRY',
    payment_provider VARCHAR(50),           -- 'iyzico', 'apple', 'google'
    provider_subscription_id TEXT,
    status          VARCHAR(20) DEFAULT 'active',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Çalışma Planları
CREATE TABLE study_plans (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    exam_date       DATE NOT NULL,
    daily_goal_minutes INTEGER DEFAULT 60,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Günlük Çalışma Kayıtları
CREATE TABLE daily_study_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    study_date      DATE NOT NULL,
    total_minutes   INTEGER DEFAULT 0,
    questions_solved INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    UNIQUE(user_id, study_date)
);

-- Kullanıcı Rozetleri
CREATE TABLE user_badges (
    id              SERIAL PRIMARY KEY,
    user_id         UUID REFERENCES users(id),
    badge_type      VARCHAR(100) NOT NULL,
    earned_at       TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 İndeksler

```sql
-- Performans için kritik indeksler
CREATE INDEX idx_questions_topic_id ON questions(topic_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_source_year ON questions(source_year);
CREATE INDEX idx_user_answers_user_id ON user_answers(user_id);
CREATE INDEX idx_user_answers_question_id ON user_answers(question_id);
CREATE INDEX idx_user_answers_session_id ON user_answers(session_id);
CREATE INDEX idx_user_exam_sessions_user_id ON user_exam_sessions(user_id);
CREATE INDEX idx_daily_study_logs_user_date ON daily_study_logs(user_id, study_date);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_end_date ON subscriptions(end_date);
```

---

## 6. UI/UX Tasarım İlkeleri

### 6.1 Tasarım Felsefesi

Türk kullanıcıların mobil uygulama kullanım alışkanlıkları göz önünde bulundurularak **"Sade, Hızlı, Güvenilir"** tasarım felsefesi benimsenmiştir.

### 6.2 Renk Paleti

```
Ana Renkler:
├── Birincil Mavi:    #1E3A8A  (güven, akademik)
├── Vurgu Kırmızı:   #DC2626  (Türk bayrağı, dikkat çekici)
├── Başarı Yeşili:   #16A34A  (doğru cevap, ilerleme)
├── Uyarı Sarısı:    #CA8A04  (dikkat, orta zorluk)
└── Hata Kırmızısı:  #DC2626  (yanlış cevap)

Nötr Renkler:
├── Arka Plan:       #F8FAFC
├── Kart Arka Plan:  #FFFFFF
├── Metin Birincil:  #0F172A
├── Metin İkincil:   #64748B
└── Kenarlık:        #E2E8F0

Dark Mode:
├── Arka Plan:       #0F172A
├── Kart Arka Plan:  #1E293B
├── Metin Birincil:  #F1F5F9
└── Metin İkincil:   #94A3B8
```

### 6.3 Tipografi

```
Font Ailesi: Inter (Latin + Türkçe karakter desteği)

Boyutlar:
├── Başlık 1:  28sp / Bold
├── Başlık 2:  22sp / SemiBold
├── Başlık 3:  18sp / SemiBold
├── Gövde:     16sp / Regular
├── Küçük:     14sp / Regular
└── Çok Küçük: 12sp / Regular

Satır Aralığı: 1.5 (Türkçe uzun kelimeler için okunabilirlik)
```

### 6.4 Ekran Tasarımları

**Ana Sayfa (Home Screen):**
```
┌─────────────────────────────┐
│  Merhaba, Ahmet! 👋          │
│  Sınava 47 gün kaldı        │
├─────────────────────────────┤
│  📊 Bugünkü Hedef           │
│  ████████░░  80%            │
│  40/50 soru çözüldü         │
├─────────────────────────────┤
│  ⚡ Hızlı Test Başlat       │
│  [Matematik] [Türkçe] [+]   │
├─────────────────────────────┤
│  📈 Bu Haftaki Performans   │
│  [Grafik alanı]             │
├─────────────────────────────┤
│  🔥 Günlük Seri: 12 gün     │
├─────────────────────────────┤
│  📚 Kaldığın Yerden Devam   │
│  Tarih > Osmanlı Dönemi     │
└─────────────────────────────┘
```

**Soru Çözme Ekranı:**
```
┌─────────────────────────────┐
│  ← Geri    12/30    ⏱ 18:42 │
│  ████████████░░░░░░░░       │
├─────────────────────────────┤
│                             │
│  Soru 12                    │
│                             │
│  Aşağıdakilerden hangisi... │
│  [Soru metni buraya]        │
│                             │
├─────────────────────────────┤
│  ○ A) Seçenek metni         │
│  ● B) Seçenek metni ✓       │
│  ○ C) Seçenek metni         │
│  ○ D) Seçenek metni         │
├─────────────────────────────┤
│  [🔖 İşaretle] [→ Sonraki]  │
└─────────────────────────────┘
```

### 6.5 Onboarding Akışı

```
Adım 1: Karşılama
→ Uygulama değer önerisi (3 slayt)

Adım 2: Sınav Kategorisi Seçimi
→ Lisans / Önlisans / Ortaöğretim / ÖABT / Eğitim Bilimleri

Adım 3: Sınav Tarihi
→ Takvim seçici (ÖSYM sınav takvimi önerileri)

Adım 4: Seviye Testi (Opsiyonel)
→ 10 soruluk hızlı seviye belirleme testi

Adım 5: Kişiselleştirilmiş Plan
→ Günlük hedef önerisi + çalışma programı

Adım 6: Kayıt / Giriş
→ E-posta, Google, Apple seçenekleri
```

### 6.6 Erişilebilirlik Standartları

- WCAG 2.1 AA uyumluluğu
- Minimum dokunma hedefi: 44x44 pt
- Renk körü dostu palet (renk + şekil kombinasyonu)
- Ekran okuyucu desteği (VoiceOver / TalkBack)
- Dinamik font boyutu desteği
- Yüksek kontrast modu

---

## 7. İçerik Yönetim Stratejisi

### 7.1 CMS Altyapısı

**Teknoloji:** Next.js + Payload CMS (self-hosted)

**CMS Özellikleri:**
- Soru toplu yükleme (Excel/CSV import — 1000 soru/batch)
- Video yükleme ve otomatik transkript oluşturma
- Konu ağacı görsel yönetimi (drag & drop)
- İçerik versiyonlama ve geri alma
- Yayın/taslak/arşiv durumu yönetimi
- Çoklu editör desteği (rol tabanlı erişim)
- İçerik önizleme (mobil simülatör)

### 7.2 İçerik Üretim Süreci

```
1. İçerik Planlaması
   └── Konu ağacı analizi → Eksik içerik tespiti → Önceliklendirme

2. Ham İçerik Üretimi
   └── Uzman eğitmenler → Soru yazımı + çözüm + konu anlatımı

3. Pedagojik İnceleme
   └── Baş editör → Doğruluk kontrolü + zorluk seviyesi onayı

4. Teknik Yükleme
   └── İçerik ekibi → CMS'e yükleme + etiketleme + görsel ekleme

5. Kalite Kontrol
   └── QA ekibi → Uygulama içi görünüm testi + hata kontrolü

6. Yayın
   └── Kademeli rollout → %10 → %50 → %100 kullanıcı
```

### 7.3 İçerik Kalite Standartları

**Soru Kalite Kriterleri:**
- Her soru en az 2 uzman tarafından bağımsız olarak incelenir
- Türkçe dil bilgisi ve imla kurallarına uygunluk
- ÖSYM soru formatına uygunluk
- Görsel içerikler için minimum 300 DPI çözünürlük
- Çözüm adımları: maksimum 5 adım, her adım açıklamalı

**Video İçerik Standartları:**
- Minimum çözünürlük: 1080p
- Ses kalitesi: -14 LUFS (yayın standardı)
- Maksimum video süresi: 20 dakika (konu başına)
- Zorunlu bölüm işaretleri (her 3-5 dakikada bir)
- Türkçe altyazı (otomatik + manuel düzeltme)

### 7.4 Offline İçerik Stratejisi

**İndirilebilir İçerikler (Premium):**
- Konu anlatım videoları (seçili konular)
- PDF özet notları
- Soru paketleri (500 soruluk bloklar)

**Senkronizasyon Mekanizması:**
- Delta sync: Sadece değişen içerikler güncellenir
- Arka plan senkronizasyonu (Wi-Fi bağlantısında otomatik)
- İndirme kuyruğu yönetimi
- Depolama alanı yönetimi (kullanıcı uyarıları)

### 7.5 İçerik Güncelleme Takvimi

| İçerik Türü | Güncelleme Sıklığı |
|-------------|-------------------|
| Yeni sorular | Haftalık (500+ soru) |
| Video dersler | Aylık (20+ video) |
| Deneme sınavları | Haftalık (1 tam deneme) |
| Güncel bilgiler | Günlük (GK bölümü) |
| Sınav analizi | Sınav sonrası 48 saat içinde |

---

## 8. Monetizasyon Modeli

### 8.1 Abonelik Planları

| Plan | Fiyat | Fatura Dönemi | Özellikler |
|------|-------|---------------|------------|
| **Ücretsiz** | 0 ₺ | — | Günlük 10 soru, temel konu anlatımı, reklam var, 1 deneme/ay |
| **Aylık Premium** | 79 ₺ | Aylık | Sınırsız soru, tüm denemeler, reklamsız, gelişmiş analitik, offline erişim |
| **3 Aylık Premium** | 199 ₺ | 3 Aylık | Aylık premium + kişisel çalışma planı + öncelikli destek |
| **Yıllık Premium** | 599 ₺ | Yıllık | Tüm özellikler + canlı ders erişimi + 1-1 danışmanlık (2 seans) |

**Fiyatlandırma Notları:**
- Yıllık plan, aylık plana göre %37 tasarruf sağlar
- Türk kullanıcılar için taksit seçeneği (3, 6, 12 taksit)
- Öğrenci indirimi: %20 (öğrenci e-postası doğrulaması ile)
- Grup indirimi: 5+ kullanıcı için %15

### 8.2 Ödeme Entegrasyonu

**Ödeme Sağlayıcıları:**
- **iyzico** — Türkiye'nin lider ödeme altyapısı, taksit desteği
- **Apple In-App Purchase** — iOS kullanıcıları için zorunlu
- **Google Play Billing** — Android kullanıcıları için zorunlu

**Desteklenen Ödeme Yöntemleri:**
- Kredi/banka kartı (Visa, Mastercard, Troy)
- Taksitli ödeme (3, 6, 12 taksit)
- Banka havalesi/EFT
- Dijital cüzdanlar (Apple Pay, Google Pay)

### 8.3 Ek Gelir Kanalları

**Reklam Geliri (Ücretsiz Kullanıcılar):**
- Google AdMob entegrasyonu
- Banner reklamlar (soru listesi aralarında)
- Interstitial reklamlar (test tamamlama sonrası)
- Rewarded video (ekstra soru hakkı için)
- Aylık tahmini reklam geliri: kullanıcı başına 2-5 ₺

**Kurumsal Lisanslar:**
- Dershaneler ve eğitim kurumları için toplu lisans
- Özel içerik ve marka özelleştirme
- Öğrenci takip paneli
- Fiyat: Kuruma özel teklif (50-500 öğrenci arası)

**İçerik Ortaklıkları:**
- Yayınevleriyle içerik lisanslama anlaşmaları
- Eğitim teknolojisi şirketleriyle entegrasyon

### 8.4 Gelir Projeksiyonu (12 Ay)

| Ay | Toplam Kullanıcı | Ücretli Kullanıcı | Aylık Gelir (₺) |
|----|-----------------|-------------------|-----------------|
| 3 | 50.000 | 3.000 | 237.000 |
| 6 | 150.000 | 12.000 | 948.000 |
| 9 | 300.000 | 27.000 | 2.133.000 |
| 12 | 500.000 | 50.000 | 3.950.000 |

*Tahminler %8-10 dönüşüm oranı ve ortalama 79 ₺/ay abonelik üzerinden hesaplanmıştır.*

---

## 9. Kullanıcı Bağlılığı ve Elde Tutma

### 9.1 Gamification Sistemi

**Rozet Sistemi:**

| Rozet | Kazanma Koşulu |
|-------|----------------|
| 🔥 İlk Adım | İlk soruyu çöz |
| 📚 Çalışkan | 7 gün üst üste çalış |
| 🎯 Keskin Nişancı | 10 soruyu üst üste doğru cevapla |
| ⚡ Hız Ustası | Bir soruyu 30 saniyede doğru çöz |
| 🏆 Deneme Şampiyonu | 10 deneme sınavı tamamla |
| 💯 Mükemmeliyetçi | Bir konudan %100 doğruluk oranı |
| 🌟 Haftalık Yıldız | Haftanın en çok soru çözen kullanıcısı |

**Puan Sistemi (XP):**
- Doğru cevap: 10 XP
- Zor soru doğru cevap: 25 XP
- Günlük hedef tamamlama: 50 XP bonus
- Deneme sınavı tamamlama: 100 XP
- Günlük seri bonusu: Seri × 5 XP

**Seviye Sistemi:**
```
Seviye 1:  Aday        (0 - 500 XP)
Seviye 2:  Çalışkan    (500 - 1.500 XP)
Seviye 3:  Azimli      (1.500 - 3.500 XP)
Seviye 4:  Başarılı    (3.500 - 7.500 XP)
Seviye 5:  Uzman       (7.500 - 15.000 XP)
Seviye 6:  Şampiyon    (15.000+ XP)
```

### 9.2 Kişiselleştirilmiş Çalışma Planı

**Plan Oluşturma Algoritması:**
1. Sınav tarihi ve kategorisi belirlenir
2. Kalan gün sayısı hesaplanır
3. Konu ağacı analiz edilir (toplam konu sayısı)
4. Kullanıcının mevcut seviyesi değerlendirilir (seviye testi)
5. Günlük çalışma hedefi önerilir
6. Konu sıralaması optimize edilir (zayıf konular önce)
7. Haftalık deneme sınavı takvimi oluşturulur

**Dinamik Plan Güncelleme:**
- Haftalık performans analizi
- Zayıf konulara otomatik ek süre atama
- Sınav tarihine yaklaştıkça tekrar ağırlığı artırma

### 9.3 Spaced Repetition (Aralıklı Tekrar)

**Algoritma:** SM-2 (SuperMemo 2) tabanlı özelleştirilmiş versiyon

```
Doğru cevap → Tekrar aralığı uzar (1 gün → 3 gün → 7 gün → 14 gün → 30 gün)
Yanlış cevap → Tekrar aralığı sıfırlanır (ertesi gün tekrar göster)
```

**Uygulama:**
- Yanlış cevaplanan sorular "Tekrar Listesi"ne eklenir
- Günlük çalışma seansına otomatik olarak dahil edilir
- Kullanıcı "Bugün Tekrar Et" bildirimi alır

### 9.4 Sosyal Özellikler

**Arkadaş Sistemi:**
- Telefon rehberi veya kullanıcı adı ile arkadaş ekleme
- Haftalık performans karşılaştırması
- Arkadaşa meydan okuma (challenge)

**Liderlik Tabloları:**
- Haftalık genel sıralama
- Sınav kategorisi bazlı sıralama
- Şehir/bölge bazlı sıralama
- Arkadaşlar arası sıralama

**Grup Çalışma Odaları (v2.0):**
- 2-10 kişilik özel gruplar
- Grup hedefi belirleme
- Ortak deneme sınavı
- Grup sohbet (metin)

### 9.5 Push Bildirim Stratejisi

**Bildirim Türleri ve Zamanlaması:**

| Bildirim | Zaman | İçerik |
|----------|-------|--------|
| Sabah Motivasyonu | 08:00 | "Günaydın! Bugün 50 soru hedefin var 💪" |
| Öğle Hatırlatıcısı | 12:30 | "Öğle aranda 10 dakika çalış!" |
| Akşam Özeti | 20:00 | "Bugün X soru çözdün, Y kaldı" |
| Seri Tehlikesi | 21:00 | "Günlük seriniz tehlikede! 🔥" |
| Sınav Yaklaşıyor | Sınav -30/7/1 gün | "Sınava X gün kaldı, hazır mısın?" |
| Yeni İçerik | Haftalık | "Bu haftanın deneme sınavı yayında!" |
| Başarı | Anlık | "Tebrikler! Yeni rozet kazandın 🏆" |

**Bildirim Kişiselleştirme:**
- Kullanıcı tercihlerine göre bildirim saati ayarı
- Bildirim türü bazlı açma/kapama
- Sessiz saatler tanımlama
- Bildirim sıklığı kontrolü

---

## 10. Analitik ve Performans Takibi

### 10.1 Bireysel Dashboard

**Genel Bakış Kartları:**
- Toplam çözülen soru sayısı
- Genel doğruluk oranı (%)
- Toplam çalışma süresi
- Günlük seri (streak)
- Son deneme sınavı puanı

**Konu Bazlı Analiz:**
- Radar grafiği: Her ders için doğruluk oranı
- Isı haritası: Günlük çalışma yoğunluğu (GitHub tarzı)
- Trend grafiği: Haftalık/aylık ilerleme

**Zaman Analizi:**
- Soru başına ortalama süre (konu bazlı)
- Günlük çalışma süresi grafiği
- En verimli çalışma saatleri

**Zayıf Konu Tespiti:**
- Doğruluk oranı < %60 olan konular otomatik işaretlenir
- "Çalışman Gereken Konular" önerileri
- Konu bazlı öncelik sıralaması

### 10.2 Karşılaştırmalı Analitik

**Yüzdelik Dilim Hesaplama:**
- Aynı sınav kategorisindeki tüm kullanıcılarla karşılaştırma
- "Sen kullanıcıların %X'inden iyisin" gösterimi
- Deneme sınavı sonrası anlık yüzdelik dilim

**Anonim Karşılaştırma:**
- Şehir/bölge bazlı ortalama performans
- Yaş grubu bazlı karşılaştırma
- Çalışma süresi vs. başarı korelasyonu

### 10.3 Uygulama Analitikleri (İç Kullanım)

**Firebase Analytics Olayları:**
```
user_registered          → Yeni kayıt
question_answered        → Soru cevaplandı (doğru/yanlış, süre)
exam_completed           → Deneme sınavı tamamlandı
content_viewed           → İçerik görüntülendi (video/metin)
subscription_started     → Abonelik başladı
subscription_cancelled   → Abonelik iptal edildi
feature_used             → Özellik kullanımı
notification_opened      → Bildirim açıldı
```

**Mixpanel Funnel Analizi:**
```
Kayıt → Onboarding → İlk Soru → 7. Gün → 30. Gün → Abonelik
```

---

## 11. Bildirim Sistemi

### 11.1 Teknik Altyapı

```
Firebase Cloud Messaging (FCM)
├── Android push bildirimleri
└── iOS push bildirimleri (APNs üzerinden)

Expo Notifications
└── React Native entegrasyonu

Bull Queue (Redis tabanlı)
├── Zamanlanmış bildirim kuyruğu
├── Toplu bildirim gönderimi
└── Başarısız bildirim yeniden deneme
```

### 11.2 Bildirim Segmentasyonu

**Kullanıcı Segmentleri:**
- Aktif kullanıcılar (son 7 günde giriş yapanlar)
- Pasif kullanıcılar (7-30 gün giriş yapmayan)
- Kayıp kullanıcılar (30+ gün giriş yapmayan)
- Premium kullanıcılar
- Sınava yakın kullanıcılar (30 gün içinde)

**Segment Bazlı Bildirim Stratejisi:**
- Aktif: Motivasyon + içerik bildirimleri
- Pasif: Geri kazanım bildirimleri ("Seni özledik!")
- Kayıp: Özel teklif bildirimleri (%20 indirim)
- Premium: Özel içerik + öncelikli bildirimler

### 11.3 Sınav Takvimi Bildirimleri

ÖSYM sınav takvimi veritabanına işlenir ve otomatik bildirimler oluşturulur:
- Sınav başvuru tarihi hatırlatıcısı
- Sınav 30 gün öncesi
- Sınav 7 gün öncesi
- Sınav 1 gün öncesi (motivasyon mesajı)
- Sınav sonuçları açıklandığında

---

## 12. Kalite Güvence ve Test

### 12.1 Test Stratejisi

**Test Piramidi:**
```
        /\
       /E2E\        → Detox (10-20 kritik akış)
      /------\
     /Entegrasyon\  → Supertest + Jest (API endpoint'leri)
    /------------\
   /  Unit Tests  \ → Jest + RTL (bileşenler, servisler)
  /________________\
```

### 12.2 Unit Test Kapsamı

**Backend (NestJS):**
- Servis katmanı: %80+ kapsam hedefi
- Soru puanlama algoritması: %100 kapsam
- Abonelik mantığı: %100 kapsam
- Analitik hesaplamaları: %90+ kapsam

**Frontend (React Native):**
- UI bileşenleri: Snapshot testleri
- Hook'lar: Davranış testleri
- Utility fonksiyonlar: %90+ kapsam

### 12.3 E2E Test Senaryoları (Detox)

```
Kritik Akışlar:
1. Kayıt → Onboarding → İlk soru çözme
2. Giriş → Deneme sınavı başlatma → Tamamlama → Sonuç görüntüleme
3. Premium satın alma akışı
4. Offline mod → Soru çözme → Online senkronizasyon
5. Bildirim açma → İlgili ekrana yönlendirme
```

### 12.4 İçerik Kalite Güvencesi

**Soru Doğrulama Süreci:**
1. Otomatik dil bilgisi kontrolü (Zemberek NLP kütüphanesi)
2. Duplicate soru tespiti (Elasticsearch benzerlik sorgusu)
3. Uzman incelemesi (2 bağımsız uzman)
4. Pilot test (50 kullanıcıyla beta testi)
5. İstatistiksel analiz (madde güçlük indeksi, ayırt edicilik)

### 12.5 Performans Testi

**Yük Testi (k6):**
```javascript
// Sınav dönemi yoğunluğu simülasyonu
export const options = {
  stages: [
    { duration: '5m', target: 1000 },   // Kademeli artış
    { duration: '30m', target: 5000 },  // Pik yük
    { duration: '5m', target: 0 },      // Kademeli düşüş
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],   // %95 istek < 500ms
    http_req_failed: ['rate<0.01'],     // Hata oranı < %1
  },
};
```

**Performans Hedefleri:**
- API yanıt süresi: p95 < 500ms
- Uygulama başlatma süresi: < 2 saniye
- Soru geçiş süresi: < 300ms
- Video başlatma süresi: < 3 saniye

### 12.6 Beta Test Programı

**Kapalı Beta (Ay 5):**
- 500 gönüllü kullanıcı
- Kaynak: KPSS forumları, sosyal medya
- Süre: 4 hafta
- Geri bildirim: Uygulama içi anket + odak grup görüşmeleri

**Açık Beta (Ay 6 başı):**
- 5.000 kullanıcı
- Google Play Early Access + TestFlight
- Süre: 2 hafta
- Crash raporları ve kullanıcı geri bildirimleri

---

## 13. Lansman ve Pazarlama Stratejisi

### 13.1 Ön Lansman Dönemi (Ay 1-5)

**Organik İçerik Stratejisi:**
- **YouTube Kanalı:** Haftalık ücretsiz konu anlatım videoları
  - Hedef: Lansman öncesi 10.000 abone
  - SEO odaklı başlıklar: "KPSS Matematik Konu Anlatımı", "KPSS Tarih Özet"
- **Instagram/TikTok:** Günlük mini soru paylaşımları, ipuçları
- **Twitter/X:** KPSS güncel haberleri, sınav tarihleri
- **Blog:** SEO odaklı KPSS rehber makaleleri

**Topluluk Oluşturma:**
- KPSS forumlarında (Memurlar.net, Kpss Cafe) aktif katılım
- Facebook gruplarında değer katan içerik paylaşımı
- Telegram kanalı: Günlük soru + sınav haberleri

**E-posta Listesi:**
- Landing page ile e-posta toplama
- Hedef: Lansman öncesi 20.000 e-posta
- Lead magnet: "KPSS Çalışma Planı PDF" ücretsiz indirme

### 13.2 Lansman Dönemi (Ay 6)

**Ücretli Reklam Kampanyaları:**

| Platform | Bütçe (Aylık) | Hedef |
|----------|---------------|-------|
| Google UAC | 50.000 ₺ | Uygulama indirme |
| Meta Ads | 30.000 ₺ | Marka bilinirliği + indirme |
| YouTube Ads | 20.000 ₺ | Video görüntüleme + indirme |
| TikTok Ads | 15.000 ₺ | Genç kitle (18-25) |

**Toplam Lansman Bütçesi:** 115.000 ₺/ay (ilk 3 ay)

**App Store Optimizasyonu (ASO):**
- Başlık: "KPSS Hazırlık - Soru Bankası"
- Anahtar kelimeler: kpss, kpss soruları, kpss deneme, kpss 2026, öabt
- Ekran görüntüleri: Türkçe, gerçek kullanıcı senaryoları
- Tanıtım videosu: 30 saniyelik uygulama tanıtımı

**Influencer İş Birlikleri:**
- KPSS koçları (YouTube, 50K-500K abone): 3-5 iş birliği
- Eğitim içerik üreticileri (Instagram): 10-15 iş birliği
- Üniversite öğrenci toplulukları: Kampüs ambassador programı

### 13.3 Büyüme Dönemi (Ay 7-12)

**Referral Programı:**
- "Arkadaşını davet et, 1 ay ücretsiz kazan"
- Davet edilen kişi de 1 hafta ücretsiz premium alır
- Viral döngü: Her kullanıcı ortalama 2.5 kişi davet eder

**Sezonsal Kampanyalar:**
- KPSS sınav başvuru dönemleri: Yoğun reklam
- Sınav sonuçları açıklandığında: "Bir sonraki sınava hazırlan" kampanyası
- Yeni yıl: "Bu yıl KPSS'yi geç" kampanyası
- Öğrenci dönemi başlangıcı (Eylül): Kampüs kampanyaları

**Kurumsal Satış:**
- Dershane ziyaretleri ve demo sunumları
- Eğitim fuarlarına katılım (EĞITEKS vb.)
- Üniversite kariyer merkezleriyle iş birliği

### 13.4 Başarı Metrikleri

| Metrik | Hedef (6. Ay) | Hedef (12. Ay) |
|--------|---------------|----------------|
| Toplam İndirme | 200.000 | 700.000 |
| Aktif Kullanıcı (MAU) | 80.000 | 300.000 |
| Ücretli Kullanıcı | 8.000 | 40.000 |
| Ortalama Oturum Süresi | 25 dk | 35 dk |
| Günlük Aktif Kullanıcı (DAU/MAU) | %25 | %35 |
| App Store Puanı | 4.5+ | 4.6+ |
| Kullanıcı Elde Tutma (30. Gün) | %30 | %40 |

---

## 14. Geliştirme Takvimi

### Faz 1 — MVP (Ay 1-3)

**Ay 1: Temel Altyapı**
- Proje kurulumu (monorepo, CI/CD, Docker)
- Veritabanı şeması ve migration'lar
- Kimlik doğrulama sistemi (e-posta + Google OAuth)
- Temel API endpoint'leri
- React Native proje iskeleti

**Ay 2: Çekirdek Özellikler**
- Soru bankası modülü (2.000 soru ile başlangıç)
- Temel test modu (konu testi, karma test)
- Sınav kategorisi seçimi ve konu ağacı
- Basit kullanıcı profili

**Ay 3: MVP Tamamlama**
- Temel analitik dashboard
- Onboarding akışı
- Offline temel destek (WatermelonDB)
- İç test ve hata düzeltme
- **Çıktı:** İç kullanım için çalışan MVP

### Faz 2 — Beta (Ay 4-5)

**Ay 4: Zengin İçerik**
- Video içerik altyapısı (HLS streaming)
- PDF doküman görüntüleyici
- Tam deneme sınavı motoru
- Push bildirim sistemi
- CMS admin paneli (temel)

**Ay 5: Premium ve Sosyal**
- Premium abonelik sistemi (iyzico + IAP)
- Gamification (rozet, XP, seviye)
- Liderlik tabloları
- Gelişmiş analitik (radar grafik, ısı haritası)
- Kapalı beta başlangıcı (500 kullanıcı)
- **Çıktı:** Beta sürümü, kullanıcı geri bildirimleri

### Faz 3 — Lansman (Ay 6)

- Beta geri bildirimlerine göre iyileştirmeler
- Performans optimizasyonu
- App Store / Google Play başvuruları
- ASO optimizasyonu
- Açık beta (5.000 kullanıcı)
- Resmi lansman
- Pazarlama kampanyası başlangıcı
- **Çıktı:** Canlı uygulama, ilk 50.000 indirme hedefi

### Faz 4 — Büyüme (Ay 7-12)

**Ay 7-8:**
- ÖABT modülleri (tüm alanlar)
- Spaced repetition algoritması
- Arkadaş sistemi ve sosyal özellikler
- Soru raporlama sistemi

**Ay 9-10:**
- Canlı ders altyapısı (WebRTC)
- Grup çalışma odaları
- Gelişmiş CMS (toplu yükleme, versiyonlama)
- ML tabanlı konu önerileri (Python microservice)

**Ay 11-12:**
- Kişiselleştirilmiş çalışma planı v2.0
- Kurumsal panel (dershane yönetimi)
- Çoklu dil desteği altyapısı (gelecek için)
- Yıllık performans raporu özelliği
- **Çıktı:** Olgun platform, 500.000 kullanıcı hedefi

### Sprint Planlaması

```
Sprint Süresi: 2 hafta
Sprint Kapasitesi: 40 story point (5 kişilik ekip)
Retrospektif: Her sprint sonu
Demo: Her sprint sonu (paydaşlara)
```

---

## 15. Bakım ve Güncelleme Yol Haritası

### 15.1 Rutin Bakım

**Haftalık:**
- Yeni soru paketi yükleme (500+ soru)
- Yeni deneme sınavı yayını
- Hata raporları inceleme ve kritik düzeltmeler
- Performans metrikleri gözden geçirme

**Aylık:**
- Uygulama güncellemesi (minor version)
- 20+ yeni video ders
- Kullanıcı geri bildirim analizi
- A/B test sonuçları değerlendirme
- Güvenlik güncellemeleri

**3 Aylık:**
- Büyük özellik sürümü (major version)
- UI/UX iyileştirmeleri
- Performans optimizasyonu
- Bağımlılık güncellemeleri (npm audit)
- Penetrasyon testi

**Yıllık:**
- Büyük mimari gözden geçirme
- Teknoloji yığını değerlendirmesi
- Yeni sınav kategorisi ekleme
- Kapsamlı güvenlik denetimi
- Kullanıcı araştırması (UX audit)

### 15.2 ÖSYM Sınav Takvimine Göre Güncelleme

```
KPSS Sınavı Öncesi (2 Ay):
├── İçerik güncellemesi tamamlanır
├── Yeni deneme sınavları yayınlanır
├── Sunucu kapasitesi artırılır (auto-scaling)
└── Destek ekibi takviyesi

Sınav Günü:
├── Sunucu izleme yoğunlaştırılır
├── Anlık destek hattı aktif
└── Sosyal medya takibi

Sınav Sonrası (48 Saat):
├── Sınav analizi yayınlanır
├── Doğru cevap anahtarı eklenir
└── "Bir sonraki sınava hazırlan" kampanyası
```

### 15.3 Versiyon Yönetimi

```
Semantic Versioning: MAJOR.MINOR.PATCH
Örnek: 2.3.1

MAJOR → Büyük mimari değişiklik veya yeni platform
MINOR → Yeni özellik ekleme
PATCH → Hata düzeltme, küçük iyileştirme

Güncelleme Politikası:
- Zorunlu güncelleme: Kritik güvenlik açıkları
- Önerilen güncelleme: Yeni özellikler
- Arka plan güncelleme: Küçük düzeltmeler
```

---

## 16. Risk Analizi

### 16.1 Teknik Riskler

| Risk | Olasılık | Etki | Azaltma Stratejisi |
|------|----------|------|-------------------|
| Sunucu çökmesi (sınav dönemi) | Orta | Yüksek | Auto-scaling, yük testi, CDN |
| Veri kaybı | Düşük | Çok Yüksek | Günlük yedekleme, multi-region |
| Güvenlik ihlali | Düşük | Çok Yüksek | Penetrasyon testi, KVKK uyumu |
| App Store reddi | Orta | Yüksek | Apple/Google kurallarına tam uyum |
| Üçüncü taraf API kesintisi | Orta | Orta | Fallback mekanizmaları |

### 16.2 İş Riskleri

| Risk | Olasılık | Etki | Azaltma Stratejisi |
|------|----------|------|-------------------|
| Güçlü rakip girişi | Orta | Yüksek | Hızlı özellik geliştirme, marka sadakati |
| İçerik telif hakkı sorunu | Düşük | Yüksek | Özgün içerik üretimi, hukuki danışmanlık |
| ÖSYM format değişikliği | Düşük | Orta | Esnek içerik yapısı, hızlı güncelleme |
| Kullanıcı büyümesinin yavaşlaması | Orta | Orta | Çeşitlendirilmiş pazarlama kanalları |
| Ödeme sağlayıcı sorunları | Düşük | Yüksek | Çoklu ödeme sağlayıcı |

### 16.3 Yasal ve Uyumluluk Riskleri

**KVKK (Kişisel Verilerin Korunması Kanunu):**
- Veri işleme aydınlatma metni
- Açık rıza mekanizması
- Veri silme talebi işleme
- Veri ihlali bildirim prosedürü

**Fikri Mülkiyet:**
- Tüm sorular özgün olarak üretilir veya lisanslı kaynaklardan alınır
- Geçmiş yıl ÖSYM soruları için hukuki değerlendirme
- İçerik üreticileriyle net sözleşmeler

---

## 17. Ekip Yapısı ve Kaynaklar

### 17.1 Çekirdek Geliştirme Ekibi

| Rol | Sayı | Sorumluluk |
|-----|------|------------|
| Proje Yöneticisi | 1 | Sprint planlama, paydaş iletişimi |
| React Native Geliştirici | 2 | Mobil uygulama geliştirme |
| Backend Geliştirici (NestJS) | 2 | API, veritabanı, altyapı |
| UI/UX Tasarımcı | 1 | Ekran tasarımı, kullanıcı araştırması |
| QA Mühendisi | 1 | Test otomasyonu, manuel test |
| DevOps Mühendisi | 1 (yarı zamanlı) | CI/CD, altyapı yönetimi |

### 17.2 İçerik Ekibi

| Rol | Sayı | Sorumluluk |
|-----|------|------------|
| Baş Editör | 1 | İçerik kalite kontrolü |
| Konu Uzmanı (Matematik) | 2 | Soru yazımı, video ders |
| Konu Uzmanı (Türkçe) | 2 | Soru yazımı, video ders |
| Konu Uzmanı (Tarih/Coğrafya) | 2 | Soru yazımı, video ders |
| Konu Uzmanı (ÖABT Alanları) | 5+ | Alan bazlı içerik |
| İçerik Koordinatörü | 1 | CMS yönetimi, yayın takvimi |

### 17.3 Büyüme ve Pazarlama Ekibi

| Rol | Sayı | Sorumluluk |
|-----|------|------------|
| Büyüme Yöneticisi | 1 | Kullanıcı edinme, elde tutma |
| Sosyal Medya Uzmanı | 1 | İçerik üretimi, topluluk yönetimi |
| SEO/ASO Uzmanı | 1 (yarı zamanlı) | Organik büyüme |
| Müşteri Destek | 2 | Kullanıcı soruları, geri bildirim |

### 17.4 Dış Kaynaklar

- **Hukuk Danışmanı:** KVKK uyumu, sözleşmeler (aylık retainer)
- **Muhasebe:** Vergi, fatura yönetimi
- **Video Prodüksiyon:** Stüdyo kiralama veya ekipman yatırımı
- **Grafik Tasarım:** Pazarlama materyalleri (freelance)

---

## 18. Bütçe Tahmini

### 18.1 Başlangıç Yatırımı (İlk 6 Ay)

| Kalem | Aylık Maliyet (₺) | 6 Aylık Toplam (₺) |
|-------|-------------------|---------------------|
| Geliştirme Ekibi (6 kişi) | 450.000 | 2.700.000 |
| İçerik Ekibi (8 kişi) | 240.000 | 1.440.000 |
| Pazarlama & Büyüme (3 kişi) | 120.000 | 720.000 |
| Altyapı (AWS, CDN, araçlar) | 25.000 | 150.000 |
| Pazarlama Bütçesi | 50.000 | 300.000 |
| Hukuk & Muhasebe | 15.000 | 90.000 |
| Ofis & Genel Giderler | 30.000 | 180.000 |
| **Toplam** | **930.000** | **5.580.000** |

### 18.2 Lansman Sonrası Aylık Giderler (Ay 7-12)

| Kalem | Aylık Maliyet (₺) |
|-------|-------------------|
| Ekip (büyüme ile birlikte) | 700.000 |
| Altyapı (ölçeklenen) | 60.000 |
| Pazarlama Bütçesi | 150.000 |
| İçerik Üretimi | 100.000 |
| Diğer | 50.000 |
| **Toplam** | **1.060.000** |

### 18.3 Kâra Geçiş Tahmini

```
Ay 6:  Gelir ~237.000 ₺ / Gider ~930.000 ₺  → Açık: -693.000 ₺
Ay 9:  Gelir ~2.133.000 ₺ / Gider ~1.060.000 ₺ → Kâr: +1.073.000 ₺
Ay 12: Gelir ~3.950.000 ₺ / Gider ~1.200.000 ₺ → Kâr: +2.750.000 ₺
```

*Uygulama yaklaşık 8-9. ayda kâra geçmesi beklenmektedir.*

### 18.4 Finansman Seçenekleri

- **Öz Sermaye:** Kurucu yatırımı (minimum 2 milyon ₺ önerilir)
- **Melek Yatırımcı:** Türkiye'deki eğitim teknolojisi odaklı yatırımcılar
- **KOSGEB Desteği:** Teknoloji girişimi hibeleri
- **TÜBİTAK 1512:** Teknogirişim sermayesi desteği
- **Venture Capital:** Seri A (kullanıcı tabanı oluştuktan sonra)

---

## Sonuç

Bu geliştirme planı, KPSS hazırlık mobil uygulamasının başarılı bir şekilde hayata geçirilmesi için gereken tüm bileşenleri kapsamaktadır. Türkiye'nin büyük ve büyüyen KPSS aday kitlesine hitap eden bu uygulama, doğru teknoloji seçimleri, kaliteli içerik ve güçlü kullanıcı deneyimi ile pazarda önemli bir yer edinme potansiyeline sahiptir.

**Kritik Başarı Faktörleri:**
1. İçerik kalitesi — Doğru, güncel ve pedagojik açıdan sağlam sorular
2. Kullanıcı deneyimi — Sade, hızlı ve güvenilir arayüz
3. Veri odaklı kişiselleştirme — Her kullanıcıya özel öğrenme yolu
4. Topluluk oluşturma — KPSS adayları arasında güvenilir marka
5. Sürekli güncelleme — ÖSYM değişikliklerine hızlı adaptasyon

---

*Bu doküman yaşayan bir belgedir. Proje ilerledikçe güncellenmeye devam edecektir.*  
*Son güncelleme: Mayıs 2026*
