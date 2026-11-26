# Ofis ekranı

Ajanların çalışmasını bir haber odası gibi gösteren, **yalnızca bu bilgisayarda** çalışan sayfa (ADR-004).

```powershell
node ofis/server.mjs
```
Sonra tarayıcıda: http://127.0.0.1:4400

- **Bağımlılık yok** — yalnızca Node.js. Sunucu `127.0.0.1`'e bağlanır, ağdan erişilemez, **salt okunur**.
- Veri kaynağı ajanların kendi dosyaları: `takimlar/<takim>/kosu/<tarih>/olaylar.jsonl`, `durum.json`, `defter.md`,
  `.claude/agents/*.md`. Kayıt formatı: `sirket/KAYIT-FORMATI.md`.
- Dosyalar 4 saniyede bir okunur: koşu sürerken masalar canlı yanar, teslimlerde kâğıt masadan masaya uçar.

| Ekranda | Ne |
|---|---|
| Masalar | Her ajanın karakteri, durum lambası (uyuyor / çalışıyor / bitti / red / onay bekliyor / takıldı), konuşma balonu (son not) |
| Patron odası | Zehra'nın masası — taslaklar onay beklerken mavi yanar |
| Durum panosu | Koşu tarihi, takım durumu, olay ve dosya sayısı |
| Baskı makinesi | Sayı yayınlanınca çıktısı görünür |
| ▶ Tekrar oynat | Günün olaylarını sırayla canlandırır |
| Masaya tıkla | Görev tanımı, model, son not, ürettiği dosyalar, defterdeki dersleri |
| Günün akışı / Defter | Tüm olaylar ve ajanların dersleri, kural önerileri |
