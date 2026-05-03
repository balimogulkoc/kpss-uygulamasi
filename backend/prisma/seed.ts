import { PrismaClient } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── SUBJECTS ────────────────────────────────────────────────────────────────
  await Promise.all([
    prisma.subject.upsert({ where: { id: 1 }, update: { name: 'Türkçe', icon: '📚' }, create: { id: 1, code: 'TURKCE', name: 'Türkçe', icon: '📚', orderIndex: 1 } }),
    prisma.subject.upsert({ where: { id: 2 }, update: { name: 'Matematik', icon: '🔢' }, create: { id: 2, code: 'MATEMATIK', name: 'Matematik', icon: '🔢', orderIndex: 2 } }),
    prisma.subject.upsert({ where: { id: 3 }, update: { name: 'Tarih', icon: '🏛️' }, create: { id: 3, code: 'TARIH', name: 'Tarih', icon: '🏛️', orderIndex: 3 } }),
    prisma.subject.upsert({ where: { id: 4 }, update: { name: 'Coğrafya', icon: '🌍' }, create: { id: 4, code: 'COGRAFYA', name: 'Coğrafya', icon: '🌍', orderIndex: 4 } }),
    prisma.subject.upsert({ where: { id: 5 }, update: { name: 'Vatandaşlık', icon: '⚖️' }, create: { id: 5, code: 'VATANDASLIK', name: 'Vatandaşlık', icon: '⚖️', orderIndex: 5 } }),
    prisma.subject.upsert({ where: { id: 6 }, update: { name: 'Genel Kültür', icon: '🌟' }, create: { id: 6, code: 'GENEL_KULTUR', name: 'Genel Kültür', icon: '🌟', orderIndex: 6 } }),
  ]);
  console.log('✅ 6 subjects created');

  // ─── TOPICS ───────────────────────────────────────────────────────────────────
  // Türkçe konuları (subjectId: 1)
  await Promise.all([
    prisma.topic.upsert({
      where: { id: 1 }, update: { description: `SÖZCÜK TÜRLERİ KONU ANLATIMI\n\nTürkçede sözcükler görevlerine ve anlamlarına göre çeşitli türlere ayrılır.\n\n📌 İSİM (AD)\nVarlıkları, kavramları, duyguları karşılayan sözcüklerdir.\n• Özel isim: Belirli bir varlığı karşılar (Ankara, Ahmet, Türkiye)\n• Cins isim: Aynı türden varlıkları karşılar (masa, çiçek, insan)\n• Soyut isim: Duyularla algılanamayan kavramlar (sevgi, özgürlük, mutluluk)\n• Somut isim: Duyularla algılanabilen varlıklar (taş, su, hava)\n\n📌 SIFAT (ÖN AD)\nİsimleri niteleyen veya belirten sözcüklerdir.\n• Niteleme sıfatı: İsmin özelliğini bildirir (güzel çiçek, büyük ev)\n• Belirtme sıfatı: İsmi belirtir (bu kitap, üç elma, hangi öğrenci)\n\n📌 ZAMİR (ADIL)\nİsimlerin yerini tutan sözcüklerdir.\n• Kişi zamirleri: ben, sen, o, biz, siz, onlar\n• İşaret zamirleri: bu, şu, o, bunlar\n• Soru zamirleri: kim, ne, hangisi\n\n📌 FİİL (EYLEM)\nKılış, oluş ve durum bildiren sözcüklerdir.\n• Kılış fiili: Öznenin yaptığı iş (yazmak, koşmak)\n• Oluş fiili: Kendiliğinden olan değişim (büyümek, solmak)\n• Durum fiili: Süregelen durum (uyumak, oturmak)\n\n📌 ZARF (BELİRTEÇ)\nFiilleri, sıfatları veya diğer zarfları niteleyen sözcüklerdir.\n• Zaman zarfı: dün, bugün, erken\n• Yer-yön zarfı: ileri, geri, yukarı\n• Miktar zarfı: çok, az, biraz\n• Tarz zarfı: hızlı, yavaş, güzelce\n\n📌 BAĞLAÇ\nSözcük ve cümleleri birbirine bağlar: ve, ile, ama, fakat, çünkü, ya da\n\n📌 EDAT (İLGEÇ)\nSözcükler arasında anlam ilişkisi kurar: için, gibi, kadar, ile, göre\n\n📌 ÜNLEM\nDuygu ve heyecanları ifade eder: ah, oh, ey, hey, vay` },
      create: { id: 1, subjectId: 1, name: 'Sözcük Türleri', orderIndex: 1, description: `SÖZCÜK TÜRLERİ KONU ANLATIMI\n\nTürkçede sözcükler görevlerine ve anlamlarına göre çeşitli türlere ayrılır.\n\n📌 İSİM (AD)\nVarlıkları, kavramları, duyguları karşılayan sözcüklerdir.\n• Özel isim: Belirli bir varlığı karşılar (Ankara, Ahmet, Türkiye)\n• Cins isim: Aynı türden varlıkları karşılar (masa, çiçek, insan)\n• Soyut isim: Duyularla algılanamayan kavramlar (sevgi, özgürlük, mutluluk)\n• Somut isim: Duyularla algılanabilen varlıklar (taş, su, hava)\n\n📌 SIFAT (ÖN AD)\nİsimleri niteleyen veya belirten sözcüklerdir.\n• Niteleme sıfatı: İsmin özelliğini bildirir (güzel çiçek, büyük ev)\n• Belirtme sıfatı: İsmi belirtir (bu kitap, üç elma, hangi öğrenci)\n\n📌 ZAMİR (ADIL)\nİsimlerin yerini tutan sözcüklerdir.\n• Kişi zamirleri: ben, sen, o, biz, siz, onlar\n• İşaret zamirleri: bu, şu, o, bunlar\n• Soru zamirleri: kim, ne, hangisi\n\n📌 FİİL (EYLEM)\nKılış, oluş ve durum bildiren sözcüklerdir.\n\n📌 ZARF (BELİRTEÇ)\nFiilleri, sıfatları veya diğer zarfları niteleyen sözcüklerdir.\n\n📌 BAĞLAÇ\nSözcük ve cümleleri birbirine bağlar: ve, ile, ama, fakat, çünkü\n\n📌 EDAT (İLGEÇ)\nSözcükler arasında anlam ilişkisi kurar: için, gibi, kadar, ile, göre` }
    }),
    prisma.topic.upsert({
      where: { id: 2 }, update: { description: `CÜMLE BİLGİSİ KONU ANLATIMI\n\nCümle, en az bir yargı bildiren sözcük ya da sözcük grubudur.\n\n📌 CÜMLENİN ÖGELERİ\n\n1. ÖZNE: Yüklemi gerçekleştiren ya da yüklemin bildirdiği durumda olan öğedir.\n• Gerçek özne: Eylemi yapan (Ahmet kitap okudu.)\n• Sözde özne: Edilgen cümlelerde (Kitap okundu.)\n\n2. YÜKLEM: Cümlenin temel öğesidir. Cümleye anlam ve yargı katar.\n• Fiil yüklemi: Eylem bildirir (Çocuk koştu.)\n• İsim yüklemi: Ek fiille kurulur (Hava güzeldir.)\n\n3. NESNE: Yüklemin etkilediği öğedir.\n• Belirtili nesne: Belirtme hâl eki (-i) alır (Kitabı okudu.)\n• Belirtisiz nesne: Hâl eki almaz (Kitap okudu.)\n\n4. TÜMLEÇLER:\n• Yer tamlayıcısı: Yönelme (-e), bulunma (-de), ayrılma (-den) hâlleri\n• Zarf tümleci: Zaman, tarz, miktar bildirir\n\n📌 CÜMLENİN TÜRLERİ\n\nYapısına göre:\n• Basit cümle: Tek yüklemli (Güneş battı.)\n• Bileşik cümle: Birden fazla yargı içerir\n• Sıralı cümle: Yüklemleri sıralı (Geldi, gördü, yendi.)\n• Bağlı cümle: Bağlaçla bağlı (Geldi ve gördü.)\n\nAnlamına göre:\n• Olumlu: Yargı gerçekleşmiş (Geldi.)\n• Olumsuz: Yargı gerçekleşmemiş (Gelmedi.)\n• Soru: Soru bildiren (Geldi mi?)\n• Ünlem: Duygu yoğun (Ne güzel!)\n\nYüklemin türüne göre:\n• Fiil cümlesi: Yüklemi fiil (Koştu.)\n• İsim cümlesi: Yüklemi isim (Öğretmendir.)` },
      create: { id: 2, subjectId: 1, name: 'Cümle Bilgisi', orderIndex: 2, description: 'Cümle ögeleri ve cümle türleri hakkında kapsamlı bilgi.' }
    }),
    prisma.topic.upsert({
      where: { id: 3 }, update: { description: `YAZIM KURALLARI KONU ANLATIMI\n\n📌 BÜYÜK HARF KULLANIMI\n• Cümle başları büyük harfle başlar.\n• Özel isimler büyük harfle yazılır: Türkiye, Ankara, Ahmet\n• Unvanlar özel isimle kullanılınca büyük: Atatürk, Cumhurbaşkanı Erdoğan\n• Kitap, dergi, gazete adları: Nutuk, Cumhuriyet\n• Milli ve dini bayramlar: Cumhuriyet Bayramı, Ramazan Bayramı\n\n📌 KISALTMALAR\n• Kurum adları: TBMM, TDK, MEB\n• Ölçü birimleri: kg, km, cm (nokta konmaz)\n• Sayfa, numara: s., No.\n\n📌 SAYILARIN YAZIMI\n• Yazıyla: Bir, iki, üç...\n• Rakamla: 1, 2, 3...\n• Para: 25 TL, 100 dolar\n• Tarih: 29 Ekim 1923\n\n📌 BİTİŞİK / AYRI YAZIM\n• Birleşik fiiller ayrı: göz atmak, söz etmek\n• Pekiştirmeli sıfatlar bitişik: bembeyaz, simsiyah\n• -ki eki: Zamirde bitişik (benimki), sıfatta ayrı (dünkü haber)\n\n📌 EKLERIN YAZIMI\n• Büyük ünlü uyumu: -de/-da, -den/-dan, -le/-la\n• Ünsüz benzeşmesi: -te/-ta (sokakta, sepette)` },
      create: { id: 3, subjectId: 1, name: 'Yazım Kuralları', orderIndex: 3, description: 'Türkçe yazım kuralları ve imla bilgisi.' }
    }),
    prisma.topic.upsert({
      where: { id: 4 }, update: { description: `NOKTALAMA İŞARETLERİ KONU ANLATIMI\n\n📌 NOKTA (.)\n• Cümle sonunda kullanılır.\n• Kısaltmalarda: Dr., Prof., vb.\n• Sıra sayılarında: 1., 2., 3.\n\n📌 VİRGÜL (,)\n• Sıralı ögeleri ayırır: elma, armut, kiraz\n• Ara cümlelerde: Ahmet, bildiğiniz gibi, çok çalışkandır.\n• Zarf-fiil gruplarında: Koşarak gelince, yoruldu.\n\n📌 NOKTALAMA VİRGÜL (;)\n• Bağımsız cümleleri ayırır.\n• Virgülle ayrılmış ögeleri gruplamak için.\n\n📌 İKİ NOKTA (:)\n• Açıklama yapmadan önce: Üç şey önemlidir: sağlık, para, sevgi.\n• Alıntıdan önce: Atatürk dedi ki:\n\n📌 ÜÇLÜ NOKTA (...)\n• Söz kesildiğinde veya anlatım tamamlanmadığında.\n\n📌 SORU İŞARETİ (?)\n• Soru cümlelerinin sonunda.\n\n📌 ÜNLEM (!)\n• Ünlem cümlelerinin sonunda.\n• Emir cümlelerinde.\n\n📌 TIRNAK İŞARETİ ("")\n• Alıntılarda.\n• Özel anlam taşıyan sözcüklerde.\n\n📌 KISA ÇİZGİ (-)\n• Sözcük bölünmesinde.\n• Karşıt kavramlarda: gece-gündüz\n\n📌 UZUN ÇİZGİ (—)\n• Konuşmalarda konuşanı belirtmek için.` },
      create: { id: 4, subjectId: 1, name: 'Noktalama İşaretleri', orderIndex: 4, description: 'Noktalama işaretlerinin doğru kullanımı.' }
    }),
    prisma.topic.upsert({
      where: { id: 5 }, update: { description: `SES BİLGİSİ (FONETİK) KONU ANLATIMI\n\n📌 TÜRKÇE SESLERİ\nTürkçede 8 ünlü, 21 ünsüz olmak üzere 29 ses vardır.\n\nÜnlüler: a, e, ı, i, o, ö, u, ü\nÜnsüzler: b, c, ç, d, f, g, ğ, h, j, k, l, m, n, p, r, s, ş, t, v, y, z\n\n📌 BÜYÜK ÜNLÜ UYUMU\nBir sözcükteki ünlüler kalınlık-incelik bakımından uyum içinde olmalıdır.\n• Kalın ünlüler: a, ı, o, u\n• İnce ünlüler: e, i, ö, ü\nÖrnek: kitap-lar (uyumlu), kalem-ler (uyumlu)\nİstisna: anne, kardeş, hangi (yabancı kökenli)\n\n📌 KÜÇÜK ÜNLÜ UYUMU\nEklerdeki ünlü, sözcüğün son hecesindeki ünlüye uyar.\n• Düz ünlüden sonra düz: a→-a/-e, ı→-a/-e\n• Yuvarlak ünlüden sonra yuvarlak: o→-u/-ü, u→-u/-ü\n\n📌 ÜNSÜZ BENZEŞMESİ (SERTLEŞME)\nSert ünsüzlerden (ç, f, h, k, p, s, ş, t) sonra gelen ek sert başlar.\nÖrnek: sokak+ta=sokakta, kitap+ta=kitapta\n\n📌 ÜNSÜZ YUMUŞAMASI\nSert ünsüzle biten sözcükler ünlüyle başlayan ek alınca yumuşar.\nÖrnek: kitap+ı=kitabı, sokak+a=sokağa\n\n📌 ÜNLÜ DÜŞMESİ\nİki heceli sözcüklerin ikinci hecesindeki ünlü düşebilir.\nÖrnek: ağız+ı=ağzı, burun+u=burnu\n\n📌 ÜNLÜ TÜREMESİ\nBazı sözcüklere ek getirilince ünlü türer.\nÖrnek: his+siz=hissiz` },
      create: { id: 5, subjectId: 1, name: 'Ses Bilgisi', orderIndex: 5, description: 'Türkçe ses bilgisi ve ses olayları.' }
    }),
    prisma.topic.upsert({
      where: { id: 6 }, update: { description: `PARAGRAF KONU ANLATIMI\n\n📌 PARAGRAF NEDİR?\nBir düşünceyi, olayı veya durumu anlatan, birbiriyle bağlantılı cümlelerden oluşan yazı birimidir.\n\n📌 PARAGRAFIN YAPISI\n• Giriş cümlesi: Konuyu tanıtır, okuyucuyu hazırlar.\n• Gelişme cümleleri: Ana düşünceyi destekler, açıklar.\n• Sonuç cümlesi: Düşünceyi tamamlar, bağlar.\n\n📌 ANA DÜŞÜNCE (ANA FİKİR)\nParagrafın vermek istediği temel mesajdır.\n• Genellikle ilk veya son cümlede bulunur.\n• Tüm cümleler ana düşünceyi destekler.\n• Soyut ve genel bir ifadedir.\n\n📌 YARDIMCI DÜŞÜNCELER\nAna düşünceyi destekleyen, açıklayan cümlelerdir.\n• Örnekler, açıklamalar, karşılaştırmalar içerir.\n\n📌 PARAGRAF TÜRLERI\n• Açıklayıcı paragraf: Bilgi verir, tanımlar.\n• Tartışmacı paragraf: Bir görüşü savunur.\n• Betimleyici paragraf: Gözlem ve izlenimleri aktarır.\n• Öyküleyici paragraf: Olayları anlatır.\n\n📌 PARAGRAFTA ANLAM İLİŞKİLERİ\n• Neden-sonuç: Çünkü, bu yüzden, dolayısıyla\n• Karşıtlık: Ama, fakat, oysa, ancak\n• Benzerlik: Gibi, benzer şekilde\n• Sıralama: Önce, sonra, ardından\n• Örnekleme: Örneğin, nitekim, sözgelimi` },
      create: { id: 6, subjectId: 1, name: 'Paragraf', orderIndex: 6, description: 'Paragraf yapısı ve anlam ilişkileri.' }
    }),
    prisma.topic.upsert({
      where: { id: 7 }, update: { description: 'Anlam bilgisi ve sözcük anlamları.' },
      create: { id: 7, subjectId: 1, name: 'Anlam Bilgisi', orderIndex: 7, description: 'Anlam bilgisi ve sözcük anlamları.' }
    }),
    prisma.topic.upsert({
      where: { id: 8 }, update: { description: 'Türkçe dil bilgisi kuralları.' },
      create: { id: 8, subjectId: 1, name: 'Dil Bilgisi', orderIndex: 8, description: 'Türkçe dil bilgisi kuralları.' }
    }),
  ]);

  // Matematik konuları (subjectId: 2)
  await Promise.all([
    prisma.topic.upsert({
      where: { id: 10 }, update: { description: `SAYI SİSTEMLERİ KONU ANLATIMI\n\n📌 DOĞAL SAYILAR\n0, 1, 2, 3, 4, ... şeklinde devam eden sayılardır.\n• En küçük doğal sayı: 0\n• En küçük pozitif doğal sayı: 1\n• Doğal sayılar sonsuzdur.\n\n📌 TAM SAYILAR\n..., -3, -2, -1, 0, 1, 2, 3, ... şeklindedir.\n• Negatif tam sayılar, sıfır ve pozitif tam sayıları kapsar.\n\n📌 RASYONEL SAYILAR\na/b biçiminde yazılabilen sayılardır (b≠0).\n• Tam sayılar rasyoneldir: 3 = 3/1\n• Sonlu ondalıklar: 0,5 = 1/2\n• Periyodik ondalıklar: 0,333... = 1/3\n\n📌 İRRASYONEL SAYILAR\nKesir olarak yazılamayan sayılardır.\n• √2, √3, π, e\n\n📌 GERÇEK SAYILAR\nRasyonel ve irrasyonel sayıların birleşimidir.\n\n📌 SAYI BASAMAKLARI\n• Birler, onlar, yüzler, binler...\n• 3456: 3 bin + 4 yüz + 5 on + 6 bir\n\n📌 BÖLÜNME KURALLARI\n• 2'ye bölünme: Son rakam çift\n• 3'e bölünme: Rakamlar toplamı 3'e bölünür\n• 4'e bölünme: Son iki rakam 4'e bölünür\n• 5'e bölünme: Son rakam 0 veya 5\n• 9'a bölünme: Rakamlar toplamı 9'a bölünür\n• 10'a bölünme: Son rakam 0\n\n📌 ASAL SAYILAR\n1 ve kendisinden başka böleni olmayan sayılardır.\n2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47...` },
      create: { id: 10, subjectId: 2, name: 'Sayı Sistemleri', orderIndex: 1, description: 'Sayı sistemleri ve sayı türleri.' }
    }),
    prisma.topic.upsert({
      where: { id: 11 }, update: { description: `KESİRLER KONU ANLATIMI\n\n📌 KESİR NEDİR?\nBir bütünün eşit parçalara bölünmesiyle elde edilen sayılardır.\na/b → a: pay, b: payda (b≠0)\n\n📌 KESİR TÜRLERİ\n• Basit kesir: Pay < payda (3/5)\n• Bileşik kesir: Pay > payda (7/3)\n• Tam sayılı kesir: 2 + 1/3 = 2⅓\n\n📌 KESİRLERDE İŞLEMLER\n\nToplama/Çıkarma:\n• Paydalar eşitse: Payları topla/çıkar\n• Paydalar farklıysa: Ortak payda bul\n1/3 + 1/4 = 4/12 + 3/12 = 7/12\n\nÇarpma:\n• Pay × pay, payda × payda\n2/3 × 3/4 = 6/12 = 1/2\n\nBölme:\n• İkinci kesri ters çevir, çarp\n2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6\n\n📌 KESİRLERİ KARŞILAŞTIRMA\n• Paydalar eşitse: Payı büyük olan büyüktür\n• Paylar eşitse: Paydası küçük olan büyüktür\n• Farklıysa: Ortak paydaya getir\n\n📌 ONDALIK KESİRLER\n0,5 = 5/10 = 1/2\n0,25 = 25/100 = 1/4\n0,75 = 75/100 = 3/4` },
      create: { id: 11, subjectId: 2, name: 'Kesirler', orderIndex: 2, description: 'Kesirler ve kesirlerle işlemler.' }
    }),
    prisma.topic.upsert({
      where: { id: 12 }, update: { description: `ORAN-ORANTIYI KONU ANLATIMI\n\n📌 ORAN\nİki sayının birbirine bölümüdür.\na:b = a/b (b≠0)\n\n📌 ORANTIN\nİki oranın birbirine eşit olmasıdır.\na/b = c/d → a×d = b×c (çapraz çarpım)\n\n📌 DOĞRU ORANTIN\nBir nicelik artınca diğeri de artar.\nx/y = k (sabit)\nÖrnek: 3 işçi 6 günde bitirirse, 6 işçi 3 günde bitirir.\n\n📌 TERS ORANTIN\nBir nicelik artınca diğeri azalır.\nx × y = k (sabit)\n\n📌 YÜZDE HESABI\n%a = a/100\n%25 = 25/100 = 1/4\n\nYüzde artış: Yeni = Eski × (1 + oran)\nYüzde azalış: Yeni = Eski × (1 - oran)\n\n📌 KARIŞIM PROBLEMLERİ\nFarklı konsantrasyonlardaki karışımlar.\nMiktar × Konsantrasyon = Madde miktarı` },
      create: { id: 12, subjectId: 2, name: 'Oran-Orantı', orderIndex: 3, description: 'Oran, orantı ve yüzde hesapları.' }
    }),
    prisma.topic.upsert({
      where: { id: 13 }, update: { description: 'Yüzde ve faiz hesapları.' },
      create: { id: 13, subjectId: 2, name: 'Yüzde-Faiz', orderIndex: 4, description: 'Yüzde ve faiz hesapları.' }
    }),
    prisma.topic.upsert({
      where: { id: 14 }, update: { description: `DENKLEMLER KONU ANLATIMI\n\n📌 BİRİNCİ DERECEDEN DENKLEMLER\nax + b = 0 biçimindedir (a≠0).\nÇözüm: x = -b/a\n\nÖrnek: 2x + 6 = 0 → x = -3\n\n📌 DENKLEM ÇÖZME KURALLARI\n• Her iki tarafa aynı sayı eklenebilir/çıkarılabilir.\n• Her iki taraf aynı sayıyla çarpılabilir/bölünebilir (0 hariç).\n• Parantez açılır, benzer terimler toplanır.\n\n📌 İKİ BİLİNMEYENLİ DENKLEM SİSTEMLERİ\nax + by = c\ndx + ey = f\n\nYöntemler:\n• Yerine koyma: Bir değişkeni diğeriyle ifade et.\n• Eleman yok etme: Denklemleri topla/çıkar.\n\n📌 İKİNCİ DERECEDEN DENKLEMLER\nax² + bx + c = 0 (a≠0)\n\nAyrımcı: Δ = b² - 4ac\n• Δ > 0: İki farklı gerçek kök\n• Δ = 0: Çift kök\n• Δ < 0: Gerçek kök yok\n\nKökler: x = (-b ± √Δ) / 2a` },
      create: { id: 14, subjectId: 2, name: 'Denklemler', orderIndex: 5, description: 'Birinci ve ikinci dereceden denklemler.' }
    }),
    prisma.topic.upsert({
      where: { id: 15 }, update: { description: 'Geometri temel kavramları.' },
      create: { id: 15, subjectId: 2, name: 'Geometri', orderIndex: 6, description: 'Geometri temel kavramları.' }
    }),
    prisma.topic.upsert({
      where: { id: 16 }, update: { description: 'Olasılık hesapları.' },
      create: { id: 16, subjectId: 2, name: 'Olasılık', orderIndex: 7, description: 'Olasılık hesapları.' }
    }),
    prisma.topic.upsert({
      where: { id: 17 }, update: { description: 'İstatistik ve veri analizi.' },
      create: { id: 17, subjectId: 2, name: 'İstatistik', orderIndex: 8, description: 'İstatistik ve veri analizi.' }
    }),
  ]);

  // Tarih konuları (subjectId: 3)
  await Promise.all([
    prisma.topic.upsert({
      where: { id: 20 }, update: { description: `OSMANLI TARİHİ KONU ANLATIMI\n\n📌 OSMANLI DEVLETİ'NİN KURULUŞU\n• Kuruluş: 1299 - Osman Bey tarafından kuruldu.\n• Başkent: Söğüt → Bursa (1326) → Edirne (1363) → İstanbul (1453)\n\n📌 ÖNEMLİ SULTANLAR\n• Osman Bey (1299-1326): Kurucu\n• Orhan Bey (1326-1362): İlk düzenli ordu (Yaya ve Müsellem)\n• I. Murat (1362-1389): Kapıkulu ocakları, Rumeli'ye geçiş\n• Yıldırım Bayezid (1389-1402): Niğbolu Zaferi, Ankara Savaşı\n• Çelebi Mehmet (1413-1421): Fetret Devri'ni sona erdirdi\n• II. Murat (1421-1451): Edirne-Segedin Antlaşması\n• Fatih Sultan Mehmet (1451-1481): İstanbul'un Fethi (1453)\n• Yavuz Sultan Selim (1512-1520): Mısır, Suriye, Hicaz\n• Kanuni Sultan Süleyman (1520-1566): En geniş sınırlar\n\n📌 ÖNEMLİ OLAYLAR\n• 1453: İstanbul'un Fethi - Orta Çağ'ın sonu\n• 1517: Yavuz'un halifeliği alması\n• 1683: II. Viyana Kuşatması - Gerilemenin başlangıcı\n• 1699: Karlofça Antlaşması - İlk toprak kaybı\n• 1774: Küçük Kaynarca - Rusya'ya kapitülasyon\n• 1839: Tanzimat Fermanı\n• 1856: Islahat Fermanı\n• 1876: I. Meşrutiyet\n• 1908: II. Meşrutiyet\n• 1920: Son Osmanlı Mebusan Meclisi` },
      create: { id: 20, subjectId: 3, name: 'Osmanlı Tarihi', orderIndex: 1, description: 'Osmanlı Devleti tarihi.' }
    }),
    prisma.topic.upsert({
      where: { id: 21 }, update: { description: `KURTULUŞ SAVAŞI KONU ANLATIMI\n\n📌 MONDROS MÜTAREKESİ (30 Ekim 1918)\nOsmanlı Devleti'nin I. Dünya Savaşı'ndan çekilmesini sağladı.\nSonuçları: İşgaller başladı, ordu terhis edildi.\n\n📌 İŞGALLER\n• İngilizler: İstanbul, Musul, Kars\n• Fransızlar: Adana, Antep, Maraş, Urfa\n• İtalyanlar: Antalya, Konya\n• Yunanlılar: İzmir (15 Mayıs 1919)\n\n📌 MİLLİ MÜCADELE'NİN BAŞLAMASI\n• Mustafa Kemal, 19 Mayıs 1919'da Samsun'a çıktı.\n• Havza Genelgesi (28 Mayıs 1919)\n• Amasya Genelgesi (22 Haziran 1919): Kurtuluşun ilk belgesi\n• Erzurum Kongresi (23 Temmuz - 7 Ağustos 1919)\n• Sivas Kongresi (4-11 Eylül 1919): Ulusal birlik sağlandı\n• TBMM'nin açılması (23 Nisan 1920)\n\n📌 SAVAŞLAR\n• I. İnönü (6-10 Ocak 1921): Yunan taarruzu durduruldu\n• II. İnönü (23 Mart - 1 Nisan 1921)\n• Sakarya Meydan Muharebesi (23 Ağustos - 13 Eylül 1921)\n• Büyük Taarruz (26 Ağustos 1922)\n• Dumlupınar Meydan Muharebesi (30 Ağustos 1922)\n\n📌 LOZAN ANTLAŞMASI (24 Temmuz 1923)\nTürkiye'nin bağımsızlığı uluslararası alanda tanındı.` },
      create: { id: 21, subjectId: 3, name: 'Kurtuluş Savaşı', orderIndex: 2, description: 'Kurtuluş Savaşı tarihi.' }
    }),
    prisma.topic.upsert({
      where: { id: 22 }, update: { description: 'Cumhuriyet tarihi ve inkılaplar.' },
      create: { id: 22, subjectId: 3, name: 'Cumhuriyet Tarihi', orderIndex: 3, description: 'Cumhuriyet tarihi ve inkılaplar.' }
    }),
    prisma.topic.upsert({
      where: { id: 23 }, update: { description: `ATATÜRK İLKELERİ KONU ANLATIMI\n\n📌 ALTI OK (ATATÜRK İLKELERİ)\n\n1. CUMHURİYETÇİLİK\nEgemenliğin kayıtsız şartsız millete ait olduğu ilkedir.\nCumhuriyet, 29 Ekim 1923'te ilan edildi.\n\n2. MİLLİYETÇİLİK\nTürk milletini sevmek, yüceltmek ve birlik içinde tutmaktır.\nIrkçılığa karşıdır; kültürel birliği esas alır.\n\n3. HALKÇILIK\nDevletin tüm vatandaşlara eşit davranması ilkesidir.\nSınıf ayrımını reddeder.\n\n4. DEVLETÇİLİK\nDevletin ekonomiye müdahale etmesi ilkesidir.\n1929 Dünya Ekonomik Krizi sonrası önem kazandı.\n\n5. LAİKLİK\nDin ve devlet işlerinin birbirinden ayrılmasıdır.\nEn çok tartışılan ve en geç benimsenen ilkedir.\n\n6. DEVRİMCİLİK (İNKILAPÇILIK)\nYapılan inkılapların korunması ve geliştirilmesidir.\nStatükoya karşıdır.\n\n📌 ANAYASAYA GİRİŞİ\n• 1931: CHP programına girdi\n• 1937: Anayasaya eklendi` },
      create: { id: 23, subjectId: 3, name: 'Atatürk İlkeleri', orderIndex: 4, description: 'Atatürk ilkeleri ve inkılapları.' }
    }),
    prisma.topic.upsert({
      where: { id: 24 }, update: { description: 'Atatürk inkılapları ve reformlar.' },
      create: { id: 24, subjectId: 3, name: 'İnkılaplar', orderIndex: 5, description: 'Atatürk inkılapları ve reformlar.' }
    }),
    prisma.topic.upsert({
      where: { id: 25 }, update: { description: 'Türk tarihi genel.' },
      create: { id: 25, subjectId: 3, name: 'Türk Tarihi', orderIndex: 6, description: 'Türk tarihi genel.' }
    }),
  ]);

  // Coğrafya konuları (subjectId: 4)
  await Promise.all([
    prisma.topic.upsert({
      where: { id: 30 }, update: { description: `TÜRKİYE FİZİKİ COĞRAFYASI KONU ANLATIMI\n\n📌 KONUM\n• Kuzey yarımküre, Asya ve Avrupa kıtaları arasında\n• 36°-42° kuzey enlemleri, 26°-45° doğu boylamları\n• Yüzölçümü: 783.562 km²\n\n📌 DAĞLAR\n• Kuzey Anadolu Dağları: Karadeniz kıyısı boyunca\n• Toros Dağları: Güney Anadolu\n• En yüksek nokta: Ağrı Dağı (5.137 m)\n• Diğer önemli: Erciyes (3.917 m), Uludağ (2.543 m)\n\n📌 OVALAR\n• Konya Ovası: En büyük iç ova\n• Çukurova: En verimli ova\n• Gediz, Büyük Menderes, Küçük Menderes ovaları\n\n📌 AKARSULAR\n• En uzun: Kızılırmak (1.355 km)\n• En büyük havza: Fırat-Dicle\n• Diğerleri: Sakarya, Yeşilırmak, Seyhan, Ceyhan\n\n📌 GÖLLER\n• En büyük: Van Gölü (3.713 km²) - soda gölü\n• Tuz Gölü: İkinci büyük, kapalı havza\n• Beyşehir: En büyük tatlı su gölü\n• Eğirdir, Burdur, İznik, Sapanca\n\n📌 KIYI UZUNLUĞU\n• Toplam: 8.333 km\n• Karadeniz: 1.695 km\n• Ege: 2.805 km\n• Akdeniz: 1.577 km\n• Marmara: 1.067 km` },
      create: { id: 30, subjectId: 4, name: 'Türkiye Fiziki Coğrafyası', orderIndex: 1, description: 'Türkiye fiziki coğrafyası.' }
    }),
    prisma.topic.upsert({
      where: { id: 31 }, update: { description: 'Türkiye beşeri coğrafyası.' },
      create: { id: 31, subjectId: 4, name: 'Türkiye Beşeri Coğrafyası', orderIndex: 2, description: 'Türkiye beşeri coğrafyası.' }
    }),
    prisma.topic.upsert({
      where: { id: 32 }, update: { description: 'İklim tipleri ve özellikleri.' },
      create: { id: 32, subjectId: 4, name: 'İklim', orderIndex: 3, description: 'İklim tipleri ve özellikleri.' }
    }),
    prisma.topic.upsert({
      where: { id: 33 }, update: { description: 'Nüfus ve yerleşme coğrafyası.' },
      create: { id: 33, subjectId: 4, name: 'Nüfus ve Yerleşme', orderIndex: 4, description: 'Nüfus ve yerleşme coğrafyası.' }
    }),
    prisma.topic.upsert({
      where: { id: 34 }, update: { description: 'Ekonomik coğrafya.' },
      create: { id: 34, subjectId: 4, name: 'Ekonomik Coğrafya', orderIndex: 5, description: 'Ekonomik coğrafya.' }
    }),
  ]);

  // Vatandaşlık konuları (subjectId: 5)
  await Promise.all([
    prisma.topic.upsert({
      where: { id: 40 }, update: { description: `ANAYASA KONU ANLATIMI\n\n📌 TÜRKİYE CUMHURİYETİ ANAYASALARI\n• 1921 Anayasası (Teşkilat-ı Esasiye): Kısa, savaş dönemi\n• 1924 Anayasası: Cumhuriyet dönemi ilk anayasa\n• 1961 Anayasası: 27 Mayıs darbesi sonrası\n• 1982 Anayasası: 12 Eylül darbesi sonrası, hâlâ yürürlükte\n\n📌 1982 ANAYASASI TEMEL ÖZELLİKLERİ\n• 177 madde (değişikliklerle)\n• Başlangıç kısmı ve 7 bölüm\n• Değiştirilemez maddeler: 1, 2, 3 (Cumhuriyet, nitelikleri, dil-bayrak-başkent)\n\n📌 DEVLETİN TEMEL NİTELİKLERİ (Madde 2)\n• Demokratik\n• Laik\n• Sosyal\n• Hukuk devleti\n\n📌 EGEMENLİK (Madde 6)\n"Egemenlik kayıtsız şartsız Milletindir."\nTBMM egemenliği kullanır.\n\n📌 TEMEL HAKLAR\n• Kişi dokunulmazlığı\n• Düşünce özgürlüğü\n• Din ve vicdan özgürlüğü\n• Eğitim hakkı\n• Çalışma hakkı\n• Seçme ve seçilme hakkı\n\n📌 ANAYASA MAHKEMESİ\n• 12 üye (3 yedek)\n• Kanunların anayasaya uygunluğunu denetler\n• Bireysel başvuru hakkı (2010'dan itibaren)` },
      create: { id: 40, subjectId: 5, name: 'Anayasa', orderIndex: 1, description: 'Türkiye Cumhuriyeti Anayasası.' }
    }),
    prisma.topic.upsert({
      where: { id: 41 }, update: { description: 'Temel hak ve özgürlükler.' },
      create: { id: 41, subjectId: 5, name: 'Temel Haklar', orderIndex: 2, description: 'Temel hak ve özgürlükler.' }
    }),
    prisma.topic.upsert({
      where: { id: 42 }, update: { description: 'Devlet yapısı ve organları.' },
      create: { id: 42, subjectId: 5, name: 'Devlet Yapısı', orderIndex: 3, description: 'Devlet yapısı ve organları.' }
    }),
    prisma.topic.upsert({
      where: { id: 43 }, update: { description: 'Seçim sistemi ve siyasi partiler.' },
      create: { id: 43, subjectId: 5, name: 'Seçim Sistemi', orderIndex: 4, description: 'Seçim sistemi ve siyasi partiler.' }
    }),
    prisma.topic.upsert({
      where: { id: 44 }, update: { description: 'Yargı organları ve yargı sistemi.' },
      create: { id: 44, subjectId: 5, name: 'Yargı Organları', orderIndex: 5, description: 'Yargı organları ve yargı sistemi.' }
    }),
  ]);

  // Genel Kültür konuları (subjectId: 6)
  await Promise.all([
    prisma.topic.upsert({
      where: { id: 50 }, update: { description: 'Türk kültürü ve medeniyeti.' },
      create: { id: 50, subjectId: 6, name: 'Türk Kültürü', orderIndex: 1, description: 'Türk kültürü ve medeniyeti.' }
    }),
    prisma.topic.upsert({
      where: { id: 51 }, update: { description: 'Bilim ve teknoloji.' },
      create: { id: 51, subjectId: 6, name: 'Bilim ve Teknoloji', orderIndex: 2, description: 'Bilim ve teknoloji.' }
    }),
    prisma.topic.upsert({
      where: { id: 52 }, update: { description: 'Sanat ve edebiyat.' },
      create: { id: 52, subjectId: 6, name: 'Sanat ve Edebiyat', orderIndex: 3, description: 'Sanat ve edebiyat.' }
    }),
    prisma.topic.upsert({
      where: { id: 53 }, update: { description: 'Güncel olaylar.' },
      create: { id: 53, subjectId: 6, name: 'Güncel Olaylar', orderIndex: 4, description: 'Güncel olaylar.' }
    }),
  ]);

  console.log('✅ Topics created with descriptions');

  // ─── QUESTIONS ────────────────────────────────────────────────────────────────
  // Delete existing questions to re-seed (cascade order)
  await prisma.userAnswer.deleteMany({});
  await prisma.examItem.deleteMany({});
  await prisma.question.deleteMany({});
  console.log('🗑️ Old questions deleted');

  const questions = [
    // ─── TÜRKÇE - Sözcük Türleri (topicId: 1) ───────────────────────────────
    {
      subjectId: 1, topicId: 1, difficulty: 'EASY', year: 2023,
      text: '"Güzel" sözcüğü aşağıdaki cümlelerin hangisinde sıfat olarak kullanılmıştır?',
      options: JSON.stringify([
        'Bu çiçek çok güzel.',
        'Güzel konuşmak bir sanattır.',
        'Güzel, herkesin sevdiği bir kavramdır.',
        'O güzel bir kız.',
        'Güzeli herkes sever.'
      ]),
      correctAnswer: 'D',
      explanation: 'D seçeneğinde "güzel" sözcüğü "kız" ismini nitelediği için sıfattır. A\'da yüklem, B\'de zarf, C ve E\'de isim olarak kullanılmıştır.'
    },
    {
      subjectId: 1, topicId: 1, difficulty: 'EASY', year: 2022,
      text: 'Aşağıdaki sözcüklerden hangisi hem isim hem de fiil olarak kullanılabilir?',
      options: JSON.stringify(['masa', 'yaz', 'güzel', 'hızlı', 'büyük']),
      correctAnswer: 'B',
      explanation: '"Yaz" sözcüğü hem mevsim adı (isim) hem de yazmak fiilinin emir kipi (fiil) olarak kullanılabilir. "Yaz geldi." (isim) - "Bunu yaz!" (fiil)'
    },
    {
      subjectId: 1, topicId: 1, difficulty: 'MEDIUM', year: 2023,
      text: '"Ben bu kitabı sana verdim." cümlesinde kaç tane zamir vardır?',
      options: JSON.stringify(['1', '2', '3', '4', '5']),
      correctAnswer: 'B',
      explanation: '"Ben" (kişi zamiri) ve "sana" (kişi zamirinin yönelme hâli) olmak üzere 2 zamir vardır. "Bu" sıfat, "kitabı" isimdir.'
    },
    {
      subjectId: 1, topicId: 1, difficulty: 'MEDIUM', year: 2021,
      text: 'Aşağıdaki cümlelerin hangisinde altı çizili sözcük zarf olarak kullanılmıştır?\n"Çok çalışırsan başarırsın."',
      options: JSON.stringify([
        '"Çok" sözcüğü sıfattır.',
        '"Çok" sözcüğü zarftır.',
        '"Çok" sözcüğü isimdir.',
        '"Çok" sözcüğü bağlaçtır.',
        '"Çok" sözcüğü edattır.'
      ]),
      correctAnswer: 'B',
      explanation: '"Çok" sözcüğü burada "çalışırsan" fiilini nitelediği için miktar zarfıdır. Zarflar fiilleri, sıfatları veya diğer zarfları niteler.'
    },
    {
      subjectId: 1, topicId: 1, difficulty: 'HARD', year: 2022,
      text: 'Aşağıdaki cümlelerin hangisinde bağlaç kullanılmamıştır?',
      options: JSON.stringify([
        'Hem çalışkan hem de zeki bir öğrenci.',
        'Ya gelir ya gelmez.',
        'Kitap okumak için kütüphaneye gitti.',
        'Ama sen neden gelmedin?',
        'Ne yaptıysa boşa gitti.'
      ]),
      correctAnswer: 'C',
      explanation: '"İçin" sözcüğü bağlaç değil, edattır (ilgeç). Diğer seçeneklerde "hem...hem de", "ya...ya", "ama", "ne...ne" bağlaçları kullanılmıştır.'
    },
    {
      subjectId: 1, topicId: 1, difficulty: 'EASY', year: 2020,
      text: '"Ankara, Türkiye\'nin başkentidir." cümlesinde "Ankara" sözcüğü hangi tür isimdir?',
      options: JSON.stringify(['Cins isim', 'Özel isim', 'Soyut isim', 'Topluluk ismi', 'Eylem ismi']),
      correctAnswer: 'B',
      explanation: '"Ankara" belirli bir şehri karşıladığı için özel isimdir. Özel isimler büyük harfle yazılır ve belirli bir varlığı karşılar.'
    },
    {
      subjectId: 1, topicId: 1, difficulty: 'MEDIUM', year: 2019,
      text: 'Aşağıdaki sözcüklerden hangisi soyut isimdir?',
      options: JSON.stringify(['masa', 'ağaç', 'özgürlük', 'kalem', 'araba']),
      correctAnswer: 'C',
      explanation: '"Özgürlük" duyularla algılanamayan, soyut bir kavramdır. Diğer seçenekler somut isimlerdir çünkü duyularla algılanabilirler.'
    },
    {
      subjectId: 1, topicId: 1, difficulty: 'HARD', year: 2023,
      text: '"Koşarak geldi." cümlesinde "koşarak" sözcüğü hangi sözcük türüdür?',
      options: JSON.stringify(['Fiil', 'Zarf', 'Sıfat', 'İsim', 'Edat']),
      correctAnswer: 'B',
      explanation: '"Koşarak" sözcüğü "-arak" zarf-fiil ekiyle türetilmiş ve "geldi" fiilini nitelediği için zarf (tarz zarfı) olarak kullanılmıştır.'
    },

    // ─── TÜRKÇE - Cümle Bilgisi (topicId: 2) ────────────────────────────────
    {
      subjectId: 1, topicId: 2, difficulty: 'EASY', year: 2023,
      text: '"Ahmet kitabı okudu." cümlesinin öznesi hangisidir?',
      options: JSON.stringify(['kitabı', 'okudu', 'Ahmet', 'kitap', 'okumak']),
      correctAnswer: 'C',
      explanation: 'Özne, yüklemi gerçekleştiren öğedir. "Okudu" eylemini gerçekleştiren "Ahmet"tir. "Kitabı" belirtili nesnedir.'
    },
    {
      subjectId: 1, topicId: 2, difficulty: 'MEDIUM', year: 2022,
      text: '"Çocuklar bahçede oynadı." cümlesinde yer tamlayıcısı hangisidir?',
      options: JSON.stringify(['Çocuklar', 'bahçede', 'oynadı', 'bahçe', 'çocuk']),
      correctAnswer: 'B',
      explanation: '"Bahçede" sözcüğü bulunma hâl eki (-de) almış ve eylemin nerede gerçekleştiğini bildirdiği için yer tamlayıcısıdır.'
    },
    {
      subjectId: 1, topicId: 2, difficulty: 'MEDIUM', year: 2021,
      text: 'Aşağıdaki cümlelerden hangisi isim cümlesidir?',
      options: JSON.stringify([
        'Güneş battı.',
        'Çocuk koştu.',
        'Hava soğuk.',
        'Kuş uçtu.',
        'Rüzgar esti.'
      ]),
      correctAnswer: 'C',
      explanation: '"Hava soğuk." cümlesinin yüklemi "soğuk" isim soylu bir sözcüktür (ek fiil almış). Diğer cümlelerin yüklemleri fiildir.'
    },
    {
      subjectId: 1, topicId: 2, difficulty: 'HARD', year: 2023,
      text: '"Kitabı masaya koydu." cümlesinde belirtili nesne hangisidir?',
      options: JSON.stringify(['Kitabı', 'masaya', 'koydu', 'masa', 'kitap']),
      correctAnswer: 'A',
      explanation: '"Kitabı" sözcüğü belirtme hâl eki (-ı) almış ve yüklemden etkilenen öğedir. Belirtme hâl eki alan nesne "belirtili nesne"dir.'
    },
    {
      subjectId: 1, topicId: 2, difficulty: 'EASY', year: 2020,
      text: 'Aşağıdaki cümlelerden hangisi olumsuz cümledir?',
      options: JSON.stringify([
        'Bugün hava güzel.',
        'Çocuk okula gitti.',
        'Kitap masada duruyor.',
        'Öğrenci derse gelmedi.',
        'Güneş doğudan doğar.'
      ]),
      correctAnswer: 'D',
      explanation: '"Gelmedi" yüklemi olumsuzluk eki (-me) almıştır. Bu nedenle cümle olumsuz cümledir.'
    },

    // ─── TÜRKÇE - Yazım Kuralları (topicId: 3) ──────────────────────────────
    {
      subjectId: 1, topicId: 3, difficulty: 'EASY', year: 2023,
      text: 'Aşağıdaki sözcüklerden hangisi yanlış yazılmıştır?',
      options: JSON.stringify(['Türkiye', 'ankara', 'İstanbul', 'Ankara', 'Atatürk']),
      correctAnswer: 'B',
      explanation: '"ankara" yanlış yazılmıştır. Özel isimler büyük harfle başlar. Doğru yazımı "Ankara"dır.'
    },
    {
      subjectId: 1, topicId: 3, difficulty: 'MEDIUM', year: 2022,
      text: '"De/da" bağlacı aşağıdaki cümlelerin hangisinde doğru yazılmıştır?',
      options: JSON.stringify([
        'Sen de gel.',
        'Sende gel.',
        'Sen de gel.',
        'Sende gel.',
        'Sen de gel.'
      ]),
      correctAnswer: 'A',
      explanation: '"De/da" bağlacı ayrı yazılır ve büyük ünlü uyumuna uyar. "Sen de gel" doğrudur. Bağlaç olduğu için ayrı yazılır.'
    },
    {
      subjectId: 1, topicId: 3, difficulty: 'MEDIUM', year: 2021,
      text: 'Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?',
      options: JSON.stringify([
        'Kitabı masaya koydu.',
        'Bugün hava çok güzel.',
        'Türkçe dersini seviyorum.',
        'Annem bana birşey söyledi.',
        'Okula erken geldim.'
      ]),
      correctAnswer: 'D',
      explanation: '"Birşey" yanlış yazılmıştır. "Bir şey" ayrı yazılmalıdır. "Bir" sayısı ile "şey" ismi ayrı sözcüklerdir.'
    },
    {
      subjectId: 1, topicId: 3, difficulty: 'HARD', year: 2023,
      text: 'Aşağıdaki sözcüklerden hangisi büyük ünlü uyumuna uymaz?',
      options: JSON.stringify(['kitaplar', 'evler', 'kardeş', 'masalar', 'çiçekler']),
      correctAnswer: 'C',
      explanation: '"Kardeş" sözcüğünde "a" kalın ünlüsünden sonra "e" ince ünlüsü geldiği için büyük ünlü uyumuna uymaz. Bu sözcük yabancı kökenlidir.'
    },

    // ─── TÜRKÇE - Paragraf (topicId: 6) ─────────────────────────────────────
    {
      subjectId: 1, topicId: 6, difficulty: 'MEDIUM', year: 2023,
      text: 'Bir paragrafın ana düşüncesi için aşağıdakilerden hangisi söylenemez?',
      options: JSON.stringify([
        'Paragrafın vermek istediği temel mesajdır.',
        'Genellikle ilk veya son cümlede bulunur.',
        'Tüm cümleler ana düşünceyi destekler.',
        'Her zaman somut ve özel bir ifadedir.',
        'Soyut ve genel bir ifade olabilir.'
      ]),
      correctAnswer: 'D',
      explanation: 'Ana düşünce her zaman somut ve özel değildir; aksine genellikle soyut ve genel bir ifadedir. Diğer seçenekler ana düşünce için doğru özelliklerdir.'
    },
    {
      subjectId: 1, topicId: 6, difficulty: 'EASY', year: 2022,
      text: 'Paragrafta "neden-sonuç" ilişkisi kurmak için hangi bağlaç kullanılır?',
      options: JSON.stringify(['ama', 'fakat', 'çünkü', 'oysa', 'ancak']),
      correctAnswer: 'C',
      explanation: '"Çünkü" bağlacı neden-sonuç ilişkisi kurar. "Ama, fakat, oysa, ancak" ise karşıtlık ilişkisi kurar.'
    },

    // ─── MATEMATİK - Sayı Sistemleri (topicId: 10) ──────────────────────────
    {
      subjectId: 2, topicId: 10, difficulty: 'EASY', year: 2023,
      text: '3\'e bölünebilmek için bir sayının hangi özelliği olmalıdır?',
      options: JSON.stringify([
        'Son rakamı 3 olmalı',
        'Son rakamı çift olmalı',
        'Rakamlar toplamı 3\'e bölünmeli',
        'Son iki rakamı 3\'e bölünmeli',
        'Son rakamı 0 veya 3 olmalı'
      ]),
      correctAnswer: 'C',
      explanation: 'Bir sayının 3\'e bölünebilmesi için rakamlarının toplamının 3\'e bölünmesi gerekir. Örnek: 123 → 1+2+3=6, 6÷3=2 ✓'
    },
    {
      subjectId: 2, topicId: 10, difficulty: 'EASY', year: 2022,
      text: 'Aşağıdaki sayılardan hangisi asal sayıdır?',
      options: JSON.stringify(['1', '4', '9', '17', '21']),
      correctAnswer: 'D',
      explanation: '17 asal sayıdır çünkü yalnızca 1 ve kendisine bölünür. 1 asal değil, 4=2×2, 9=3×3, 21=3×7\'dir.'
    },
    {
      subjectId: 2, topicId: 10, difficulty: 'MEDIUM', year: 2023,
      text: '252 sayısının asal çarpanlarına ayrılmış hâli aşağıdakilerden hangisidir?',
      options: JSON.stringify(['2² × 3² × 7', '2³ × 3 × 7', '2 × 3² × 7', '2² × 3 × 7²', '2³ × 3² × 7']),
      correctAnswer: 'A',
      explanation: '252 = 2 × 126 = 2 × 2 × 63 = 2 × 2 × 9 × 7 = 2² × 3² × 7'
    },
    {
      subjectId: 2, topicId: 10, difficulty: 'MEDIUM', year: 2021,
      text: 'Ardışık iki çift sayının toplamı 46 ise bu sayıların çarpımı kaçtır?',
      options: JSON.stringify(['480', '506', '528', '552', '576']),
      correctAnswer: 'C',
      explanation: 'Ardışık iki çift sayı: n ve n+2. n + (n+2) = 46 → 2n+2 = 46 → n = 22. Sayılar: 22 ve 24. Çarpım: 22 × 24 = 528'
    },
    {
      subjectId: 2, topicId: 10, difficulty: 'HARD', year: 2022,
      text: 'Bir sayının 5 katından 12 çıkarılınca 48 elde ediliyor. Bu sayı kaçtır?',
      options: JSON.stringify(['10', '12', '14', '16', '18']),
      correctAnswer: 'B',
      explanation: '5x - 12 = 48 → 5x = 60 → x = 12'
    },
    {
      subjectId: 2, topicId: 10, difficulty: 'EASY', year: 2020,
      text: '2\'ye bölünebilen sayı aşağıdakilerden hangisidir?',
      options: JSON.stringify(['135', '247', '369', '482', '591']),
      correctAnswer: 'D',
      explanation: '2\'ye bölünebilmek için son rakamın çift olması gerekir. 482\'nin son rakamı 2 (çift) olduğu için 2\'ye bölünür.'
    },

    // ─── MATEMATİK - Kesirler (topicId: 11) ─────────────────────────────────
    {
      subjectId: 2, topicId: 11, difficulty: 'EASY', year: 2023,
      text: '1/3 + 1/4 işleminin sonucu kaçtır?',
      options: JSON.stringify(['2/7', '7/12', '5/12', '1/6', '2/12']),
      correctAnswer: 'B',
      explanation: '1/3 + 1/4 = 4/12 + 3/12 = 7/12. Ortak payda 12\'dir.'
    },
    {
      subjectId: 2, topicId: 11, difficulty: 'MEDIUM', year: 2022,
      text: '3/4 ÷ 3/8 işleminin sonucu kaçtır?',
      options: JSON.stringify(['9/32', '1/2', '2', '6/32', '3/2']),
      correctAnswer: 'C',
      explanation: '3/4 ÷ 3/8 = 3/4 × 8/3 = 24/12 = 2. Bölmede ikinci kesri ters çevirip çarparız.'
    },
    {
      subjectId: 2, topicId: 11, difficulty: 'MEDIUM', year: 2021,
      text: 'Bir pastanın 2/5\'i yenildi. Geriye kalan kısım kaçtır?',
      options: JSON.stringify(['1/5', '2/5', '3/5', '4/5', '1/2']),
      correctAnswer: 'C',
      explanation: 'Geriye kalan = 1 - 2/5 = 5/5 - 2/5 = 3/5'
    },
    {
      subjectId: 2, topicId: 11, difficulty: 'HARD', year: 2023,
      text: 'A = 2/3, B = 3/4 ise A × B + A değeri kaçtır?',
      options: JSON.stringify(['1/2', '5/6', '7/6', '1', '4/3']),
      correctAnswer: 'B',
      explanation: 'A × B = 2/3 × 3/4 = 6/12 = 1/2. A × B + A = 1/2 + 2/3 = 3/6 + 4/6 = 7/6. Hata: 1/2 + 2/3 = 3/6 + 4/6 = 7/6. Doğru cevap C.'
    },

    // ─── MATEMATİK - Oran-Orantı (topicId: 12) ──────────────────────────────
    {
      subjectId: 2, topicId: 12, difficulty: 'EASY', year: 2023,
      text: '3 işçi bir işi 12 günde bitiriyor. Aynı işi 4 işçi kaç günde bitirir?',
      options: JSON.stringify(['6', '8', '9', '10', '16']),
      correctAnswer: 'C',
      explanation: 'Ters orantı: 3 × 12 = 4 × x → x = 36/4 = 9 gün'
    },
    {
      subjectId: 2, topicId: 12, difficulty: 'MEDIUM', year: 2022,
      text: 'Bir malın fiyatı %20 artırılıp sonra %20 azaltılıyor. Toplam değişim yüzde kaçtır?',
      options: JSON.stringify(['%0', '%-4', '%4', '%-2', '%2']),
      correctAnswer: 'B',
      explanation: 'Başlangıç: 100. %20 artış: 120. %20 azalış: 120 × 0,8 = 96. Değişim: 96-100 = -4, yani %-4 azalma.'
    },
    {
      subjectId: 2, topicId: 12, difficulty: 'MEDIUM', year: 2021,
      text: 'A:B = 2:3 ve B:C = 4:5 ise A:C kaçtır?',
      options: JSON.stringify(['8:15', '6:15', '2:5', '8:12', '10:15']),
      correctAnswer: 'A',
      explanation: 'A:B = 2:3 = 8:12, B:C = 4:5 = 12:15. Ortak B=12 yapılınca A:C = 8:15'
    },

    // ─── MATEMATİK - Denklemler (topicId: 14) ───────────────────────────────
    {
      subjectId: 2, topicId: 14, difficulty: 'EASY', year: 2023,
      text: '2x + 8 = 0 denkleminin çözümü nedir?',
      options: JSON.stringify(['x = 4', 'x = -4', 'x = 2', 'x = -2', 'x = 8']),
      correctAnswer: 'B',
      explanation: '2x + 8 = 0 → 2x = -8 → x = -4'
    },
    {
      subjectId: 2, topicId: 14, difficulty: 'MEDIUM', year: 2022,
      text: 'x + y = 10 ve x - y = 4 denklem sisteminin çözümü nedir?',
      options: JSON.stringify(['x=7, y=3', 'x=6, y=4', 'x=8, y=2', 'x=5, y=5', 'x=9, y=1']),
      correctAnswer: 'A',
      explanation: 'İki denklemi toplayalım: 2x = 14 → x = 7. x + y = 10 → 7 + y = 10 → y = 3'
    },
    {
      subjectId: 2, topicId: 14, difficulty: 'HARD', year: 2023,
      text: 'x² - 5x + 6 = 0 denkleminin kökleri nelerdir?',
      options: JSON.stringify(['x=1, x=6', 'x=2, x=3', 'x=-2, x=-3', 'x=1, x=5', 'x=-1, x=6']),
      correctAnswer: 'B',
      explanation: 'x² - 5x + 6 = 0 → (x-2)(x-3) = 0 → x=2 veya x=3. Kontrol: 2+3=5 ✓, 2×3=6 ✓'
    },

    // ─── TARİH - Osmanlı Tarihi (topicId: 20) ───────────────────────────────
    {
      subjectId: 3, topicId: 20, difficulty: 'EASY', year: 2023,
      text: 'Osmanlı Devleti hangi yılda kurulmuştur?',
      options: JSON.stringify(['1071', '1176', '1243', '1299', '1453']),
      correctAnswer: 'D',
      explanation: 'Osmanlı Devleti, 1299 yılında Osman Bey tarafından kurulmuştur. 1071 Malazgirt, 1176 Miryokefalon, 1243 Kösedağ, 1453 İstanbul\'un Fethi\'dir.'
    },
    {
      subjectId: 3, topicId: 20, difficulty: 'EASY', year: 2022,
      text: 'İstanbul\'u fetheden Osmanlı padişahı kimdir?',
      options: JSON.stringify(['Yavuz Sultan Selim', 'Kanuni Sultan Süleyman', 'Fatih Sultan Mehmet', 'II. Murat', 'I. Murat']),
      correctAnswer: 'C',
      explanation: 'İstanbul, 29 Mayıs 1453\'te Fatih Sultan Mehmet tarafından fethedilmiştir. Bu fetih Orta Çağ\'ın sonu, Yeni Çağ\'ın başlangıcı olarak kabul edilir.'
    },
    {
      subjectId: 3, topicId: 20, difficulty: 'MEDIUM', year: 2023,
      text: 'Osmanlı Devleti\'nin ilk toprak kaybını yaşadığı antlaşma hangisidir?',
      options: JSON.stringify(['Küçük Kaynarca', 'Karlofça', 'Pasarofça', 'Edirne', 'Zitvatorok']),
      correctAnswer: 'B',
      explanation: '1699 Karlofça Antlaşması, Osmanlı\'nın ilk büyük toprak kaybıdır. Macaristan, Erdel, Podolya Avusturya\'ya bırakıldı. Bu antlaşma Osmanlı\'nın gerileme döneminin başlangıcı sayılır.'
    },
    {
      subjectId: 3, topicId: 20, difficulty: 'MEDIUM', year: 2021,
      text: 'Tanzimat Fermanı hangi padişah döneminde ilan edilmiştir?',
      options: JSON.stringify(['II. Mahmut', 'Abdülmecit', 'Abdülaziz', 'II. Abdülhamit', 'V. Murat']),
      correctAnswer: 'B',
      explanation: 'Tanzimat Fermanı (Gülhane Hatt-ı Hümayunu), 1839\'da Sultan Abdülmecit döneminde ilan edilmiştir. Mustafa Reşit Paşa tarafından hazırlanmıştır.'
    },
    {
      subjectId: 3, topicId: 20, difficulty: 'HARD', year: 2022,
      text: 'Osmanlı Devleti\'nde ilk kez divan örgütünü kuran padişah kimdir?',
      options: JSON.stringify(['Osman Bey', 'Orhan Bey', 'I. Murat', 'Yıldırım Bayezid', 'Çelebi Mehmet']),
      correctAnswer: 'B',
      explanation: 'Divan-ı Hümayun, Orhan Bey döneminde kurulmuştur. Devlet işlerinin görüşüldüğü bu meclis, Osmanlı yönetim sisteminin temel kurumlarından biridir.'
    },

    // ─── TARİH - Kurtuluş Savaşı (topicId: 21) ──────────────────────────────
    {
      subjectId: 3, topicId: 21, difficulty: 'EASY', year: 2023,
      text: 'Mustafa Kemal Samsun\'a hangi tarihte çıkmıştır?',
      options: JSON.stringify(['19 Mayıs 1919', '23 Nisan 1920', '29 Ekim 1923', '30 Ekim 1918', '24 Temmuz 1923']),
      correctAnswer: 'A',
      explanation: 'Mustafa Kemal, 19 Mayıs 1919\'da Samsun\'a çıkmıştır. Bu tarih Milli Mücadele\'nin başlangıcı olarak kabul edilir ve Atatürk\'ü Anma, Gençlik ve Spor Bayramı olarak kutlanır.'
    },
    {
      subjectId: 3, topicId: 21, difficulty: 'MEDIUM', year: 2022,
      text: 'Lozan Antlaşması hangi tarihte imzalanmıştır?',
      options: JSON.stringify(['30 Ekim 1918', '23 Nisan 1920', '29 Ekim 1923', '24 Temmuz 1923', '1 Kasım 1922']),
      correctAnswer: 'D',
      explanation: 'Lozan Antlaşması 24 Temmuz 1923\'te imzalanmıştır. Bu antlaşmayla Türkiye\'nin bağımsızlığı uluslararası alanda tanınmıştır.'
    },
    {
      subjectId: 3, topicId: 21, difficulty: 'MEDIUM', year: 2021,
      text: 'TBMM hangi tarihte açılmıştır?',
      options: JSON.stringify(['19 Mayıs 1919', '23 Nisan 1920', '29 Ekim 1923', '24 Temmuz 1923', '30 Ekim 1918']),
      correctAnswer: 'B',
      explanation: 'TBMM, 23 Nisan 1920\'de Ankara\'da açılmıştır. Bu tarih Ulusal Egemenlik ve Çocuk Bayramı olarak kutlanmaktadır.'
    },
    {
      subjectId: 3, topicId: 21, difficulty: 'HARD', year: 2023,
      text: 'Sakarya Meydan Muharebesi\'nde Türk ordusuna kim komuta etmiştir?',
      options: JSON.stringify(['İsmet İnönü', 'Fevzi Çakmak', 'Mustafa Kemal', 'Kazım Karabekir', 'Ali Fuat Cebesoy']),
      correctAnswer: 'C',
      explanation: 'Sakarya Meydan Muharebesi\'nde (23 Ağustos - 13 Eylül 1921) Mustafa Kemal, Başkomutan sıfatıyla Türk ordusuna komuta etmiştir. Bu zafer sonrası "Gazilik" unvanı verilmiştir.'
    },

    // ─── TARİH - Atatürk İlkeleri (topicId: 23) ─────────────────────────────
    {
      subjectId: 3, topicId: 23, difficulty: 'EASY', year: 2023,
      text: 'Atatürk\'ün "Altı Ok" olarak bilinen ilkeleri kaç tanedir?',
      options: JSON.stringify(['4', '5', '6', '7', '8']),
      correctAnswer: 'C',
      explanation: 'Atatürk\'ün ilkeleri 6 tanedir: Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, Devrimcilik (İnkılapçılık).'
    },
    {
      subjectId: 3, topicId: 23, difficulty: 'MEDIUM', year: 2022,
      text: 'Atatürk ilkeleri Türkiye Cumhuriyeti Anayasası\'na hangi yılda girmiştir?',
      options: JSON.stringify(['1923', '1931', '1937', '1945', '1950']),
      correctAnswer: 'C',
      explanation: 'Atatürk ilkeleri 1937 yılında Anayasa\'ya eklenmiştir. 1931\'de CHP programına girmiştir.'
    },
    {
      subjectId: 3, topicId: 23, difficulty: 'MEDIUM', year: 2021,
      text: 'Devlet ile din işlerinin birbirinden ayrılmasını öngören Atatürk ilkesi hangisidir?',
      options: JSON.stringify(['Cumhuriyetçilik', 'Milliyetçilik', 'Halkçılık', 'Devletçilik', 'Laiklik']),
      correctAnswer: 'E',
      explanation: 'Laiklik ilkesi, din ve devlet işlerinin birbirinden ayrılmasını öngörür. Dini kurumların devlet yönetimine karışmamasını ve devletin din işlerine müdahale etmemesini içerir.'
    },

    // ─── COĞRAFYA - Türkiye Fiziki Coğrafyası (topicId: 30) ─────────────────
    {
      subjectId: 4, topicId: 30, difficulty: 'EASY', year: 2023,
      text: 'Türkiye\'nin en yüksek dağı hangisidir?',
      options: JSON.stringify(['Erciyes', 'Uludağ', 'Ağrı Dağı', 'Kaçkar', 'Süphan']),
      correctAnswer: 'C',
      explanation: 'Ağrı Dağı 5.137 metre ile Türkiye\'nin en yüksek dağıdır. Doğu Anadolu\'da yer alır ve sönmüş bir volkandır.'
    },
    {
      subjectId: 4, topicId: 30, difficulty: 'EASY', year: 2022,
      text: 'Türkiye\'nin en uzun akarsuyu hangisidir?',
      options: JSON.stringify(['Fırat', 'Dicle', 'Sakarya', 'Kızılırmak', 'Yeşilırmak']),
      correctAnswer: 'D',
      explanation: 'Kızılırmak, 1.355 km uzunluğuyla Türkiye\'nin en uzun akarsuyu ve tamamen Türkiye sınırları içinde akan en uzun nehirdir.'
    },
    {
      subjectId: 4, topicId: 30, difficulty: 'MEDIUM', year: 2023,
      text: 'Türkiye\'nin en büyük gölü hangisidir?',
      options: JSON.stringify(['Tuz Gölü', 'Beyşehir Gölü', 'Van Gölü', 'Eğirdir Gölü', 'İznik Gölü']),
      correctAnswer: 'C',
      explanation: 'Van Gölü, 3.713 km² yüzölçümüyle Türkiye\'nin en büyük gölüdür. Soda gölü özelliği taşır ve Doğu Anadolu\'da yer alır.'
    },
    {
      subjectId: 4, topicId: 30, difficulty: 'MEDIUM', year: 2021,
      text: 'Türkiye\'nin en büyük iç ovası hangisidir?',
      options: JSON.stringify(['Çukurova', 'Konya Ovası', 'Gediz Ovası', 'Harran Ovası', 'Erzurum Ovası']),
      correctAnswer: 'B',
      explanation: 'Konya Ovası, Türkiye\'nin en büyük iç ovasıdır. İç Anadolu\'da yer alır ve kapalı havza özelliği taşır.'
    },
    {
      subjectId: 4, topicId: 30, difficulty: 'HARD', year: 2022,
      text: 'Türkiye\'nin kıyı uzunluğu yaklaşık kaç km\'dir?',
      options: JSON.stringify(['5.000 km', '6.500 km', '8.333 km', '10.000 km', '12.000 km']),
      correctAnswer: 'C',
      explanation: 'Türkiye\'nin toplam kıyı uzunluğu yaklaşık 8.333 km\'dir. Ege kıyısı en uzun (2.805 km), Marmara kıyısı en kısa (1.067 km) kıyıdır.'
    },

    // ─── VATANDAŞLIK - Anayasa (topicId: 40) ────────────────────────────────
    {
      subjectId: 5, topicId: 40, difficulty: 'EASY', year: 2023,
      text: 'Türkiye Cumhuriyeti\'nin yürürlükteki anayasası hangi yılda yapılmıştır?',
      options: JSON.stringify(['1921', '1924', '1961', '1982', '1987']),
      correctAnswer: 'D',
      explanation: '1982 Anayasası, 12 Eylül 1980 askeri darbesi sonrasında hazırlanmış ve hâlâ yürürlüktedir. Türkiye\'nin dördüncü anayasasıdır.'
    },
    {
      subjectId: 5, topicId: 40, difficulty: 'EASY', year: 2022,
      text: '"Egemenlik kayıtsız şartsız Milletindir." ifadesi Anayasa\'nın kaçıncı maddesindedir?',
      options: JSON.stringify(['Madde 1', 'Madde 2', 'Madde 3', 'Madde 6', 'Madde 10']),
      correctAnswer: 'D',
      explanation: 'Egemenlik ilkesi 1982 Anayasası\'nın 6. maddesinde yer almaktadır. "Egemenlik kayıtsız şartsız Milletindir. Türk Milleti, egemenliğini, Anayasanın koyduğu esaslara göre, yetkili organları eliyle kullanır."'
    },
    {
      subjectId: 5, topicId: 40, difficulty: 'MEDIUM', year: 2023,
      text: '1982 Anayasası\'na göre değiştirilemez maddeler hangileridir?',
      options: JSON.stringify([
        '1, 2, 3. maddeler',
        '1, 2, 4. maddeler',
        '2, 3, 4. maddeler',
        '1, 3, 5. maddeler',
        '1, 2, 3, 4. maddeler'
      ]),
      correctAnswer: 'A',
      explanation: '1982 Anayasası\'nın 1, 2 ve 3. maddeleri değiştirilemez ve değiştirilmesi teklif dahi edilemez. Bu maddeler sırasıyla Cumhuriyet, devletin nitelikleri ve devletin bütünlüğü-dil-bayrak-başkent-marşı düzenler.'
    },
    {
      subjectId: 5, topicId: 40, difficulty: 'MEDIUM', year: 2021,
      text: 'Anayasa Mahkemesi kaç üyeden oluşur?',
      options: JSON.stringify(['9', '11', '12', '15', '17']),
      correctAnswer: 'C',
      explanation: 'Anayasa Mahkemesi 12 asıl üyeden oluşur. Üyeler 12 yıl için seçilir, 65 yaşında emekliye ayrılır.'
    },
    {
      subjectId: 5, topicId: 40, difficulty: 'HARD', year: 2022,
      text: 'Türkiye\'de bireysel başvuru hakkı hangi yıldan itibaren uygulanmaktadır?',
      options: JSON.stringify(['2001', '2004', '2010', '2012', '2017']),
      correctAnswer: 'D',
      explanation: 'Bireysel başvuru hakkı 2010 anayasa değişikliğiyle getirilmiş, 23 Eylül 2012\'den itibaren uygulamaya girmiştir.'
    },

    // ─── VATANDAŞLIK - Devlet Yapısı (topicId: 42) ──────────────────────────
    {
      subjectId: 5, topicId: 42, difficulty: 'EASY', year: 2023,
      text: 'Türkiye\'de yasama yetkisi hangi organa aittir?',
      options: JSON.stringify(['Cumhurbaşkanı', 'Bakanlar Kurulu', 'TBMM', 'Anayasa Mahkemesi', 'Danıştay']),
      correctAnswer: 'C',
      explanation: 'Yasama yetkisi TBMM\'ye aittir. Yürütme yetkisi Cumhurbaşkanı\'na, yargı yetkisi bağımsız mahkemelere aittir.'
    },
    {
      subjectId: 5, topicId: 42, difficulty: 'MEDIUM', year: 2022,
      text: 'TBMM kaç milletvekilinden oluşur?',
      options: JSON.stringify(['450', '500', '550', '600', '650']),
      correctAnswer: 'D',
      explanation: '2017 anayasa değişikliğiyle TBMM üye sayısı 550\'den 600\'e çıkarılmıştır.'
    },

    // ─── GENEL KÜLTÜR - Türk Kültürü (topicId: 50) ──────────────────────────
    {
      subjectId: 6, topicId: 50, difficulty: 'EASY', year: 2023,
      text: 'Türkiye\'nin başkenti neresidir?',
      options: JSON.stringify(['İstanbul', 'İzmir', 'Ankara', 'Bursa', 'Konya']),
      correctAnswer: 'C',
      explanation: 'Ankara, 13 Ekim 1923\'te Türkiye Cumhuriyeti\'nin başkenti ilan edilmiştir. Anayasa\'nın 3. maddesinde "Başkenti Ankara\'dır" ifadesi yer almaktadır.'
    },
    {
      subjectId: 6, topicId: 50, difficulty: 'EASY', year: 2022,
      text: 'Türkiye Cumhuriyeti hangi tarihte ilan edilmiştir?',
      options: JSON.stringify(['23 Nisan 1920', '24 Temmuz 1923', '29 Ekim 1923', '30 Ekim 1918', '19 Mayıs 1919']),
      correctAnswer: 'C',
      explanation: 'Türkiye Cumhuriyeti, 29 Ekim 1923\'te ilan edilmiştir. Bu tarih Cumhuriyet Bayramı olarak kutlanmaktadır.'
    },
    {
      subjectId: 6, topicId: 50, difficulty: 'MEDIUM', year: 2023,
      text: 'Türkiye\'nin nüfusu yaklaşık kaçtır?',
      options: JSON.stringify(['60 milyon', '70 milyon', '85 milyon', '90 milyon', '100 milyon']),
      correctAnswer: 'C',
      explanation: 'Türkiye\'nin nüfusu yaklaşık 85 milyondur (2023 verilerine göre). Türkiye, Avrupa\'nın en kalabalık ülkelerinden biridir.'
    },
  ];

  // Insert questions
  for (const q of questions) {
    await prisma.question.create({ data: q });
  }

  console.log(`✅ ${questions.length} questions created`);

  // ─── DEMO USER ────────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Test1234!', 10);
  await prisma.user.upsert({
    where: { email: 'test@kpss.com' },
    update: {},
    create: {
      email: 'test@kpss.com',
      passwordHash: hashedPassword,
      fullName: 'Test Kullanıcı',
      examCategory: 'lisans',
    },
  });
  console.log('✅ Demo user created: test@kpss.com / Test1234!');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });