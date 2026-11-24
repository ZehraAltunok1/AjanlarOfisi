# Kararlar (ADR-lite)

## ADR-001: Pilot proje Noonwire teknoloji blogu (2026-11-24)
- **Bağlam:** Ajan sisteminin işleyip işlemediğini, sonucu her gün görülen ve risksiz bir projede test etmek.
- **Karar:** Genel teknoloji gelişmelerini her gün özetleyen İngilizce blog. Günlük iki yazı: Daily Brief + Deep Dive.
  Çalışma adı **Noonwire** (yayın saati 12:00). Türkçe sonra eklenecek; site baştan i18n'e hazır kurulacak.
- **Sonuç:** Sadece bu proje üzerinden ajanlarla çalışılır; Kariyer/Site/Routez departmanları sonraya.

## ADR-002: Yayın onayı Zehra'da (2026-11-24)
- **Karar:** Ajanlar taslak hazırlar, Zehra "onayla" demeden yayın yok. Push her zaman Zehra'nın onayıyla.
- **Sonuç:** Günlük akış "onay-bekliyor" durumunda biter. İleride (kalite oturunca) otomatik yayına geçiş tartışılabilir.

## ADR-003: Yönetici = ana oturum, çalışanlar = Claude Code alt ajanları (2026-11-24)
- **Bağlam:** Telegram kullanılmıyor; API anahtarı yok; makine Windows (videodaki `claude -p` + fcntl betikleri doğrudan çalışmaz).
- **Karar:** Genel Yayın Yönetmeni ana Claude oturumudur ve `takimlar/blog/takim.md`'deki prosedürü yürütür.
  Çalışanlar `.claude/agents/` altındaki alt ajanlardır. Bekçi `model: haiku` ile ayrı kafa.
- **Sonuç:** Python sürücü betiği gerekmez. Zamanlama Claude masaüstü uygulamasının zamanlanmış görevleriyle yapılacak
  (her gün 12:00, bilgisayar açıkken). İleride bulut zamanlanmış ajanına taşınabilir.

## ADR-004: Ofis ekranı yalnızca yerel (2026-11-24)
- **Karar:** Ofis görünümü blog sitesinden ayrı, `ofis/` altında yerelde çalışan bir sayfa olacak; Vercel'e gitmeyecek.
- **Sonuç:** Veri kaynağı `takimlar/*/kosu/*/olaylar.jsonl` ve `durum.json`.

## ADR-007: Noonwire tasarımı — eski broadsheet gazete (2026-11-25)
- **Bağlam:** Üç yön sunuldu (Öğlen Baskısı, Sinyal Terminali, İsviçre Izgarası); Zehra A'yı seçip
  "eski Times gazetesi tarzında" süslenmesini istedi.
- **Karar:** Gotik başlık (UnifrakturMaguntia), manşet Old Standard TT, metin Newsreader; kulak kutuları, künye satırı
  (Vol./No./tarih/fiyat), çok kolon + iki yana yaslı metin + büyük ilk harf, gravür tarzı SVG çizimler, ❧ ve ✦ süsleri,
  ✓/◐ doğrulama rozetleri. Gece baskısı = karanlık mod. Gerçek bir gazetenin adı/logosu/arması kullanılmaz.
- **Teknik:** Astro 7 (statik), `@astrojs/rss`; TypeScript 6 (astro check henüz TS 7 desteklemiyor).
  Arayüz metinleri `blog/src/i18n/ui.ts`'te (Türkçe sonra). Fontlar şimdilik Google Fonts'tan.
- **Sonuç:** Sayı numarası tarihten otomatik; ilk sayı "No. 000 · Specimen edition" (gerçek haber değil, gazetenin nasıl yapıldığını anlatır).

## ADR-006: Commit'ler otomatik, push onaylı (2026-11-24)
- **Bağlam:** Zehra sistemin daha otomatik olmasını, yalnızca gerçekten önemli konularda sorulmasını istedi.
- **Karar:** Claude ve ajanlar sormadan commit atar; şart: testler/build geçer ve pre-commit güvenlik taraması
  (`scripts/guvenlik-tarama.mjs`: anahtar, şifre, telefon, TC no, IBAN, e-posta, `.env`, kimlik belgeleri) temiz çıkar.
  `--no-verify` yasak. Push, yayın onayı, kural değişikliği, yeni bağımlılık, veri silme hâlâ Zehra'ya sorulur.
- **Sonuç:** Yeni klonda hook bir kez etkinleştirilir: `git config core.hooksPath .githooks`.

## ADR-005: Barındırma Vercel — sonra (2026-11-24)
- **Karar:** Blog Vercel'de yayınlanacak, ama ilk aşamada yerelde çalışılır. Site teknolojisi: Astro (öneri, tasarım aşamasında kesinleşir).
