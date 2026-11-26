/*
 * CONFIGURACIÓN DE LA WEB — Autocaravanas Ruta 340
 * ------------------------------------------------
 * Este es el único archivo que hay que tocar para cambiar precios,
 * temporadas, mínimos de días o marcar fechas como ocupadas.
 *
 * ⚠️ Si cambias precios, mínimos o la fianza, cámbialos también en el texto
 * que leen Google y las IA (no ejecutan este archivo):
 *   - index.html → bloque JSON-LD del principio (priceRange y precios)
 *   - index.html → sección "Preguntas frecuentes" y su JSON-LD FAQPage
 *   - llms.txt
 */
window.RUTA340 = {
  telefono: '+34605975518',
  telefonoVisible: '605 97 55 18',
  whatsapp: '34605975518',
  email: 'ruta340@alquiler-autocaravana.com',

  // Porcentaje que se paga para confirmar la reserva (0.30 = 30 %)
  senal: 0.30,
  // Fianza reembolsable que se deposita al recoger la autocaravana (€)
  fianza: 900,
  // Kilometraje (según el contrato): ilimitado en alquileres de más de 3 días;
  // en alquileres de 3 días o menos van incluidos "kmAlquilerCorto" km en total.
  kmIlimitadoDesde: 4,
  kmAlquilerCorto: 800,
  precioKmExtra: 0.28,

  // Temporadas. "nivel" sirve para saber cuál manda cuando se solapan.
  // precioOferta se aplica a partir de "diasOferta" días de alquiler.
  temporadas: {
    baja:  { nombre: 'Temporada baja',  nivel: 1, precio: 120, precioOferta: 110, diasOferta: 7,  minDias: 3 },
    media: { nombre: 'Temporada media', nivel: 2, precio: 140, precioOferta: 130, diasOferta: 7,  minDias: 7 },
    alta:  { nombre: 'Temporada alta',  nivel: 3, precio: 160, precioOferta: 150, diasOferta: 15, minDias: 7 }
  },

  // Temporada de cada mes (1 = enero … 12 = diciembre)
  temporadaPorMes: {
    1: 'baja', 2: 'baja', 3: 'baja', 4: 'baja', 5: 'baja', 6: 'media',
    7: 'alta', 8: 'alta', 9: 'media', 10: 'baja', 11: 'baja', 12: 'baja'
  },

  // Semana Santa (Domingo de Ramos → Domingo de Resurrección) se calcula
  // sola cada año y se cobra con esta temporada. Pon null para desactivarlo.
  semanaSanta: 'media',

  // OTRAS FECHAS DE TEMPORADA MEDIA que cambian cada año: Semana Blanca,
  // Carreras de Jerez (Gran Premio de motociclismo)… Ponlas cuando se sepan las
  // fechas del año, con el día de inicio y el de fin (ambos incluidos). Ejemplo:
  //   { nombre: 'Semana Blanca', desde: '2027-02-26', hasta: '2027-03-07', temporada: 'media' },
  fechasEspeciales: [
  ],

  // RESEÑAS DE GOOGLE
  // Pon aquí el "Place ID" de vuestra ficha de Google Business (empieza por
  // "ChIJ…"; se consulta en developers.google.com/maps/documentation/places/web-service/place-id).
  // Con él, los botones llevan directos a "Ver reseñas" y "Escribir reseña".
  // Mientras esté vacío, los botones abren la búsqueda de la ficha en Google Maps.
  googlePlaceId: '',
  // Identificador (CID) de la ficha «Alquiler de Autocaravanas en Málaga | Ruta 340»
  googleCid: '11279896259264345689',
  googleBusqueda: 'Autocaravanas Ruta 340 Mijas',

  // Mensaje que aparece ya escrito al pulsar el botón flotante de WhatsApp
  whatsappMensaje: 'Hola, quería información sobre el alquiler de la autocaravana.',

  // FECHAS OCUPADAS: añade aquí cada reserva confirmada (día de recogida
  // y día de devolución, ambos incluidos). Formato AAAA-MM-DD. Ejemplo:
  //   { desde: '2027-07-01', hasta: '2027-07-12' },
  reservas: [
  ]
};
