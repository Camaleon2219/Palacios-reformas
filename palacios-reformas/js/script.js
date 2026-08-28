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
     3. HEADER STICKY & SCROLLSPY
     ========================================================================== */
  const header = document.getElementById('header');
  const btnScrollTop = document.getElementById('btnScrollTop');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    if (!sections.length || !navLinks.length) return;
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

  function toggleMobileMenu() {
    const isOpen = mainNav?.classList.toggle('is-open');
    menuToggle?.classList.toggle('is-active');
    menuToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    if (mainNav?.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      menuToggle?.classList.remove('is-active');
      menuToggle?.setAttribute('aria-expanded', 'false');
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
        !menuToggle?.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     6. FILTROS DE GALERÍA DE PROYECTOS Y LIGHTBOX DINÁMICO
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentFilteredList = [];
  let currentLightboxIndex = 0;

  function getCardData(card) {
    const img = card.querySelector('.project-card__img');
    const title = card.querySelector('.project-card__title')?.textContent?.trim() || 'Proyecto de Reforma';
    const category = card.querySelector('.project-card__category')?.textContent?.trim() || 'Palacios Reformas';
    const src = img?.getAttribute('src') || '';
    return { src, title, category, element: card };
  }

  function applyFilter(filterValue) {
    // 1. Actualizar estado visual de los botones
    filterButtons.forEach(btn => {
      if (btn.getAttribute('data-filter') === filterValue) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    currentFilteredList = [];

    // 2. Filtrar tarjetas
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category') || '';
      const matches = (filterValue === 'all' || category.toLowerCase() === filterValue.toLowerCase());

      if (matches) {
        card.classList.remove('is-hidden');
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        currentFilteredList.push(getCardData(card));
      } else {
        card.classList.add('is-hidden');
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
      }
    });
  }

  // Event Listeners en los botones de filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const filterValue = button.getAttribute('data-filter') || 'all';
      applyFilter(filterValue);
    });
  });

  // Enlaces externos que apunten a un filtro específico (ej. desde servicios)
  document.querySelectorAll('[data-gallery-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetFilter = link.getAttribute('data-gallery-filter');
      if (targetFilter) {
        applyFilter(targetFilter);
      }
    });
  });

  /* ==========================================================================
     7. LIGHTBOX DE PROYECTOS (MODAL CON NAVEGACIÓN Y TECLADO)
     ========================================================================== */
  function openLightbox(index) {
    if (!currentFilteredList.length) {
      // Si la lista está vacía, recopilar todas las tarjetas visibles
      currentFilteredList = Array.from(projectCards)
        .filter(c => !c.classList.contains('is-hidden'))
        .map(getCardData);
    }

    if (index >= 0 && index < currentFilteredList.length) {
      currentLightboxIndex = index;
    } else {
      currentLightboxIndex = 0;
    }

    updateLightboxContent();
    if (lightbox) {
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  function updateLightboxContent() {
    const item = currentFilteredList[currentLightboxIndex];
    if (item && lightboxImg && lightboxTitle && lightboxCategory) {
      lightboxImg.setAttribute('src', item.src);
      lightboxImg.setAttribute('alt', item.title);
      lightboxTitle.textContent = item.title;
      lightboxCategory.textContent = item.category;
    }
  }

  function showNextProject() {
    if (!currentFilteredList.length) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredList.length;
    updateLightboxContent();
  }

  function showPrevProject() {
    if (!currentFilteredList.length) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
    updateLightboxContent();
  }

  // Click en tarjetas de proyecto para abrir el lightbox
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const activeCards = Array.from(projectCards).filter(c => !c.classList.contains('is-hidden'));
      const idx = activeCards.indexOf(card);
      openLightbox(idx >= 0 ? idx : 0);
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    showNextProject();
  });
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrevProject();
  });

  // Cerrar al hacer clic fuera del modal
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox__container')) {
      closeLightbox();
    }
  });

  // Teclado (ESC, Izquierda, Derecha)
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

  // Inicializar galería con 'all'
  applyFilter('all');

  /* ==========================================================================
     8. SLIDER INTERACTIVO ANTES Y DESPUÉS (POINTER EVENTS, TOUCH & MOUSE)
     ========================================================================== */
  const comparisonContainer = document.getElementById('comparisonContainer');
  const comparisonBefore = document.getElementById('comparisonBefore');
  const comparisonHandle = document.getElementById('comparisonHandle');
  const presetButtons = document.querySelectorAll('.comparison-preset-btn');

  if (comparisonContainer && comparisonBefore && comparisonHandle) {
    let isDragging = false;

    function setSliderPos(percentage) {
      const clamped = Math.max(0, Math.min(100, Number(percentage)));
      const polygonValue = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;

      comparisonBefore.style.clipPath = polygonValue;
      comparisonBefore.style.webkitClipPath = polygonValue;
      comparisonHandle.style.left = `${clamped}%`;

      presetButtons.forEach(btn => {
        const val = parseFloat(btn.getAttribute('data-value'));
        if (Math.abs(val - clamped) < 3) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    function getPercentFromClientX(clientX) {
      const rect = comparisonContainer.getBoundingClientRect();
      if (rect.width <= 0) return 50;
      const offsetX = clientX - rect.left;
      return (offsetX / rect.width) * 100;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      setSliderPos(getPercentFromClientX(clientX));
    }

    function onPointerDown(e) {
      isDragging = true;
      if (e.target && e.target.setPointerCapture && e.pointerId !== undefined) {
        try {
          e.target.setPointerCapture(e.pointerId);
        } catch (err) {}
      }
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      setSliderPos(getPercentFromClientX(clientX));
    }

    function onPointerUp(e) {
      if (isDragging) {
        isDragging = false;
        if (e.target && e.target.releasePointerCapture && e.pointerId !== undefined) {
          try {
            e.target.releasePointerCapture(e.pointerId);
          } catch (err) {}
        }
      }
    }

    // 1. Pointer Events (Modern Standard: Chrome, Edge, Safari iOS 13+, Firefox)
    comparisonContainer.addEventListener('pointerdown', onPointerDown);
    comparisonContainer.addEventListener('pointermove', onPointerMove);
    comparisonContainer.addEventListener('pointerup', onPointerUp);
    comparisonContainer.addEventListener('pointercancel', onPointerUp);
    window.addEventListener('pointerup', onPointerUp);

    // 2. Mouse Events (Desktop fallback)
    comparisonContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPos(getPercentFromClientX(e.clientX));
    });
    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        setSliderPos(getPercentFromClientX(e.clientX));
      }
    });
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // 3. Touch Events (Mobile fallback)
    comparisonContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches && e.touches[0]) {
        setSliderPos(getPercentFromClientX(e.touches[0].clientX));
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches && e.touches[0]) {
        setSliderPos(getPercentFromClientX(e.touches[0].clientX));
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
    window.addEventListener('touchcancel', () => {
      isDragging = false;
    });

    // Clic directo en cualquier parte de la imagen
    comparisonContainer.addEventListener('click', (e) => {
      setSliderPos(getPercentFromClientX(e.clientX));
    });

    // 4. Botones rápidos de preajuste (0% Antes, 50% Mitad, 100% Después)
    presetButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const targetVal = parseFloat(btn.getAttribute('data-value') || '50');
        setSliderPos(targetVal);
      });
    });

    // Inicializar al 50%
    setSliderPos(50);
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
