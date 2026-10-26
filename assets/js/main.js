/* ============================================================
   ITR INTEGRATED TECHNOLOGIES — MAIN SCRIPT
   Handles: footer year, scroll reveal, contact form mailto,
   newsletter form, back-to-top, nav shrink, smooth anchors,
   active nav highlighting.
   ============================================================ */

(() => {
  'use strict';

  /* ---------- 1. FOOTER YEAR ---------- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- 2. SCROLL REVEAL ---------- */
  const revealItems = document.querySelectorAll(
    '.solution-card, .value-item, .approach-step, .capability-row, ' +
    '.principle-card, .industry-card, .why-card, .testimonial-card, ' +
    '.insight-card, .scenario-card, .sector-card, .engage-card, ' +
    '.info-block, .quick-contact-card, .capability-pill, .stat-card'
  );

  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    revealItems.forEach((item) => item.classList.add('reveal-ready'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  /* ---------- 3. CONTACT FORM (mailto: handler) ---------- */
  const form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const status = document.getElementById('formStatus');
      const data = new FormData(form);
      const fields = {
        name: String(data.get('name') || '').trim(),
        company: String(data.get('company') || '').trim(),
        email: String(data.get('email') || '').trim(),
        phone: String(data.get('phone') || '').trim(),
        service: String(data.get('service') || '').trim(),
        message: String(data.get('message') || '').trim()
      };

      const subject = encodeURIComponent(
        `Website enquiry: ${fields.service}`
      );
      const body = encodeURIComponent(
        `Hello ITR team,\n\n` +
        `I would like to make an enquiry.\n\n` +
        `Name: ${fields.name}\n` +
        `Organisation: ${fields.company || 'Not provided'}\n` +
        `Email: ${fields.email}\n` +
        `Phone: ${fields.phone || 'Not provided'}\n` +
        `Capability: ${fields.service}\n\n` +
        `Message:\n${fields.message}\n\n` +
        `Sent from the ITR Integrated Technologies website.`
      );

      if (status) {
        status.textContent =
          'Your email application should open with the enquiry prepared. ' +
          'Please review and send it to complete the submission.';
      }

      window.location.href = `mailto:itrintegrated@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- 4. NEWSLETTER FORM (home page) ---------- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const note = newsletterForm.parentElement.querySelector('.newsletter-note');

      if (!emailInput || !emailInput.value.trim()) return;

      if (note) {
        note.textContent =
          'Thank you — your email has been noted. ' +
          'Connect this form to your mailing list provider to activate.';
        note.style.color = '#55e3df';
      }

      emailInput.value = '';
    });
  }

  /* ---------- 5. NAVBAR SHRINK ON SCROLL ---------- */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('nav-scrolled');
      } else {
        nav.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 6. SMOOTH SCROLL FOR IN-PAGE ANCHORS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navHeight = nav ? nav.offsetHeight : 0;
      const top =
        targetEl.getBoundingClientRect().top +
        window.scrollY -
        navHeight -
        16;

      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile menu if open
      const collapse = document.getElementById('mainNav');
      if (collapse && collapse.classList.contains('show')) {
        const toggler = document.querySelector('.navbar-toggler');
        if (toggler) toggler.click();
      }
    });
  });

  /* ---------- 7. ACTIVE NAV LINK HIGHLIGHTING ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav .nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else if (
      href === 'index.html' &&
      (currentPage === '' || currentPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });

  /* ---------- 8. BACK-TO-TOP BUTTON ---------- */
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'back-to-top';
  backBtn.setAttribute('aria-label', 'Back to top');
  backBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  document.body.appendChild(backBtn);

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const toggleBackBtn = () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('is-visible');
    } else {
      backBtn.classList.remove('is-visible');
    }
  };
  window.addEventListener('scroll', toggleBackBtn, { passive: true });
  toggleBackBtn();

  /* ---------- 9. EXTERNAL LINKS — SAFETY ---------- */
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });

})();