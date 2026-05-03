# UI/UX Tasarım İlkeleri — KPSS Hazırlık Uygulaması

**Doküman:** 03 / 09  
**Konu:** Kullanıcı Arayüzü Tasarım İlkeleri  
**Versiyon:** 1.0

---

## 1. Tasarım Felsefesi

**"Sade, Hızlı, Güvenilir"** — Türk KPSS adaylarının yoğun çalışma temposuna uygun, dikkat dağıtmayan, amaca odaklı bir arayüz.

### Temel İlkeler
- **Sadelik:** Her ekranda tek bir birincil eylem
- **Hız:** Soru geçişi < 300ms, minimum yükleme ekranı
- **Güven:** Akademik ve profesyonel görünüm, tutarlı tasarım dili
- **Erişilebilirlik:** Her yaş ve teknik seviyeden kullanıcıya uygun

---

## 2. Renk Sistemi

### Ana Palet

```
Birincil:
├── primary-900:  #1E3A8A  (ana mavi — başlıklar, butonlar)
├── primary-700:  #1D4ED8  (hover durumu)
├── primary-500:  #3B82F6  (vurgu, link)
└── primary-100:  #DBEAFE  (arka plan vurgusu)

Semantik Renkler:
├── success:      #16A34A  (doğru cevap, başarı)
├── error:        #DC2626  (yanlış cevap, hata)
├── warning:      #CA8A04  (uyarı, orta zorluk)
└── info:         #0891B2  (bilgi mesajı)

Türk Kimliği:
└── accent-red:   #DC2626  (Türk bayrağı kırmızısı — vurgu noktaları)

Nötr:
├── gray-950:     #0F172A  (birincil metin)
├── gray-600:     #64748B  (ikincil metin)
├── gray-200:     #E2E8F0  (kenarlık)
├── gray-50:      #F8FAFC  (sayfa arka planı)
└── white:        #FFFFFF  (kart arka planı)
```

### Dark Mode Paleti

```
├── bg-primary:   #0F172A
├── bg-card:      #1E293B
├── bg-elevated:  #334155
├── text-primary: #F1F5F9
├── text-secondary: #94A3B8
└── border:       #334155
```

### Zorluk Seviyesi Renk Kodlaması

```
Kolay:     #16A34A (yeşil)
Orta:      #CA8A04 (sarı)
Zor:       #EA580C (turuncu)
Çok Zor:   #DC2626 (kırmızı)
```

---

## 3. Tipografi

### Font Ailesi: Inter

Inter fontu seçilme nedenleri:
- Türkçe özel karakterlere (ğ, ü, ş, ı, ö, ç) tam destek
- Ekran okunabilirliği için optimize edilmiş
- Açık kaynak ve ücretsiz (Google Fonts)

### Tip Ölçeği

```
Display:   32sp / Bold    → Onboarding başlıkları
H1:        28sp / Bold    → Ekran başlıkları
H2:        22sp / SemiBold → Bölüm başlıkları
H3:        18sp / SemiBold → Kart başlıkları
Body-L:    16sp / Regular  → Soru metni, açıklamalar
Body-M:    14sp / Regular  → İkincil metin
Caption:   12sp / Regular  → Etiketler, meta bilgi
```

### Satır Aralığı ve Harf Aralığı

```
Başlıklar:  line-height: 1.3, letter-spacing: -0.02em
Gövde:      line-height: 1.6, letter-spacing: 0
Küçük:      line-height: 1.5, letter-spacing: 0.01em
```

---

## 4. Boşluk ve Izgara Sistemi

### 8pt Izgara Sistemi

```
Temel birim: 4pt
Boşluk değerleri:
├── xs:   4pt
├── sm:   8pt
├── md:   16pt
├── lg:   24pt
├── xl:   32pt
├── 2xl:  48pt
└── 3xl:  64pt
```

### Ekran Kenar Boşlukları

```
Telefon (< 390px):  16pt
Telefon (≥ 390px):  20pt
Tablet (≥ 768px):   32pt
```

---

## 5. Bileşen Kütüphanesi

### 5.1 Butonlar

```
Birincil Buton:
├── Arka plan: primary-900
├── Metin: white
├── Yükseklik: 52pt
├── Köşe yarıçapı: 12pt
└── Minimum genişlik: 120pt

İkincil Buton:
├── Arka plan: transparent
├── Kenarlık: 2pt primary-900
├── Metin: primary-900
└── Yükseklik: 52pt

Tehlike Butonu:
├── Arka plan: error (#DC2626)
└── Metin: white

Minimum dokunma hedefi: 44x44pt (WCAG 2.1 AA)
```

### 5.2 Soru Seçenek Bileşeni

```
Normal Durum:
├── Arka plan: white
├── Kenarlık: 1.5pt gray-200
├── Köşe yarıçapı: 12pt
└── Padding: 16pt

Seçili Durum:
├── Arka plan: primary-100
├── Kenarlık: 2pt primary-900
└── Sol çizgi: 4pt primary-900

Doğru Cevap:
├── Arka plan: #DCFCE7 (yeşil açık)
├── Kenarlık: 2pt success
└── İkon: ✓ (yeşil)

Yanlış Cevap:
├── Arka plan: #FEE2E2 (kırmızı açık)
├── Kenarlık: 2pt error
└── İkon: ✗ (kırmızı)
```

### 5.3 İlerleme Çubuğu

```
Soru İlerlemesi:
├── Yükseklik: 6pt
├── Köşe yarıçapı: 3pt
├── Arka plan: gray-200
└── Dolgu: primary-900 (animasyonlu)

Günlük Hedef:
├── Yükseklik: 12pt
├── Köşe yarıçapı: 6pt
└── Gradient: primary-500 → primary-900
```

### 5.4 Kart Bileşeni

```
Standart Kart:
├── Arka plan: white
├── Köşe yarıçapı: 16pt
├── Gölge: 0 2pt 8pt rgba(0,0,0,0.08)
└── Padding: 16pt

Vurgulu Kart (Premium):
├── Kenarlık: 2pt gradient (primary → accent)
└── Arka plan: primary-50
```

---

## 6. Ekran Tasarımları

### 6.1 Ana Sayfa

```
┌─────────────────────────────────┐
│ ≡  KPSS Hazırlık          🔔 👤 │  ← Header (56pt)
├─────────────────────────────────┤
│                                 │
│  Merhaba, Ahmet! 👋             │  ← Karşılama (H2)
│  Sınava 47 gün kaldı 📅         │  ← Geri sayım (Body-M, warning)
│                                 │
├─────────────────────────────────┤
│  📊 Bugünkü Hedef               │  ← Hedef Kartı
│  ████████████░░░░  75%          │
│  37/50 soru · 45 dk çalışıldı  │
│  [Devam Et →]                   │
├─────────────────────────────────┤
│  ⚡ Hızlı Test                  │  ← Hızlı Erişim
│  [Matematik] [Türkçe] [Tarih]  │
│  [Coğrafya]  [Vatandaşlık] [+] │
├─────────────────────────────────┤
│  📈 Bu Hafta                    │  ← Mini Grafik
│  [Çizgi grafik - 7 gün]        │
│  Ort. 42 soru/gün · %68 doğru  │
├─────────────────────────────────┤
│  🔥 12 Günlük Seri!             │  ← Streak Kartı
│  Rekorun: 23 gün               │
├─────────────────────────────────┤
│  📚 Kaldığın Yerden Devam       │  ← Son Aktivite
│  Tarih › Osmanlı Dönemi        │
│  Video: %60 tamamlandı         │
└─────────────────────────────────┘
│ 🏠 Ana  📚 Dersler  📝 Test  📊 │  ← Tab Bar (80pt)
└─────────────────────────────────┘
```

### 6.2 Soru Çözme Ekranı

```
┌─────────────────────────────────┐
│ ← Geri    12 / 30    ⏱ 18:42   │  ← Header
│ ████████████░░░░░░░░░░░░  40%  │  ← İlerleme
├─────────────────────────────────┤
│                                 │
│  Soru 12                        │  ← Soru numarası (Caption)
│                                 │
│  Aşağıdakilerden hangisi        │  ← Soru metni (Body-L)
│  Osmanlı Devleti'nin kuruluş    │
│  yılını doğru olarak verir?     │
│                                 │
├─────────────────────────────────┤
│                                 │
│  ○  A) 1299                     │  ← Seçenekler
│  ●  B) 1453  ✓                  │  ← Seçili
│  ○  C) 1071                     │
│  ○  D) 1326                     │
│                                 │
├─────────────────────────────────┤
│  [🔖 İşaretle]    [→ Sonraki]   │  ← Eylem butonları
└─────────────────────────────────┘
```

### 6.3 Sınav Sonuç Ekranı

```
┌─────────────────────────────────┐
│           🏆 Tebrikler!         │
│                                 │
│         ┌─────────┐             │
│         │  78.5   │             │  ← Puan (büyük, birincil)
│         │  PUAN   │             │
│         └─────────┘             │
│                                 │
│    Kullanıcıların %72'sinden    │  ← Yüzdelik dilim
│    daha iyi performans!         │
│                                 │
├─────────────────────────────────┤
│  Doğru: 47  Yanlış: 8  Boş: 5  │  ← Özet istatistik
├─────────────────────────────────┤
│  Konu Bazlı Performans          │
│  [Radar grafik]                 │
├─────────────────────────────────┤
│  Zayıf Konular:                 │
│  • Osmanlı Tarihi  %45 ⚠️       │
│  • Coğrafya        %52 ⚠️       │
├─────────────────────────────────┤
│  [Çözümleri Gör] [Yeni Deneme] │
└─────────────────────────────────┘
```

### 6.4 Analitik Dashboard

```
┌─────────────────────────────────┐
│  📊 Performans Analizi          │
│  [Bu Hafta ▼]                   │
├─────────────────────────────────┤
│  Toplam    Doğruluk  Süre       │
│  1.247 soru  %68     42 sa      │
├─────────────────────────────────┤
│  Konu Bazlı Doğruluk            │
│  [Radar Grafik - 6 ders]        │
├─────────────────────────────────┤
│  Günlük Çalışma (Son 30 Gün)    │
│  [Isı haritası - GitHub tarzı]  │
├─────────────────────────────────┤
│  ⚠️ Çalışman Gereken Konular    │
│  1. Osmanlı Tarihi    %45       │
│  2. Coğrafya          %52       │
│  3. Vatandaşlık       %58       │
│  [Hepsini Gör →]                │
├─────────────────────────────────┤
│  📈 Deneme Sınavı Trendi        │
│  [Çizgi grafik - son 10 deneme] │
└─────────────────────────────────┘
```

---

## 7. Onboarding Akışı

### Adım 1: Karşılama (3 Slayt)

```
Slayt 1: "KPSS'ye Hazır mısın?"
→ Animasyonlu illüstrasyon
→ "59.000+ soru, uzman çözümler"

Slayt 2: "Kişiselleştirilmiş Plan"
→ Çalışma planı animasyonu
→ "Sınav tarihine göre otomatik program"

Slayt 3: "Gerçek Zamanlı Analiz"
→ Grafik animasyonu
→ "Zayıf konularını tespit et, hızla geliş"
```

### Adım 2: Sınav Kategorisi Seçimi

```
┌─────────────────────────────────┐
│  Hangi sınava hazırlanıyorsun?  │
│                                 │
│  ┌──────────┐  ┌──────────┐    │
│  │ 🎓 KPSS  │  │ 📚 KPSS  │    │
│  │ Lisans   │  │ Önlisans │    │
│  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐    │
│  │ 🏫 KPSS  │  │ 👨‍🏫 ÖABT  │    │
│  │ Ortaöğr. │  │          │    │
│  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐    │
│  │ 📖 Eğitim│  │ 🌍 GK-GY │    │
│  │ Bilimleri│  │          │    │
│  └──────────┘  └──────────┘    │
└─────────────────────────────────┘
```

### Adım 3-6: Sınav Tarihi → Seviye Testi → Plan → Kayıt

Her adım tek bir soruya odaklanır, ilerleme çubuğu üstte gösterilir.

---

## 8. Animasyon ve Geçiş Prensipleri

### Geçiş Süreleri

```
Mikro animasyonlar:  150ms (buton press, toggle)
Ekran geçişleri:     300ms (slide, fade)
Modal açılma:        250ms (slide up)
Sayfa yükleme:       200ms (skeleton → içerik)
```

### Animasyon Türleri

```
Doğru Cevap:    Yeşil parlama + ✓ ikonu (Lottie)
Yanlış Cevap:   Kırmızı sarsılma animasyonu
Rozet Kazanma:  Konfeti + rozet büyüme (Lottie)
Seri Artışı:    Alev animasyonu (Lottie)
Yükleme:        Skeleton ekranlar (içerik şekline uygun)
```

### Easing Fonksiyonları

```
Standart:    cubic-bezier(0.4, 0, 0.2, 1)
Giriş:       cubic-bezier(0, 0, 0.2, 1)
Çıkış:       cubic-bezier(0.4, 0, 1, 1)
```

---

## 9. Erişilebilirlik Standartları

### WCAG 2.1 AA Uyumluluğu

```
Renk Kontrastı:
├── Normal metin: minimum 4.5:1
├── Büyük metin:  minimum 3:1
└── UI bileşenleri: minimum 3:1

Dokunma Hedefleri:
└── Minimum 44x44pt (tüm interaktif öğeler)

Ekran Okuyucu:
├── Tüm görseller için alt text
├── Anlamlı buton etiketleri
├── Odak sırası mantıklı
└── VoiceOver (iOS) + TalkBack (Android) test edilmiş

Dinamik Metin:
└── Sistem font boyutu değişikliklerine uyum
```

### Renk Körü Desteği

Sadece renge bağlı bilgi aktarımından kaçınılır. Her renk kodlu bilgi şekil veya metin ile desteklenir:
- Doğru cevap: Yeşil renk + ✓ ikonu + "Doğru" metni
- Yanlış cevap: Kırmızı renk + ✗ ikonu + "Yanlış" metni
- Zorluk seviyesi: Renk + metin etiketi

---

## 10. Tasarım Araçları ve Süreç

### Araçlar

```
Tasarım:      Figma (ana tasarım aracı)
Prototip:     Figma Interactive Prototype
İkon:         Phosphor Icons (açık kaynak, Türkçe uyumlu)
İllüstrasyon: Storyset / özel illüstrasyonlar
Animasyon:    LottieFiles
```

### Tasarım-Geliştirme Süreci

```
1. Wireframe (Figma)
   ↓
2. UI Tasarım (Figma)
   ↓
3. Prototip & Kullanıcı Testi
   ↓
4. Geliştirici Handoff (Figma Dev Mode)
   ↓
5. Uygulama & QA
   ↓
6. Kullanıcı Geri Bildirimi → Döngü
```

### Design Token'ları

Tüm tasarım değerleri (renkler, boşluklar, tipografi) kod tabanında merkezi `constants/` klasöründe tanımlanır ve Figma ile senkronize tutulur.

---

*Son güncelleme: Mayıs 2026*