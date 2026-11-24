# Kayıt formatı (ofis ekranının veri kaynağı)

Her koşunun klasörü: `takimlar/<takim>/kosu/YYYY-MM-DD/`
Olay kaydı: aynı klasörde `olaylar.jsonl` — her satır bir JSON nesnesi:

```json
{"t":"2026-11-24T12:03:10+03:00","ajan":"haber-avcisi","olay":"basladi","not":"30 kaynak taranacak"}
{"t":"2026-11-24T12:14:52+03:00","ajan":"haber-avcisi","olay":"bitti","cikti":"01-haberler.md","not":"14 aday"}
{"t":"2026-11-24T12:15:00+03:00","ajan":"yayin-yonetmeni","olay":"teslim","kimden":"haber-avcisi","kime":"dogrulayici"}
{"t":"2026-11-24T12:40:11+03:00","ajan":"bekci","olay":"red","not":"2 iddia kaynaksız"}
```

| Alan | Zorunlu | Değerler |
|---|---|---|
| `t` | ✅ | ISO 8601, Europe/Istanbul |
| `ajan` | ✅ | `yayin-yonetmeni`, `haber-avcisi`, `dogrulayici`, `yazar`, `bekci`, `yayinci` |
| `olay` | ✅ | `basladi`, `bitti`, `teslim`, `kabul`, `red`, `takildi`, `onay-bekliyor`, `yayinlandi` |
| `cikti` | — | üretilen dosyanın adı |
| `kimden` / `kime` | — | `teslim` olaylarında |
| `not` | — | kısa açıklama (≤ 120 karakter) |

Koşu dosyaları (sırayla):
| Dosya | Üreten |
|---|---|
| `01-haberler.md` | haber-avcisi |
| `02-dogrulanmis.md` | dogrulayici |
| `03-ozet.md` | yazar (Günün Özeti taslağı) |
| `04-makale.md` | yazar (makale taslağı) |
| `05-bekci.md` | bekci (karar + gerekçe; her tur eklenir) |
| `06-rapor.md` | yayin-yonetmeni (günün raporu) |

`takimlar/<takim>/durum.json` — son koşunun özeti (ofis ekranı bunu da okur):
```json
{"sonKosu":"2026-11-24","durum":"onay-bekliyor","bekciTur":1,"ozet":"03-ozet.md","makale":"04-makale.md"}
```
