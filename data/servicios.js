/*
  DRACONIS - SERVICIOS Y CASAS
  Para agregar una nueva rama, solo añade texto al arreglo "ramas".
  Cada tarjeta abre WhatsApp con el área ya escrita.
*/
window.DRACONIS_SERVICIOS = Object.freeze({
  destacados: [
    {
      icono: "✦",
      titulo: "Tutorías y clases",
      texto: "Acompañamiento personalizado, refuerzos, preparación y clases particulares en múltiples áreas.",
    },
    {
      icono: "📜",
      titulo: "Proyectos y trabajos",
      texto: "Orientación, revisión, investigación, presentaciones, ensayos y proyectos académicos según tu necesidad.",
    },
    {
      icono: "🎓",
      titulo: "Tesis y grado",
      texto: "Acompañamiento metodológico, análisis, estructura, revisión y apoyo durante las distintas etapas del proceso.",
    },
    {
      icono: "🏗️",
      titulo: "Maquetas y proyectos físicos",
      texto: "Solicitudes físicas o virtuales según complejidad, ubicación, materiales y disponibilidad de la Orden.",
    },
    {
      icono: "✒️",
      titulo: "Escritura y revisión",
      texto: "Redacción, corrección de estilo, normas, edición, bibliografía y acompañamiento en investigación.",
    },
    {
      icono: "🎨",
      titulo: "Diseño y presentaciones",
      texto: "Material visual, presentaciones, diagramación, recursos didácticos, infografías y apoyo creativo.",
    },
  ],

  niveles: [
    "Escolar",
    "Bachillerato",
    "Técnico",
    "Tecnólogo",
    "Pregrado",
    "Especialización",
    "Maestría",
    "Posgrado",
    "Doctorado",
    "Formación libre",
  ],

  casas: [
    {
      id: "ciencias",
      nombre: "Casa de las Ciencias",
      lema: "Donde las preguntas encuentran método.",
      simbolo: "⚛",
      areas: [
        {
          nombre: "Matemáticas",
          icono: "∑",
          ramas: ["Álgebra", "Cálculo", "Geometría", "Trigonometría", "Ecuaciones diferenciales", "Matemática discreta", "Análisis matemático", "y más…"],
        },
        {
          nombre: "Física",
          icono: "⚛",
          ramas: ["Mecánica", "Electromagnetismo", "Termodinámica", "Óptica", "Mecánica cuántica", "Mecánica estadística", "Física atómica y subatómica", "y más…"],
        },
        {
          nombre: "Estadística",
          icono: "▥",
          ramas: ["Probabilidad", "Descriptiva", "Inferencia", "Regresión", "Muestreo", "Diseño experimental", "Series de tiempo", "y más…"],
        },
        {
          nombre: "Química",
          icono: "⚗",
          ramas: ["General", "Orgánica", "Inorgánica", "Analítica", "Fisicoquímica", "Bioquímica", "Laboratorios", "y más…"],
        },
        {
          nombre: "Biología",
          icono: "⌁",
          ramas: ["Celular", "Genética", "Microbiología", "Ecología", "Anatomía", "Fisiología", "Biología molecular", "y más…"],
        },
        {
          nombre: "Astronomía y ciencias afines",
          icono: "✧",
          ramas: ["Astronomía", "Astrofísica", "Cosmología", "Ciencias de la Tierra", "Modelación", "y más…"],
        },
      ],
    },
    {
      id: "ingenieria",
      nombre: "Casa de Ingeniería y Tecnología",
      lema: "Ingenio para construir lo posible.",
      simbolo: "⚙",
      areas: [
        {
          nombre: "Ingeniería",
          icono: "⚙",
          ramas: ["Civil", "Mecánica", "Industrial", "Electrónica", "Eléctrica", "Sistemas", "Ambiental", "Telecomunicaciones", "y más…"],
        },
        {
          nombre: "Programación",
          icono: "</>",
          ramas: ["Python", "Java", "JavaScript", "C/C++", "Bases de datos", "Algoritmos", "Desarrollo web", "y más…"],
        },
        {
          nombre: "Datos y computación",
          icono: "⌘",
          ramas: ["Análisis de datos", "Excel", "Power BI", "Bases de datos", "Modelación", "Automatización", "y más…"],
        },
        {
          nombre: "Electrónica y circuitos",
          icono: "⌁",
          ramas: ["Circuitos", "Señales", "Control", "Microcontroladores", "Electrónica digital", "y más…"],
        },
      ],
    },
    {
      id: "humanidades",
      nombre: "Casa de Humanidades e Idiomas",
      lema: "Ideas, palabras y memoria.",
      simbolo: "✒",
      areas: [
        {
          nombre: "Escritura y literatura",
          icono: "✒",
          ramas: ["Ensayo", "Redacción", "Ortografía", "Literatura", "Argumentación", "Corrección de estilo", "y más…"],
        },
        {
          nombre: "Idiomas",
          icono: "AΩ",
          ramas: ["Inglés", "Español", "Francés", "Comprensión", "Conversación", "Escritura", "Traducción orientativa", "y más…"],
        },
        {
          nombre: "Historia y ciencias sociales",
          icono: "⌛",
          ramas: ["Historia", "Geografía", "Sociología", "Antropología", "Ciencia política", "Estudios sociales", "y más…"],
        },
        {
          nombre: "Filosofía y pensamiento",
          icono: "◇",
          ramas: ["Filosofía", "Ética", "Lógica", "Pensamiento crítico", "Teoría", "y más…"],
        },
      ],
    },
    {
      id: "artes",
      nombre: "Casa de las Artes",
      lema: "Técnica, sensibilidad y expresión.",
      simbolo: "♫",
      areas: [
        {
          nombre: "Música",
          icono: "♫",
          ramas: ["Violín", "Guitarra", "Saxofón", "Bajo", "Piano", "Canto", "Teoría musical", "Armonía", "y más…"],
        },
        {
          nombre: "Diseño",
          icono: "✦",
          ramas: ["Diseño gráfico", "Diagramación", "Infografías", "Presentaciones", "Identidad visual", "Ilustración", "y más…"],
        },
        {
          nombre: "Artes visuales",
          icono: "◈",
          ramas: ["Dibujo", "Pintura", "Composición", "Historia del arte", "Técnicas mixtas", "y más…"],
        },
        {
          nombre: "Producción creativa",
          icono: "✺",
          ramas: ["Guion", "Contenido", "Material didáctico", "Proyectos creativos", "Portafolios", "y más…"],
        },
      ],
    },
    {
      id: "negocios",
      nombre: "Casa de Economía y Negocios",
      lema: "Estrategia para leer el mundo.",
      simbolo: "♜",
      areas: [
        {
          nombre: "Economía y finanzas",
          icono: "$",
          ramas: ["Microeconomía", "Macroeconomía", "Finanzas", "Evaluación de proyectos", "Econometría", "Mercados", "y más…"],
        },
        {
          nombre: "Contabilidad",
          icono: "▤",
          ramas: ["Contabilidad general", "Costos", "Presupuestos", "Estados financieros", "Análisis financiero", "y más…"],
        },
        {
          nombre: "Administración",
          icono: "♜",
          ramas: ["Gestión", "Planeación", "Talento humano", "Procesos", "Estrategia", "Emprendimiento", "y más…"],
        },
        {
          nombre: "Marketing",
          icono: "◎",
          ramas: ["Mercadeo", "Investigación de mercados", "Estrategia digital", "Marca", "Plan de marketing", "y más…"],
        },
      ],
    },
    {
      id: "investigacion",
      nombre: "Casa de Investigación",
      lema: "Rigor para convertir una idea en camino.",
      simbolo: "⌕",
      areas: [
        {
          nombre: "Metodología",
          icono: "⌕",
          ramas: ["Cuantitativa", "Cualitativa", "Mixta", "Diseño metodológico", "Instrumentos", "Variables", "y más…"],
        },
        {
          nombre: "Tesis y trabajos de grado",
          icono: "🎓",
          ramas: ["Anteproyecto", "Marco teórico", "Metodología", "Análisis", "Discusión", "Revisión", "Sustentación", "y más…"],
        },
        {
          nombre: "Normas y referencias",
          icono: "§",
          ramas: ["APA", "Vancouver", "ICONTEC", "IEEE", "Bibliografía", "Citación", "y más…"],
        },
        {
          nombre: "Análisis académico",
          icono: "◫",
          ramas: ["Revisión bibliográfica", "Matrices", "Análisis estadístico", "Interpretación", "Edición", "y más…"],
        },
      ],
    },
  ],
});
