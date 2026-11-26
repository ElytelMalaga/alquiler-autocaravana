(function () {
  'use strict';
  const C = window.RUTA340;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  // es-ES no separa los miles en números de 4 cifras (1900); lo forzamos: 1.900 €
  const euro = n => {
    const [ent, dec] = (Math.round(n * 100) / 100).toString().split('.');
    return ent.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (dec ? ',' + dec.padEnd(2, '0') : '') + ' €';
  };

  // Textos del idioma de la página (assets/js/i18n.js)
  const T = window.T || window.I18N.es;
  const LOC = T.locale;

  /* ---------- Menú y cabecera ---------- */
  const toggle = $('.nav-toggle');
  const nav = $('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    $$('a', nav).forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  const header = $('.site-header');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  $$('[data-year]').forEach(e => { e.textContent = new Date().getFullYear(); });

  /* ---------- Valores de configuración en el texto ---------- */
  if (C) {
    const values = {
      kmAlquilerCorto: C.kmAlquilerCorto.toLocaleString(LOC),
      precioKmExtra: C.precioKmExtra.toLocaleString(LOC, { minimumFractionDigits: 2 }),
      fianza: C.fianza.toLocaleString(LOC),
      senalPct: Math.round(C.senal * 100) + ' %'
    };
    Object.entries(C.temporadas).forEach(([id, t]) => {
      values['precio-' + id] = t.precio;
      values['precioOferta-' + id] = t.precioOferta;
      values['diasOferta-' + id] = t.diasOferta;
      values['min-' + id] = t.minDias;
    });
    $$('[data-cfg]').forEach(el => {
      if (values[el.dataset.cfg] !== undefined) el.textContent = values[el.dataset.cfg];
    });
  }

  /* ---------- Cookies ---------- */
  const KEY = 'ruta340-cookies';
  const getConsent = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
  function setConsent(externos) {
    const v = { tecnicas: true, externos, fecha: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ }
    applyConsent(v);
  }
  function applyConsent(v) { if (v && v.externos) loadMaps(); }
  function loadMaps() {
    $$('[data-map-src]').forEach(box => {
      if (box.dataset.loaded) return;
      box.dataset.loaded = '1';
      box.innerHTML = `<iframe src="${box.dataset.mapSrc}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${T.mapTitle}"></iframe>`;
    });
  }
  const banner = $('#cookie-banner');
  function showBanner(expanded) {
    if (!banner) return;
    const c = getConsent();
    $('#ck-externos').checked = !!(c && c.externos);
    banner.classList.toggle('expanded', !!expanded);
    banner.hidden = false;
  }
  if (banner) {
    const close = () => { banner.hidden = true; };
    $('#ck-accept').addEventListener('click', () => { setConsent(true); close(); });
    $('#ck-reject').addEventListener('click', () => { setConsent(false); close(); });
    $('#ck-save').addEventListener('click', () => { setConsent($('#ck-externos').checked); close(); });
    $('#ck-config').addEventListener('click', () => banner.classList.toggle('expanded'));
    const c = getConsent();
    if (c) applyConsent(c); else showBanner(false);
  }
  $$('[data-cookie-settings]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); showBanner(true); }));
  $$('[data-load-map]').forEach(b => b.addEventListener('click', () => {
    setConsent(true);
    if (banner) banner.hidden = true;
  }));

  /* ---------- Vídeos de TikTok: el reproductor solo se carga al pulsar ---------- */
  // Solo se reproduce un vídeo a la vez. El que pulsas pasa a ser el grande
  // (el grande anterior se hace pequeño) con una transición suave.
  {
    const grid = $('.vid-grid');
    if (grid) {
      let playing = null; // { btn, frame }
      const stop = () => { if (playing) { playing.frame.replaceWith(playing.btn); playing = null; } };
      const still = window.matchMedia('(prefers-reduced-motion: reduce)');
      const carousel = window.matchMedia('(max-width: 640px)');
      grid.addEventListener('click', e => {
        const b = e.target.closest('[data-tiktok]');
        if (!b) return;
        stop();
        const fig = b.closest('.vid');
        const feat = $('.vid-feat', grid);
        if (fig !== feat) {
          const items = $$('.vid', grid);
          const before = new Map(items.map(el => [el, el.getBoundingClientRect()]));
          if (feat) feat.classList.remove('vid-feat');
          fig.classList.add('vid-feat');
          grid.prepend(fig);
          if (!still.matches && !carousel.matches) {
            items.forEach(el => {
              const a = before.get(el), z = el.getBoundingClientRect();
              if (!z.width || !z.height) return;
              const dx = a.left - z.left, dy = a.top - z.top, sx = a.width / z.width, sy = a.height / z.height;
              if (Math.abs(dx) < 1 && Math.abs(dy) < 1 && Math.abs(sx - 1) < .01) return;
              el.animate([
                { transformOrigin: '0 0', transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
                { transformOrigin: '0 0', transform: 'none' }
              ], { duration: 520, easing: 'cubic-bezier(.16, 1, .3, 1)' });
            });
          }
        }
        const f = document.createElement('iframe');
        f.src = `https://www.tiktok.com/player/v1/${b.dataset.tiktok}?autoplay=1&description=0&music_info=0&rel=0`;
        f.title = b.getAttribute('aria-label');
        f.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
        f.allowFullscreen = true;
        f.className = 'vid-frame';
        b.replaceWith(f);
        playing = { btn: b, frame: f };
        if (carousel.matches) grid.scrollTo({ left: 0, behavior: still.matches ? 'auto' : 'smooth' });
        else if (fig.getBoundingClientRect().top < 70) fig.scrollIntoView({ block: 'start', behavior: still.matches ? 'auto' : 'smooth' });
      });
    }
  }

  /* ---------- Visor de fotos ---------- */
  // openGallery([{src, alt}], n) abre el visor con cualquier grupo de fotos (fotos de la autocaravana o las de un cromo)
  const lb = $('#lightbox');
  let openGallery = () => {};
  if (lb) {
    let img = $('img', lb);
    if (!img) { img = document.createElement('img'); $('figure', lb).prepend(img); }
    const cap = $('.lb-caption', lb);
    let items = [], idx = 0;
    const show = n => {
      idx = (n + items.length) % items.length;
      img.src = items[idx].src;
      img.alt = items[idx].alt || '';
      cap.textContent = items.length > 1 ? `${img.alt} · ${idx + 1}/${items.length}` : img.alt;
      $('.lb-prev', lb).hidden = $('.lb-next', lb).hidden = items.length < 2;
    };
    openGallery = (list, n) => { items = list; show(n || 0); if (!lb.open) lb.showModal(); };
    const links = $$('[data-lightbox]');
    const linkItems = links.map(a => ({ src: a.getAttribute('href'), alt: ($('img', a) || {}).alt || '' }));
    links.forEach((a, n) => a.addEventListener('click', e => { e.preventDefault(); openGallery(linkItems, n); }));
    $('.lb-prev', lb).addEventListener('click', () => show(idx - 1));
    $('.lb-next', lb).addEventListener('click', () => show(idx + 1));
    $('.lb-close', lb).addEventListener('click', () => lb.close());
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  if (!C) return;

  /* ---------- Fechas y temporadas ---------- */
  const MESES = T.months;
  const pad = n => String(n).padStart(2, '0');
  const keyOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parse = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const diffDays = (a, b) => Math.round((b - a) / 864e5);
  const fmt = (d, opts) => d.toLocaleDateString(LOC, opts || { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  const today = new Date(); today.setHours(0, 0, 0, 0);

  // Domingo de Pascua (algoritmo de Meeus/Jones/Butcher)
  function easter(y) {
    const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
    const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }
  const ssCache = {};
  const semanaSanta = y => ssCache[y] || (ssCache[y] = [addDays(easter(y), -7), easter(y)]);

  function seasonOf(d) {
    let s = C.temporadaPorMes[d.getMonth() + 1];
    if (C.semanaSanta) {
      const [a, b] = semanaSanta(d.getFullYear());
      if (d >= a && d <= b && C.temporadas[C.semanaSanta].nivel > C.temporadas[s].nivel) s = C.semanaSanta;
    }
    // Fechas especiales de cada año (Semana Blanca, Carreras de Jerez…)
    (C.fechasEspeciales || []).forEach(p => {
      if (d >= parse(p.desde) && d <= parse(p.hasta) && C.temporadas[p.temporada].nivel > C.temporadas[s].nivel) s = p.temporada;
    });
    return s;
  }

  /* ---------- Reseñas de Google y WhatsApp flotante ---------- */
  {
    const q = encodeURIComponent(C.googleBusqueda || 'Autocaravanas Ruta 340');
    const urls = C.googlePlaceId
      ? { ver: `https://search.google.com/local/reviews?placeid=${C.googlePlaceId}`, escribir: `https://search.google.com/local/writereview?placeid=${C.googlePlaceId}` }
      : C.googleCid
        ? { ver: `https://www.google.com/maps?cid=${C.googleCid}`, escribir: `https://www.google.com/maps?cid=${C.googleCid}` }
        : { ver: `https://www.google.com/maps/search/?api=1&query=${q}`, escribir: `https://www.google.com/maps/search/?api=1&query=${q}` };
    $$('[data-google]').forEach(a => { a.href = urls[a.dataset.google]; });
    const waText = T === window.I18N.es ? (C.whatsappMensaje || T.waDefault) : T.waDefault;
    const waUrl = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(waText)}`;
    $$('#wa-float, [data-wa]').forEach(a => { a.href = waUrl; });
    $$('[data-wa-msg]').forEach(a => { a.href = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(T[a.dataset.waMsg] || '')}`; });
  }

  /* ---------- Cromos de viajeros (datos en viajeros.js) ---------- */
  {
    const box = $('#cromos');
    const list = window.VIAJEROS || [];
    if (box) {
      const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      // Las rutas de viajeros.js son relativas a la raíz de la web; las páginas traducidas viven en /en/, /de/…
      const me = document.querySelector('script[src$="assets/js/main.js"]');
      const root = me ? me.getAttribute('src').replace('assets/js/main.js', '') : '';
      const fix = f => (f && !/^(https?:|\/|\.\.\/)/.test(f)) ? root + f : f;
      // Cada viajero puede tener una foto (foto) o varias (fotos: [...]); la primera es la del cromo
      list.forEach(v => { v._fotos = [].concat(v.fotos || [], v.foto || []).filter(Boolean).filter((f, i, a) => a.indexOf(f) === i).map(fix); });
      const star = '<svg class="ico"><use href="#i-star"/></svg>';
      const limit = Number(box.dataset.limit) || Infinity;
      // Se muestran del más reciente al más antiguo; en la portada, primero los que tienen foto
      const recent = [...list].reverse();
      const shown = isFinite(limit) ? recent.filter(v => v.portada).concat(recent.filter(v => !v.portada && v._fotos.length), recent.filter(v => !v.portada && !v._fotos.length)).slice(0, limit) : recent;
      // Huecos numerados para los próximos viajeros: al menos dos, completando la fila de cuatro
      const slots = box.dataset.slots !== undefined ? Number(box.dataset.slots) : Math.max(2, (4 - (shown.length + 2) % 4) % 4 + 2);
      const waFoto = `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(T.waPhoto)}`;
      box.innerHTML = shown.map(v => {
        const n = String(list.indexOf(v) + 1).padStart(2, '0');
        const f = v._fotos;
        // Sin foto todavía: cromo de solo texto, con su número, sin ventana de foto vacía
        const photo = f.length
          ? `<button type="button" class="cromo-photo" data-cromo="${list.indexOf(v)}" aria-label="${esc(T.photosOf(v.nombre, f.length))}"><img src="${esc(f[0])}" alt="${esc(T.photoOf(v.nombre, v.lugar))}" loading="lazy"${v.encuadre ? ` style="object-position:${esc(v.encuadre)}"` : ''}><span class="cromo-num">Nº ${n}</span>${f.length > 1 ? `<span class="cromo-more">+${f.length - 1}</span>` : ''}</button>`
          : '';
        return `<article class="cromo${f.length ? '' : ' no-img'}">${photo}<div class="cromo-body">
          ${f.length ? '' : `<span class="cromo-tag">Nº ${n}</span>`}
          ${v.lugar ? `<p class="cromo-place">${esc(v.lugar)}</p>` : ''}
          <span class="stars" aria-label="${T.stars(v.estrellas)}">${star.repeat(v.estrellas || 5)}</span>
          <blockquote>«${esc(v.texto)}»</blockquote>
          <footer><strong>${esc(v.nombre)}</strong><small>${v.fecha ? esc(v.fecha) + ' · ' : ''}${esc(v.fuente || 'Google')}</small></footer>
        </div></article>`;
      }).join('') + Array.from({ length: slots }, (_, k) => {
        const n = String(list.length + k + 1).padStart(2, '0');
        return `<div class="cromo slot"><span class="slot-num">Nº ${n}</span><p>${T.slot}</p><a class="btn btn-outline btn-sm" href="${waFoto}" target="_blank" rel="noopener">${T.sendPhoto}</a></div>`;
      }).join('');
      box.addEventListener('click', e => {
        const b = e.target.closest('[data-cromo]');
        if (!b) return;
        const v = list[Number(b.dataset.cromo)];
        openGallery(v._fotos.map(src => ({ src, alt: T.photoOf(v.nombre, v.lugar) })), 0);
      });
    }
  }

  /* ---------- Nota de Semana Santa ---------- */
  {
    const note = $('#semana-santa-note');
    if (note && C.semanaSanta) {
      let y = today.getFullYear();
      if (semanaSanta(y)[1] < today) y++;
      const [a, b] = semanaSanta(y);
      const dm = d => fmt(d, { day: 'numeric', month: 'long' });
      const extra = (C.fechasEspeciales || []).filter(p => parse(p.hasta) >= today)
        .map(p => `${p.nombre}: ${dm(parse(p.desde))} – ${dm(parse(p.hasta))}.`).join(' ');
      note.textContent = T.easter(y, dm(a), dm(b)) + (extra ? ' ' + extra : '');
    }
  }

  /* ---------- Calendario de reservas ---------- */
  const cal = $('#calendar');
  if (!cal) return;

  const busy = new Set();
  (C.reservas || []).forEach(r => {
    for (let d = parse(r.desde); d <= parse(r.hasta); d = addDays(d, 1)) busy.add(keyOf(d));
  });

  const mq = window.matchMedia('(min-width: 640px)');
  const firstMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  let view = new Date(firstMonth);
  let start = null, end = null;

  const msgEl = $('#cal-msg');
  const prevBtn = $('#cal-prev');
  const nextBtn = $('#cal-next');
  const summaryBody = $('#summary-body');
  const form = $('#booking-form');

  function msg(text, type) {
    msgEl.textContent = text || '';
    msgEl.className = 'cal-msg' + (type ? ' ' + type : '');
  }

  function render() {
    const n = mq.matches ? 2 : 1;
    cal.style.setProperty('--months', n);
    cal.innerHTML = '';
    for (let k = 0; k < n; k++) cal.appendChild(monthEl(new Date(view.getFullYear(), view.getMonth() + k, 1)));
    prevBtn.disabled = view <= firstMonth;
    updateSummary();
  }

  function monthEl(m) {
    const wrap = document.createElement('div');
    wrap.className = 'cal-month';
    wrap.innerHTML = `<h4>${MESES[m.getMonth()]} ${m.getFullYear()}</h4>`;
    const grid = document.createElement('div');
    grid.className = 'cal-grid';
    T.dows.forEach(d => {
      const s = document.createElement('span'); s.className = 'dow'; s.textContent = d; grid.appendChild(s);
    });
    const offset = (m.getDay() + 6) % 7;
    for (let i = 0; i < offset; i++) grid.appendChild(document.createElement('span'));
    const total = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= total; i++) {
      const d = new Date(m.getFullYear(), m.getMonth(), i);
      const k = keyOf(d);
      const s = seasonOf(d);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'day s-' + s;
      b.textContent = i;
      b.dataset.date = k;
      let estado = T.season[s].toLowerCase();
      if (d < today) { b.disabled = true; b.classList.add('past'); estado = T.unavailable; }
      else if (busy.has(k)) { b.disabled = true; b.classList.add('busy'); estado = T.busy; }
      if (+d === +today) b.classList.add('today');
      if (start && +d === +start) b.classList.add('start');
      if (end && +d === +end) b.classList.add('end');
      if (start && end && d > start && d < end) b.classList.add('in-range');
      b.setAttribute('aria-label', `${fmt(d, { weekday: 'long', day: 'numeric', month: 'long' })}, ${estado}`);
      if (b.classList.contains('start') || b.classList.contains('end')) b.setAttribute('aria-pressed', 'true');
      grid.appendChild(b);
    }
    wrap.appendChild(grid);
    return wrap;
  }

  function firstBusyBetween(a, b) {
    for (let x = addDays(a, 1); x <= b; x = addDays(x, 1)) if (busy.has(keyOf(x))) return x;
    return null;
  }

  function pick(d) {
    if (!start || end || d <= start) {
      start = d; end = null;
      msg(T.pickReturn);
    } else {
      const clash = firstBusyBetween(start, d);
      if (clash) {
        msg(T.clash(fmt(clash, { day: 'numeric', month: 'long' })), 'error');
        return;
      }
      end = d;
      msg('');
    }
    render();
    if (end && !mq.matches) $('#summary').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  cal.addEventListener('click', e => {
    const b = e.target.closest('.day');
    if (b && !b.disabled) pick(parse(b.dataset.date));
  });
  cal.addEventListener('mouseover', e => {
    if (!start || end) return;
    const b = e.target.closest('.day');
    if (!b) return;
    const h = parse(b.dataset.date);
    $$('.day', cal).forEach(el => {
      const d = parse(el.dataset.date);
      el.classList.toggle('preview', d > start && d <= h && !el.disabled);
    });
  });
  cal.addEventListener('mouseleave', () => $$('.day.preview', cal).forEach(el => el.classList.remove('preview')));
  prevBtn.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() - 1, 1); render(); });
  nextBtn.addEventListener('click', () => { view = new Date(view.getFullYear(), view.getMonth() + 1, 1); render(); });
  mq.addEventListener('change', render);

  function quote() {
    // Se cuentan el día de recogida y el de devolución: del 1 al 7 son 7 días
    const days = diffDays(start, end) + 1;
    const counts = {};
    for (let x = new Date(start); x <= end; x = addDays(x, 1)) {
      const s = seasonOf(x);
      counts[s] = (counts[s] || 0) + 1;
    }
    let total = 0, min = 0, minSeason = null, minId = null;
    const lines = Object.entries(counts).map(([s, c]) => {
      const t = C.temporadas[s];
      const oferta = days >= t.diasOferta;
      const precio = oferta ? t.precioOferta : t.precio;
      total += precio * c;
      if (t.minDias > min) { min = t.minDias; minSeason = t; minId = s; }
      return { s, t, c, precio, oferta };
    });
    return { days, lines, total, min, minSeason, minId, ok: days >= min };
  }

  let current = null;
  function updateSummary() {
    if (!start) {
      summaryBody.innerHTML = `<p class="muted">${T.noDates}</p>`;
      form.hidden = true; current = null; return;
    }
    const dates = `<div class="sum-dates">
      <div><small>${T.pickup}</small><strong>${fmt(start)}</strong></div>
      <div><small>${T.dropoff}</small><strong>${end ? fmt(end) : '—'}</strong></div>
    </div>`;
    if (!end) {
      summaryBody.innerHTML = dates + `<p class="muted">${T.chooseReturn}</p>`;
      form.hidden = true; current = null; return;
    }
    const q = quote();
    current = q;
    const lines = q.lines.map(l => `<li><span>${l.c} ${l.c === 1 ? T.day : T.days} · ${T.seasonShort[l.s]}${l.oferta ? `<span class="tag">${T.offer}</span>` : ''}</span><span>${l.precio} ${T.perDay}</span></li>`).join('');
    summaryBody.innerHTML = dates + `
      <ul class="sum-lines">${lines}</ul>
      <div class="sum-total"><span>${q.days} ${T.days}</span><span>${euro(q.total)}</span></div>
      <div class="sum-sub"><span>${T.deposit(Math.round(C.senal * 100))}</span><strong>${euro(Math.round(q.total * C.senal * 100) / 100)}</strong></div>
      <div class="sum-sub"><span>${T.refundable}</span><span>${euro(C.fianza)}</span></div>
      <div class="sum-sub"><span>${T.km}</span><span>${q.days >= C.kmIlimitadoDesde ? T.kmUnlimited : C.kmAlquilerCorto.toLocaleString(LOC) + ' km'}</span></div>
      ${q.ok ? '' : `<p class="alert">${T.minAlert(T.season[q.minId], q.min, q.min - q.days)}</p>`}`;
    form.hidden = !q.ok;
    summaryBody.classList.remove('sum-reveal');
    void summaryBody.offsetWidth;
    summaryBody.classList.add('sum-reveal');
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!current || !current.ok) return;
    const via = e.submitter ? e.submitter.value : 'whatsapp';
    const f = new FormData(form);
    const text = [
      T.msg.intro,
      `• ${T.msg.from}: ${fmt(start, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
      `• ${T.msg.to}: ${fmt(end, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`,
      `• ${T.msg.days}: ${current.days} · ${T.msg.price}: ${euro(current.total)}`,
      `• ${T.msg.people}: ${f.get('personas')}`,
      `• ${T.msg.name}: ${f.get('nombre')}`,
      `• ${T.msg.phone}: ${f.get('telefono')}`,
      `• ${T.msg.email}: ${f.get('email')}`,
      f.get('comentarios') ? `• ${T.msg.notes}: ${f.get('comentarios')}` : ''
    ].filter(Boolean).join('\n');
    if (via === 'email') {
      window.location.href = `mailto:${C.email}?subject=${encodeURIComponent(T.msg.subject + ' · ' + keyOf(start) + ' a ' + keyOf(end))}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    }
  });

  /* ---------- Caja de reserva de arriba: rellena el calendario ---------- */
  const search = $('#hero-search');
  if (search) {
    const smsg = $('#search-msg');
    const [inA, inB] = $$('input[type=date]', search);
    inA.min = inB.min = keyOf(today);
    inA.addEventListener('change', () => { if (inA.value) inB.min = keyOf(addDays(parse(inA.value), 1)); });
    search.addEventListener('submit', e => {
      e.preventDefault();
      smsg.textContent = '';
      if (!inA.value || !inB.value) { smsg.textContent = T.needBoth; return; }
      const a = parse(inA.value), b = parse(inB.value);
      if (a < today) { smsg.textContent = T.pastStart; return; }
      if (b <= a) { smsg.textContent = T.endBefore; return; }
      const clash = busy.has(keyOf(a)) ? a : firstBusyBetween(a, b);
      start = a; end = clash ? null : b;
      view = new Date(a.getFullYear(), a.getMonth(), 1);
      if (clash) msg(T.clash(fmt(clash, { day: 'numeric', month: 'long' })), 'error');
      else msg('');
      if (clash && busy.has(keyOf(a))) start = null;
      render();
      $('#reservar').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  render();
})();
