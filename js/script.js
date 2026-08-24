/**
 * Liftline - Exact Interactive Motion Controller
 * Standalone JavaScript implementing Webflow IX2 interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Smart Sticky Header (Directional Hide / Show with Glass Effect)
  // ==========================================
  const navbar = document.querySelector('[data-header]');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    // Glass background effect on scroll
    if (currentScrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    // Directional hide/show
    if (currentScrollY > 180) {
      if (currentScrollY > lastScrollY + 6) {
        // Scrolling Down -> Hide
        navbar.classList.add('nav-hidden');
      } else if (currentScrollY < lastScrollY - 6) {
        // Scrolling Up -> Show
        navbar.classList.remove('nav-hidden');
      }
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = Math.max(0, currentScrollY);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();

  // ==========================================
  // 2. Mobile Menu Controller
  // ==========================================
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 880 && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open menu');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================
  // 3. Exact Webflow Motion Reveal Engine (IntersectionObserver)
  // ==========================================
  const revealSelectors = [
    '.reveal-slide-bottom',
    '.reveal-slide-top',
    '.reveal-slide-left',
    '.reveal-slide-right',
    '.reveal-flip-left'
  ].join(',');

  const revealElements = document.querySelectorAll(revealSelectors);

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.01,
    rootMargin: '120px 0px 50px 0px'
  });

  revealElements.forEach((el) => {
    // If element is already in or near viewport, mark visible immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('visible');
    } else {
      revealObserver.observe(el);
    }
  });

  // Trigger hero elements on page load
  setTimeout(() => {
    document.querySelectorAll('#section-hero [class*="reveal-"]').forEach((el) => {
      el.classList.add('visible');
    });
  }, 50);

  // ==========================================
  // 4. Interactive Expandable Class Cards
  // ==========================================
  const classCards = document.querySelectorAll('[data-class-card]');
  classCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      classCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });

    card.addEventListener('click', () => {
      classCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // ==========================================
  // 5. Trainers Sticky Scroll Continuous Animation (Meet -> Our -> Trainers)
  // Webflow a-66 Implementation
  // ==========================================
  const trainerWrapper = document.querySelector('[data-trainer-wrapper]');
  const h1 = document.querySelector('[data-trainer-h1]'); // "Meet"
  const h2 = document.querySelector('[data-trainer-h2]'); // "Our"
  const h3 = document.querySelector('[data-trainer-h3]'); // "Trainers"
  const trainerCards = document.querySelectorAll('[data-trainer-card]');

  function updateTrainerScroll() {
    if (!trainerWrapper || !h1 || !h2 || !h3) return;

    const rect = trainerWrapper.getBoundingClientRect();
    const totalScroll = trainerWrapper.offsetHeight - window.innerHeight;
    if (totalScroll <= 0) return;

    // Normalized progress through the trainer section [0.0 to 1.0]
    const progress = Math.min(Math.max(-rect.top / totalScroll, 0), 1);

    // 1. "Meet" (0.0 to 0.32)
    if (progress < 0.12) {
      const p = progress / 0.12;
      h1.style.opacity = String(p);
      h1.style.transform = `scale(${0.7 + p * 0.3})`;
      h1.style.filter = `blur(${(1 - p) * 16}px)`;
    } else if (progress < 0.28) {
      const p = (progress - 0.12) / 0.16;
      h1.style.opacity = String(1 - p);
      h1.style.transform = `scale(${1 + p * 0.8})`;
      h1.style.filter = `blur(${p * 22}px)`;
    } else {
      h1.style.opacity = '0';
      h1.style.transform = 'scale(1.8)';
      h1.style.filter = 'blur(22px)';
    }

    // 2. "Our" (0.28 to 0.58)
    if (progress >= 0.28 && progress < 0.42) {
      const p = (progress - 0.28) / 0.14;
      h2.style.opacity = String(p);
      h2.style.transform = `scale(${0.7 + p * 0.3})`;
      h2.style.filter = `blur(${(1 - p) * 16}px)`;
    } else if (progress >= 0.42 && progress < 0.58) {
      const p = (progress - 0.42) / 0.16;
      h2.style.opacity = String(1 - p);
      h2.style.transform = `scale(${1 + p * 0.8})`;
      h2.style.filter = `blur(${p * 22}px)`;
    } else {
      h2.style.opacity = '0';
      h2.style.transform = progress < 0.28 ? 'scale(0.6)' : 'scale(1.8)';
      h2.style.filter = 'blur(22px)';
    }

    // 3. "Trainers" (0.58 to 1.0)
    if (progress >= 0.58 && progress < 0.72) {
      const p = (progress - 0.58) / 0.14;
      h3.style.opacity = String(p);
      h3.style.transform = `scale(${0.7 + p * 0.3})`;
      h3.style.filter = `blur(${(1 - p) * 16}px)`;
    } else if (progress >= 0.72) {
      h3.style.opacity = '1';
      h3.style.transform = 'scale(1)';
      h3.style.filter = 'blur(0px)';
    } else {
      h3.style.opacity = '0';
      h3.style.transform = 'scale(0.6)';
      h3.style.filter = 'blur(22px)';
    }

    // 4. Floating Cards Staggered Appearance (0.64 to 1.0)
    if (progress >= 0.64) {
      trainerCards.forEach((card, idx) => {
        const threshold = 0.64 + idx * 0.08;
        if (progress >= threshold) {
          card.classList.add('visible');
        } else {
          card.classList.remove('visible');
        }
      });
    } else {
      trainerCards.forEach((card) => card.classList.remove('visible'));
    }
  }

  window.addEventListener('scroll', updateTrainerScroll, { passive: true });
  updateTrainerScroll();

  // ==========================================
  // 5. Transformation Stories Auto-Scrolling Feedback Controller
  // ==========================================
  const testiTrack = document.querySelector('[data-testi-track]');
  const testiPrevBtn = document.querySelector('[data-testi-prev]');
  const testiNextBtn = document.querySelector('[data-testi-next]');

  if (testiTrack) {
    let autoScrollInterval = null;
    let isInteracting = false;

    function getScrollStep() {
      const firstCard = testiTrack.querySelector('.testi-card');
      return firstCard ? firstCard.offsetWidth + 24 : 320;
    }

    function scrollTestiNext() {
      const maxScroll = testiTrack.scrollWidth - testiTrack.clientWidth;
      if (testiTrack.scrollLeft >= maxScroll - 15) {
        testiTrack.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        testiTrack.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      }
    }

    function scrollTestiPrev() {
      if (testiTrack.scrollLeft <= 15) {
        testiTrack.scrollTo({ left: testiTrack.scrollWidth, behavior: 'smooth' });
      } else {
        testiTrack.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      }
    }

    function startTestiAutoScroll() {
      stopTestiAutoScroll();
      autoScrollInterval = setInterval(() => {
        if (!isInteracting) {
          scrollTestiNext();
        }
      }, 3500);
    }

    function stopTestiAutoScroll() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }

    if (testiNextBtn) {
      testiNextBtn.addEventListener('click', () => {
        scrollTestiNext();
        stopTestiAutoScroll();
        startTestiAutoScroll();
      });
    }

    if (testiPrevBtn) {
      testiPrevBtn.addEventListener('click', () => {
        scrollTestiPrev();
        stopTestiAutoScroll();
        startTestiAutoScroll();
      });
    }

    testiTrack.addEventListener('mouseenter', () => { isInteracting = true; });
    testiTrack.addEventListener('mouseleave', () => { isInteracting = false; });
    testiTrack.addEventListener('touchstart', () => { isInteracting = true; }, { passive: true });
    testiTrack.addEventListener('touchend', () => {
      setTimeout(() => { isInteracting = false; }, 2000);
    });

    startTestiAutoScroll();
  }

  // ==========================================
  // 6. Contact Form Submission Handler
  // ==========================================
  const form = document.querySelector('[data-contact-form]');
  const status = document.querySelector('[data-form-status]');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'form-status';
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      status.textContent = 'Sending enquiry...';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          form.reset();
          status.textContent = 'Thank you! We will get in touch shortly.';
          status.classList.add('success');
        } else {
          throw new Error('Submission error');
        }
      } catch (err) {
        status.textContent = 'Note: Set your Formspree ID or email us directly.';
        status.classList.add('error');
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // ==========================================
  // 7. Trainer Centered Pop-up Modal Controller (Opens in center, closes on outer black space)
  // ==========================================
  const modalBackdrop = document.getElementById('trainer-modal-backdrop');
  const modalClose = document.getElementById('trainer-modal-close');
  const modalImg = document.getElementById('modal-trainer-image');
  const modalName = document.getElementById('modal-trainer-name');
  const modalRole = document.getElementById('modal-trainer-role');
  const modalCert = document.getElementById('modal-trainer-cert');
  const modalExp = document.getElementById('modal-trainer-exp');
  const modalTags = document.getElementById('modal-trainer-tags');
  const modalBio = document.getElementById('modal-trainer-bio');
  const modalIg = document.getElementById('modal-trainer-ig');
  const modalTt = document.getElementById('modal-trainer-tt');
  const modalBookCta = document.getElementById('modal-book-cta');

  function openTrainerModal(card) {
    if (!modalBackdrop || !card) return;

    const name = card.getAttribute('data-trainer-name') || '';
    const role = card.getAttribute('data-trainer-role') || '';
    const image = card.getAttribute('data-trainer-image') || '';
    const exp = card.getAttribute('data-trainer-exp') || '';
    const cert = card.getAttribute('data-trainer-cert') || '';
    const bio = card.getAttribute('data-trainer-bio') || '';
    const ig = card.getAttribute('data-trainer-ig') || '#';
    const tt = card.getAttribute('data-trainer-tt') || '#';
    let specialties = [];
    try {
      specialties = JSON.parse(card.getAttribute('data-trainer-specialties') || '[]');
    } catch (e) {
      specialties = [];
    }

    if (modalImg) {
      modalImg.src = image;
      modalImg.alt = name;
    }
    if (modalName) modalName.textContent = name;
    if (modalRole) modalRole.textContent = role;
    if (modalCert) modalCert.textContent = cert;
    if (modalExp) modalExp.textContent = exp;
    if (modalBio) modalBio.textContent = bio;
    if (modalIg) modalIg.href = ig;
    if (modalTt) modalTt.href = tt;

    if (modalTags) {
      modalTags.innerHTML = '';
      specialties.forEach((spec) => {
        const tag = document.createElement('span');
        tag.className = 'trainer-tag';
        tag.textContent = spec;
        modalTags.appendChild(tag);
      });
    }

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeTrainerModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  trainerCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      openTrainerModal(card);
      e.stopPropagation();
    });
  });

  // Close when clicking the outer black space (the backdrop itself)
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeTrainerModal();
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeTrainerModal);
  }

  if (modalBookCta) {
    modalBookCta.addEventListener('click', closeTrainerModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeTrainerModal();
    }
  });
});

