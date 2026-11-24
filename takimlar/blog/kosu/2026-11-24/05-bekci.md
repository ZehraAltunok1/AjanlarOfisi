# Bekçi denetimi — 2026-11-24

Denetlenen: `03-ozet.md` (Daily Brief), `04-makale.md` (Deep Dive). Dayanak: `02-dogrulanmis.md`. Taslaklara dokunulmadı.

## Round 1 — 2026-11-24T21:28:23+03:00
KARAR: red
- [x] 1. Sources present — 03-ozet.md: 7 madde, her birinin tek satırlık `Source:` satırı var ve hepsi `· ✅` ile bitiyor. 04-makale.md: `## Sources` altında 4 numaralı kaynak (1 primary). Rakamların hepsinin kaynağı var (31 %, $43.9B, $260.41, 34 %, $7.5B, 1.135, 24 sunucu / 22 kuruluş, 8 soru).
- [x] 2. ⛔ claim — Taslaklarda ⛔ etiketli iddia yok. 02'deki Microsoft "Code Red" ve diğer ⛔ maddeler taslağa girmemiş.
- [ ] 3. 02'de olmayan iddia → iki yerde:
  - `03-ozet.md`, başlık `## Agentic attack tools are hitting old weaknesses faster`, cümle "The Check Point flaw tied to the campaign is CVE-2026-16232". 02, CVE-2026-16232'yi yalnızca "Check Point CNA kaydı" olarak doğruluyor; kampanyayla bağlantısını doğrulamıyor. Düzeltme: cümleyi çıkar.
  - `04-makale.md`, giriş paragrafı (ilk başlıktan önce): "Neither document mentions the other." 02 Nvidia'nın bülteninin BIS listesinden söz edip etmediğini kontrol etmemiş. Düzeltme: cümleyi çıkar ya da 02'ye doğrulama ekleyip sonra kullan.
  - `04-makale.md`, `## How the board is changing oversight`: "Nvidia's release does not say what powers the committee has or how often it will report." 02'de böyle bir negatif iddia yok. Düzeltme: çıkar ya da doğrula.
- [x] 4. Uzun alıntı — Tırnak içi metinlerin tamamı 15 kelimenin altında ("agentic offensive frameworks", "upatches", "Secure Infrastructure Project", "presumption of denial"). 15 kelimeyi aşan birebir alıntı yok.
- [x] 5. Hype / abartı — "revolution", "game-changer", "insane", "massive" vb. taranmış, yok. Aşağıdaki not (deck) abartı olarak işaretlenmiştir, red değildir.
- [x] 6. Frontmatter — Brief: title, type: brief, date, status: draft, tags, summary (≈117 karakter, ≤160), weather (≈59 karakter, ≤80). Makale: title (62 karakter, ≤70), type: article, date, status: draft, tags, summary, deck (nokta yok), readingMinutes: 5. Weather makalede yok (doğru).
- [x] 7. Uzunluk — Brief: 7 madde (5–7 aralığında). Makale: 913 kelime (kaynaklar hariç), 962 kelime (kaynak listesi dahil), 700–1100 aralığında.
- [x] 8. Kişisel veri / anahtar / şüpheli talimat — Yok. Kaynak sayfalarda ⚠️ şüpheli talimat notu yok (02 de belirtiyor). Yayıncı adresleri veya kişisel veri kopyalanmamış.

🟡 dil kontrolü: CNBC'den gelen 31 % hisse artışı ve Dec 1–3 duruşmaları brief'te "According to CNBC" ile, makalede "CNBC reports" ile geçiyor. Alibaba/Megaspeed bağlantısı "press reports say" / "reportedly" ile geçiyor. Kabul edilebilir.

Notes (red değil, düzeltilmesi önerilen küçük sapmalar):
- `03-ozet.md` frontmatter `summary`: "CrowdStrike bids for Zscaler" — Nvidia dışında "bids" bir teklif izlenimi veriyor. 02 bunu "agreed to buy / all-stock deal" olarak tanımlıyor. "agrees to buy" öneriliyor.
- `03-ozet.md`, `## US adds seven firms to its trade blacklist over chip-diversion risk`: 02'ye göre kural 23 Kasım'da duyuruldu, 25 Kasım'da Federal Register'da yayımlanacak. Başlık şimdiki zamanla "adds" diyor; "announces" ya da "announced Nov 23" daha doğru.
- `04-makale.md`, deck: "Washington cut off seven companies" — "cut off" fazla güçlü. Kural "presumption of denial" ile lisans zorunluluğu getiriyor, tam kesim değil. "restricted" ya da "blacklisted" önerilir.
- `04-makale.md`, "Read together, though, they show the US government involved at two levels..." ve "Putting that subject under a dedicated board committee... suggests the board wants a visible check..." yorum niteliğinde ama "Our take" başlığı altında değil. Ya "Our take"e taşınmasını ya da ifadenin hedge edilmesini öneririm (kural: görüş ile bilgi ayrılır).
- `04-makale.md`, `## Who is affected`: "will need to find other suppliers or accept the compliance risk" öngörü; 02'de kaynağı yok. Ya "could" ile hedge edilsin ya da çıkarılsın.
- `04-makale.md`, "a personal relationship": 02 "affair reports" diyor. Anlam aynı, ama 02 kelimesinin tam karşılığı değil; "reports about a personal relationship" olarak kalması kabul.
- `03-ozet.md`, item 3 Source satırı "· ✅" taşıyor, ama "press reports say Apex is Alibaba-owned" cümlesi 02'de 🟡. Atıf var, red değil; yine de "reportedly" ile yazılması tutarlılık için iyi olur.

Round 1 özeti: Kritik red iki madde (yukarıdaki iki 02-dışı iddia). Başka ihlal yok. Düzeltme sonrası Round 2'de yalnızca bu iki noktanın giderilip giderilmediğine ve yeni ihlal olup olmadığına bakılacak.

## Round 2 — 2026-11-24T21:30:30+03:00
KARAR: kabul
- [x] 1. Sources present — 03-ozet.md: 7 madde, 7 tek satırlık `Source:` satırı, hepsi `· ✅`. 04-makale.md: `## Sources` 4 numaralı kaynak (1 primary). Rakamların kaynağı var.
- [x] 2. ⛔ claim — yok.
- [x] 3. 02'de olmayan iddia — Round 1'deki üç nokta giderildi: (a) CVE-2026-16232 cümlesi 03-ozet.md'den çıkarıldı; (b) 04-makale.md giriş paragrafında "Neither document mentions the other." yerine nötr bir yapı cümlesi ("This piece looks at both events…") geldi; (c) "powers" cümlesi kaldırıldı. Yeni 02-dışı iddia taranmadı. Makale "Who is affected" bölümü 02 olgularına indirilmiş. Yorum içeriği (Our take) başlığı altında ve "may / could / seem to" ile hedge edilmiş. "The most concrete change is structural" ve "Export controls are…" açıklayıcı, 02 ile çelişmiyor.
- [x] 4. Uzun alıntı — yok (tırnak içi metinler kısa).
- [x] 5. Hype — yok. Round 1'deki "cut off" deck'ten çıkarıldı ("put … under a presumption-of-denial license rule").
- [x] 6. Frontmatter — brief: summary ≈131 karakter (≤160), weather ≈59 (≤80), status: draft. Makale: title 62 (≤70), deck nokta yok, readingMinutes: 5, status: draft.
- [x] 7. Uzunluk — brief 7 madde; makale 890 kelime (kaynaklar hariç), 700–1100 aralığında.
- [x] 8. Kişisel veri / anahtar / şüpheli talimat — yok.

Round 1 notlarının durumu: "bids" → "agrees to buy" düzeltildi; "adds" → "announced on Nov 23" düzeltildi; "press reports say" → "reportedly" düzeltildi; "cut off" düzeltildi; yorum bölümleri "Our take" altına taşındı; "Who is affected" tahmini kaldırıldı.

🟡 dil: CNBC kaynaklı 31 % ve Dec 1–3 duruşmaları "According to CNBC" / "CNBC reports" ile; Alibaba/Megaspeed bağlantısı "reportedly" ile. Uygun.
