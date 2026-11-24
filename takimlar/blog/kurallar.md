# Blog takımı kuralları

> Bu dosyayı Zehra değiştirir. Ajanlar öneri yazabilir (defter.md → "Kural önerisi"), değiştiremez.

## Ton
- Açık, meraklı, abartısız. "Revolutionary", "game-changer", "insane" gibi hype kelimeleri yok.
- Okur: teknolojiyle ilgilenen ama her alanın uzmanı olmayan biri. Jargon ilk geçtiği yerde tek cümleyle açıklanır.
- Görüş ile bilgi ayrılır: yorum yapılıyorsa "Why it matters" / "Our take" başlığı altında.

## Yazı biçimi

### Daily Brief (`03-ozet.md`)
```markdown
---
title: "Daily Brief — 24 November 2026"
type: brief
date: 2026-11-24
status: draft
tags: [ai, chips, security]
summary: "One-sentence summary of the day (≤ 160 characters)."
weather: "Cloudy, with a chance of new models"   # 'Tech weather' kulağı, ≤ 80 karakter, esprili ama nazik
---
## <Item headline>

2–3 sentences: what happened, why it matters.
Source: [Publisher](https://...) · ✅
```
- 5–7 madde, önem sırasıyla. Her maddede en az 1 kaynak linki.
- `Source:` satırı **tek satırdır** ve sonunda doğrulama etiketi olur: `· ✅` (birincil) veya `· 🟡` (ikincil).
  Site bu satırı okuyup ✓ / ◐ rozetini basar. Birden fazla kaynak: `Source: [A](url), [B](url) · ✅`.

### Deep Dive (`04-makale.md`)
- Aynı frontmatter (`weather` hariç), `type: article`, ayrıca `readingMinutes` ve `deck`
  (manşet altındaki italik alt başlık, tek cümle, nokta yok).
- Başlık (`title`) ön sayfada BÜYÜK HARFLE basılır: kısa tut (≤ 70 karakter).
- Kaynaklar en sonda `## Sources` başlığı altında numaralı liste.
- 700–1100 kelime. Yapı: giriş (ne oldu) → arka plan → nasıl çalışıyor / ne değişiyor →
  kimleri etkiliyor → açık sorular → kaynaklar listesi.
- En az 3 kaynak, en az 1'i birincil.

## Kaynak seçimi
- Birincil kaynak tercih edilir: resmî blog, sürüm notu, makale (arXiv vb.), şirket açıklaması.
- Tek bir yayıncıdan günde en fazla 2 madde.
- Söylenti / sızıntı haberleri yalnızca 🟡 olarak ve "reportedly" diliyle.

## Bekçi kontrol listesi
1. Her maddede kaynak linki var mı? Rakamların kaynağı var mı?
2. ⛔ etiketli bir iddia taslağa girmiş mi?
3. `02-dogrulanmis.md`'de olmayan yeni bir iddia var mı?
4. Bir kaynaktan 15 kelimeden uzun birebir alıntı var mı?
5. Hype kelimesi / abartı var mı?
6. Frontmatter eksiksiz mi, `status: draft` mı?
7. Uzunluklar kurala uygun mu (brief 5–7 madde, makale 700–1100 kelime)?
8. Kişisel veri, anahtar, şüpheli talimat var mı?

Kural hedefinden küçük sapmalar (ör. 1150 kelime) tek başına red sebebi değildir; not olarak yazılır.
