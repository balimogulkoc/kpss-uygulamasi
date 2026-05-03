# Veritabanı Şeması — KPSS Hazırlık Uygulaması

**Doküman:** 02 / 09  
**Konu:** Veritabanı Tasarımı ve Şema  
**Versiyon:** 1.0

---

## 1. Genel Bakış

Uygulama **PostgreSQL 16** ana veritabanı olarak kullanmaktadır. Şema, normalleştirilmiş (3NF) bir yapıda tasarlanmış olup performans için stratejik denormalizasyon uygulanmıştır.

### Tablo Grupları

| Grup | Tablolar | Açıklama |
|------|----------|----------|
| Kullanıcı | users, user_badges, user_settings | Kullanıcı profili ve tercihleri |
| İçerik | exam_categories, subjects, topics, content_items | Konu ağacı ve içerik |
| Soru | questions, solutions, question_tags | Soru bankası |
| Test | mock_exams, exam_questions, user_exam_sessions | Deneme sınavları |
| Aktivite | user_answers, daily_study_logs, study_plans | Kullanıcı aktivitesi |
| Abonelik | subscriptions, payments | Ödeme ve abonelik |
| Sistem | notifications, badges, spaced_repetition | Sistem tabloları |

---

## 2. Tam Şema Tanımları

### 2.1 Kullanıcı Tabloları

```sql
-- =============================================
-- KULLANICI TABLOSU
-- =============================================
CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email               VARCHAR(255) UNIQUE,
    phone               VARCHAR(20) UNIQUE,
    full_name           VARCHAR(100) NOT NULL,
    avatar_url          TEXT,
    
    -- Sınav tercihleri
    exam_category_id    INTEGER REFERENCES exam_categories(id),
    target_exam_date    DATE,
    daily_goal_minutes  INTEGER DEFAULT 60,
    
    -- Abonelik durumu (denormalize - hız için)
    subscription_tier   VARCHAR(20) DEFAULT 'free'
                        CHECK (subscription_tier IN ('free', 'monthly', 'quarterly', 'annual')),
    subscription_expires_at TIMESTAMPTZ,
    
    -- Gamification
    total_xp            INTEGER DEFAULT 0,
    current_level       INTEGER DEFAULT 1,
    current_streak      INTEGER DEFAULT 0,
    longest_streak      INTEGER DEFAULT 0,
    last_activity_date  DATE,
    
    -- Hesap durumu
    is_verified         BOOLEAN DEFAULT FALSE,
    is_active           BOOLEAN DEFAULT TRUE,
    auth_provider       VARCHAR(20) DEFAULT 'email'
                        CHECK (auth_provider IN ('email', 'google', 'apple', 'phone')),
    provider_id         TEXT,
    
    -- Zaman damgaları
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW(),
    last_login_at       TIMESTAMPTZ
);

-- =============================================
-- KULLANICI AYARLARI
-- =============================================
CREATE TABLE user_settings (
    user_id                     UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    
    -- Bildirim tercihleri
    notifications_enabled       BOOLEAN DEFAULT TRUE,
    morning_reminder_enabled    BOOLEAN DEFAULT TRUE,
    morning_reminder_time       TIME DEFAULT '08:00',
    evening_reminder_enabled    BOOLEAN DEFAULT TRUE,
    evening_reminder_time       TIME DEFAULT '20:00',
    streak_alert_enabled        BOOLEAN DEFAULT TRUE,
    
    -- Görünüm tercihleri
    theme                       VARCHAR(10) DEFAULT 'light'
                                CHECK (theme IN ('light', 'dark', 'system')),
    font_size                   VARCHAR(10) DEFAULT 'medium'
                                CHECK (font_size IN ('small', 'medium', 'large')),
    
    -- Gizlilik
    show_in_leaderboard         BOOLEAN DEFAULT TRUE,
    show_city_in_profile        BOOLEAN DEFAULT FALSE,
    
    updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- KULLANICI ROZETLERİ
-- =============================================
CREATE TABLE user_badges (
    id          SERIAL PRIMARY KEY,
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    badge_type  VARCHAR(100) NOT NULL,
    badge_data  JSONB,               -- Rozet ile ilgili ek veri
    earned_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_type)      -- Her rozet bir kez kazanılır
);
```

### 2.2 İçerik Hiyerarşisi Tabloları

```sql
-- =============================================
-- SINAV KATEGORİLERİ
-- =============================================
CREATE TABLE exam_categories (
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(50) UNIQUE NOT NULL,
    -- Örnek: 'lisans', 'onlisans', 'ortaogretim', 'oabt', 'egitim_bilimleri', 'gk_gy'
    name            VARCHAR(100) NOT NULL,
    description     TEXT,
    icon_url        TEXT,
    color_hex       VARCHAR(7),      -- Kategori rengi (#1E3A8A)
    display_order   INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Başlangıç verileri
INSERT INTO exam_categories (code, name, display_order) VALUES
    ('lisans', 'KPSS Lisans', 1),
    ('onlisans', 'KPSS Önlisans', 2),
    ('ortaogretim', 'KPSS Ortaöğretim', 3),
    ('oabt', 'ÖABT', 4),
    ('egitim_bilimleri', 'Eğitim Bilimleri', 5),
    ('gk_gy', 'Genel Kültür - Genel Yetenek', 6);

-- =============================================
-- DERSLER
-- =============================================
CREATE TABLE subjects (
    id              SERIAL PRIMARY KEY,
    category_id     INTEGER REFERENCES exam_categories(id),
    name            VARCHAR(100) NOT NULL,
    code            VARCHAR(50),
    icon_url        TEXT,
    color_hex       VARCHAR(7),
    display_order   INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE
);

-- =============================================
-- KONULAR (HİYERARŞİK YAPI)
-- =============================================
CREATE TABLE topics (
    id              SERIAL PRIMARY KEY,
    subject_id      INTEGER REFERENCES subjects(id),
    parent_id       INTEGER REFERENCES topics(id),  -- NULL ise ana konu
    name            VARCHAR(200) NOT NULL,
    description     TEXT,
    display_order   INTEGER DEFAULT 0,
    estimated_study_minutes INTEGER DEFAULT 30,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- İÇERİK ÖĞELERİ (Video, Metin, PDF)
-- =============================================
CREATE TABLE content_items (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id        INTEGER REFERENCES topics(id),
    content_type    VARCHAR(20) NOT NULL
                    CHECK (content_type IN ('video', 'text', 'pdf')),
    title           VARCHAR(200) NOT NULL,
    
    -- Video için
    video_url       TEXT,            -- HLS manifest URL
    video_duration  INTEGER,         -- Saniye cinsinden
    thumbnail_url   TEXT,
    
    -- Metin için
    content_body    TEXT,            -- Zengin metin (HTML/Markdown)
    
    -- PDF için
    pdf_url         TEXT,
    pdf_page_count  INTEGER,
    
    -- Ortak
    is_premium      BOOLEAN DEFAULT FALSE,
    display_order   INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.3 Soru Bankası Tabloları

```sql
-- =============================================
-- SORULAR
-- =============================================
CREATE TABLE questions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id        INTEGER REFERENCES topics(id),
    
    -- Soru içeriği
    question_text   TEXT NOT NULL,
    question_image_url TEXT,         -- Soru görseli (varsa)
    option_a        TEXT NOT NULL,
    option_b        TEXT NOT NULL,
    option_c        TEXT NOT NULL,
    option_d        TEXT NOT NULL,
    option_e        TEXT,            -- 5. seçenek (bazı sınavlarda)
    correct_answer  CHAR(1) NOT NULL CHECK (correct_answer IN ('A','B','C','D','E')),
    
    -- Sınıflandırma
    difficulty      VARCHAR(20) NOT NULL DEFAULT 'medium'
                    CHECK (difficulty IN ('easy', 'medium', 'hard', 'very_hard')),
    source_year     INTEGER,         -- Geçmiş yıl sorusu ise yılı
    source_exam     VARCHAR(100),    -- Hangi sınavdan (örn: 'KPSS 2023 Lisans')
    
    -- İstatistikler (denormalize - hız için)
    total_attempts  INTEGER DEFAULT 0,
    correct_count   INTEGER DEFAULT 0,
    avg_time_seconds DECIMAL(6,2),
    
    -- Durum
    is_active       BOOLEAN DEFAULT TRUE,
    is_verified     BOOLEAN DEFAULT FALSE,  -- Uzman onayı
    estimated_time  INTEGER DEFAULT 60,     -- Saniye cinsinden tahmini süre
    
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SORU ÇÖZÜMLERİ
-- =============================================
CREATE TABLE solutions (
    id                  SERIAL PRIMARY KEY,
    question_id         UUID REFERENCES questions(id) ON DELETE CASCADE,
    
    solution_text       TEXT NOT NULL,       -- Adım adım metin çözüm
    solution_video_url  TEXT,                -- Video çözüm URL'i
    key_concept         TEXT,                -- Temel kavram
    common_mistakes     TEXT,                -- Sık yapılan hatalar
    related_topic_ids   INTEGER[],           -- İlgili konular
    
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SORU ETİKETLERİ (Çoktan Çoğa)
-- =============================================
CREATE TABLE tags (
    id      SERIAL PRIMARY KEY,
    name    VARCHAR(100) UNIQUE NOT NULL,
    type    VARCHAR(50)  -- 'topic', 'skill', 'difficulty_hint'
);

CREATE TABLE question_tags (
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    tag_id      INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (question_id, tag_id)
);
```

### 2.4 Test ve Sınav Tabloları

```sql
-- =============================================
-- DENEME SINAVI TANIMLARI
-- =============================================
CREATE TABLE mock_exams (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id         INTEGER REFERENCES exam_categories(id),
    title               VARCHAR(200) NOT NULL,
    description         TEXT,
    
    -- Sınav parametreleri
    duration_minutes    INTEGER NOT NULL,
    total_questions     INTEGER NOT NULL,
    passing_score       DECIMAL(5,2),        -- Geçme puanı (varsa)
    
    -- Puanlama
    correct_weight      DECIMAL(4,3) DEFAULT 1.000,
    wrong_penalty       DECIMAL(4,3) DEFAULT 0.250,  -- Yanlış kesinti
    
    -- Erişim
    is_premium          BOOLEAN DEFAULT FALSE,
    publish_date        DATE,
    expire_date         DATE,
    is_active           BOOLEAN DEFAULT TRUE,
    
    -- İstatistikler
    total_attempts      INTEGER DEFAULT 0,
    avg_score           DECIMAL(5,2),
    
    created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SINAV SORULARI (Sınav-Soru İlişkisi)
-- =============================================
CREATE TABLE exam_questions (
    exam_id         UUID REFERENCES mock_exams(id) ON DELETE CASCADE,
    question_id     UUID REFERENCES questions(id),
    question_order  INTEGER NOT NULL,
    section_name    VARCHAR(100),    -- 'Türkçe', 'Matematik' vb.
    PRIMARY KEY (exam_id, question_id)
);

-- =============================================
-- KULLANICI SINAV OTURUMLARI
-- =============================================
CREATE TABLE user_exam_sessions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    exam_id         UUID REFERENCES mock_exams(id),
    
    -- Zaman
    started_at      TIMESTAMPTZ DEFAULT NOW(),
    completed_at    TIMESTAMPTZ,
    time_spent_seconds INTEGER,
    
    -- Sonuçlar
    raw_score       DECIMAL(5,2),
    weighted_score  DECIMAL(5,2),
    percentile      DECIMAL(5,2),
    correct_count   INTEGER DEFAULT 0,
    wrong_count     INTEGER DEFAULT 0,
    empty_count     INTEGER DEFAULT 0,
    
    -- Durum
    status          VARCHAR(20) DEFAULT 'in_progress'
                    CHECK (status IN ('in_progress', 'completed', 'abandoned', 'timed_out')),
    
    -- Bölüm bazlı sonuçlar (JSONB)
    section_results JSONB,
    -- Örnek: {"Türkçe": {"correct": 15, "wrong": 3, "empty": 2}, ...}
    
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.5 Kullanıcı Aktivite Tabloları

```sql
-- =============================================
-- KULLANICI CEVAPLARI
-- =============================================
CREATE TABLE user_answers (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    question_id     UUID REFERENCES questions(id),
    session_id      UUID,            -- Exam session veya practice session ID'si
    session_type    VARCHAR(20)      -- 'exam', 'practice', 'review'
                    CHECK (session_type IN ('exam', 'practice', 'review')),
    
    given_answer    CHAR(1) CHECK (given_answer IN ('A','B','C','D','E')),
    is_correct      BOOLEAN,
    is_skipped      BOOLEAN DEFAULT FALSE,
    time_spent      INTEGER,         -- Saniye cinsinden
    
    answered_at     TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- GÜNLÜK ÇALIŞMA KAYITLARI
-- =============================================
CREATE TABLE daily_study_logs (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID REFERENCES users(id),
    study_date          DATE NOT NULL,
    
    total_minutes       INTEGER DEFAULT 0,
    questions_solved    INTEGER DEFAULT 0,
    correct_answers     INTEGER DEFAULT 0,
    wrong_answers       INTEGER DEFAULT 0,
    xp_earned          INTEGER DEFAULT 0,
    
    -- Konu bazlı dağılım (JSONB)
    subject_breakdown   JSONB,
    -- Örnek: {"matematik": {"solved": 20, "correct": 15}, ...}
    
    UNIQUE(user_id, study_date)
);

-- =============================================
-- ÇALIŞMA PLANLARI
-- =============================================
CREATE TABLE study_plans (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                 UUID REFERENCES users(id),
    exam_date               DATE NOT NULL,
    daily_goal_minutes      INTEGER DEFAULT 60,
    
    -- Plan detayları (JSONB)
    weekly_schedule         JSONB,
    -- Örnek: {"monday": ["matematik", "turkce"], "tuesday": [...]}
    
    topic_priorities        JSONB,
    -- Örnek: [{"topic_id": 1, "priority": "high", "target_date": "2026-06-01"}]
    
    is_active               BOOLEAN DEFAULT TRUE,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    updated_at              TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ARALIKLI TEKRAR (SPACED REPETITION)
-- =============================================
CREATE TABLE spaced_repetition (
    id                  SERIAL PRIMARY KEY,
    user_id             UUID REFERENCES users(id),
    question_id         UUID REFERENCES questions(id),
    
    -- SM-2 algoritması parametreleri
    ease_factor         DECIMAL(4,2) DEFAULT 2.50,
    interval_days       INTEGER DEFAULT 1,
    repetition_count    INTEGER DEFAULT 0,
    
    next_review_date    DATE NOT NULL DEFAULT CURRENT_DATE + 1,
    last_reviewed_at    TIMESTAMPTZ,
    
    UNIQUE(user_id, question_id)
);

-- =============================================
-- FAVORİ SORULAR
-- =============================================
CREATE TABLE user_favorites (
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    question_id     UUID REFERENCES questions(id) ON DELETE CASCADE,
    added_at        TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, question_id)
);
```

### 2.6 Abonelik ve Ödeme Tabloları

```sql
-- =============================================
-- ABONELİKLER
-- =============================================
CREATE TABLE subscriptions (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id                     UUID REFERENCES users(id),
    
    plan_type                   VARCHAR(50) NOT NULL
                                CHECK (plan_type IN ('monthly', 'quarterly', 'annual')),
    start_date                  DATE NOT NULL,
    end_date                    DATE NOT NULL,
    
    -- Ödeme bilgileri
    amount                      DECIMAL(10,2) NOT NULL,
    currency                    VARCHAR(3) DEFAULT 'TRY',
    payment_provider            VARCHAR(50)
                                CHECK (payment_provider IN ('iyzico', 'apple', 'google')),
    provider_subscription_id    TEXT,
    
    -- Durum
    status                      VARCHAR(20) DEFAULT 'active'
                                CHECK (status IN ('active', 'cancelled', 'expired', 'paused')),
    cancelled_at                TIMESTAMPTZ,
    cancellation_reason         TEXT,
    
    -- Otomatik yenileme
    auto_renew                  BOOLEAN DEFAULT TRUE,
    
    created_at                  TIMESTAMPTZ DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ÖDEMELER
-- =============================================
CREATE TABLE payments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subscription_id     UUID REFERENCES subscriptions(id),
    user_id             UUID REFERENCES users(id),
    
    amount              DECIMAL(10,2) NOT NULL,
    currency            VARCHAR(3) DEFAULT 'TRY',
    
    payment_provider    VARCHAR(50),
    provider_payment_id TEXT,
    provider_response   JSONB,       -- Ham ödeme sağlayıcı yanıtı
    
    status              VARCHAR(20) DEFAULT 'pending'
                        CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    
    paid_at             TIMESTAMPTZ,
    created_at          TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.7 Sistem Tabloları

```sql
-- =============================================
-- BİLDİRİMLER
-- =============================================
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    
    type            VARCHAR(50) NOT NULL,
    -- 'daily_reminder', 'streak_alert', 'exam_date', 'achievement', 'new_content'
    
    title           VARCHAR(200) NOT NULL,
    body            TEXT NOT NULL,
    data            JSONB,           -- Deep link ve ek veri
    
    is_read         BOOLEAN DEFAULT FALSE,
    sent_at         TIMESTAMPTZ,
    read_at         TIMESTAMPTZ,
    
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROZET TANIMLARI
-- =============================================
CREATE TABLE badge_definitions (
    id              SERIAL PRIMARY KEY,
    code            VARCHAR(100) UNIQUE NOT NULL,
    name            VARCHAR(100) NOT NULL,
    description     TEXT,
    icon_url        TEXT,
    
    -- Kazanma koşulu
    condition_type  VARCHAR(50),
    -- 'questions_solved', 'streak_days', 'exam_completed', 'accuracy_rate'
    condition_value INTEGER,
    
    xp_reward       INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT TRUE
);

-- Başlangıç rozet verileri
INSERT INTO badge_definitions (code, name, description, condition_type, condition_value, xp_reward) VALUES
    ('first_question', 'İlk Adım', 'İlk soruyu çöz', 'questions_solved', 1, 50),
    ('streak_7', 'Çalışkan', '7 gün üst üste çalış', 'streak_days', 7, 200),
    ('streak_30', 'Azimli', '30 gün üst üste çalış', 'streak_days', 30, 1000),
    ('questions_100', 'Yüzlük', '100 soru çöz', 'questions_solved', 100, 300),
    ('questions_1000', 'Binlik', '1000 soru çöz', 'questions_solved', 1000, 1500),
    ('exam_champion', 'Deneme Şampiyonu', '10 deneme sınavı tamamla', 'exam_completed', 10, 500),
    ('perfect_score', 'Mükemmeliyetçi', 'Bir konudan %100 doğruluk', 'accuracy_rate', 100, 300);
```

---

## 3. İndeksler

```sql
-- =============================================
-- PERFORMANS İNDEKSLERİ
-- =============================================

-- Kullanıcı sorguları
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX idx_users_exam_category ON users(exam_category_id);

-- Soru sorguları (en kritik)
CREATE INDEX idx_questions_topic_id ON questions(topic_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_source_year ON questions(source_year);
CREATE INDEX idx_questions_is_active ON questions(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_questions_is_verified ON questions(is_verified) WHERE is_verified = TRUE;

-- Bileşik indeks: Konu + Zorluk filtresi
CREATE INDEX idx_questions_topic_difficulty ON questions(topic_id, difficulty);

-- Kullanıcı cevapları (en yoğun yazma tablosu)
CREATE INDEX idx_user_answers_user_id ON user_answers(user_id);
CREATE INDEX idx_user_answers_question_id ON user_answers(question_id);
CREATE INDEX idx_user_answers_session_id ON user_answers(session_id);
CREATE INDEX idx_user_answers_answered_at ON user_answers(answered_at DESC);

-- Bileşik: Kullanıcı + Soru (duplicate cevap kontrolü)
CREATE INDEX idx_user_answers_user_question ON user_answers(user_id, question_id);

-- Sınav oturumları
CREATE INDEX idx_exam_sessions_user_id ON user_exam_sessions(user_id);
CREATE INDEX idx_exam_sessions_exam_id ON user_exam_sessions(exam_id);
CREATE INDEX idx_exam_sessions_status ON user_exam_sessions(status);

-- Günlük çalışma kayıtları
CREATE INDEX idx_daily_logs_user_date ON daily_study_logs(user_id, study_date DESC);

-- Abonelikler
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_end_date ON subscriptions(end_date);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Aralıklı tekrar
CREATE INDEX idx_spaced_rep_user_date ON spaced_repetition(user_id, next_review_date);

-- Bildirimler
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read)
    WHERE is_read = FALSE;
```

---

## 4. Veritabanı Fonksiyonları ve Trigger'lar

```sql
-- =============================================
-- KULLANICI GÜNCELLEME TRIGGER'I
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- SORU İSTATİSTİKLERİ GÜNCELLEME
-- =============================================
CREATE OR REPLACE FUNCTION update_question_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE questions
    SET
        total_attempts = total_attempts + 1,
        correct_count = correct_count + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END
    WHERE id = NEW.question_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_question_stats
    AFTER INSERT ON user_answers
    FOR EACH ROW EXECUTE FUNCTION update_question_stats();

-- =============================================
-- GÜNLÜK ÇALIŞMA LOGU GÜNCELLEME
-- =============================================
CREATE OR REPLACE FUNCTION upsert_daily_study_log(
    p_user_id UUID,
    p_minutes INTEGER,
    p_questions INTEGER,
    p_correct INTEGER
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO daily_study_logs (user_id, study_date, total_minutes, questions_solved, correct_answers)
    VALUES (p_user_id, CURRENT_DATE, p_minutes, p_questions, p_correct)
    ON CONFLICT (user_id, study_date)
    DO UPDATE SET
        total_minutes = daily_study_logs.total_minutes + EXCLUDED.total_minutes,
        questions_solved = daily_study_logs.questions_solved + EXCLUDED.questions_solved,
        correct_answers = daily_study_logs.correct_answers + EXCLUDED.correct_answers;
END;
$$ LANGUAGE plpgsql;
```

---

## 5. Veri Yedekleme Stratejisi

```
Yedekleme Planı:
├── Anlık (Continuous): WAL (Write-Ahead Log) streaming → S3
├── Günlük: Tam veritabanı snapshot → S3 (30 gün saklama)
├── Haftalık: Arşiv yedek → S3 Glacier (1 yıl saklama)
└── Aylık: Uzun dönem arşiv → S3 Glacier Deep Archive (7 yıl)

Kurtarma Hedefleri:
├── RPO (Recovery Point Objective): < 1 saat
└── RTO (Recovery Time Objective): < 4 saat

Test:
└── Aylık kurtarma tatbikatı (staging ortamında)
```

---

## 6. Veri Büyüme Tahmini

| Tablo | Yıl 1 | Yıl 2 | Yıl 3 |
|-------|-------|-------|-------|
| users | 500K | 1.5M | 3M |
| questions | 60K | 80K | 100K |
| user_answers | 150M | 600M | 1.5B |
| daily_study_logs | 15M | 50M | 120M |
| user_exam_sessions | 5M | 20M | 50M |

**Partitioning Stratejisi (Yıl 2+):**
- `user_answers` tablosu: `answered_at` sütununa göre aylık partition
- `daily_study_logs` tablosu: `study_date` sütununa göre yıllık partition

---

*Son güncelleme: Mayıs 2026*