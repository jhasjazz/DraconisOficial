/*
  DRACONIS - CONFIGURACION GENERAL
  Cambia aquí textos, cifras y conexión opcional al buzón de Supabase.
  La página funciona aunque Supabase no esté configurado: el formulario abrirá WhatsApp.
*/
window.DRACONIS_CONFIG = Object.freeze({
  marca: "DRACONIS",
  descriptor: "Soporte Académico",
  eslogan: "Que ningún desafío te encuentre sin guía.",

  estadisticas: [
    { valor: 11, prefijo: "+", sufijo: "", etiqueta: "Años de experiencia" },
    { valor: 8000, prefijo: "+", sufijo: "", etiqueta: "Graduados apoyados" },
    { valor: 200, prefijo: "+", sufijo: "", etiqueta: "Maestres en la Orden" },
    { valor: 6, prefijo: "", sufijo: "+", etiqueta: "Casas del conocimiento" },
  ],

  // Buzón de cotizaciones. La URL ya queda preparada para tu proyecto anterior.
  // Pega SOLO la publishable/anon key pública de Supabase. Nunca una service_role key.
  supabase: {
    url: "https://gszdnigisdzfsjrwbkec.supabase.co",
    publishableKey: "",
    tablaCotizaciones: "cotizaciones_web",
  },
});
