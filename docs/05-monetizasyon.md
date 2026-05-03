# Monetizasyon Modeli — KPSS Hazırlık Uygulaması

**Doküman:** 05 / 09  
**Konu:** Gelir Modeli, Abonelik Planları ve Ödeme Entegrasyonu  
**Versiyon:** 1.0

---

## 1. Abonelik Planları

| Plan | Fiyat | Fatura | Temel Özellikler |
|------|-------|--------|-----------------|
| **Ücretsiz** | 0 ₺ | — | Günlük 10 soru, temel konu anlatımı, reklam var, 1 deneme/ay |
| **Aylık Premium** | 79 ₺ | Aylık | Sınırsız soru, tüm denemeler, reklamsız, gelişmiş analitik, offline erişim |
| **3 Aylık Premium** | 199 ₺ | 3 Aylık | Aylık premium + kişisel çalışma planı + öncelikli destek |
| **Yıllık Premium** | 599 ₺ | Yıllık | Tüm özellikler + canlı ders erişimi + 1-1 danışmanlık (2 seans) |

### Fiyatlandırma Notları
- Yıllık plan, aylık plana göre **%37 tasarruf** sağlar
- Türk kullanıcılar için taksit seçeneği (3, 6, 12 taksit — iyzico üzerinden)
- Öğrenci indirimi: **%20** (öğrenci e-postası doğrulaması ile)
- Grup indirimi: 5+ kullanıcı için **%15**
- 7 günlük ücretsiz deneme (kredi kartı gerekmez)

---

## 2. Ücretsiz vs. Premium Özellik Karşılaştırması

| Özellik | Ücretsiz | Premium |
|---------|----------|---------|
| Günlük soru limiti | 10 soru | Sınırsız |
| Deneme sınavı | 1/ay | Sınırsız |
| Video dersler | İlk 3 dakika | Tam erişim |
| Offline erişim | ❌ | ✅ |
| Gelişmiş analitik | Temel | Tam (radar, ısı haritası) |
| Reklam | Var | Yok |
| Çalışma planı | Standart | Kişiselleştirilmiş |
| Öncelikli destek | ❌ | ✅ |
| Liderlik tablosu | Görüntüleme | Tam katılım |
| Spaced repetition | ❌ | ✅ |

---

## 3. Ödeme Entegrasyonu

### 3.1 Ödeme Sağlayıcıları

**iyzico (Web + Android)**
- Türkiye'nin lider ödeme altyapısı
- Taksitli ödeme desteği (3, 6, 12 taksit)
- Troy, Visa, Mastercard desteği
- 3D Secure zorunlu
- Webhook ile abonelik durumu senkronizasyonu

**Apple In-App Purchase (iOS)**
- iOS kullanıcıları için App Store kuralları gereği zorunlu
- Apple %30 komisyon (ilk yıl), %15 (sonraki yıllar)
- StoreKit 2 API kullanımı
- Server-side receipt validation

**Google Play Billing (Android)**
- Google Play üzerinden satın alma
- Google %30 komisyon (ilk yıl), %15 (sonraki yıllar)
- Real-time Developer Notifications (RTDN)

### 3.2 Desteklenen Ödeme Yöntemleri

```
Kredi/Banka Kartı:
├── Visa, Mastercard, Troy
├── Taksitli ödeme (3, 6, 12 taksit)
└── Sanal kart desteği

Dijital Cüzdanlar:
├── Apple Pay (iOS)
└── Google Pay (Android)

Banka Transferi:
└── EFT/Havale (yıllık planlar için)
```

### 3.3 Abonelik Yaşam Döngüsü

```
Kayıt → Ücretsiz Deneme (7 gün)
    ↓
Deneme Sonu → Ücretli Abonelik Başlangıcı
    ↓
Otomatik Yenileme (her dönem)
    ↓
İptal / Sona Erme → Ücretsiz Plana Düşüş
```

**Yenileme Başarısız Olursa:**
- Gün 1: İlk yenileme denemesi
- Gün 3: İkinci deneme + e-posta bildirimi
- Gün 7: Son deneme + push bildirimi
- Gün 8: Ücretsiz plana düşüş (veri korunur)

---

## 4. Reklam Geliri (Ücretsiz Kullanıcılar)

### Google AdMob Entegrasyonu

| Reklam Türü | Konum | Sıklık |
|-------------|-------|--------|
| Banner | Soru listesi altı | Sürekli |
| Interstitial | Test tamamlama sonrası | Her 3 testte 1 |
| Rewarded Video | Ekstra soru hakkı için | İsteğe bağlı |

**Reklam Politikası:**
- Soru çözme sırasında reklam gösterilmez
- Günde maksimum 5 interstitial reklam
- Rewarded video: kullanıcı isteğiyle, 5 ekstra soru hakkı karşılığı
- Tahmini reklam geliri: 2-5 ₺/kullanıcı/ay

---

## 5. Kurumsal Lisanslar

### Hedef Kurumlar
- Dershaneler ve özel kurslar
- Üniversite kariyer merkezleri
- Kamu kurumları (personel eğitimi)

### Kurumsal Plan Özellikleri
- Öğrenci takip paneli (yönetici dashboard)
- Toplu kullanıcı yönetimi (CSV import)
- Özel marka özelleştirme (white-label seçeneği)
- Aylık performans raporları
- Öncelikli teknik destek

### Fiyatlandırma

| Kullanıcı Sayısı | Kullanıcı Başına Aylık |
|-----------------|----------------------|
| 10-50 | 45 ₺ |
| 51-200 | 35 ₺ |
| 201-500 | 25 ₺ |
| 500+ | Özel teklif |

---

## 6. Gelir Projeksiyonu

### 12 Aylık Projeksiyon

| Ay | Toplam Kullanıcı | Ücretli Kullanıcı | Aylık Gelir (₺) |
|----|-----------------|-------------------|-----------------|
| 3 | 50.000 | 3.000 | 237.000 |
| 6 | 150.000 | 12.000 | 948.000 |
| 9 | 300.000 | 27.000 | 2.133.000 |
| 12 | 500.000 | 50.000 | 3.950.000 |

*%8-10 dönüşüm oranı ve ortalama 79 ₺/ay abonelik üzerinden hesaplanmıştır.*

### Gelir Kanalı Dağılımı (12. Ay Tahmini)

```
Abonelik geliri:      %75  (~2.962.500 ₺)
Reklam geliri:        %15  (~592.500 ₺)
Kurumsal lisanslar:   %8   (~316.000 ₺)
Diğer:                %2   (~79.000 ₺)
```

---

## 7. Kâra Geçiş Analizi

```
Ay 6:  Gelir ~948.000 ₺  / Gider ~930.000 ₺  → Yaklaşık başabaş
Ay 8:  Gelir ~1.500.000 ₺ / Gider ~1.060.000 ₺ → Kâr: +440.000 ₺
Ay 12: Gelir ~3.950.000 ₺ / Gider ~1.200.000 ₺ → Kâr: +2.750.000 ₺
```

**Kâra geçiş tahmini: 7-8. ay**

---

## 8. Finansman Seçenekleri

| Kaynak | Tutar | Koşul |
|--------|-------|-------|
| Öz sermaye | 2.000.000 ₺ | Kurucu yatırımı |
| KOSGEB Teknogirişim | 750.000 ₺ | Başvuru + onay süreci |
| TÜBİTAK 1512 | 1.500.000 ₺ | Teknogirişim sermayesi |
| Melek yatırımcı | 3.000.000 ₺ | %15-20 hisse karşılığı |
| Seri A (Ay 12+) | 10.000.000 ₺+ | Kanıtlanmış büyüme sonrası |

---

*Son güncelleme: Mayıs 2026*