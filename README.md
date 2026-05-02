# 📚 KPSS Hazırlık — Akıllı Sınav Hazırlık Uygulaması

KPSS Hazırlık, Türkiye'deki kamu personeli seçme sınavlarına hazırlanan adaylar için geliştirilmiş kapsamlı bir mobil uygulamadır. Uygulama; soru bankası, deneme sınavları, video dersler ve kişiselleştirilmiş çalışma planı ile adayların sınava en verimli şekilde hazırlanmasını sağlar.

---

## 🎯 Uygulama Ne İşe Yarar?

### Soru Bankası
Uygulamada 59.000'den fazla soru bulunur. Sorular konu, zorluk seviyesi ve sınav yılına göre filtrelenebilir. Her sorunun adım adım açıklamalı çözümü mevcuttur. Geçmiş yıl ÖSYM soruları da soru bankasına dahildir.

### Deneme Sınavları
Gerçek sınav formatında, süreli tam deneme sınavları çözülebilir. Sınav bittikten sonra puan, yüzdelik dilim ve konu bazlı analiz anında gösterilir. Haftalık yeni denemeler yayınlanır.

### Video Dersler ve Konu Anlatımları
Uzman eğitmenler tarafından hazırlanmış video dersler ve PDF özet notlar uygulamada yer alır. İnternet bağlantısı olmadan da (offline) izlenebilir ve okunabilir.

### Kişiselleştirilmiş Çalışma Planı
Sınav tarihi ve günlük çalışma süresi girilerek otomatik bir çalışma takvimi oluşturulur. Zayıf olunan konular tespit edilir ve plana ek süre atanır. Sınava yaklaştıkça plan tekrar ağırlıklı hale gelir.

### Performans Takibi
Hangi konularda güçlü, hangi konularda zayıf olunduğu grafiklerle gösterilir. Çalışma süresi, doğruluk oranı ve gelişim eğrisi takip edilebilir. Diğer kullanıcılarla karşılaştırmalı sıralama görüntülenebilir.

### Bildirimler ve Hatırlatıcılar
Günlük çalışma hatırlatıcıları, sınav tarihi geri sayımı ve yeni içerik bildirimleri ile çalışma düzeni korunur.

---

## 📝 Desteklenen Sınav Kategorileri

| Sınav | Kimler İçin |
|-------|-------------|
| KPSS Lisans | 4 yıllık üniversite mezunları |
| KPSS Önlisans | 2 yıllık önlisans mezunları |
| KPSS Ortaöğretim | Lise mezunları |
| ÖABT | Öğretmen adayları (alan bilgisi) |
| Eğitim Bilimleri | Öğretmen adayları (pedagoji) |
| Genel Kültür / Genel Yetenek | Tüm adaylar |

---

## ✨ Öne Çıkan Özellikler

**Aralıklı Tekrar (Spaced Repetition)**
Yanlış yapılan sorular akıllı bir algoritmayla belirlenen aralıklarda tekrar karşıya çıkar. Bu yöntem, kalıcı öğrenmeyi bilimsel olarak destekler.

**Gamification**
Soru çözdükçe XP kazanılır, rozetler açılır ve seviye atlanır. Günlük çalışma serisi (streak) korunarak motivasyon yüksek tutulur. Arkadaşlarla haftalık sıralama yarışması yapılabilir.

**Offline Erişim (Premium)**
Video dersler ve soru paketleri önceden indirilerek internet olmadan da çalışılabilir. Cevaplar internet bağlantısı sağlandığında otomatik olarak senkronize edilir.

**ÖSYM Sınav Sonrası Hızlı Güncelleme**
Sınav günü sorular toplanır, 24 saat içinde video çözümler yayınlanır, 48 saat içinde sınav analiz raporu hazırlanır.

---

## 💎 Üyelik Planları

| Plan | Fiyat | Özellikler |
|------|-------|------------|
| Ücretsiz | 0 ₺ | Günlük 10 soru, temel konu anlatımı, 1 deneme/ay |
| Aylık Premium | 79 ₺/ay | Sınırsız soru, tüm denemeler, offline erişim, reklamsız |
| 3 Aylık Premium | 199 ₺ | Aylık premium + kişisel çalışma planı |
| Yıllık Premium | 599 ₺ | Tüm özellikler + canlı ders erişimi |

7 günlük ücretsiz deneme — kredi kartı gerekmez.

---

## 📱 Platformlar

- **Android** — Google Play Store
- **iOS** — Apple App Store

---

## 🚀 Kurulum ve Çalıştırma

> **Not:** Bu depo şu an yalnızca planlama ve teknik dokümantasyon içermektedir. Uygulama kodu henüz geliştirilme aşamasındadır. Aşağıdaki adımlar, geliştirme ortamının nasıl kurulacağını göstermektedir.

### Ön Gereksinimler

Geliştirme ortamını kurmadan önce aşağıdakilerin yüklü olması gerekir:

- [Node.js](https://nodejs.org/) v18 veya üzeri
- [npm](https://www.npmjs.com/) v9 veya üzeri
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- [Android Studio](https://developer.android.com/studio) (Android emülatörü için) veya fiziksel Android cihaz
- [Xcode](https://developer.apple.com/xcode/) (iOS simülatörü için, yalnızca macOS)
- [Expo Go](https://expo.dev/client) uygulaması (fiziksel cihazda test için)

### Projeyi Klonlama

```bash
git clone https://github.com/kullanici-adi/kpss-hazirlik.git
cd kpss-hazirlik
```

### Bağımlılıkları Yükleme

```bash
npm install
```

### Uygulamayı Başlatma

```bash
# Expo geliştirme sunucusunu başlat
npx expo start
```

Sunucu başladıktan sonra:

- **Android emülatöründe açmak için:** `a` tuşuna bas
- **iOS simülatöründe açmak için:** `i` tuşuna bas (yalnızca macOS)
- **Fiziksel cihazda açmak için:** Expo Go uygulamasıyla QR kodu tara

### Backend Sunucusunu Başlatma

```bash
cd backend
npm install
npm run start:dev
```

Backend varsayılan olarak `http://localhost:3000` adresinde çalışır.

### Ortam Değişkenleri

Proje kökünde `.env` dosyası oluşturun:

```env
API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/kpss_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
```

---

## 🗂️ Geliştirici Dokümantasyonu

Bu depo, uygulamanın teknik geliştirme planını ve mimarisini içerir.

```
KPSS Uygulaması/
├── KPSS-App-Development-Plan.md   ← Kapsamlı geliştirme planı (tek dosya)
└── docs/
    ├── 01-teknik-mimari.md        ← Teknoloji seçimleri ve altyapı
    ├── 02-veritabani-semasi.md    ← Veritabanı tasarımı
    ├── 03-ui-ux-tasarim.md        ← Arayüz tasarım ilkeleri
    ├── 04-icerik-yonetimi.md      ← İçerik üretim ve yönetim süreci
    ├── 05-monetizasyon.md         ← Gelir modeli ve ödeme entegrasyonu
    ├── 06-kullanici-bagliligi.md  ← Gamification ve elde tutma stratejisi
    ├── 07-kalite-guvence.md       ← Test ve kalite güvence yaklaşımı
    ├── 08-pazarlama-stratejisi.md ← Lansman ve pazarlama planı
    └── 09-gelistirme-takvimi.md   ← Faz bazlı geliştirme takvimi
```

---

*Son güncelleme: Mayıs 2026*