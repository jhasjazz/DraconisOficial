(() => {
  "use strict";

  const CONTACTOS = window.DRACONIS_CONTACTOS || {};
  const CONFIG = window.DRACONIS_CONFIG || {};
  const SERVICIOS = window.DRACONIS_SERVICIOS || { destacados: [], niveles: [], casas: [] };
  const TESTIMONIOS = window.DRACONIS_TESTIMONIOS || [];
  const VIDEOS = window.DRACONIS_VIDEOS || [];

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const dom = {
    menuButton: $("#menu-button"),
    menuClose: $("#menu-close"),
    menu: $("#side-menu"),
    menuBackdrop: $("#menu-backdrop"),
    serviceGrid: $("#service-grid"),
    levelChips: $("#level-chips"),
    housesRoot: $("#houses-root"),
    statsGrid: $("#stats-grid"),
    testimonialTrack: $("#testimonial-track"),
    testimonialDots: $("#testimonial-dots"),
    testimonialsPrev: $("#testimonials-prev"),
    testimonialsNext: $("#testimonials-next"),
    videoGrid: $("#video-grid"),
    quoteForm: $("#quote-form"),
    quoteLevel: $("#quote-level"),
    quoteHouse: $("#quote-house"),
    quoteDate: $("#quote-date"),
    budgetInput: $("#budget-input"),
    noBudgetLimit: $("#no-budget-limit"),
    quoteSubmit: $("#quote-submit"),
    formStatus: $("#form-status"),
    dragonWhatsapp: $("#dragon-whatsapp"),
    heroSocials: $("#hero-socials"),
    sideSocials: $("#side-socials"),
    footerSocials: $("#footer-socials"),
    footerWhatsapp: $("#footer-whatsapp"),
    footerEmail: $("#footer-email"),
    footerLocation: $("#footer-location"),
    toastRegion: $("#toast-region"),
    embers: $("#embers"),
  };

  const state = {
    formOpenedAt: Date.now(),
    testimonialIndex: 0,
  };

  init();

  function init() {
    hydrateBrand();
    setupMenu();
    setupContacts();
    renderServices();
    renderHouses();
    renderStats();
    renderTestimonials();
    renderVideos();
    setupQuoteForm();
    setupReveal();
    setupEmbers();
    setupDragonBubble();
    setupSmoothAnchors();
    $("#current-year").textContent = String(new Date().getFullYear());
  }

  function hydrateBrand() {
    const brand = CONFIG.marca || "DRACONIS";
    const descriptor = CONFIG.descriptor || "Soporte Académico";
    const slogan = CONFIG.eslogan || "Que ningún desafío te encuentre sin guía.";
    $$('[data-brand-name]').forEach((el) => { el.textContent = brand; });
    $$('[data-brand-descriptor]').forEach((el) => { el.textContent = descriptor; });
    $$('[data-slogan]').forEach((el) => { el.textContent = slogan; });
    document.title = `${brand} · ${descriptor}`;
  }

  function setupMenu() {
    const open = () => {
      dom.menu.classList.add("open");
      dom.menu.setAttribute("aria-hidden", "false");
      dom.menuBackdrop.hidden = false;
      dom.menuButton.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    };
    const close = () => {
      dom.menu.classList.remove("open");
      dom.menu.setAttribute("aria-hidden", "true");
      dom.menuBackdrop.hidden = true;
      dom.menuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    dom.menuButton?.addEventListener("click", open);
    dom.menuClose?.addEventListener("click", close);
    dom.menuBackdrop?.addEventListener("click", close);
    $$("a[href^='#']", dom.menu).forEach((link) => link.addEventListener("click", close));
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
  }

  function setupContacts() {
    const wa = CONTACTOS.whatsapp || {};
    const generalUrl = whatsappUrl(wa.numero, wa.mensajeGeneral || "Hola, quiero información sobre Draconis.");
    const joinUrl = whatsappUrl(wa.numero, wa.mensajeUnirse || "Hola, quiero unirme a la Orden Draconis.");

    $$(".whatsapp-general").forEach((link) => setLink(link, generalUrl));
    $$(".whatsapp-join").forEach((link) => setLink(link, joinUrl));
    setLink(dom.dragonWhatsapp, generalUrl);
    setLink(dom.footerWhatsapp, generalUrl);

    const email = String(CONTACTOS.correo || "").trim();
    if (email) {
      dom.footerEmail.href = `mailto:${email}`;
      dom.footerEmail.textContent = email;
    } else {
      dom.footerEmail.textContent = "Correo por configurar";
      dom.footerEmail.setAttribute("aria-disabled", "true");
    }

    dom.footerLocation.textContent = CONTACTOS.ubicacionBase || "Colombia";

    const socialMarkup = renderSocialLinks(CONTACTOS.redes || {});
    dom.heroSocials.innerHTML = socialMarkup;
    dom.sideSocials.innerHTML = socialMarkup;
    dom.footerSocials.innerHTML = socialMarkup;
  }

  function renderSocialLinks(redes) {
    const items = [
      ["instagram", "IG", "Instagram"],
      ["facebook", "f", "Facebook"],
      ["tiktok", "♪", "TikTok"],
      ["youtube", "▶", "YouTube"],
    ];

    return items.map(([key, icon, label]) => {
      const url = safeUrl(redes[key]);
      const disabled = !url;
      return `<a class="social-link" href="${escapeAttr(url || "#")}" ${disabled ? 'aria-disabled="true" tabindex="-1"' : 'target="_blank" rel="noopener noreferrer"'} aria-label="${label}">${icon}</a>`;
    }).join("");
  }

  function renderServices() {
    dom.serviceGrid.innerHTML = SERVICIOS.destacados.map((item) => `
      <article class="service-card reveal">
        <span class="service-icon" aria-hidden="true">${escapeHtml(item.icono || "✦")}</span>
        <h3>${escapeHtml(item.titulo)}</h3>
        <p>${escapeHtml(item.texto)}</p>
      </article>
    `).join("");

    dom.levelChips.innerHTML = SERVICIOS.niveles.map((nivel) => `<span class="level-chip">${escapeHtml(nivel)}</span>`).join("");
    dom.quoteLevel.innerHTML += SERVICIOS.niveles.map((nivel) => `<option value="${escapeAttr(nivel)}">${escapeHtml(nivel)}</option>`).join("");
  }

  function renderHouses() {
    dom.quoteHouse.innerHTML += SERVICIOS.casas.map((casa) => `<option value="${escapeAttr(casa.nombre)}">${escapeHtml(casa.nombre)}</option>`).join("");

    dom.housesRoot.innerHTML = SERVICIOS.casas.map((casa) => `
      <section class="house-block reveal" id="casa-${escapeAttr(casa.id)}">
        <header class="house-header">
          <span class="house-symbol" aria-hidden="true">${escapeHtml(casa.simbolo || "✦")}</span>
          <div>
            <h3>${escapeHtml(casa.nombre)}</h3>
            <p>${escapeHtml(casa.lema || "")}</p>
          </div>
        </header>
        <div class="area-grid">
          ${casa.areas.map((area) => renderAreaCard(casa, area)).join("")}
        </div>
      </section>
    `).join("");

    $$(".area-card[aria-disabled='true']", dom.housesRoot).forEach((card) => {
      card.addEventListener("click", (event) => {
        event.preventDefault();
        showToast("WhatsApp por configurar", "Cambia el número en data/contactos.js antes de publicar.", "warning", 7000);
      });
    });
  }

  function renderAreaCard(casa, area) {
    const message = `Hola, llegué desde la página de Draconis. Quiero consultar con la Orden sobre ${area.nombre}, de ${casa.nombre}. Mi tema o desafío es: `;
    const url = whatsappUrl(CONTACTOS.whatsapp?.numero, message);
    return `
      <a class="area-card" href="${escapeAttr(url || "#")}" ${url ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"'} data-area="${escapeAttr(area.nombre)}">
        <span class="area-icon" aria-hidden="true">${escapeHtml(area.icono || "✦")}</span>
        <h4>${escapeHtml(area.nombre)}</h4>
        <div class="area-routes">${area.ramas.map(escapeHtml).join(" · ")}</div>
        <span class="area-cta">Consultar con la Orden</span>
      </a>
    `;
  }

  function renderStats() {
    dom.statsGrid.innerHTML = (CONFIG.estadisticas || []).map((item, index) => `
      <article class="stat-card reveal" data-stat-index="${index}">
        <strong class="stat-number" data-count="${Number(item.valor) || 0}" data-prefix="${escapeAttr(item.prefijo || "")}" data-suffix="${escapeAttr(item.sufijo || "")}">${escapeHtml(item.prefijo || "")}0${escapeHtml(item.sufijo || "")}</strong>
        <span class="stat-label">${escapeHtml(item.etiqueta || "")}</span>
      </article>
    `).join("");
  }

  function renderTestimonials() {
    if (!TESTIMONIOS.length) {
      dom.testimonialTrack.innerHTML = `<article class="testimonial-card"><div class="testimonial-meta"><span class="testimonial-label">Agrega testimonios en data/testimonios.js</span></div></article>`;
      return;
    }

    dom.testimonialTrack.innerHTML = TESTIMONIOS.map((item, index) => `
      <article class="testimonial-card" data-testimonial-index="${index}">
        <div class="testimonial-image-wrap"><img src="${escapeAttr(item.imagen)}" alt="${escapeAttr(item.alt || item.etiqueta || "Testimonio")}" loading="lazy"></div>
        <div class="testimonial-meta"><span class="stars" aria-label="${Number(item.estrellas) || 5} de 5 estrellas">${"★".repeat(Number(item.estrellas) || 5)}</span><span class="testimonial-label">${escapeHtml(item.etiqueta || `Testimonio ${index + 1}`)}</span></div>
      </article>
    `).join("");

    dom.testimonialDots.innerHTML = TESTIMONIOS.map((_, index) => `<span class="${index === 0 ? "active" : ""}" data-dot="${index}"></span>`).join("");

    const step = () => {
      const first = $(".testimonial-card", dom.testimonialTrack);
      return first ? first.getBoundingClientRect().width + 18 : 320;
    };

    dom.testimonialsPrev?.addEventListener("click", () => dom.testimonialTrack.scrollBy({ left: -step(), behavior: "smooth" }));
    dom.testimonialsNext?.addEventListener("click", () => dom.testimonialTrack.scrollBy({ left: step(), behavior: "smooth" }));
    dom.testimonialTrack.addEventListener("scroll", debounce(updateTestimonialDots, 80), { passive: true });
  }

  function updateTestimonialDots() {
    const cards = $$(".testimonial-card", dom.testimonialTrack);
    if (!cards.length) return;
    const trackLeft = dom.testimonialTrack.getBoundingClientRect().left;
    let nearest = 0;
    let nearestDistance = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (distance < nearestDistance) { nearestDistance = distance; nearest = index; }
    });
    state.testimonialIndex = nearest;
    $$('[data-dot]', dom.testimonialDots).forEach((dot, index) => dot.classList.toggle("active", index === nearest));
  }

  function renderVideos() {
    dom.videoGrid.innerHTML = VIDEOS.map((video) => {
      const url = safeUrl(video.url);
      const image = safeUrl(video.miniatura);
      const body = `
        <div class="video-preview">
          ${image ? `<img src="${escapeAttr(image)}" alt="" loading="lazy">` : ""}
          <span class="play-button" aria-hidden="true">▶</span>
        </div>
        <div class="video-body">
          <span class="video-platform">${escapeHtml(video.plataforma || "Video")}</span>
          <strong>${escapeHtml(video.titulo || "Contenido de Draconis")}</strong>
          ${url ? "" : '<div class="video-placeholder-note">Pega el enlace en data/videos.js</div>'}
        </div>`;
      return url
        ? `<a class="video-card reveal" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${body}</a>`
        : `<article class="video-card reveal">${body}</article>`;
    }).join("");
  }

  function setupQuoteForm() {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dom.quoteDate.min = localToday;

    dom.noBudgetLimit.addEventListener("change", () => {
      const checked = dom.noBudgetLimit.checked;
      dom.budgetInput.disabled = checked;
      if (checked) dom.budgetInput.value = "";
    });

    dom.quoteForm.addEventListener("submit", handleQuoteSubmit);
  }

  async function handleQuoteSubmit(event) {
    event.preventDefault();
    dom.formStatus.className = "form-status";
    dom.formStatus.textContent = "";

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (String(data.get("website") || "").trim()) return;

    if (Date.now() - state.formOpenedAt < 1200) {
      dom.formStatus.className = "form-status warning";
      dom.formStatus.textContent = "Espera un momento y vuelve a enviar.";
      return;
    }

    const payload = {
      nombre: clean(data.get("nombre"), 100),
      whatsapp: clean(data.get("whatsapp"), 30),
      correo: clean(data.get("correo"), 160),
      universidad: clean(data.get("universidad"), 160),
      nivel: clean(data.get("nivel"), 80),
      tipo_servicio: clean(data.get("tipo"), 100),
      casa: clean(data.get("casa"), 120),
      materia: clean(data.get("materia"), 160),
      modalidad: clean(data.get("modalidad"), 80),
      ubicacion: clean(data.get("ubicacion"), 160),
      fecha_requerida: clean(data.get("fecha"), 20),
      hora_requerida: clean(data.get("hora"), 20) || null,
      presupuesto: data.get("sin_limite") ? null : numberOrNull(data.get("presupuesto")),
      sin_limite_presupuesto: Boolean(data.get("sin_limite")),
      descripcion: clean(data.get("descripcion"), 3000),
      origen: "web-draconis",
      estado: "nueva",
    };

    if (!isWhatsappConfigured()) {
      showToast("Configura el WhatsApp", "Abre data/contactos.js y reemplaza el número de ejemplo antes de publicar.", "warning", 7000);
      dom.formStatus.className = "form-status warning";
      dom.formStatus.textContent = "El formulario está listo, pero falta configurar el número de WhatsApp en data/contactos.js.";
      return;
    }

    const message = buildQuoteMessage(payload);
    const waUrl = whatsappUrl(CONTACTOS.whatsapp.numero, message);
    const popup = window.open("about:blank", "_blank");

    setBusy(dom.quoteSubmit, true, "Preparando tu mensaje…");
    let saved = false;
    let saveError = null;

    try {
      const result = await saveQuoteToSupabase(payload);
      saved = result.saved;
      saveError = result.error;
    } catch (error) {
      saveError = error;
    }

    if (popup && !popup.closed) {
      popup.location.href = waUrl;
    } else {
      window.location.href = waUrl;
    }

    if (saved) {
      dom.formStatus.className = "form-status success";
      dom.formStatus.textContent = "Tu solicitud quedó registrada. Abrimos WhatsApp para que confirmes el mensaje con nuestro agente.";
      showToast("Tu desafío llegó al buzón", "La solicitud quedó guardada y WhatsApp está listo para enviar.", "success");
    } else if (supabaseConfigured()) {
      console.error("No se pudo guardar la cotización", saveError);
      dom.formStatus.className = "form-status warning";
      dom.formStatus.textContent = "No pudimos guardar el respaldo, pero WhatsApp se abrió con todos tus datos para que la solicitud no se pierda.";
      showToast("WhatsApp listo", "El respaldo web falló, pero puedes enviar tu solicitud por WhatsApp.", "warning", 7000);
    } else {
      dom.formStatus.className = "form-status success";
      dom.formStatus.textContent = "WhatsApp está listo. Para guardar también las solicitudes en el buzón, conecta Supabase en data/configuracion.js.";
      showToast("WhatsApp listo", "Tu mensaje está preparado. Solo falta tocar Enviar.", "success");
    }

    setBusy(dom.quoteSubmit, false, '<span>🔥</span> Enviar mi desafío');
  }

  async function saveQuoteToSupabase(payload) {
    if (!supabaseConfigured()) return { saved: false, skipped: true };

    const supabase = CONFIG.supabase;
    const endpoint = `${supabase.url.replace(/\/$/, "")}/rest/v1/${encodeURIComponent(supabase.tablaCotizaciones || "cotizaciones_web")}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabase.publishableKey,
        "Authorization": `Bearer ${supabase.publishableKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Supabase ${response.status}: ${text.slice(0, 300)}`);
    }
    return { saved: true };
  }

  function buildQuoteMessage(p) {
    const budget = p.sin_limite_presupuesto
      ? "Sin límite de presupuesto"
      : p.presupuesto !== null
        ? formatCOP(p.presupuesto)
        : "No indicado";

    return [
      "🐉 *NUEVA COTIZACIÓN · DRACONIS*",
      "",
      `👤 *Nombre:* ${p.nombre}`,
      `📱 *WhatsApp:* ${p.whatsapp}`,
      `📧 *Correo:* ${p.correo}`,
      `🏛️ *Universidad / institución:* ${p.universidad || "No indicada"}`,
      `🎓 *Nivel:* ${p.nivel}`,
      "",
      `⚔️ *Servicio:* ${p.tipo_servicio}`,
      `🏰 *Casa / área:* ${p.casa}`,
      `📚 *Materia / tema:* ${p.materia || "No indicado"}`,
      `🧭 *Modalidad:* ${p.modalidad || "Por definir"}`,
      `📍 *Ubicación:* ${p.ubicacion || "No aplica / no indicada"}`,
      `⏳ *Fecha requerida:* ${formatDateForMessage(p.fecha_requerida)}${p.hora_requerida ? ` · ${p.hora_requerida}` : ""}`,
      `💰 *Presupuesto:* ${budget}`,
      "",
      "📜 *DESAFÍO*",
      p.descripcion,
      "",
      "🔥 Enviado desde la página web de Draconis.",
    ].join("\n");
  }

  function setupReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("visible"));
      startCounters();
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
        if (entry.target.matches(".stat-card")) animateCounter($(".stat-number", entry.target));
      });
    }, { threshold: .12, rootMargin: "0px 0px -30px" });

    items.forEach((el) => observer.observe(el));
  }

  function startCounters() {
    $$(".stat-number").forEach(animateCounter);
  }

  function animateCounter(el) {
    if (!el || el.dataset.animated === "true") return;
    el.dataset.animated = "true";
    const target = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1150;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = `${prefix}${new Intl.NumberFormat("es-CO").format(value)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function setupEmbers() {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const count = window.innerWidth < 600 ? 10 : 18;
    dom.embers.innerHTML = Array.from({ length: count }, (_, i) => {
      const left = Math.round(Math.random() * 100);
      const dur = 7 + Math.random() * 8;
      const delay = -(Math.random() * dur);
      const drift = -55 + Math.random() * 110;
      const size = 2 + Math.random() * 4;
      return `<span class="ember" style="left:${left}%;--dur:${dur.toFixed(1)}s;--delay:${delay.toFixed(1)}s;--drift:${drift.toFixed(0)}px;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px"></span>`;
    }).join("");
  }

  function setupDragonBubble() {
    window.setTimeout(() => dom.dragonWhatsapp?.classList.add("show-message"), 1700);
    window.setTimeout(() => dom.dragonWhatsapp?.classList.remove("show-message"), 6500);
  }

  function setupSmoothAnchors() {
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = $(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function supabaseConfigured() {
    const s = CONFIG.supabase || {};
    return Boolean(
      safeUrl(s.url) &&
      String(s.publishableKey || "").trim().length > 20 &&
      String(s.tablaCotizaciones || "").trim()
    );
  }

  function isWhatsappConfigured() {
    const raw = String(CONTACTOS.whatsapp?.numero || "").replace(/\D/g, "");
    return raw.length >= 10 && raw !== "573000000000";
  }

  function whatsappUrl(phone, message) {
    const cleanPhone = String(phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone === "573000000000") return "";
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message || "")}`;
  }

  function setLink(element, url) {
    if (!element) return;
    if (url) {
      element.href = url;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      element.removeAttribute("aria-disabled");
      return;
    }
    element.href = "#";
    element.setAttribute("aria-disabled", "true");
    element.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("WhatsApp por configurar", "Cambia el número en data/contactos.js. El resto de la página no necesita modificarse.", "warning", 7000);
    });
  }

  function setBusy(button, busy, html) {
    if (!button) return;
    if (busy) {
      if (!button.dataset.originalHtml) button.dataset.originalHtml = button.innerHTML;
      button.disabled = true;
      button.textContent = html;
    } else {
      button.disabled = false;
      button.innerHTML = html || button.dataset.originalHtml || button.innerHTML;
      delete button.dataset.originalHtml;
    }
  }

  function showToast(title, message, type = "info", duration = 5000) {
    const toast = document.createElement("article");
    toast.className = `toast ${type}`;
    const icon = type === "success" ? "✓" : type === "warning" ? "🔥" : type === "error" ? "!" : "i";
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-copy"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></span>
      <button class="toast-close" type="button" aria-label="Cerrar">×</button>`;
    $(".toast-close", toast).addEventListener("click", () => toast.remove());
    dom.toastRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), duration);
  }

  function safeUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    try {
      const url = new URL(raw);
      return ["http:", "https:"].includes(url.protocol) ? url.href : "";
    } catch {
      return "";
    }
  }

  function formatCOP(value) {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(Number(value || 0));
  }

  function formatDateForMessage(iso) {
    if (!iso) return "No indicada";
    const [y, m, d] = iso.split("-");
    return y && m && d ? `${d}/${m}/${y}` : iso;
  }

  function clean(value, max = 500) {
    return String(value || "").trim().slice(0, max);
  }

  function numberOrNull(value) {
    const n = Number(value);
    return Number.isFinite(n) && n >= 0 ? n : null;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
    }[char]));
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }

  function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
})();
