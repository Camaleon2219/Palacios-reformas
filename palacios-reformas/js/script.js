/**
 * ==========================================================================
 * PALACIOS REFORMAS - JAVASCRIPT PRINCIPAL (script.js)
 * Empresa de Reformas y Construcción en Bilbao y Bizkaia
 * ==========================================================================
 */

function initPalaciosApp() {
  'use strict';

  /* ==========================================================================
     1. DATOS EDITABLES DE LA EMPRESA (CONFIGURACIÓN CENTRALIZADA)
     Modifica aquí los datos reales de contacto de PALACIOS REFORMAS.
     ========================================================================== */
  const CONFIG = {
    NOMBRE_EMPRESA: "PALACIOS REFORMAS",
    SLOGAN: "Reformas y trabajos de construcción en Bilbao y Bizkaia",
    // Teléfono de contacto (formato visible y formato enlace tel:)
    TELEFONO_VISIBLE: "+34 600 123 456",
    TELEFONO_ENLACE: "+34600123456",
    // WhatsApp (número internacional sin espacios ni signos)
    WHATSAPP_NUMERO: "34600123456",
    WHATSAPP_MENSAJE: "Hola PALACIOS REFORMAS, me gustaría solicitar información y presupuesto sin compromiso para una reforma.",
    // Correo electrónico
    EMAIL: "palacios-gustavo@hotmail.de",
    // Dirección / Ubicación
    DIRECCION: "Bilbao y toda Bizkaia",
    // Redes Sociales
    INSTAGRAM_URL: "https://www.instagram.com",
    FACEBOOK_URL: "https://www.facebook.com",
    HORARIO: "Lunes a Viernes: 8:00 - 19:00",
    ZONA: "Bilbao y toda la provincia de Bizkaia"
  };

  // Exponer CONFIG en window para depuración o modificaciones externas
  window.PALACIOS_CONFIG = CONFIG;

  /* ==========================================================================
     2. APLICAR CONFIGURACIÓN A ELEMENTOS CON ATRIBUTO DATA-CONFIG
     ========================================================================== */
  function applyCompanyData() {
    // Año actual en copyright
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }

    // Enlaces de WhatsApp
    const whatsappLinks = document.querySelectorAll('[data-config="whatsapp-link"]');
    const waEncodedMsg = encodeURIComponent(CONFIG.WHATSAPP_MENSAJE);
    const waHref = CONFIG.WHATSAPP_NUMERO && !CONFIG.WHATSAPP_NUMERO.includes('[')
      ? `https://wa.me/${CONFIG.WHATSAPP_NUMERO}?text=${waEncodedMsg}`
      : `#contacto`;

    whatsappLinks.forEach(link => {
      link.setAttribute('href', waHref);
      if (waHref.startsWith('https://wa.me')) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });

    // Enlaces y textos de Teléfono
    const phoneLinks = document.querySelectorAll('[data-config="phone-link"]');
    phoneLinks.forEach(link => {
      link.setAttribute('href', `tel:${CONFIG.TELEFONO_ENLACE}`);
    });

    const phoneTexts = document.querySelectorAll('[data-config="phone-text"]');
    phoneTexts.forEach(el => {
      el.textContent = CONFIG.TELEFONO_VISIBLE;
    });

    // Enlaces y textos de Email
    const emailLinks = document.querySelectorAll('[data-config="email-link"]');
    emailLinks.forEach(link => {
      link.setAttribute('href', `mailto:${CONFIG.EMAIL}`);
    });

    const emailTexts = document.querySelectorAll('[data-config="email-text"]');
    emailTexts.forEach(el => {
      el.textContent = CONFIG.EMAIL;
    });

    // Textos de Dirección
    const addressTexts = document.querySelectorAll('[data-config="address-text"]');
    addressTexts.forEach(el => {
      el.textContent = CONFIG.DIRECCION;
    });

    // Redes Sociales
    const igLinks = document.querySelectorAll('[data-config="instagram-link"]');
    igLinks.forEach(link => {
      link.setAttribute('href', CONFIG.INSTAGRAM_URL);
    });

    const fbLinks = document.querySelectorAll('[data-config="facebook-link"]');
    fbLinks.forEach(link => {
      link.setAttribute('href', CONFIG.FACEBOOK_URL);
    });
  }

  applyCompanyData();

  /* ==========================================================================
     3. HEADER STICKY & CAMBIO DE APARIENCIA AL HACER SCROLL
     ========================================================================== */
  const header = document.getElementById('header');
  const btnScrollTop = document.getElementById('btnScrollTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Header fondo sólido / translúcido al hacer scroll
    if (scrollY > 50) {
      header?.classList.add('header--scrolled');
    } else {
      header?.classList.remove('header--scrolled');
    }

    // Botón volver arriba
    if (scrollY > 400) {
      btnScrollTop?.classList.add('is-visible');
    } else {
      btnScrollTop?.classList.remove('is-visible');
    }

    // ScrollSpy para resaltar el menú activo
    updateActiveNav();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Ejecutar en carga inicial

  // Evento botón volver arriba
  btnScrollTop?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ==========================================================================
     4. MENÚ MÓVIL (HAMBURGUESA)
     ========================================================================== */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav__link');

  function toggleMobileMenu() {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  menuToggle?.addEventListener('click', toggleMobileMenu);

  // Cerrar menú al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (mainNav?.classList.contains('is-open') &&
        !mainNav.contains(e.target) &&
        !menuToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     5. SCROLLSPY (DETECCIÓN DE SECCIÓN ACTIVA)
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  /* ==========================================================================
     6. FILTROS DE GALERÍA DE PROYECTOS
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Actualizar botón activo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     7. LIGHTBOX DE PROYECTOS (MODAL CON NAVEGACIÓN Y TECLADO)
     ========================================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentProjectIndex = 0;
  const projectData = [];

  // Recopilar datos de proyectos visibles
  projectCards.forEach((card, index) => {
    const img = card.querySelector('.project-card__img');
    const title = card.querySelector('.project-card__title')?.textContent || `Proyecto ${index + 1}`;
    const category = card.querySelector('.project-card__category')?.textContent || 'Reforma';
    const src = img?.getAttribute('src') || '';

    projectData.push({ src, title, category });

    card.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentProjectIndex = index;
    updateLightboxContent();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = projectData[currentProjectIndex];
    if (item) {
      lightboxImg.setAttribute('src', item.src);
      lightboxImg.setAttribute('alt', item.title);
      lightboxTitle.textContent = item.title;
      lightboxCategory.textContent = item.category;
    }
  }

  function showNextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % projectData.length;
    updateLightboxContent();
  }

  function showPrevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + projectData.length) % projectData.length;
    updateLightboxContent();
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextProject();
  });
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevProject();
  });

  // Cerrar al hacer clic fuera del contenido
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__container')) {
      closeLightbox();
    }
  });

  // Manejo de teclado (ESC, Izquierda, Derecha)
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextProject();
    } else if (e.key === 'ArrowLeft') {
      showPrevProject();
    }
  });

  /* ==========================================================================
     8. SLIDER INTERACTIVO ANTES Y DESPUÉS (MOUSE, TOUCH & RANGE INPUT)
     ========================================================================== */
  const comparisonContainer = document.getElementById('comparisonContainer');
  const comparisonBefore = document.getElementById('comparisonBefore');
  const comparisonHandle = document.getElementById('comparisonHandle');
  const comparisonRange = document.getElementById('comparisonRange');
  const presetButtons = document.querySelectorAll('.comparison-preset-btn');

  if (comparisonContainer && comparisonBefore && comparisonHandle) {
    let isDragging = false;

    function updateSlider(percentage, updateRangeInput = true) {
      // Clampear valor entre 0 y 100
      const clamped = Math.max(0, Math.min(100, Number(percentage)));
      const clipPolygon = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;

      comparisonBefore.style.clipPath = clipPolygon;
      comparisonBefore.style.webkitClipPath = clipPolygon;
      comparisonHandle.style.left = `${clamped}%`;

      if (updateRangeInput && comparisonRange) {
        comparisonRange.value = clamped;
      }

      // Actualizar botones de preajuste
      presetButtons.forEach(btn => {
        const val = parseFloat(btn.getAttribute('data-value'));
        if (Math.abs(val - clamped) < 2) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    function calculatePercentFromPointer(clientX) {
      const rect = comparisonContainer.getBoundingClientRect();
      if (rect.width <= 0) return 50;
      const offsetX = clientX - rect.left;
      return (offsetX / rect.width) * 100;
    }

    // 1. Control mediante input range (soporte nativo para accesibilidad y arrastre)
    if (comparisonRange) {
      comparisonRange.addEventListener('input', (e) => {
        updateSlider(parseFloat(e.target.value), false);
      });
      comparisonRange.addEventListener('change', (e) => {
        updateSlider(parseFloat(e.target.value), false);
      });
    }

    // 2. Control mediante Pointer Events (ratón, táctil, lápiz óptico)
    function onPointerDown(e) {
      isDragging = true;
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      updateSlider(calculatePercentFromPointer(clientX));
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      updateSlider(calculatePercentFromPointer(clientX));
    }

    function onPointerUp() {
      isDragging = false;
    }

    comparisonContainer.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    // Eventos táctiles
    comparisonContainer.addEventListener('touchstart', (e) => {
      onPointerDown(e);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging) {
        onPointerMove(e);
      }
    }, { passive: true });

    window.addEventListener('touchend', onPointerUp);
    window.addEventListener('touchcancel', onPointerUp);

    // Clic directo en cualquier parte del contenedor
    comparisonContainer.addEventListener('click', (e) => {
      updateSlider(calculatePercentFromPointer(e.clientX));
    });

    // 3. Botones rápidos de preajuste (0% Antes, 50% Mitad, 100% Después)
    presetButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetVal = parseFloat(btn.getAttribute('data-value') || '50');
        updateSlider(targetVal, true);
      });
    });

    // Inicializar al 50%
    updateSlider(50, true);
  }

  /* ==========================================================================
     9. ANIMACIONES DE ENTRADA CON INTERSECTION OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  // Asegurar visibilidad garantizada en todos los elementos
  revealElements.forEach(el => el.classList.add('is-visible'));

  if ('IntersectionObserver' in window) {
    document.body.classList.add('has-scroll-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.05,
      rootMargin: '60px'
    });

    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) {
        el.classList.add('is-visible');
      }
      revealObserver.observe(el);
    });
  }

  /* ==========================================================================
     10. FORMULARIO DE CONTACTO: VALIDACIÓN & GESTIÓN
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const formErrorAlert = document.getElementById('formErrorAlert');
  const fileInput = document.getElementById('fotoPresupuesto');
  const filePreview = document.getElementById('fileUploadPreview');

  // Mostrar nombre de archivo seleccionado
  fileInput?.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileNames = Array.from(files).map(f => f.name).join(', ');
      if (filePreview) {
        filePreview.textContent = `Archivos seleccionados: ${fileNames}`;
      }
    } else if (filePreview) {
      filePreview.textContent = '';
    }
  });

  // Validadores individuales
  function validateField(input, condition, errorMessage) {
    const group = input.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error') : null;

    if (!condition) {
      input.classList.add('is-invalid');
      if (group) group.classList.add('has-error');
      if (errorEl) errorEl.textContent = errorMessage;
      return false;
    } else {
      input.classList.remove('is-invalid');
      if (group) group.classList.remove('has-error');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const cleaned = String(phone).replace(/\s+/g, '').replace(/[-()+]/g, '');
    return cleaned.length >= 8;
  }

  // Validación al enviar el formulario
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre');
    const telefono = document.getElementById('telefono');
    const email = document.getElementById('email');
    const tipoReforma = document.getElementById('tipoReforma');
    const mensaje = document.getElementById('mensaje');

    let isValid = true;

    // 1. Validar Nombre
    if (!validateField(nombre, nombre.value.trim().length >= 2, 'Por favor, introduce tu nombre completo.')) {
      isValid = false;
    }

    // 2. Validar Teléfono
    if (!validateField(telefono, validatePhone(telefono.value.trim()), 'Por favor, introduce un teléfono de contacto válido.')) {
      isValid = false;
    }

    // 3. Validar Email
    if (!validateField(email, validateEmail(email.value.trim()), 'Por favor, introduce un correo electrónico válido.')) {
      isValid = false;
    }

    // 4. Validar Tipo de Reforma
    if (!validateField(tipoReforma, tipoReforma.value !== '', 'Por favor, selecciona el tipo de reforma.')) {
      isValid = false;
    }

    // 5. Validar Mensaje
    if (!validateField(mensaje, mensaje.value.trim().length >= 10, 'Por favor, cuéntanos brevemente sobre tu proyecto (mínimo 10 caracteres).')) {
      isValid = false;
    }

    if (!isValid) {
      if (formErrorAlert) {
        formErrorAlert.style.display = 'block';
        formErrorAlert.textContent = 'Por favor, revisa los campos marcados en rojo antes de enviar.';
      }
      if (formSuccessAlert) formSuccessAlert.style.display = 'none';
      return;
    }

    // ========================================================================
    // CONEXIÓN DEL FORMULARIO CON BACKEND O SERVICIO EXTERNO:
    //
    // Aquí es donde se conectará el envío real del formulario cuando se disponga
    // de una de las siguientes opciones:
    //
    // 1. FORMSPREE / GETFORM:
    //    fetch('https://formspree.io/f/TU_ID_AQUI', {
    //      method: 'POST',
    //      body: new FormData(contactForm),
    //      headers: { 'Accept': 'application/json' }
    //    })
    //
    // 2. EMAILJS:
    //    emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', contactForm, 'PUBLIC_KEY')
    //
    // 3. BACKEND PROPIO (PHP / Node.js / Express / Firebase Functions):
    //    fetch('/api/contact', {
    //      method: 'POST',
    //      headers: { 'Content-Type': 'application/json' },
    //      body: JSON.stringify(formData)
    //    })
    // ========================================================================

    const formData = {
      nombre: nombre.value.trim(),
      telefono: telefono.value.trim(),
      email: email.value.trim(),
      localidad: document.getElementById('localidad')?.value.trim() || 'No especificada',
      tipoReforma: tipoReforma.value,
      mensaje: mensaje.value.trim(),
      fecha: new Date().toISOString()
    };

    console.log('✅ Datos listos para enviar a PALACIOS REFORMAS:', formData);

    // Feedback visual de éxito
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando solicitud...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      if (formErrorAlert) formErrorAlert.style.display = 'none';
      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
        formSuccessAlert.innerHTML = `
          <strong>¡Solicitud recibida con éxito!</strong><br>
          Gracias <strong>${formData.nombre}</strong>. Nos pondremos en contacto contigo en breve para valorar tu proyecto de <em>${formData.tipoReforma}</em> en ${formData.localidad}.
        `;
      }

      contactForm.reset();
      if (filePreview) filePreview.textContent = '';
      
      // Desplazarse suavemente hasta el mensaje
      formSuccessAlert?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 900);
  });

  // Limpiar estados de error al escribir en los inputs
  const inputs = contactForm?.querySelectorAll('.form-control');
  inputs?.forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const group = input.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });
  });
}

// Iniciar inmediatamente o cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPalaciosApp);
} else {
  initPalaciosApp();
}
