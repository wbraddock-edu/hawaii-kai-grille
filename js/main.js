
/* ============================================
   KAI GRILLE — Main JavaScript
   ============================================ */

// Dark Mode
(function() {
  const saved = window._themeState || 'light' || 'light';
  document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
  // ---- Dark Mode Toggle ----
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    const updateIcon = () => {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.innerHTML = dark
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    };
    updateIcon();
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      window._themeState = next;
      updateIcon();
    });
  }

  // ---- Sticky Header ----
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // ---- Mobile Nav ----
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll Animations ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ---- Back to Top ----
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Booking Multi-Step ----
  let currentStep = 1;
  const stepPanels = document.querySelectorAll('.step-panel');
  const stepIndicators = document.querySelectorAll('.step-indicator');
  const updateSteps = () => {
    stepPanels.forEach((p, i) => p.classList.toggle('active', i + 1 === currentStep));
    stepIndicators.forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i + 1 === currentStep) s.classList.add('active');
      if (i + 1 < currentStep) s.classList.add('done');
    });
  };
  document.querySelectorAll('[data-next-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < stepPanels.length) { currentStep++; updateSteps(); window.scrollTo({top:0,behavior:'smooth'}); }
    });
  });
  document.querySelectorAll('[data-prev-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) { currentStep--; updateSteps(); }
    });
  });

  // ---- Service Option Selection ----
  document.querySelectorAll('.service-option').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.closest('.service-options').querySelectorAll('.service-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // ---- Time Slot Selection ----
  document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
    slot.addEventListener('click', () => {
      slot.closest('.time-slots').querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
    });
  });

  // ---- Admin Login ----
  const adminLoginForm = document.getElementById('adminLoginForm');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', e => {
      e.preventDefault();
      const pw = document.getElementById('adminPassword').value;
      if (pw === 'admin123') {
        document.querySelector('.admin-login').style.display = 'none';
        document.querySelector('.admin-panel').style.display = 'block';
      } else {
        document.getElementById('adminError').textContent = 'Incorrect password. Try admin123.';
      }
    });
  }

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});
