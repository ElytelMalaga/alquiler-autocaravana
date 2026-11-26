/* Página de rutas: mapas de cada ruta y filtro por zona */
(function () {
  'use strict';
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const T = window.T || window.I18N.es;

  /* ---------- Filtro por zona ---------- */
  const chips = $$('.chip[data-filter]');
  const routes = $$('.route-full');
  chips.forEach(chip => chip.addEventListener('click', () => {
    const zone = chip.dataset.filter;
    chips.forEach(c => c.classList.toggle('is-active', c === chip));
    routes.forEach(r => { r.hidden = zone !== 'todas' && r.dataset.zone !== zone; });
    // Un mapa que estaba oculto necesita recalcular su tamaño al mostrarse
    routes.forEach(r => { if (!r.hidden && r._map) r._map.invalidateSize(); });
  }));

  /* ---------- Mapas (Leaflet + OpenStreetMap) ---------- */
  if (!window.L) return;
  const COLORS = { start: '#c2410c', stop: '#14181f', camp: '#f97316' };

  function initMap(el) {
    if (el.dataset.ready) return;
    el.dataset.ready = '1';
    const points = JSON.parse(el.dataset.points);
    const map = L.map(el, { scrollWheelZoom: false, attributionControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Trazado orientativo entre las paradas, en el orden del itinerario
    const path = points.filter(p => p[3] !== 'camp').map(p => [p[0], p[1]]);
    L.polyline(path, { color: COLORS.stop, weight: 3, opacity: .7, dashArray: '8 8' }).addTo(map);

    const seen = new Set();
    points.forEach(([lat, lng, name, type]) => {
      const k = lat + ',' + lng;
      if (seen.has(k)) return;
      seen.add(k);
      const m = L.circleMarker([lat, lng], {
        radius: type === 'stop' ? 6 : 8,
        color: '#fff', weight: 2, fillColor: COLORS[type], fillOpacity: 1
      }).addTo(map);
      const label = type === 'camp' ? `${T.camp}: ${name}` : type === 'start' ? `${name} (${T.start})` : name;
      m.bindTooltip(label, { direction: 'top', offset: [0, -6] });
    });

    map.fitBounds(L.latLngBounds(points.map(p => [p[0], p[1]])), { padding: [24, 24] });
    el.closest('.route-full')._map = map;
  }

  const maps = $$('.rf-map');
  maps.forEach(m => m.insertAdjacentHTML('afterend',
    `<p class="map-legend"><span><i style="background:#14181f"></i>${T.legend[0]}</span><span><i style="background:#f97316"></i>${T.legend[1]}</span><span>${T.legend[2]}</span></p>`));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { initMap(e.target); io.unobserve(e.target); }
    }), { rootMargin: '300px' });
    maps.forEach(m => io.observe(m));
  } else {
    maps.forEach(initMap);
  }
})();
