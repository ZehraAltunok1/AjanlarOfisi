# Tasarım araştırması — Noonwire (2026-11-24)

## İncelenen kaynaklar
- **Awwwards — Magazine / Newspaper / Blog** (sayfa 1–2) ve **/websites/blog/**: 2026 ödülleri arasında
  Ai in Design Report 2026 (++hellohello, SOTD), Hearst Exhibit 2026 (OSMOS, SOTD), The Lookback (SOTD),
  Vogue Business | Archrival (SOTD), nippori seminar (Typography Honors), Claude on Mars (Anthropic, HM),
  The boring blog (HM), The Explora Journal (HM). Kategori çoğunlukla marka/portfolyo; haber sitesi az.
- **Webby 2026 — Best Writing (Editorial):** kazanan Chronically Online Magazine (Manychat).
- **Referans editoryal siteler:** Rest of World (başlıklar Moderat sans 700, gövde Georgia serif 17.5px),
  Works in Progress (sayı numaralı "Issue NN" sistemi, tek kolon liste), MIT Technology Review
  ("Latest" + konu filtresi + "Load more", sayı/issue gösterimi), Every (kart akışı, kısa tarih, bölüm etiketi),
  Stripe Press (klavye kısayolları, `/llms.txt`). The Verge okunamadı.

## Tekrar eden kalıplar → Noonwire'a ne alıyoruz
| Kalıp | Noonwire'da |
|---|---|
| Başlıkta sans, gövdede serif (Rest of World) | Uzun okuma için serif gövde, 65–72 karakter satır |
| Başlık üstünde etiket (beat/topic) | Her maddede kategori etiketi (AI, Security, Hardware…) |
| Sayı / tarih sistemi (WIP, MIT TR) | Her gün bir "sayı": **No. 001 · 24 Nov 2026 · 12:00** |
| Okuma süresi | Deep Dive'da "8 min read" |
| Kart / liste akışı + load more | Arşiv: gün gün sayılar, etiket filtresi |
| Bülten kutusu | Şimdilik yok; RSS var (sonra bülten) |
| Karanlık mod | Baştan var |
| Doğrulama şeffaflığı (bizim farkımız) | Her maddede kaynak + ✅/🟡 rozeti, "5 sources verified" |

## Üç yön
- **A · Öğlen Baskısı:** krem kâğıt zemin, Newsreader serif + Inter, çift çizgili gazete başlığı,
  sol kolonda Deep Dive, sağda numaralı Daily Brief. Sakin, prestijli, okuma odaklı.
- **B · Sinyal Terminali:** koyu zemin, Space Grotesk + JetBrains Mono, lime vurgu, saat damgalı haber akışı,
  "run #001 · 14 sources" gibi ajan izleri. Teknik, "ajanlarla üretildi" hissi güçlü.
- **C · İsviçre Izgarası:** beyaz, dev Inter Tight başlık ("Tuesday, 24 November."), renk kodlu kategori kartları.
  Modern, canlı, taranabilir.

**Karar:** Zehra seçecek → ADR olarak `DECISIONS.md`'ye yazılacak.
