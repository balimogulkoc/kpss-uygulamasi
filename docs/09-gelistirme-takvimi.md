# Geliştirme Takvimi ve Yol Haritası — KPSS Hazırlık Uygulaması

**Doküman:** 09 / 09  
**Konu:** Sprint Planlaması, Faz Takvimi ve Bakım Yol Haritası  
**Versiyon:** 1.0

---

## 1. Geliştirme Fazları Özeti

| Faz | Süre | Çıktı | Hedef |
|-----|------|-------|-------|
| Faz 1 — MVP | Ay 1-3 | Çalışan MVP | İç test |
| Faz 2 — Beta | Ay 4-5 | Beta sürümü | 500 beta kullanıcısı |
| Faz 3 — Lansman | Ay 6 | Canlı uygulama | 50.000 indirme |
| Faz 4 — Büyüme | Ay 7-12 | Olgun platform | 500.000 kullanıcı |

---

## 2. Faz 1 — MVP (Ay 1-3)

### Ay 1: Temel Altyapı

**Backend:**
- Monorepo kurulumu (Turborepo)
- Docker Compose geliştirme ortamı
- PostgreSQL şema ve migration'lar (Prisma ORM)
- Kimlik doğrulama sistemi (JWT + Google OAuth)
- Temel API endpoint'leri (auth, users, categories)
- CI/CD pipeline (GitHub Actions)

**Frontend:**
- React Native + Expo proje iskeleti
- Navigasyon yapısı (React Navigation v6)
- Redux Toolkit + React Query kurulumu
- Temel bileşen kütüphanesi (Button, Card, Input)
- Auth ekranları (giriş, kayıt, şifre sıfırlama)

**Altyapı:**
- AWS hesap kurulumu
- Staging ortamı (ECS Fargate)
- Sentry hata takibi entegrasyonu

### Ay 2: Çekirdek Özellikler

**Backend:**
- Soru bankası API'si (CRUD, filtreleme, sayfalama)
- Konu ağacı API'si (hiyerarşik yapı)
- Kullanıcı cevap kaydetme
- Temel analitik hesaplama (doğruluk oranı, süre)
- 5.000 soru ile başlangıç verisi yükleme

**Frontend:**
- Sınav kategorisi seçim ekranı
- Konu listesi ve detay ekranları
- Soru çözme ekranı (temel)
- Soru bankası filtreleme
- Temel kullanıcı profili

**İçerik:**
- CMS kurulumu (Payload CMS)
- İlk 5.000 sorunun yüklenmesi
- Soru şablonu ve kalite kontrol süreci

### Ay 3: MVP Tamamlama

**Backend:**
- Temel deneme sınavı motoru
- Puanlama algoritması (ham puan + yanlış kesinti)
- Offline senkronizasyon API'si
- Push bildirim altyapısı (FCM)

**Frontend:**
- Onboarding akışı (5 adım)
- Temel analitik dashboard
- WatermelonDB offline depolama
- Deneme sınavı (temel versiyon)
- Dark mode desteği

**Test:**
- Unit test kapsamı: %60+
- Temel E2E testler (Detox)
- İç ekip test süreci

**Çıktı:** Çalışan MVP — iç kullanım ve paydaş demosu

---

## 3. Faz 2 — Beta (Ay 4-5)

### Ay 4: Zengin İçerik ve Premium

**Backend:**
- Video içerik altyapısı (HLS streaming)
- iyzico ödeme entegrasyonu
- Apple IAP + Google Play Billing
- Abonelik yönetim sistemi
- Gelişmiş analitik (yüzdelik dilim, konu bazlı)

**Frontend:**
- Video oynatıcı (react-native-video + HLS)
- PDF görüntüleyici
- Premium abonelik ekranları
- Ödeme akışı
- Gelişmiş analitik dashboard (radar grafik, ısı haritası)

**İçerik:**
- 15.000 soruya ulaşma
- İlk 50 video ders yükleme
- 4 tam deneme sınavı hazırlama

### Ay 5: Gamification ve Sosyal

**Backend:**
- XP ve seviye sistemi
- Rozet motoru
- Liderlik tabloları (Redis Sorted Sets)
- Spaced repetition algoritması (SM-2)
- Arkadaş sistemi API'si

**Frontend:**
- Rozet ve XP animasyonları (Lottie)
- Liderlik tablosu ekranları
- Arkadaş ekleme ve karşılaştırma
- Günlük seri (streak) gösterimi
- Kişiselleştirilmiş çalışma planı

**Test:**
- Kapalı beta başlangıcı (500 kullanıcı)
- Performans testi (k6)
- Güvenlik taraması (OWASP ZAP)

**Çıktı:** Beta sürümü — kullanıcı geri bildirimleri ve hata düzeltmeleri

---

## 4. Faz 3 — Lansman (Ay 6)

### Hafta 1-2: Beta Geri Bildirim Düzeltmeleri
- Kritik hata düzeltmeleri (P0, P1)
- UX iyileştirmeleri (beta geri bildirimlerine göre)
- Performans optimizasyonu
- Açık beta başlangıcı (5.000 kullanıcı)

### Hafta 3: App Store Hazırlığı
- App Store Connect başvurusu (iOS)
- Google Play Console başvurusu (Android)
- ASO optimizasyonu (başlık, açıklama, ekran görüntüleri)
- Tanıtım videosu hazırlama
- Gizlilik politikası ve kullanım şartları

### Hafta 4: Resmi Lansman
- App Store ve Google Play yayını
- Pazarlama kampanyası başlangıcı
- Influencer iş birlikleri aktivasyonu
- PR bülteni yayını
- Sosyal medya lansman kampanyası

**Çıktı:** Canlı uygulama — ilk 50.000 indirme hedefi

---

## 5. Faz 4 — Büyüme (Ay 7-12)

### Ay 7-8: Genişleme

| Özellik | Öncelik | Süre |
|---------|---------|------|
| ÖABT tüm alanları (20 alan) | Yüksek | 6 hafta |
| Spaced repetition UI | Yüksek | 2 hafta |
| Soru raporlama sistemi | Orta | 1 hafta |
| Gelişmiş CMS (toplu yükleme) | Orta | 2 hafta |
| Performans optimizasyonu | Yüksek | Sürekli |

### Ay 9-10: Sosyal ve Yapay Zeka

| Özellik | Öncelik | Süre |
|---------|---------|------|
| Grup çalışma odaları | Orta | 4 hafta |
| ML tabanlı konu önerileri | Yüksek | 6 hafta |
| Canlı ders altyapısı (WebRTC) | Düşük | 8 hafta |
| Kurumsal panel (dershane) | Orta | 4 hafta |
| Gelişmiş bildirim segmentasyonu | Orta | 2 hafta |

### Ay 11-12: Olgunlaşma

| Özellik | Öncelik | Süre |
|---------|---------|------|
| Kişiselleştirilmiş plan v2.0 | Yüksek | 4 hafta |
| Yıllık performans raporu | Orta | 2 hafta |
| Çoklu dil altyapısı (gelecek) | Düşük | 3 hafta |
| Mikroservis geçiş planı | Yüksek | Planlama |
| Kapsamlı güvenlik denetimi | Yüksek | 2 hafta |

---

## 6. Sprint Planlaması

```
Sprint Süresi:    2 hafta
Sprint Kapasitesi: 40 story point (5 kişilik geliştirme ekibi)
Seremoniler:
├── Sprint Planning:    Her sprint başı (2 saat)
├── Daily Standup:      Her gün (15 dakika)
├── Sprint Review:      Her sprint sonu (1 saat, paydaşlara demo)
└── Retrospective:      Her sprint sonu (1 saat)

Story Point Ölçeği:
├── 1 SP:  < 2 saat
├── 2 SP:  2-4 saat
├── 3 SP:  4-8 saat
├── 5 SP:  1-2 gün
├── 8 SP:  2-3 gün
└── 13 SP: 3-5 gün (bölünmeli)
```

---

## 7. Bakım ve Güncelleme Yol Haritası

### Rutin Bakım Takvimi

| Sıklık | Görev |
|--------|-------|
| Haftalık | 500+ yeni soru yükleme, 1 deneme sınavı yayını, hata raporları inceleme |
| Aylık | Minor versiyon güncellemesi, 20+ video ders, güvenlik güncellemeleri |
| 3 Aylık | Major özellik sürümü, penetrasyon testi, bağımlılık güncellemeleri |
| Yıllık | Mimari gözden geçirme, teknoloji yığını değerlendirmesi, UX audit |

### Versiyon Yönetimi

```
Semantic Versioning: MAJOR.MINOR.PATCH

MAJOR → Büyük mimari değişiklik veya yeni platform
MINOR → Yeni özellik ekleme
PATCH → Hata düzeltme, küçük iyileştirme

Güncelleme Politikası:
├── Zorunlu güncelleme: Kritik güvenlik açıkları (P0)
├── Önerilen güncelleme: Yeni özellikler
└── Arka plan güncelleme: Küçük düzeltmeler (OTA)
```

### ÖSYM Sınav Dönemine Göre Hazırlık

```
Sınav Öncesi 2 Ay:
├── İçerik güncellemesi tamamlanır
├── Yeni deneme sınavları yayınlanır
├── Sunucu kapasitesi artırılır (auto-scaling limiti yükseltilir)
└── Destek ekibi takviyesi

Sınav Günü:
├── Sunucu izleme yoğunlaştırılır (15 dakikada bir kontrol)
├── Anlık destek hattı aktif
└── Sosyal medya takibi

Sınav Sonrası 48 Saat:
├── Sınav analizi yayınlanır
├── Doğru cevap anahtarı eklenir
└── "Bir sonraki sınava hazırlan" kampanyası başlar
```

---

## 8. Teknik Borç Yönetimi

Her sprint'in %20'si teknik borç ödemeye ayrılır:
- Kod refactoring
- Test kapsamı artırma
- Dokümantasyon güncelleme
- Bağımlılık güncellemeleri
- Performans iyileştirmeleri

**Teknik Borç Takibi:** GitHub Issues'da `tech-debt` etiketi ile izlenir. Aylık teknik borç gözden geçirme toplantısı yapılır.

---

## 9. Ekip Yapısı

### Çekirdek Geliştirme Ekibi

| Rol | Sayı | Sorumluluk |
|-----|------|------------|
| Proje Yöneticisi | 1 | Sprint planlama, paydaş iletişimi |
| React Native Geliştirici | 2 | Mobil uygulama |
| Backend Geliştirici (NestJS) | 2 | API, veritabanı, altyapı |
| UI/UX Tasarımcı | 1 | Ekran tasarımı, kullanıcı araştırması |
| QA Mühendisi | 1 | Test otomasyonu, manuel test |
| DevOps (yarı zamanlı) | 1 | CI/CD, altyapı yönetimi |

### İçerik Ekibi

| Rol | Sayı |
|-----|------|
| Baş Editör | 1 |
| Konu Uzmanı (Matematik, Türkçe, Tarih/Coğrafya) | 6 |
| ÖABT Alan Uzmanları | 5+ |
| İçerik Koordinatörü | 1 |

---

## 10. Başarı Kriterleri — 12 Ay Sonu

| KPI | Hedef |
|-----|-------|
| Toplam indirme | 700.000+ |
| Aylık aktif kullanıcı (MAU) | 300.000+ |
| Ücretli kullanıcı | 40.000+ |
| App Store puanı | ≥ 4.6 |
| Aylık gelir | 3.950.000 ₺+ |
| Soru bankası | 59.000+ |
| Gün 30 elde tutma | %35+ |
| NPS skoru | > 50 |

---

*Bu doküman yaşayan bir belgedir. Her sprint sonunda güncellenir.*  
*Son güncelleme: Mayıs 2026*