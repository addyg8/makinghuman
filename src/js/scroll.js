// ── Parallax ──────────────────────────────────────────────
// Hero painting drifts up slower than the page as you scroll
const parallaxEl = document.querySelector('[data-parallax]');
if (parallaxEl) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxEl.style.transform = `translateY(${y * 0.22}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ── Fade-in on scroll ─────────────────────────────────────
// Paragraphs and other elements gently fade up into view
const fadeEls = document.querySelectorAll('.post-body p, .post-body blockquote, .post-body figure, .post-body h2, .post-body h3');
if (fadeEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.03, 0.15)}s`;
    observer.observe(el);
  });
}

// ── Scene-break image parallax ────────────────────────────
// Full-bleed section images scroll at a slower rate
document.querySelectorAll('.scene-img').forEach((img) => {
  let ticking = false;
  const update = () => {
    const rect = img.closest('.scene').getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      const offset = (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.15;
      img.style.transform = `translateY(${offset}px)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  });
});
