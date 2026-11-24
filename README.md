# AjanlarOfisi

Zehra'nın projelerini yöneten yapay zekâ ajanlarından oluşan bir "ofis".

**Pilot proje — Noonwire:** her gün 12:00'de genel teknoloji gelişmelerini takip eden, İngilizce
**Daily Brief** + **Deep Dive** yazıları hazırlayan blog. Yazılar Zehra onaylayınca yayınlanır.

| Dosya | Ne |
|---|---|
| [ANAYASA.md](./ANAYASA.md) | Değişmez kurallar |
| [CLAUDE.md](./CLAUDE.md) | Ofisin işleyişi, komutlar |
| [takimlar/blog/](./takimlar/blog/) | Blog takımı: iş tarifi, kurallar, defter, koşular |
| [.claude/agents/](./.claude/agents/) | Alt ajan tanımları |
| [sirket/](./sirket/) | Ajan kimliği, kayıt formatı |
| `blog/` | Noonwire sitesi (Astro — yakında) |
| `ofis/` | Ofis ekranı (yalnızca yerelde, yakında) |
| [docs/](./docs/) | İlerleme, kararlar, yol haritası |

## Nasıl çalışır
Bu klasörde bir Claude Code oturumu aç ve yaz: **"günlük koşuyu başlat"**.
Taslaklar `takimlar/blog/kosu/<tarih>/` altına düşer; **"onayla"** dediğinde yayına hazırlanır.
