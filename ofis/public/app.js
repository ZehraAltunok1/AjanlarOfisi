// AjanlarOfisi office screen. Reads /api/* (local server) and draws a pixel-art newsroom.
const NS = 'http://www.w3.org/2000/svg';
const $ = (s) => document.querySelector(s);

/* ---------- cast ---------- */
// Sprite rows are 8 px wide; letters map to colours in each agent's palette.
const DESKS = {
  'yayin-yonetmeni': {
    label: 'Yayın Yönetmeni', short: 'Günü yönetir, ajanları sırayla çağırır', x: 480, y: 205,
    pal: { h: '#3a2a1e', s: '#f0c9a0', e: '#1a1814', c: '#2f3e5c', t: '#8e2f12' },
    sprite: ['..hhhh..', '.hhhhhh.', '.hssssh.', '.sesses.', '.ssssss.', '..ssss..', '.cccccc.', 'ccctcccc', 'ccctcccc', 'cc.tt.cc'],
  },
  'haber-avcisi': {
    label: 'Haber Avcısı', short: 'Kaynakları tarar, aday haber toplar', x: 130, y: 370,
    pal: { k: '#6b4a2b', s: '#e8b98c', e: '#1a1814', c: '#3f6e4a', b: '#2a1d12' },
    sprite: ['..kkkk..', '.kkkkkk.', 'kbbbbbbk', '.ssssss.', '.sesses.', '..ssss..', '.cccccc.', 'cccccccc', 'cccccccc', 'cc.cc.cc'],
  },
  dogrulayici: {
    label: 'Doğrulayıcı', short: 'İddiaları birincil kaynaktan kontrol eder', x: 330, y: 370,
    pal: { h: '#151515', s: '#c98f64', g: '#1a1814', e: '#9fd3ff', c: '#7a5a9e' },
    sprite: ['..hhhh..', '.hhhhhh.', '.hssssh.', 'ggeggegg', '.ssssss.', '..ssss..', '.cccccc.', 'cccccccc', 'cccccccc', 'cc.cc.cc'],
  },
  yazar: {
    label: 'Yazar', short: 'Daily Brief ve Deep Dive yazar', x: 530, y: 370,
    pal: { r: '#8e2f12', h: '#b5642e', s: '#f3d2b0', e: '#1a1814', c: '#e2d6b8', p: '#d4a017' },
    sprite: ['...rr...', '.rrrrrr.', '.hssssh.', '.sesses.', '.ssssss.', '..ssss..', '.cccccc.', 'cccccccp', 'cccccccp', 'cc.cc.cc'],
  },
  bekci: {
    label: 'Bekçi', short: 'Kurallara göre denetler (Haiku)', x: 770, y: 400,
    pal: { k: '#1f2b4a', y: '#d4a017', s: '#d9a27a', e: '#1a1814', c: '#1f2b4a', b: '#d4a017' },
    sprite: ['..kkkk..', '.kkykkk.', 'kkkkkkkk', '.ssssss.', '.sesses.', '..ssss..', '.cccccc.', 'ccbccbcc', 'cccccccc', 'cc.cc.cc'],
  },
  yayinci: {
    label: 'Yayıncı', short: 'Onaylı yazıları gazeteye dizer', x: 560, y: 520,
    pal: { w: '#f7f2e6', s: '#e7b48a', e: '#1a1814', h: '#4a3220', c: '#5c5c5c', a: '#f7f2e6' },
    sprite: ['...ww...', '..wwww..', '.wwwwww.', '.hssssh.', '.sesses.', '..ssss..', '.caaaac.', 'ccaaaacc', 'ccaaaacc', 'cc.cc.cc'],
  },
  zehra: {
    label: 'Zehra · Patron', short: 'Yayın onayı burada verilir', x: 840, y: 225,
    pal: { h: '#2b1a12', s: '#f1caa4', e: '#1a1814', c: '#b0477a', m: '#d97aa6' },
    sprite: ['..hhhh..', '.hhhhhh.', 'hhsssshh', 'hsesseshh'.slice(0, 8), 'hssmmssh', 'h.ssss.h', 'hcccccch', 'cccccccc', 'cccccccc', 'cc.cc.cc'],
  },
};
const ORDER = ['haber-avcisi', 'dogrulayici', 'yazar', 'bekci', 'zehra', 'yayinci'];

const STATUS = {
  uyuyor: { label: 'uyuyor', color: 'var(--s-uyuyor)' },
  calisiyor: { label: 'çalışıyor', color: 'var(--s-calisiyor)' },
  bitti: { label: 'bitti', color: 'var(--s-bitti)' },
  red: { label: 'red verdi / aldı', color: 'var(--s-red)' },
  bekliyor: { label: 'onay bekliyor', color: 'var(--s-bekliyor)' },
  takildi: { label: 'takıldı', color: 'var(--s-takildi)' },
};
const EVENT_TR = {
  basladi: 'başladı', bitti: 'bitirdi', teslim: 'teslim', kabul: 'kabul', red: 'red',
  takildi: 'takıldı', 'onay-bekliyor': 'onay bekliyor', yayinlandi: 'yayınlandı',
};
const EVENT_COLOR = {
  basladi: 'var(--s-calisiyor)', bitti: 'var(--s-bitti)', teslim: 'var(--ink-soft)', kabul: 'var(--s-bitti)',
  red: 'var(--s-red)', takildi: 'var(--s-takildi)', 'onay-bekliyor': 'var(--s-bekliyor)', yayinlandi: 'var(--oxblood)',
};

/* ---------- state ---------- */
const app = { state: null, run: null, team: 'blog', date: null, selected: null, cursor: null, replaying: false, timer: null };

/* ---------- svg helpers ---------- */
function el(tag, attrs = {}, parent) {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, String(v));
  if (parent) parent.appendChild(n);
  return n;
}
const rect = (p, x, y, w, h, fill, extra = {}) => el('rect', { x, y, width: w, height: h, fill, ...extra }, p);
const text = (p, x, y, str, attrs = {}) => {
  const t = el('text', { x, y, ...attrs }, p);
  t.textContent = str;
  return t;
};

function sprite(parent, rows, pal, x, y, px = 3) {
  const g = el('g', { class: 'char' }, parent);
  rows.forEach((row, ry) =>
    [...row].forEach((ch, rx) => {
      if (ch !== '.' && pal[ch]) rect(g, x + rx * px, y + ry * px, px, px, pal[ch]);
    }),
  );
  return g;
}

/* ---------- scene ---------- */
function drawRoom(svg) {
  const defs = el('defs', {}, svg);
  const planks = el('pattern', { id: 'planks', width: 64, height: 16, patternUnits: 'userSpaceOnUse' }, defs);
  rect(planks, 0, 0, 64, 16, '#c9a273');
  rect(planks, 0, 15, 64, 1, '#a9824f');
  rect(planks, 40, 0, 1, 16, '#a9824f');
  const tiles = el('pattern', { id: 'carpet', width: 8, height: 8, patternUnits: 'userSpaceOnUse' }, defs);
  rect(tiles, 0, 0, 8, 8, '#8c3b2a');
  rect(tiles, 0, 0, 4, 4, '#963f2d');
  rect(tiles, 4, 4, 4, 4, '#963f2d');

  rect(svg, 0, 0, 960, 600, 'url(#planks)');
  // back wall
  rect(svg, 0, 0, 960, 112, '#efe3cb');
  rect(svg, 0, 108, 960, 6, '#6b4a2b');
  // windows
  for (const wx of [30, 150]) {
    rect(svg, wx, 18, 96, 64, '#6b4a2b');
    rect(svg, wx + 4, 22, 88, 56, '#bfe3f2');
    rect(svg, wx + 46, 22, 4, 56, '#6b4a2b');
    rect(svg, wx + 4, 48, 88, 4, '#6b4a2b');
    rect(svg, wx + 12, 60, 20, 6, '#ffffff', { opacity: 0.8 });
  }
  // masthead sign
  rect(svg, 300, 16, 300, 50, '#1a1814');
  text(svg, 450, 52, 'The Noonwire', { 'text-anchor': 'middle', fill: '#f3ecdd', 'font-size': 30, class: 'mast' });
  text(svg, 450, 82, 'HABER ODASI', { 'text-anchor': 'middle', fill: '#6b4a2b', 'font-size': 11, class: 'wall-text' });
  // clock
  const clock = el('g', { id: 'clock' }, svg);
  el('circle', { cx: 655, cy: 50, r: 26, fill: '#f7f2e6', stroke: '#1a1814', 'stroke-width': 4 }, clock);
  el('line', { id: 'hand-h', x1: 655, y1: 50, x2: 655, y2: 36, stroke: '#1a1814', 'stroke-width': 4 }, clock);
  el('line', { id: 'hand-m', x1: 655, y1: 50, x2: 655, y2: 30, stroke: '#8e2f12', 'stroke-width': 2 }, clock);
  text(svg, 655, 96, '12:00 = YAYIN', { 'text-anchor': 'middle', fill: '#6b4a2b', 'font-size': 9, class: 'wall-text' });
  // status board
  rect(svg, 712, 14, 220, 76, '#2d3b2f');
  rect(svg, 712, 14, 220, 76, 'none', { stroke: '#6b4a2b', 'stroke-width': 4 });
  text(svg, 724, 36, 'DURUM PANOSU', { fill: '#d8e6d0', 'font-size': 10, class: 'wall-text' });
  text(svg, 724, 58, '', { id: 'board-1', fill: '#ffffff', 'font-size': 11, class: 'wall-text' });
  text(svg, 724, 78, '', { id: 'board-2', fill: '#d8e6d0', 'font-size': 9, class: 'wall-text' });

  // carpet under the newsroom row
  rect(svg, 60, 300, 580, 130, 'url(#carpet)', { opacity: 0.55 });
  // patron glass office
  rect(svg, 700, 128, 250, 170, '#dff0f5', { opacity: 0.55 });
  rect(svg, 700, 128, 250, 170, 'none', { stroke: '#6f8f99', 'stroke-width': 4 });
  rect(svg, 700, 240, 4, 40, '#c9a273'); // door gap
  text(svg, 712, 146, 'PATRON', { fill: '#3f5f69', 'font-size': 10, class: 'wall-text' });
  // printing press
  const press = el('g', {}, svg);
  rect(press, 340, 488, 120, 70, '#4a4a4a');
  rect(press, 350, 498, 100, 14, '#2b2b2b');
  el('circle', { cx: 375, cy: 535, r: 14, fill: '#6a6a6a', stroke: '#1a1814', 'stroke-width': 3 }, press);
  el('circle', { cx: 425, cy: 535, r: 14, fill: '#6a6a6a', stroke: '#1a1814', 'stroke-width': 3 }, press);
  rect(press, 330, 558, 140, 8, '#1a1814');
  text(svg, 400, 584, 'BASKI MAKİNESİ', { 'text-anchor': 'middle', fill: '#3a2a1e', 'font-size': 9, class: 'wall-text' });
  el('g', { id: 'press-out' }, svg);
  // door
  rect(svg, 880, 470, 56, 112, '#6b4a2b');
  rect(svg, 886, 476, 44, 100, '#8a6236');
  el('circle', { cx: 922, cy: 528, r: 3, fill: '#d4a017' }, svg);
  // plants + water cooler
  for (const [px, py] of [[40, 470], [640, 160], [930, 330]]) {
    rect(svg, px - 10, py, 20, 18, '#8e4a2b');
    rect(svg, px - 14, py - 16, 28, 18, '#3f7a3f');
    rect(svg, px - 6, py - 26, 12, 12, '#4f9a4f');
  }
  rect(svg, 30, 260, 26, 50, '#e6eef2', { stroke: '#6f8f99', 'stroke-width': 2 });
  rect(svg, 34, 236, 18, 26, '#9fd3ff', { opacity: 0.8 });
}

function drawFlow(svg) {
  const g = el('g', { id: 'flow', opacity: 0.45 }, svg);
  const pts = ORDER.map((id) => DESKS[id]);
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    el('line', { x1: a.x, y1: a.y + 48, x2: b.x, y2: b.y + 48, stroke: '#3a2a1e', 'stroke-width': 2, 'stroke-dasharray': '4 6' }, g);
  }
  const ed = DESKS['yayin-yonetmeni'];
  for (const id of ORDER) {
    const d = DESKS[id];
    el('line', { x1: ed.x, y1: ed.y + 30, x2: d.x, y2: d.y - 60, stroke: '#3a2a1e', 'stroke-width': 1, 'stroke-dasharray': '2 8' }, g);
  }
}

function drawDesk(svg, id) {
  const d = DESKS[id];
  const { x, y } = d;
  const g = el('g', { class: 'desk st-uyuyor', id: `desk-${id}`, tabindex: 0, role: 'button', 'aria-label': `${d.label} masası` }, svg);
  // transparent hit area so the whole desk zone is clickable
  rect(g, x - 72, y - 92, 144, 158, 'transparent');
  rect(g, x - 72, y - 92, 144, 158, 'none', { class: 'halo', stroke: '#8e2f12', 'stroke-width': 3, 'stroke-dasharray': '6 4' });
  // chair
  rect(g, x - 30, y - 46, 28, 40, '#3a2a1e');
  // character
  sprite(g, d.sprite, d.pal, x - 28, y - 62);
  text(g, x - 4, y - 66, 'z Z', { class: 'zzz' });
  // desk
  rect(g, x - 58, y - 8, 116, 10, '#a8703f');
  rect(g, x - 58, y + 2, 116, 26, '#8a5a34');
  rect(g, x - 54, y + 28, 6, 14, '#5c3a20');
  rect(g, x + 48, y + 28, 6, 14, '#5c3a20');
  // monitor
  rect(g, x + 8, y - 40, 40, 30, '#2b2b2b');
  rect(g, x + 12, y - 36, 32, 22, '#7fd1b9', { class: 'screen' });
  rect(g, x + 24, y - 10, 8, 4, '#2b2b2b');
  // papers + lamp
  rect(g, x - 48, y - 14, 18, 8, '#f7f2e6', { stroke: '#cfc4ad' });
  el('circle', { cx: x - 20, cy: y - 12, r: 6, class: 'lamp', fill: STATUS.uyuyor.color, stroke: '#1a1814', 'stroke-width': 2 }, g);
  // name plate
  const plate = el('g', { class: 'plate' }, g);
  rect(plate, x - 66, y + 44, 132, 18, '#f3ecdd', { stroke: '#1a1814', 'stroke-width': 2 });
  text(plate, x, y + 57, d.label.toUpperCase(), { 'text-anchor': 'middle', fill: '#1a1814' });
  // bubble
  const b = el('g', { class: 'bubble', id: `bubble-${id}`, visibility: 'hidden' }, g);
  rect(b, x - 70, y - 118, 140, 24, '#ffffff', { stroke: '#1a1814', 'stroke-width': 2 });
  rect(b, x - 6, y - 96, 8, 6, '#ffffff');
  text(b, x, y - 102, '', { 'text-anchor': 'middle', fill: '#1a1814' });

  const pick = () => select(id);
  g.addEventListener('click', pick);
  g.addEventListener('keydown', (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), pick()));
}

function buildScene() {
  const svg = $('#office');
  drawRoom(svg);
  drawFlow(svg);
  for (const id of Object.keys(DESKS)) drawDesk(svg, id);
  el('g', { id: 'flyers' }, svg);
  tickClock();
  setInterval(tickClock, 30_000);
}

function tickClock() {
  const now = new Date();
  const h = (now.getHours() % 12) + now.getMinutes() / 60;
  const m = now.getMinutes();
  $('#hand-h')?.setAttribute('transform', `rotate(${h * 30} 655 50)`);
  $('#hand-m')?.setAttribute('transform', `rotate(${m * 6} 655 50)`);
}

/* ---------- derive state from events ---------- */
function derive(events, upto = events.length - 1) {
  const st = Object.fromEntries(Object.keys(DESKS).map((k) => [k, 'uyuyor']));
  const notes = {};
  for (let i = 0; i <= upto && i < events.length; i++) {
    const e = events[i];
    const who = e.ajan;
    if (e.not) notes[who] = e.not;
    switch (e.olay) {
      case 'basladi':
        st[who] = 'calisiyor';
        break;
      case 'bitti':
      case 'kabul':
        st[who] = 'bitti';
        break;
      case 'red':
        st[who] = 'red';
        break;
      case 'takildi':
        st[who] = 'takildi';
        break;
      case 'onay-bekliyor':
        st[who] = 'bitti';
        st.zehra = 'bekliyor';
        break;
      case 'teslim':
        if (e.kimden === 'zehra') {
          st.zehra = 'bitti';
          notes.zehra = 'onaylandı';
        }
        if (e.kimden === 'bekci' && st.bekci === 'red') st.yazar = 'red';
        break;
      case 'yayinlandi':
        st[who] = 'bitti';
        st['yayin-yonetmeni'] = 'bitti';
        break;
    }
  }
  return { st, notes };
}

/* ---------- render ---------- */
function paint(upto) {
  const events = app.run?.events ?? [];
  const { st, notes } = derive(events, upto ?? events.length - 1);
  for (const id of Object.keys(DESKS)) {
    const g = $(`#desk-${id}`);
    g.setAttribute('class', `desk st-${st[id]}${app.selected === id ? ' selected' : ''}`);
    g.querySelector('.lamp').setAttribute('fill', STATUS[st[id]].color);
    const bubble = $(`#bubble-${id}`);
    const showNote = st[id] === 'calisiyor' || st[id] === 'red' || st[id] === 'bekliyor' || st[id] === 'takildi';
    const msg = st[id] === 'bekliyor' ? 'onayını bekliyorum!' : st[id] === 'red' && id === 'bekci' ? 'RED!' : notes[id] ?? '';
    bubble.setAttribute('visibility', showNote && msg ? 'visible' : 'hidden');
    bubble.querySelector('text').textContent = msg.length > 24 ? `${msg.slice(0, 23)}…` : msg;
  }
  const published = events.slice(0, (upto ?? events.length - 1) + 1).some((e) => e.olay === 'yayinlandi');
  const out = $('#press-out');
  out.innerHTML = '';
  if (published) {
    rect(out, 470, 520, 46, 34, '#f7f2e6', { stroke: '#1a1814', 'stroke-width': 2 });
    text(out, 493, 536, 'No.', { 'text-anchor': 'middle', 'font-size': 9, class: 'wall-text', fill: '#1a1814' });
    rect(out, 476, 542, 34, 3, '#1a1814');
    rect(out, 476, 548, 26, 2, '#8a8a8a');
  }
  const durum = app.state?.teams.find((t) => t.name === app.team)?.status?.durum ?? '—';
  $('#board-1').textContent = `${app.date ?? '—'} · ${durum.toUpperCase()}`;
  $('#board-2').textContent = `${events.length} olay · ${(app.run?.files ?? []).length} dosya`;
  renderTimeline(upto);
  renderSide(st, notes);
}

const hhmm = (iso) => (iso ? iso.slice(11, 16) : '');
const nameOf = (id) => DESKS[id]?.label ?? id;

function renderTimeline(upto) {
  const ol = $('#timeline');
  ol.innerHTML = '';
  const events = app.run?.events ?? [];
  events.forEach((e, i) => {
    const li = document.createElement('li');
    if (upto != null && i > upto) li.className = 'future';
    if (upto != null && i === upto) li.className = 'current';
    const flow = e.olay === 'teslim' ? `${nameOf(e.kimden)} → ${nameOf(e.kime)}` : nameOf(e.ajan);
    li.innerHTML = `<span class="time"></span><span class="who"></span><span><span class="pill"></span></span><span class="note"></span>`;
    li.querySelector('.time').textContent = hhmm(e.t);
    li.querySelector('.who').textContent = flow;
    const pill = li.querySelector('.pill');
    pill.textContent = EVENT_TR[e.olay] ?? e.olay;
    pill.style.background = EVENT_COLOR[e.olay] ?? 'var(--ink-soft)';
    li.querySelector('.note').textContent = [e.not, e.cikti ? `→ ${e.cikti}` : ''].filter(Boolean).join(' ');
    ol.appendChild(li);
  });
  if (!events.length) ol.innerHTML = '<li><span></span><span class="hint">Bu koşuda henüz olay yok.</span></li>';
  // scroll only inside the timeline box, never the whole page
  const cur = ol.querySelector('.current');
  if (cur) ol.scrollTop = Math.max(0, cur.offsetTop - ol.offsetTop - ol.clientHeight / 2);
}

function fileButton(name) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'filelink';
  b.textContent = name;
  b.addEventListener('click', () => openFile(name));
  return b;
}

function renderSide(st, notes) {
  const side = $('#side');
  side.innerHTML = '';
  const events = app.run?.events ?? [];
  const team = app.state?.teams.find((t) => t.name === app.team);

  if (!app.selected) {
    const first = events[0]?.t;
    const last = events.at(-1)?.t;
    const mins = first && last ? Math.round((new Date(last) - new Date(first)) / 60000) : 0;
    const reds = events.filter((e) => e.olay === 'red').length;
    const kabul = events.filter((e) => e.olay === 'kabul').length;
    side.innerHTML = `<h2>Günün özeti</h2><p class="role">Bir masaya tıkla: o ajanın görevi, son notu ve dersleri.</p>
      <dl>
        <dt>KOŞU</dt><dd>${app.date ?? '—'}</dd>
        <dt>DURUM</dt><dd><span class="pill" id="durum-pill"></span></dd>
        <dt>SÜRE</dt><dd>${mins} dk (${hhmm(first)}–${hhmm(last)})</dd>
        <dt>OLAY</dt><dd>${events.length}</dd>
        <dt>BEKÇİ</dt><dd>${kabul} kabul · ${reds} red</dd>
      </dl>`;
    const durum = team?.status?.durum ?? '—';
    const pill = side.querySelector('#durum-pill');
    pill.textContent = durum;
    pill.style.background =
      durum === 'yayinlandi' ? 'var(--s-bitti)' : durum === 'onay-bekliyor' ? 'var(--s-bekliyor)' : durum === 'takildi' ? 'var(--s-takildi)' : 'var(--s-calisiyor)';
    if (st.zehra === 'bekliyor') {
      const n = document.createElement('div');
      n.className = 'notice';
      n.textContent = 'Taslaklar onayını bekliyor. Okumak için aşağıdaki dosyalara tıkla; onaylamak için Claude\'a "onayla" yaz.';
      side.appendChild(n);
    }
    const h = document.createElement('h3');
    h.textContent = 'KOŞU DOSYALARI';
    side.appendChild(h);
    const ul = document.createElement('ul');
    for (const f of app.run?.files ?? []) {
      const li = document.createElement('li');
      li.appendChild(fileButton(f.name));
      ul.appendChild(li);
    }
    side.appendChild(ul);
    return;
  }

  const id = app.selected;
  const d = DESKS[id];
  const meta = app.state?.agents.find((a) => a.id === id);
  const mine = events.filter((e) => e.ajan === id || e.kimden === id || e.kime === id);
  const outputs = [...new Set(events.filter((e) => e.ajan === id && e.cikti).map((e) => e.cikti))];
  const lessons = (team?.ledger.lessons ?? []).filter((l) => l.agent === id).slice(0, 3);
  const proposals = (team?.ledger.proposals ?? []).filter((l) => l.agent === id);

  side.innerHTML = `<h2></h2><p class="role"></p><dl>
      <dt>DURUM</dt><dd><span class="pill" id="st-pill"></span></dd>
      <dt>MODEL</dt><dd id="m-model"></dd>
      <dt>SON NOT</dt><dd id="m-note"></dd>
      <dt>OLAY</dt><dd>${mine.length}</dd></dl>
      <button type="button" id="back">← Günün özeti</button>`;
  side.querySelector('h2').textContent = d.label;
  side.querySelector('.role').textContent = meta?.description || d.short;
  const pill = side.querySelector('#st-pill');
  pill.textContent = STATUS[st[id]].label;
  pill.style.background = STATUS[st[id]].color;
  side.querySelector('#m-model').textContent = meta?.model || (id === 'zehra' ? 'insan 🙂' : id === 'yayin-yonetmeni' ? 'ana oturum' : '—');
  side.querySelector('#m-note').textContent = notes[id] ?? '—';
  side.querySelector('#back').addEventListener('click', () => select(null));

  if (outputs.length) {
    const h = document.createElement('h3');
    h.textContent = 'ÜRETTİKLERİ';
    side.appendChild(h);
    const ul = document.createElement('ul');
    for (const o of outputs) {
      const li = document.createElement('li');
      li.appendChild(fileButton(o));
      ul.appendChild(li);
    }
    side.appendChild(ul);
  }
  for (const [title, list] of [['DEFTERDEKİ DERSLERİ', lessons], ['KURAL ÖNERİLERİ', proposals]]) {
    if (!list.length) continue;
    const h = document.createElement('h3');
    h.textContent = title;
    side.appendChild(h);
    const ul = document.createElement('ul');
    for (const l of list) {
      const li = document.createElement('li');
      li.textContent = `${l.date}: ${l.text}`;
      ul.appendChild(li);
    }
    side.appendChild(ul);
  }
}

function renderLedger() {
  const box = $('#ledger');
  box.innerHTML = '';
  const team = app.state?.teams.find((t) => t.name === app.team);
  const items = [
    ...(team?.ledger.proposals ?? []).map((l) => ({ ...l, kind: 'kural önerisi' })),
    ...(team?.ledger.lessons ?? []).map((l) => ({ ...l, kind: 'ders' })),
  ];
  if (!items.length) box.innerHTML = '<p class="hint">Defter boş.</p>';
  for (const l of items) {
    const div = document.createElement('div');
    div.className = 'ledger-item';
    div.innerHTML = '<b></b> <span></span>';
    div.querySelector('b').textContent = `${l.date} · ${nameOf(l.agent)} · ${l.kind}`.toUpperCase();
    div.querySelector('span').textContent = l.text;
    box.appendChild(div);
  }
}

/* ---------- interactions ---------- */
function select(id) {
  app.selected = id;
  paint(app.cursor);
}

async function openFile(name) {
  const res = await fetch(`/api/file?team=${app.team}&date=${app.date}&name=${encodeURIComponent(name)}`);
  $('#viewer-title').textContent = `${app.date} / ${name}`;
  $('#viewer-body').textContent = res.ok ? await res.text() : 'Dosya okunamadı.';
  $('#viewer').hidden = false;
  $('#viewer').scrollIntoView({ behavior: 'smooth' });
}
$('#viewer-close').addEventListener('click', () => ($('#viewer').hidden = true));

function fly(fromId, toId, ms) {
  const a = DESKS[fromId];
  const b = DESKS[toId];
  if (!a || !b) return;
  const g = el('g', { class: 'paper-fly' }, $('#flyers'));
  rect(g, -9, -11, 18, 22, '#f7f2e6', { stroke: '#1a1814', 'stroke-width': 2 });
  rect(g, -5, -6, 10, 2, '#1a1814');
  rect(g, -5, -1, 10, 2, '#8a8a8a');
  rect(g, -5, 4, 7, 2, '#8a8a8a');
  const t0 = performance.now();
  const dur = Math.max(400, ms * 0.9);
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    const x = a.x + (b.x - a.x) * e;
    const y = a.y - 30 + (b.y - a.y) * e - Math.sin(p * Math.PI) * 60;
    g.setAttribute('transform', `translate(${x} ${y}) rotate(${p * 360})`);
    if (p < 1) requestAnimationFrame(step);
    else g.remove();
  };
  requestAnimationFrame(step);
}

function replay() {
  const events = app.run?.events ?? [];
  if (!events.length) return;
  clearInterval(app.timer);
  app.replaying = true;
  $('#replay').textContent = '■ Durdur';
  const speed = Number($('#speed').value);
  let i = -1;
  app.cursor = -1;
  paint(-1);
  app.timer = setInterval(() => {
    i++;
    if (i >= events.length) return stopReplay();
    app.cursor = i;
    const e = events[i];
    if (e.olay === 'teslim') fly(e.kimden, e.kime, speed);
    paint(i);
  }, speed);
}
function stopReplay() {
  clearInterval(app.timer);
  app.replaying = false;
  app.cursor = null;
  $('#replay').textContent = '▶ Tekrar oynat';
  paint();
}
$('#replay').addEventListener('click', () => (app.replaying ? stopReplay() : replay()));

/* ---------- data ---------- */
async function loadState() {
  const res = await fetch('/api/state');
  app.state = await res.json();
}
async function loadRun() {
  if (!app.date) {
    app.run = { events: [], files: [] };
    return;
  }
  const res = await fetch(`/api/run?team=${app.team}&date=${app.date}`);
  app.run = res.ok ? await res.json() : { events: [], files: [] };
}

function fillSelectors() {
  const teamSel = $('#team');
  teamSel.innerHTML = '';
  for (const t of app.state.teams) teamSel.add(new Option(t.name === 'blog' ? 'Blog · Noonwire' : t.name, t.name));
  teamSel.value = app.team;
  const runSel = $('#run');
  runSel.innerHTML = '';
  const team = app.state.teams.find((t) => t.name === app.team);
  for (const r of team?.runs ?? []) runSel.add(new Option(r, r));
  if (!app.date) app.date = team?.runs[0] ?? null;
  runSel.value = app.date ?? '';
}
$('#team').addEventListener('change', async (e) => {
  app.team = e.target.value;
  app.date = null;
  fillSelectors();
  await loadRun();
  renderLedger();
  paint();
});
$('#run').addEventListener('change', async (e) => {
  app.date = e.target.value;
  stopReplay();
  await loadRun();
  paint();
});

async function poll() {
  try {
    const before = app.run?.events.length ?? 0;
    const prevRuns = app.state?.teams.find((t) => t.name === app.team)?.runs.length ?? 0;
    await loadState();
    const team = app.state.teams.find((t) => t.name === app.team);
    if ((team?.runs.length ?? 0) !== prevRuns) {
      app.date = team.runs[0];
      fillSelectors();
    }
    await loadRun();
    $('#live').classList.remove('off');
    if (app.replaying) return;
    const fresh = app.run.events.slice(before);
    for (const e of fresh) if (e.olay === 'teslim') fly(e.kimden, e.kime, 900);
    renderLedger();
    paint();
  } catch {
    $('#live').classList.add('off');
  }
}

async function main() {
  buildScene();
  await loadState();
  fillSelectors();
  await loadRun();
  renderLedger();
  paint();
  setInterval(poll, 4000);
}
main();
