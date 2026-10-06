(function () {
  'use strict';

  var root = document.documentElement;
  var header = document.querySelector('[data-header]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var motion = !!(window.gsap && window.ScrollTrigger) && !reduceMotion && !touch && !saveData && window.innerWidth >= 801;

  requestAnimationFrame(function () { root.classList.add('is-ready'); });

  function updateHeader() { header.classList.toggle('is-solid', window.scrollY > 48); }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (!motion) return;

  gsap.registerPlugin(ScrollTrigger);

  // Each pinned chapter stays short so scrolling remains responsive.
  var hero = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=75%', scrub: 0.15, pin: '[data-hero-scene]', anticipatePin: 1 }
  });
  hero.to('.hero__image', { scale: 1.16, xPercent: -2, ease: 'none', duration: 1 }, 0)
    .to('.hero__wash', { opacity: 0.18, ease: 'none', duration: 1 }, 0)
    .to('.hero__content', { yPercent: -12, opacity: 0, ease: 'none', duration: 0.48 }, 0.16)
    .to('.hero__bottom', { opacity: 0, ease: 'none', duration: 0.3 }, 0.2);

  gsap.from('.manifesto h2', {
    y: 70, opacity: 0, duration: 1, ease: 'power2.out',
    scrollTrigger: { trigger: '.manifesto', start: 'top 72%', once: true }
  });
  gsap.from('.manifesto p:not(.eyebrow)', {
    y: 35, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power2.out',
    scrollTrigger: { trigger: '.manifesto', start: 'top 72%', once: true }
  });

  var productReveal = gsap.timeline({
    scrollTrigger: { trigger: '.reveal', start: 'top top', end: '+=75%', scrub: 0.15, pin: '[data-reveal-scene]', anticipatePin: 1 }
  });
  productReveal.fromTo('.reveal__media', { scale: 0.76, rotation: -8 }, { scale: 1.08, rotation: 0, ease: 'none', duration: 1 }, 0)
    .fromTo('.reveal__orbit--one', { rotation: -25 }, { rotation: 45, ease: 'none', duration: 1 }, 0)
    .fromTo('.reveal__orbit--two', { rotation: 25 }, { rotation: -35, ease: 'none', duration: 1 }, 0)
    .to('.reveal__copy', { yPercent: -8, opacity: 0.45, ease: 'none', duration: 0.6 }, 0.45);

  gsap.from('.step', {
    y: 65, opacity: 0, duration: 0.8, stagger: 0.13, ease: 'power2.out',
    scrollTrigger: { trigger: '.steps__grid', start: 'top 78%', once: true }
  });

  gsap.fromTo('.editorial__image-wrap img', { yPercent: -5 }, {
    yPercent: 5, ease: 'none',
    scrollTrigger: { trigger: '.editorial', start: 'top bottom', end: 'bottom top', scrub: 0.2 }
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); }, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
