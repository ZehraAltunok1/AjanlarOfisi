# CLAUDE.md — AjanlarOfisi

> AjanlarOfisi, Zehra'nın projelerini yöneten ajanlardan oluşan bir "şirket"tir.
> İlk (pilot) proje: **Noonwire** — her gün 12:00'de teknoloji gelişmelerini özetleyen İngilizce blog.
> Bu dosya ofisin işleyişini anlatır. Kurallar için önce **[ANAYASA.md](./ANAYASA.md)**.

## 0. Dil
- Zehra ile iletişim: **Türkçe**.
- Blog içeriği: **İngilizce** (Türkçe sonra eklenecek — site baştan i18n'e hazır kurulur).
- Kod, değişken adları, commit mesajları: İngilizce, Conventional Commits.

## 1. Organizasyon
```
Zehra (patron, yayın onayı)
 └─ Genel Yayın Yönetmeni  ← ana oturumun kendisi (bu dosyayı okuyan Claude)
     ├─ haber-avcisi   (alt ajan)  kaynakları tarar
     ├─ dogrulayici    (alt ajan)  iddiaları doğrular
     ├─ yazar          (alt ajan)  özet + makale yazar
     ├─ bekci          (alt ajan, Haiku)  kurallara göre denetler
     └─ yayinci        (alt ajan)  onaylı taslağı blog'a yerleştirir
```
Alt ajan tanımları: `.claude/agents/*.md`. Takımın iş tarifi: `takimlar/blog/takim.md`.

## 2. Okuma sırası (her ajan, her koşu)
1. `ANAYASA.md`
2. `sirket/AJAN-KIMLIGI.md`
3. `takimlar/blog/kurallar.md`
4. `takimlar/blog/takim.md` (kendi bölümü)
5. `takimlar/blog/defter.md` (son 10 ders)

## 3. Komutlar (Zehra'nın yazacakları)
| Zehra yazar | Ne olur |
|---|---|
| **"günlük koşuyu başlat"** | `takimlar/blog/takim.md` → "Günlük koşu" prosedürü baştan sona çalışır. |
| **"bugünkü taslakları göster"** | `takimlar/blog/kosu/<bugün>/` altındaki taslaklar ve bekçi kararı özetlenir. |
| **"onayla"** / **"onayla: <dosya>"** | Taslak `status: approved` olur, Yayıncı blog'a yerleştirir, yerel commit atılır. Push için ayrıca sorulur. |
| **"reddet: <gerekçe>"** | Taslak `rejected` olur, gerekçe `defter.md`'ye ders olarak düşer. |
| **"haftalık değerlendirme"** | Son 7 günün kayıtlarından rapor: ne çıktı, kabul oranı, hangi ajan nerede takıldı. |

## 4. Git kuralları
- **Commit'i sormadan at** (Conventional Commits, İngilizce), her anlamlı adım sonunda. Koşul:
  1. İlgili testler / build geçti (blog kurulunca: `pnpm --dir blog build`).
  2. Pre-commit hook (`scripts/guvenlik-tarama.mjs`) temiz: anahtar, şifre, telefon, TC no, e-posta, `.env` yok.
     Hook yerelde bir kez etkinleştirilir: `git config core.hooksPath .githooks`. `--no-verify` yasak.
  3. Commit sonrası Zehra'ya tek satırla ne commit'lendiğini söyle.
- **Push her zaman Zehra'ya sorulur.**
- `main` her zaman çalışır durumda. Büyük değişiklikler `feat/<ad>` dalında.
- `.env` ve kişisel dosyalar asla commit edilmez. Tarama bir şey yakalarsa commit'i düzeltip tekrar dene;
  gerçek kişisel veriyse dosyadan çıkar, "yanlış alarm"sa `scripts/guvenlik-izin.txt`'ye gerekçesiyle ekle.

## 5. Proje hafızası
- `docs/PROGRESS.md` — tarihli ilerleme günlüğü (en yeni en üstte).
- `docs/DECISIONS.md` — kararlar (ADR-lite).
- `docs/YOL-HARITASI.md` — fazlar.
