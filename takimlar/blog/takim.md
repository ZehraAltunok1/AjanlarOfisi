# Blog takımı — Noonwire

**Amaç:** Her gün 12:00'de (Europe/Istanbul) genel teknoloji dünyasındaki en önemli gelişmeleri takip edip
İngilizce iki yazı hazırlamak:
1. **Daily Brief** — günün 5–7 maddelik özeti (her madde 2–3 cümle + kaynak).
2. **Deep Dive** — günün en önemli konusunu anlatan 700–1100 kelimelik makale.

Konu kapsamı: yapay zekâ, yazılım ve geliştirici araçları, donanım ve çipler, güvenlik, bilim-teknoloji,
girişimler ve büyük şirket hamleleri, açık kaynak.

---

## Günlük koşu (Genel Yayın Yönetmeni = ana oturum yürütür)

`D` = bugünün tarihi (YYYY-MM-DD), klasör `takimlar/blog/kosu/D/`.

1. **Hazırlık** — Klasörü oluştur. `olaylar.jsonl`'a `yayin-yonetmeni basladi` yaz. `durum.json` → `"durum":"calisiyor"`.
   Bugün zaten bir koşu varsa ve onaylanmışsa dur, Zehra'ya söyle.
2. **Haber Avcısı** alt ajanını çağır → `01-haberler.md`. Teslimi kaydet.
3. **Doğrulayıcı** alt ajanını çağır → `02-dogrulanmis.md`. Teslimi kaydet.
   Doğrulanmış (✅/🟡) madde sayısı 5'ten azsa Haber Avcısı'nı bir kez daha çağır (ek tarama).
4. **Yazar** alt ajanını çağır → `03-ozet.md` + `04-makale.md`.
5. **Bekçi** alt ajanını çağır → `05-bekci.md`.
   - `red` → Yazar'ı bekçinin gerekçesiyle tekrar çağır, sonra tekrar Bekçi. **En fazla 2 red turu.**
   - 2. redden sonra hâlâ red → `durum: "takildi"`, Zehra'ya danış.
6. **Kabul** → taslakların `status: draft` kaldığını doğrula. `durum: "onay-bekliyor"`.
   `olaylar.jsonl`'a `onay-bekliyor` yaz.
7. **Günün raporu** `06-rapor.md`: hangi kaynaklar tarandı, kaç aday çıktı, kaç tanesi elendi ve neden,
   bekçi kaç tur sürdü, ajanların defter notları. Zehra'ya 5 satırlık özet ver.
8. **Defter** — Her ajanın bildirdiği dersi (varsa) `defter.md`'ye tarihli ekle.

Zehra **"onayla"** derse → **Yayıncı** alt ajanı çağrılır, sonra yerel commit önerilir
(`content(blog): publish daily brief D`). Push yalnızca Zehra'nın onayıyla.

---

## Ajanların iş tarifleri

### haber-avcisi
- `kaynaklar.md` listesinden başlar; gerekirse web araması yapar. En fazla 30 sayfa okur.
- Son **24–36 saatin** gelişmelerini toplar. `yayinlananlar.json`'daki konuları tekrar etmez
  (aynı konuda gerçekten yeni bir gelişme varsa "takip" olarak işaretler).
- **Çıktı `01-haberler.md`**: 10–15 aday. Her aday: başlık, 1–2 cümle ne oldu, neden önemli,
  kategori, kaynak link(ler)i, yayın zamanı, önem puanı (1–5).

### dogrulayici
- Her adayın ana iddiasını kaynağından kontrol eder. Birincil kaynağı bulmaya çalışır.
- Etiket: ✅ / 🟡 / ⛔ (ANAYASA Madde 2). ⛔ olanları gerekçesiyle eler.
- **Çıktı `02-dogrulanmis.md`**: doğrulanmış liste (önem sırasına göre) + elenenler bölümü.
  En üstte "Deep Dive adayı" önerisi (1 konu, neden).

### yazar
- Yalnızca `02-dogrulanmis.md`'deki bilgiyi kullanır; yeni iddia eklemez.
- **`03-ozet.md`** (Daily Brief) ve **`04-makale.md`** (Deep Dive) — biçim için `kurallar.md` → "Yazı biçimi".
- Bekçiden red gelirse yalnızca gerekçede belirtilen yerleri düzeltir.

### bekci (Haiku)
- Taslakları `ANAYASA.md` + `kurallar.md` ile karşılaştırır. Kontrol listesi `kurallar.md` → "Bekçi kontrol listesi".
- **Çıktı `05-bekci.md`**'ye yeni bir tur ekler: `KARAR: kabul|red`, maddeli gerekçe.

### yayinci
- Yalnızca Zehra onayından sonra çalışır.
- Taslakları blog içerik klasörüne kopyalar (`blog/src/content/posts/` — site kurulunca),
  `status: published` ve `publishedAt` alanlarını ayarlar, `yayinlananlar.json`'a konuları ekler.
