# Kalite Güvence ve Test Stratejisi — KPSS Hazırlık Uygulaması

**Doküman:** 07 / 09  
**Konu:** Test Yaklaşımı, Otomasyon ve Performans Testleri  
**Versiyon:** 1.0

---

## 1. Test Stratejisi Genel Bakış

### Test Piramidi

```
           /\
          /E2E\          → Detox (10-20 kritik akış)
         /------\
        /Entegrasyon\    → Supertest + Jest (API endpoint'leri)
       /------------\
      /  Unit Tests  \   → Jest + RTL (bileşenler, servisler)
     /________________\
```

### Kapsam Hedefleri

| Katman | Araç | Kapsam Hedefi |
|--------|------|---------------|
| Backend Unit | Jest | %80+ |
| Frontend Unit | Jest + RTL | %70+ |
| API Entegrasyon | Supertest | Tüm endpoint'ler |
| E2E | Detox | 15 kritik akış |
| Performans | k6 | Sınav dönemi simülasyonu |

---

## 2. Unit Test Kapsamı

### 2.1 Backend (NestJS)

**Kritik Servisler — %100 Kapsam Zorunlu:**
```typescript
// Puanlama algoritması testi
describe('ScoringService', () => {
  it('should calculate raw score correctly', () => {
    const answers = [
      { correct: true },   // +1
      { correct: false },  // -0.25
      { skipped: true },   // 0
    ];
    expect(service.calculateRawScore(answers)).toBe(0.75);
  });

  it('should apply wrong answer penalty', () => {
    // 40 doğru, 10 yanlış, 10 boş → 40 - (10 × 0.25) = 37.5
    expect(service.calculateRawScore(answers)).toBe(37.5);
  });
});

// Yüzdelik dilim hesaplama
describe('PercentileService', () => {
  it('should return correct percentile rank', async () => {
    const percentile = await service.calculatePercentile(75.5, 'lisans');
    expect(percentile).toBeGreaterThan(0);
    expect(percentile).toBeLessThanOrEqual(100);
  });
});
```

**Diğer Servisler — %80+ Kapsam:**
- AuthService: Token oluşturma, doğrulama, yenileme
- SubscriptionService: Plan geçişleri, sona erme kontrolü
- NotificationService: Bildirim zamanlama, segmentasyon
- AnalyticsService: Performans hesaplama, zayıf konu tespiti

### 2.2 Frontend (React Native)

**Hook Testleri:**
```typescript
// useExam hook testi
describe('useExam', () => {
  it('should track time per question', () => {
    const { result } = renderHook(() => useExam(mockExam));
    act(() => result.current.startTimer());
    // 5 saniye bekle
    act(() => result.current.answerQuestion('A'));
    expect(result.current.timeSpent).toBeGreaterThanOrEqual(5);
  });
});
```

**Bileşen Testleri:**
- QuestionCard: Seçenek seçimi, doğru/yanlış gösterimi
- ExamTimer: Geri sayım, süre dolduğunda otomatik teslim
- ProgressBar: Yüzde hesaplama, animasyon
- OptionButton: Tüm durumlar (normal, seçili, doğru, yanlış)

---

## 3. E2E Test Senaryoları (Detox)

### Kritik Akışlar

```
Akış 1: Yeni Kullanıcı Onboarding
├── Uygulama açılışı
├── Sınav kategorisi seçimi (KPSS Lisans)
├── Sınav tarihi girişi
├── Seviye testi (10 soru)
├── Kayıt (e-posta)
└── Ana sayfaya yönlendirme

Akış 2: Soru Çözme
├── Soru bankasına giriş
├── Konu filtresi uygulama
├── 10 soruluk test başlatma
├── Soru cevaplama (doğru + yanlış)
├── Soru işaretleme
├── Test tamamlama
└── Sonuç ekranı görüntüleme

Akış 3: Deneme Sınavı
├── Deneme sınavı listesi
├── Sınav başlatma
├── Tüm soruları cevaplama
├── Sınav teslimi
├── Puan ve yüzdelik dilim görüntüleme
└── Çözüm inceleme

Akış 4: Premium Satın Alma
├── Premium ekranına giriş
├── Plan seçimi (aylık)
├── Ödeme akışı (test kartı)
├── Başarılı satın alma bildirimi
└── Premium özelliklere erişim doğrulama

Akış 5: Offline Mod
├── Uçak modunu aç
├── Önceden indirilmiş sorulara eriş
├── Soru çöz (offline)
├── Uçak modunu kapat
└── Cevapların senkronize edildiğini doğrula
```

---

## 4. API Entegrasyon Testleri

```typescript
// Soru endpoint'i entegrasyon testi
describe('GET /api/v1/questions', () => {
  it('should return filtered questions', async () => {
    const response = await request(app)
      .get('/api/v1/questions')
      .query({ topicId: 1, difficulty: 'medium', limit: 10 })
      .set('Authorization', `Bearer ${testToken}`)
      .expect(200);

    expect(response.body.data).toHaveLength(10);
    expect(response.body.data[0]).toHaveProperty('id');
    expect(response.body.data[0].difficulty).toBe('medium');
  });

  it('should require authentication', async () => {
    await request(app)
      .get('/api/v1/questions')
      .expect(401);
  });
});

// Sınav puanlama entegrasyon testi
describe('POST /api/v1/exams/:id/submit', () => {
  it('should calculate and store exam results', async () => {
    const response = await request(app)
      .post(`/api/v1/exams/${testExamId}/submit`)
      .send({ answers: mockAnswers })
      .set('Authorization', `Bearer ${testToken}`)
      .expect(201);

    expect(response.body).toHaveProperty('rawScore');
    expect(response.body).toHaveProperty('percentile');
    expect(response.body.status).toBe('completed');
  });
});
```

---

## 5. Performans Testi

### k6 Yük Testi Konfigürasyonu

```javascript
// Sınav dönemi yoğunluğu simülasyonu
export const options = {
  stages: [
    { duration: '5m',  target: 500 },    // Kademeli artış
    { duration: '10m', target: 2000 },   // Normal yük
    { duration: '5m',  target: 5000 },   // Pik yük (sınav günü)
    { duration: '30m', target: 5000 },   // Pik yük sürdürme
    { duration: '5m',  target: 0 },      // Kademeli düşüş
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],    // %95 istek < 500ms
    http_req_duration: ['p(99)<1000'],   // %99 istek < 1000ms
    http_req_failed:   ['rate<0.01'],    // Hata oranı < %1
  },
};

export default function() {
  // Soru listesi çekme
  http.get(`${BASE_URL}/api/v1/questions?topicId=1&limit=20`);
  sleep(1);

  // Cevap gönderme
  http.post(`${BASE_URL}/api/v1/answers`, JSON.stringify({
    questionId: 'uuid',
    answer: 'A',
    timeSpent: 45
  }));
  sleep(0.5);
}
```

### Performans Hedefleri

| Metrik | Hedef | Kritik Eşik |
|--------|-------|-------------|
| API yanıt süresi (p95) | < 500ms | > 1.000ms |
| API yanıt süresi (p99) | < 1.000ms | > 2.000ms |
| Uygulama başlatma | < 2 saniye | > 4 saniye |
| Soru geçiş süresi | < 300ms | > 600ms |
| Video başlatma | < 3 saniye | > 6 saniye |
| Sistem erişilebilirliği | %99.5 | < %99 |
| Eş zamanlı kullanıcı | 5.000 | — |

---

## 6. İçerik Kalite Güvencesi

### Soru Doğrulama Süreci

```
Adım 1: Otomatik Kontroller
├── Türkçe dil bilgisi (Zemberek NLP)
├── Duplicate tespiti (Elasticsearch)
├── Zorunlu alan kontrolü (soru, 4 seçenek, cevap, çözüm)
└── Görsel boyut kontrolü (min 300 DPI)

Adım 2: Uzman İncelemesi
├── Uzman 1: İçerik doğruluğu
├── Uzman 2: Pedagojik uygunluk
└── Baş editör: Final onay

Adım 3: Pilot Test
├── 50 beta kullanıcısına göster
├── Madde güçlük indeksi hesapla (p değeri)
├── Ayırt edicilik indeksi hesapla (r değeri)
└── p < 0.15 veya p > 0.85 ise zorluk seviyesi güncelle

Adım 4: Yayın
└── Onaylanan sorular aktif havuza eklenir
```

### İstatistiksel Kalite Kriterleri

| Parametre | Kabul Edilebilir Aralık |
|-----------|------------------------|
| Madde güçlük indeksi (p) | 0.15 - 0.85 |
| Ayırt edicilik indeksi (r) | > 0.20 |
| Çeldirici etkinliği | Her çeldirici en az %5 seçilmeli |

---

## 7. Beta Test Programı

### Kapalı Beta (Ay 5 — 4 Hafta)

```
Katılımcı: 500 gönüllü kullanıcı
Kaynak: KPSS forumları, sosyal medya duyurusu
Görev: Günde en az 20 soru çöz, haftalık anket doldur

Ölçülen Metrikler:
├── Crash oranı (hedef: < %0.5)
├── Kullanıcı memnuniyeti (hedef: NPS > 40)
├── Günlük aktif kullanım (hedef: > %60)
└── Kritik hata sayısı (hedef: 0 blocker)
```

### Açık Beta (Ay 6 Başı — 2 Hafta)

```
Katılımcı: 5.000 kullanıcı
Platform: Google Play Early Access + TestFlight
Odak: Ölçeklenebilirlik ve performans

Başarı Kriterleri:
├── App Store puanı: ≥ 4.0
├── Crash-free kullanıcı oranı: > %99
└── Ortalama oturum süresi: > 15 dakika
```

---

## 8. Güvenlik Testi

### Penetrasyon Testi (3 Aylık)

```
Kapsam:
├── API endpoint güvenliği (OWASP Top 10)
├── Kimlik doğrulama bypass denemeleri
├── SQL injection testleri
├── Rate limiting etkinliği
└── Ödeme akışı güvenliği

Araçlar:
├── OWASP ZAP (otomatik tarama)
├── Burp Suite (manuel test)
└── SQLMap (SQL injection)
```

### Sürekli Güvenlik Taraması

- GitHub Actions'da `npm audit` (her PR'da)
- Snyk entegrasyonu (bağımlılık güvenlik açıkları)
- Sentry güvenlik uyarıları
- KVKK uyumluluk denetimi (yıllık)

---

## 9. Hata Yönetimi ve Raporlama

### Hata Öncelik Seviyeleri

| Seviye | Tanım | Yanıt Süresi | Çözüm Süresi |
|--------|-------|-------------|--------------|
| P0 — Kritik | Uygulama çalışmıyor | 15 dakika | 2 saat |
| P1 — Yüksek | Temel özellik bozuk | 1 saat | 8 saat |
| P2 — Orta | Özellik kısmen bozuk | 4 saat | 48 saat |
| P3 — Düşük | Küçük görsel hata | 24 saat | Sonraki sprint |

### Hata Raporlama Kanalları

- Sentry: Otomatik crash raporları (frontend + backend)
- Uygulama içi "Hata Bildir" butonu (kullanıcı raporları)
- App Store / Google Play yorumları (günlük takip)
- Destek e-postası: destek@kpssapp.com

---

*Son güncelleme: Mayıs 2026*