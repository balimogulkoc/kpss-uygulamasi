# Kullanıcı Bağlılığı ve Elde Tutma — KPSS Hazırlık Uygulaması

**Doküman:** 06 / 09  
**Konu:** Gamification, Kişiselleştirme ve Sosyal Özellikler  
**Versiyon:** 1.0

---

## 1. Gamification Sistemi

### 1.1 XP (Deneyim Puanı) Sistemi

| Eylem | XP Kazanımı |
|-------|-------------|
| Doğru cevap (kolay) | 10 XP |
| Doğru cevap (orta) | 15 XP |
| Doğru cevap (zor) | 25 XP |
| Doğru cevap (çok zor) | 40 XP |
| Günlük hedef tamamlama | 50 XP bonus |
| Deneme sınavı tamamlama | 100 XP |
| Günlük seri bonusu | Seri × 5 XP |
| İlk kez konu tamamlama | 30 XP |

### 1.2 Seviye Sistemi

```
Seviye 1:  Aday        (0 - 500 XP)
Seviye 2:  Çalışkan    (500 - 1.500 XP)
Seviye 3:  Azimli      (1.500 - 3.500 XP)
Seviye 4:  Başarılı    (3.500 - 7.500 XP)
Seviye 5:  Uzman       (7.500 - 15.000 XP)
Seviye 6:  Şampiyon    (15.000+ XP)
```

Her seviye atlamasında: Konfeti animasyonu + rozet + özel bildirim

### 1.3 Rozet Sistemi

| Rozet | Koşul | XP Ödülü |
|-------|-------|----------|
| 🔥 İlk Adım | İlk soruyu çöz | 50 |
| 📚 Çalışkan | 7 gün üst üste çalış | 200 |
| 🏆 Azimli | 30 gün üst üste çalış | 1.000 |
| 🎯 Keskin Nişancı | 10 soruyu üst üste doğru cevapla | 150 |
| ⚡ Hız Ustası | Bir soruyu 30 saniyede doğru çöz | 100 |
| 💯 Mükemmeliyetçi | Bir konudan %100 doğruluk | 300 |
| 🌟 Deneme Şampiyonu | 10 deneme sınavı tamamla | 500 |
| 📖 Yüzlük | 100 soru çöz | 300 |
| 🚀 Binlik | 1.000 soru çöz | 1.500 |
| 👑 Haftalık Yıldız | Haftanın en çok soru çözen kullanıcısı | 200 |

### 1.4 Günlük Seri (Streak) Sistemi

```
Seri Koruması:
├── Her gün en az 1 soru çözülmesi gerekir
├── Gece 23:59'a kadar süre
├── Seri Kalkanı: Premium kullanıcılara ayda 1 kez seri koruma hakkı
└── Seri kaybedilirse: "Serinizi Kurtarın" rewarded video seçeneği

Seri Milestone Ödülleri:
├── 7 gün:   "Çalışkan" rozeti + 200 XP
├── 14 gün:  Özel profil çerçevesi + 400 XP
├── 30 gün:  "Azimli" rozeti + 1.000 XP
├── 60 gün:  Premium 1 hafta ücretsiz
└── 100 gün: Özel "Efsane" unvanı + 3.000 XP
```

---

## 2. Kişiselleştirilmiş Çalışma Planı

### 2.1 Plan Oluşturma Algoritması

```
Girdi:
├── Sınav tarihi ve kategorisi
├── Günlük çalışma hedefi (dakika)
├── Seviye testi sonuçları
└── Mevcut konu bilgisi (varsa)

İşlem:
1. Kalan gün sayısı hesapla
2. Toplam konu sayısını belirle
3. Zayıf konulara ek süre ata
4. Haftalık deneme sınavı takvimi oluştur
5. Sınav tarihine yaklaştıkça tekrar ağırlığını artır

Çıktı:
├── Günlük konu listesi
├── Haftalık deneme sınavı günleri
└── Tahmini hazırlık skoru
```

### 2.2 Dinamik Plan Güncelleme

- Haftalık performans analizi sonrası otomatik güncelleme
- Zayıf konulara otomatik ek süre atama
- Kullanıcı geri bildirimine göre zorluk ayarı
- Sınav tarihine 30 gün kala: Tekrar moduna geçiş

---

## 3. Spaced Repetition (Aralıklı Tekrar)

### SM-2 Algoritması Uygulaması

```
Doğru cevap → Tekrar aralığı uzar:
  1. tekrar: 1 gün sonra
  2. tekrar: 3 gün sonra
  3. tekrar: 7 gün sonra
  4. tekrar: 14 gün sonra
  5. tekrar: 30 gün sonra

Yanlış cevap → Aralık sıfırlanır (ertesi gün tekrar)

Ease Factor (Kolaylık Faktörü):
├── Başlangıç: 2.5
├── Doğru: +0.1 (max 2.5)
└── Yanlış: -0.2 (min 1.3)
```

### Günlük Tekrar Bildirimi

"Bugün tekrar edilecek 12 sorun var!" bildirimi ile kullanıcı uygulamaya çekilir. Tekrar listesi günlük çalışma seansına otomatik olarak dahil edilir.

---

## 4. Sosyal Özellikler

### 4.1 Liderlik Tabloları

| Tablo | Kapsam | Yenileme |
|-------|--------|----------|
| Genel Haftalık | Tüm kullanıcılar | Pazartesi sıfırlanır |
| Kategori Bazlı | Aynı sınav kategorisi | Haftalık |
| Arkadaşlar | Arkadaş listesi | Gerçek zamanlı |
| Şehir Bazlı | Aynı şehir | Haftalık |

**Liderlik Tablosu Ödülleri (Haftalık):**
- 1. sıra: 500 XP + özel rozet
- 2-3. sıra: 300 XP
- 4-10. sıra: 150 XP

### 4.2 Arkadaş Sistemi

```
Arkadaş Ekleme:
├── Kullanıcı adı ile arama
├── Telefon rehberi senkronizasyonu (izinle)
└── QR kod paylaşımı

Arkadaş Özellikleri:
├── Haftalık performans karşılaştırması
├── Meydan okuma (challenge) gönderme
│   └── "10 soruluk matematik düellosu"
└── Başarı bildirimleri ("Ahmet yeni rozet kazandı!")
```

### 4.3 Grup Çalışma Odaları (v2.0 — Ay 9+)

- 2-10 kişilik özel gruplar
- Grup hedefi belirleme (haftalık soru hedefi)
- Ortak deneme sınavı (aynı anda çözme)
- Grup sohbet (metin tabanlı)
- Grup liderlik tablosu

---

## 5. Push Bildirim Stratejisi

### 5.1 Bildirim Takvimi

| Bildirim | Zaman | İçerik |
|----------|-------|--------|
| Sabah Motivasyonu | 08:00 | "Günaydın! Bugün 50 soru hedefin var 💪" |
| Öğle Hatırlatıcısı | 12:30 | "Öğle aranda 10 dakika çalış!" |
| Akşam Özeti | 20:00 | "Bugün X soru çözdün, Y kaldı" |
| Seri Tehlikesi | 21:00 | "Günlük seriniz tehlikede! 🔥" |
| Sınav Yaklaşıyor | -30/-7/-1 gün | "Sınava X gün kaldı!" |
| Yeni İçerik | Haftalık | "Bu haftanın deneme sınavı yayında!" |
| Başarı | Anlık | "Tebrikler! Yeni rozet kazandın 🏆" |
| Geri Kazanım | 3. gün | "Seni özledik! Kaldığın yerden devam et" |

### 5.2 Bildirim Kişiselleştirme

- Kullanıcı tercihlerine göre bildirim saati ayarı
- Bildirim türü bazlı açma/kapama
- Sessiz saatler tanımlama (örn: 23:00-07:00)
- Bildirim sıklığı kontrolü (az/normal/çok)

### 5.3 Kullanıcı Segmentine Göre Bildirim

| Segment | Strateji |
|---------|---------|
| Aktif (son 7 gün) | Motivasyon + içerik bildirimleri |
| Pasif (7-30 gün) | "Seni özledik" + ilerleme hatırlatıcısı |
| Kayıp (30+ gün) | Özel teklif (%20 indirim) + yeni özellik duyurusu |
| Sınava yakın (30 gün) | Yoğunlaştırılmış çalışma hatırlatıcıları |
| Premium | Özel içerik + öncelikli bildirimler |

---

## 6. Kullanıcı Elde Tutma Metrikleri ve Hedefler

| Metrik | Hedef (6. Ay) | Hedef (12. Ay) |
|--------|---------------|----------------|
| Gün 1 Elde Tutma | %60 | %65 |
| Gün 7 Elde Tutma | %40 | %45 |
| Gün 30 Elde Tutma | %25 | %35 |
| Ortalama Oturum Süresi | 20 dk | 30 dk |
| DAU/MAU Oranı | %25 | %35 |
| Ortalama Günlük Seri | 8 gün | 14 gün |

---

## 7. A/B Test Planı

| Test | Varyant A | Varyant B | Başarı Metriği |
|------|-----------|-----------|----------------|
| Onboarding uzunluğu | 4 adım | 6 adım | Tamamlama oranı |
| Günlük hedef | 30 soru | 50 soru | 7. gün elde tutma |
| Bildirim saati | 08:00 | 09:00 | Açılma oranı |
| Paywall konumu | İlk gün | 3. gün | Dönüşüm oranı |
| Streak kalkanı | Var | Yok | Seri uzunluğu |

---

*Son güncelleme: Mayıs 2026*