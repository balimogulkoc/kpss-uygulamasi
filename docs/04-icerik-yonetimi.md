# İçerik Yönetim Stratejisi — KPSS Hazırlık Uygulaması

**Doküman:** 04 / 09  
**Konu:** İçerik Üretimi, CMS ve Kalite Standartları  
**Versiyon:** 1.0

---

## 1. CMS Altyapısı

**Teknoloji:** Next.js + Payload CMS (self-hosted)

**Temel Özellikler:**
- Soru toplu yükleme (Excel/CSV import — 1.000 soru/batch)
- Video yükleme ve otomatik transkript oluşturma
- Konu ağacı görsel yönetimi (drag & drop)
- İçerik versiyonlama ve geri alma
- Yayın/taslak/arşiv durumu yönetimi
- Çoklu editör desteği (rol tabanlı erişim: süper admin, editör, uzman)
- Mobil simülatörde içerik önizleme

---

## 2. İçerik Üretim Süreci

```
1. Planlama
   └── Konu ağacı analizi → Eksik içerik tespiti → Önceliklendirme

2. Ham Üretim
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

---

## 3. Soru Bankası Hedefleri

| Kategori | Başlangıç | 6. Ay | 12. Ay |
|----------|-----------|-------|--------|
| KPSS Lisans | 5.000 | 10.000 | 15.000+ |
| KPSS Önlisans | 2.000 | 5.000 | 8.000+ |
| KPSS Ortaöğretim | 2.000 | 4.000 | 6.000+ |
| ÖABT (tüm alanlar) | 8.000 | 18.000 | 25.000+ |
| Eğitim Bilimleri | 2.000 | 3.500 | 5.000+ |
| **Toplam** | **19.000** | **40.500** | **59.000+** |

---

## 4. İçerik Kalite Standartları

### Soru Kalite Kriterleri
- Her soru en az 2 uzman tarafından bağımsız olarak incelenir
- Türkçe dil bilgisi ve imla kurallarına uygunluk (Zemberek NLP kontrolü)
- ÖSYM soru formatına uygunluk
- Görsel içerikler için minimum 300 DPI çözünürlük
- Çözüm adımları: maksimum 5 adım, her adım açıklamalı
- Duplicate soru tespiti (Elasticsearch benzerlik sorgusu)

### Video İçerik Standartları
- Minimum çözünürlük: 1080p
- Ses kalitesi: -14 LUFS (yayın standardı)
- Maksimum video süresi: 20 dakika (konu başına)
- Zorunlu bölüm işaretleri (her 3-5 dakikada bir)
- Türkçe altyazı (otomatik + manuel düzeltme)
- Stüdyo arka planı: nötr, dikkat dağıtmayan

### Zorluk Seviyesi Kalibrasyonu

| Seviye | Beklenen Doğruluk Oranı | Açıklama |
|--------|------------------------|----------|
| Kolay | %75-90 | Temel kavram soruları |
| Orta | %50-75 | Uygulama soruları |
| Zor | %30-50 | Analiz ve sentez soruları |
| Çok Zor | %10-30 | Karmaşık çıkarım soruları |

Kalibrasyon, ilk 500 kullanıcı cevabından sonra istatistiksel olarak doğrulanır.

---

## 5. Offline İçerik Stratejisi

### İndirilebilir İçerikler (Premium)
- Konu anlatım videoları (seçili konular, HLS → MP4 dönüşüm)
- PDF özet notları
- Soru paketleri (500 soruluk bloklar)

### Senkronizasyon Mekanizması
- Delta sync: Sadece değişen içerikler güncellenir
- Arka plan senkronizasyonu (Wi-Fi bağlantısında otomatik)
- İndirme kuyruğu yönetimi (öncelik sırası)
- Depolama alanı uyarıları (500MB, 1GB eşiklerinde)
- Maksimum offline depolama: 5GB/kullanıcı

---

## 6. İçerik Güncelleme Takvimi

| İçerik Türü | Güncelleme Sıklığı | Sorumlu |
|-------------|-------------------|---------|
| Yeni sorular | Haftalık (500+ soru) | Uzman ekip |
| Video dersler | Aylık (20+ video) | Eğitmen + prodüksiyon |
| Deneme sınavları | Haftalık (1 tam deneme) | Editör |
| Güncel bilgiler | Günlük (GK bölümü) | İçerik koordinatörü |
| Sınav analizi | Sınav sonrası 48 saat | Baş editör |
| Formül tabloları | 3 aylık | Uzman ekip |

---

## 7. ÖSYM Sınav Sonrası İçerik Süreci

```
Sınav Günü (Saat 0):
└── Sınav sorularını toplama (sosyal medya, forum takibi)

Sınav +6 Saat:
└── Tahmini cevap anahtarı yayını

Sınav +24 Saat:
└── Tüm soruların video çözümleri

Sınav +48 Saat:
└── Resmi cevap anahtarı karşılaştırması + sınav analiz raporu

Sınav +1 Hafta:
└── Sınav sorularının soru bankasına eklenmesi
```

---

## 8. İçerik Lisanslama ve Telif Hakkı

- Tüm özgün sorular şirkete ait telif hakkı ile korunur
- Geçmiş yıl ÖSYM soruları için hukuki değerlendirme yapılır
- İçerik üreticileriyle net iş sözleşmeleri (eser sahipliği devri)
- Yayınevi ortaklıklarında lisans anlaşmaları
- Kullanıcı tarafından raporlanan telif ihlalleri 48 saat içinde incelenir

---

*Son güncelleme: Mayıs 2026*