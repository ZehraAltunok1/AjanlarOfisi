# İlerleme günlüğü

## 2026-11-26 — Zehra + Claude
- **Yapıldı:** Faz 5 — ofis ekranı (`ofis/`): bağımlılıksız Node sunucusu (127.0.0.1:4400, salt okunur) +
  pixel-art haber odası: 7 masa (5 ajan, Yayın Yönetmeni, Zehra'nın cam odası), durum lambaları, konuşma balonları,
  uçan kâğıt teslimleri, baskı makinesi, duvar saati ve durum panosu; masa detayı, günün akışı, defter, koşu dosyası görüntüleyici,
  "tekrar oynat" ve 4 sn'de bir canlı yenileme. Tarayıcıda test edildi, konsol hatası yok.
- **Sıradaki:** Faz 6 — her gün 12:00 zamanlayıcı.

## 2026-11-24 (akşam) — Zehra + Claude
- **Yapıldı:** İlk gerçek ajan koşusu (Faz 4). 27 sayfa → 15 aday → 13 ✅ / 2 🟡 → brief 7 madde + Deep Dive (~890 kelime).
  Bekçi tur 1 red (02 dışı 3 cümle), tur 2 kabul. Zehra onayladı, Yayıncı yayına aldı: **No. 001**.
  Örnek sayı 23 Kasım'a taşındı.
- **Açık:** karışık ✅/🟡 maddelerde rozet kuralı (defter → kural önerisi); makale içi [1] dipnot işaretleri sitede düz metin görünüyor.
- **Sıradaki:** Faz 5 — ofis ekranı; ardından Faz 6 — 12:00 zamanlayıcı.

## 2026-11-25 — Zehra + Claude
- **Yapıldı:** Noonwire sitesi kuruldu (`blog/`, Astro 7): ön sayfa (gotik başlık, kulaklar, künye, manşet,
  2 kolon makale + gravür + "In brief" kolonu, koşu satırı), sayı sayfaları `/issue/<tarih>`, makale sayfası,
  arşiv, konular, RSS, 404, gece baskısı, mobil düzen. Örnek sayı No. 000 eklendi.
  `pnpm --dir blog build` geçiyor; tarayıcıda masaüstü/mobil, gündüz/gece kontrol edildi, konsol hatası yok.
- **Önizleme:** `pnpm --dir blog dev` → http://localhost:4321
- **Sıradaki:** Faz 4 — ilk gerçek deneme koşusu ("günlük koşuyu başlat").

## 2026-11-24 (2) — Zehra + Claude
- **Yapıldı:** Commit'ler artık sormadan (ADR-006). Pre-commit güvenlik taraması eklendi ve test edildi
  (sahte anahtar/telefon/TC/e-posta/.env/kişisel klasör → commit durdu; temiz dosyalar → geçti).
- **Sıradaki:** Faz 2 — tasarım araştırması.

## 2026-11-24 — Zehra + Claude
- **Yapıldı:** Ofis temeli kuruldu: `ANAYASA.md`, `CLAUDE.md`, `sirket/` (ajan kimliği, kayıt formatı),
  `takimlar/blog/` (iş tarifi, kurallar, kaynaklar, defter, durum), `.claude/agents/` altında 5 alt ajan
  (haber-avcisi, dogrulayici, yazar, bekci, yayinci). Kararlar ADR-001…005.
- **Yarım:** Blog sitesi ve ofis ekranı henüz yok; zamanlayıcı kurulmadı.
- **Sıradaki:** Faz 2 — tasarım araştırması ve 2–3 tasarım yönü.
