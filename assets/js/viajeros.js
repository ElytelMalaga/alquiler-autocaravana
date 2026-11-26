/*
 * POSTALES DE VIAJEROS — Autocaravanas Ruta 340
 * ---------------------------------------------
 * Cada viajero es un cromo con sus fotos y su reseña de Google.
 * La lista va por ORDEN DE LLEGADA (la más antigua primero): ese orden da el número
 * del cromo (Nº 01, Nº 02…). En la web se muestran de la más reciente a la más antigua.
 *
 * Para añadir uno:
 *   1. Guarda sus fotos en assets/img/viajeros/ (unos 1200 px de ancho).
 *   2. Copia un bloque de abajo, pégalo AL FINAL de la lista y cambia los datos.
 *   3. Pide siempre permiso al cliente para publicar sus fotos y su nombre.
 *      ⚠️ Las fotos actuales vienen de reseñas públicas de Google (Cavallo S., Antonio R.,
 *      Jeremy C., Alina G., Bibiana M., David M., Oscar A., Jhan, Mari M. y Linda C.): confirmad con ellos que
 *      les parece bien antes de publicar la web. Si alguien dice que no, borra su línea "fotos".
 *
 * Campos:
 *   nombre     Nombre e inicial del apellido, tal como aparece en Google (p. ej. 'Bibiana M.')
 *   lugar      Dónde hizo las fotos (por ejemplo: "Playa de Bolonia, Cádiz"); '' si no se sabe
 *   fecha      Año de la reseña
 *   fotos      Lista de fotos; la primera es la del cromo y el resto se ven al pulsarla. [] si no hay
 *   estrellas  De 1 a 5, las que puso en Google
 *   texto      Su reseña o un fragmento literal de ella, en el idioma en que la escribió
 *   fuente     'Google'
 *   portada    true para que salga siempre en la portada
 *   encuadre   qué parte de la primera foto se ve en el cromo (p. ej. '50% 12%' = arriba)
 */
window.VIAJEROS = [
  {
    nombre: 'Gastón G.', lugar: '', fecha: '2021', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'La experiencia ha sido muy buena, la autocaravana era cómoda de manejar, bonita y con un montón de extras. Sinceramente, una de las mejores vacaciones que he vivido.'
  },
  {
    nombre: 'Mari M.', lugar: '', fecha: '2021', estrellas: 5, fuente: 'Google', portada: true,
    fotos: ['assets/img/viajeros/mari-embalse.jpg', 'assets/img/viajeros/mari-dehesa.jpg', 'assets/img/viajeros/mari-tunel.jpg', 'assets/img/viajeros/mari-camping.jpg'],
    texto: 'Excelente experiencia, repetiremos pronto porque ha valido mucho la pena, la autocaravana no nos decepcionó en absoluto. Práctica y perfecta para los niños.'
  },
  {
    nombre: 'Juan A. G.', lugar: '', fecha: '2021', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Experiencia inolvidable con mi mujer y mi hijo. Hemos disfrutado de la libertad que te permite la autocaravana para despertar en sitios increíbles. […]'
  },
  {
    nombre: 'Oscapal', lugar: '', fecha: '2021', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Nuestra primera experiencia con autocaravana, ha sido estupendo. La autocaravana estaba en perfecto estado, con todas las comodidades, limpia y nueva. […]'
  },
  {
    nombre: 'Galicraft676', lugar: '', fecha: '2021', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Mi experiencia ha sido muy buena junto a mi familia, lo hemos pasado genial, todo es tal cual a las fotos, superlimpio y todo muy organizado […]'
  },
  {
    nombre: 'Javier G.', lugar: '', fecha: '2021', fotos: [], estrellas: 5, fuente: 'Google',
    texto: '¡Formidable! No solo porque las autocaravanas son nuevas y tienen todo lujo de detalles, sino porque desde el minuto uno te hacen disfrutar […]'
  },
  {
    nombre: 'Ionut B.', lugar: '', fecha: '2021', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Una experiencia inolvidable, todo en perfectas condiciones. La atención por parte de la empresa, un 10+, la fianza devuelta en el momento, de mucha confianza. Volveré a repetir esta experiencia.'
  },
  {
    nombre: 'Cavallo S.', lugar: '', fecha: '2021', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/cavallo-montana.jpg', 'assets/img/viajeros/cavallo-atardecer.jpg', 'assets/img/viajeros/cavallo-sierra.jpg', 'assets/img/viajeros/cavallo-paisaje.jpg'],
    texto: 'They were courteous and went out of their way to ensure everything was perfect, from the explanation of how the motorhome worked to how to return the vehicle. […] This company is 100% recommendable.'
  },
  {
    nombre: 'Antonio R.', lugar: '', fecha: '2022', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/antonio-molinos.jpg', 'assets/img/viajeros/antonio-lateral.jpg', 'assets/img/viajeros/antonio-trasera.jpg'],
    texto: 'Empresa 100 % recomendable a la hora de reservar una autocaravana. Servicio de 10. […] Te diseñan la ruta […]'
  },
  {
    nombre: 'Horacio V.', lugar: '', fecha: '2023', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Todo increíble. Impecable la autocaravana, nueva, tiene de todo. Me fui de viaje 5 días con mi mujer y 3 hijos. Una experiencia súper recomendable.'
  },
  {
    nombre: 'Tina L.', lugar: 'Andalucía', fecha: '2023', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Wir hatten eine wundervolle Zeit in Andalusien im Roller Team Kronos Wohnmobil! Der Kontakt zum Vermieter war einwandfrei. […]'
  },
  {
    nombre: 'Ruth D.', lugar: 'Andalucía', fecha: '2023', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Just had a fabulous week touring Andalucía in this very comfortable motorhome. […] The vehicle is perfect. Will definitely hire again when back in Spain.'
  },
  {
    nombre: 'Jeremy C.', lugar: '', fecha: '2025', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/jeremy-entrega.jpg'],
    texto: 'Primera vez que mi familia y yo alquilamos una autocaravana, ha sido una bonita experiencia. […]'
  },
  {
    nombre: 'Sergio G.', lugar: '', fecha: '2025', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Es una experiencia muy bonita, yo viajo con mi mujer y mis dos hijas y siempre disfrutamos muchísimo, el propietario de la autocaravana está muy atento a todo […]'
  },
  {
    nombre: 'F. Laynez', lugar: '', fecha: '2025', fotos: [], estrellas: 5, fuente: 'Google',
    texto: '¡Tercera experiencia! Como experiencia, increíble como las dos anteriores. […]'
  },
  {
    nombre: 'Francisco B.', lugar: '', fecha: '2025', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Una experiencia inolvidable, la primera vez que alquilamos una autocaravana. Lo hemos pasado de lujo […]. La autocaravana limpísima y con todas las comodidades. Volveremos sin duda.'
  },
  {
    nombre: 'Jhan', lugar: '', fecha: '2025', estrellas: 5, fuente: 'Google', portada: true, encuadre: '50% 12%',
    fotos: ['assets/img/viajeros/jhan-atardecer.jpg', 'assets/img/viajeros/jhan-playa.jpg', 'assets/img/viajeros/jhan-estrellas.jpg', 'assets/img/viajeros/jhan-pinar.jpg'],
    texto: 'Autocaravana en perfectas condiciones, nueva tanto por dentro como por fuera, ningún problema en la carretera, la calefacción y gas funcionando siempre, muy recomendable y el trato de 10.'
  },
  {
    nombre: 'Linda C.', lugar: '', fecha: '2025', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/linda-frontal.jpg', 'assets/img/viajeros/linda-lateral.jpg'],
    texto: 'Primera experiencia y todo perfecto […], así que recomendamos cien por cien su autocaravana.'
  },
  {
    nombre: 'Ana María M.', lugar: '', fecha: '2025', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Hemos pasado unos días maravillosos. Es la primera vez que viajamos en autocaravana y la experiencia ha superado todas nuestras expectativas. El trato con el dueño, excelente. Recomendable 100 %.'
  },
  {
    nombre: 'María Milagros C.', lugar: '', fecha: '2025', fotos: [], estrellas: 5, fuente: 'Google',
    texto: '¡La autocaravana […], un lujo! Todo espectacular, muy buena la atención y la autocaravana estaba nueva. Sin duda volveré a alquilar con ellos.'
  },
  {
    nombre: 'Seb B.', lugar: '', fecha: '2025', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Nous avons passé une très belle semaine de vacances. Le camping-car est très bien équipé, propre et confortable. […]'
  },
  {
    nombre: 'Alina G.', lugar: '', fecha: '2025', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/alina-cafe-nocturno.jpg', 'assets/img/viajeros/alina-noche.jpg'],
    texto: 'Primera experiencia en autocaravana y he de decir que nos ha encantado. Una caravana muy amplia dotada con todo lo necesario y de fácil conducción.'
  },
  {
    nombre: 'Bibiana M.', lugar: '', fecha: '2025', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/bibiana-arboles.jpg', 'assets/img/viajeros/bibiana-atardecer.jpg', 'assets/img/viajeros/bibiana-lluvia.jpg'],
    texto: 'Nuestra primera experiencia en autocaravana, íbamos 2 adultos y 2 niños, y la verdad que el dueño te lo explica todo al detalle de cómo funciona y está ahí en cualquier momento para ayudarte con cualquier duda que tengas. […] Ha sido muy buena la experiencia y todos hemos disfrutado muchísimo.'
  },
  {
    nombre: 'José Carlos P.', lugar: '', fecha: '2026', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Experiencia familiar de 10. Disfrutamos de un viaje en familia inolvidable gracias al alquiler de la caravana. Muy cómoda, limpia y totalmente equipada […]'
  },
  {
    nombre: 'Inmaculada C.', lugar: 'Teruel, Cantabria y Extremadura', fecha: '2026', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Primer viaje en autocaravana, 2 adultos y tres peques, maravillosa experiencia. Trato magnífico, resolviendo todas las dudas. […]'
  },
  {
    nombre: 'David M.', lugar: '', fecha: '2026', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/david-atardecer.jpg'],
    texto: '¡Una experiencia inolvidable! […]'
  },
  {
    nombre: 'Elisa P.', lugar: '', fecha: '2026', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'It was an amazing experience! The caravan was new, clean and very comfortable! […]'
  },
  {
    nombre: 'Oscar A.', lugar: '', fecha: '2026', estrellas: 5, fuente: 'Google',
    fotos: ['assets/img/viajeros/oscar-cama-abatible.jpg', 'assets/img/viajeros/oscar-exterior.jpg', 'assets/img/viajeros/oscar-salon.jpg', 'assets/img/viajeros/oscar-dormitorio.jpg'],
    texto: 'La experiencia de viajar en autocaravana es única, te da libertad y te permite improvisar en los viajes […] son muy amables, te ayudan en todo lo que pueden y te aconsejan.'
  },
  {
    nombre: 'Rahma C.', lugar: '', fecha: '2026', fotos: [], estrellas: 5, fuente: 'Google',
    texto: '¡No hemos tardado nada en volver! Hemos renovado la experiencia con Ruta 340 y nos hemos sentido como en casa.'
  },
  {
    nombre: 'Cosmi D.', lugar: '', fecha: '2026', fotos: [], estrellas: 5, fuente: 'Google',
    texto: 'Era nuestra primera vez viajando en autocaravana y no podríamos haber elegido mejor empresa. La autocaravana estaba muy bien equipada y disfrutamos muchísimo de nuestra escapada en familia.'
  }
];
