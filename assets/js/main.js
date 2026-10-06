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

  root.classList.add('motion-on');
  gsap.registerPlugin(ScrollTrigger);

  // Full-screen chapters use transforms and opacity while native scrolling stays in control.
  var hero = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=80%', scrub: 0.12, pin: '[data-hero-scene]', anticipatePin: 1 }
  });
  hero.to('.hero__portrait', { scale: 1.38, yPercent: -4, borderRadius: '16%', ease: 'none', duration: 1 }, 0)
    .to('.hero__halo', { scale: 1.25, rotation: 12, ease: 'none', duration: 1 }, 0)
    .to('.hero__type', { yPercent: -28, opacity: 0, ease: 'none', duration: 0.65 }, 0.18)
    .to('.hero__topline, .hero__scroll', { opacity: 0, ease: 'none', duration: 0.3 }, 0.2);

  gsap.timeline({
    scrollTrigger: { trigger: '.manifesto', start: 'top top', end: '+=55%', scrub: 0.12, pin: '[data-manifesto-scene]', anticipatePin: 1 }
  }).fromTo('.manifesto h2', { scale: 0.88, yPercent: 18, opacity: 0.25 }, { scale: 1, yPercent: 0, opacity: 1, ease: 'none', duration: 1 }, 0)
    .fromTo('.manifesto__mark', { rotation: -45, scale: 0.7 }, { rotation: 35, scale: 1.2, ease: 'none', duration: 1 }, 0)
    .fromTo('.manifesto p:not(.eyebrow)', { y: 45, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', duration: 0.6 }, 0.4);

  var productReveal = gsap.timeline({
    scrollTrigger: { trigger: '.reveal', start: 'top top', end: '+=75%', scrub: 0.12, pin: '[data-reveal-scene]', anticipatePin: 1 }
  });
  productReveal.fromTo('.reveal__media', { scale: 0.76, rotation: -8 }, { scale: 1.08, rotation: 0, ease: 'none', duration: 1 }, 0)
    .fromTo('.reveal__orbit--one', { rotation: -25 }, { rotation: 45, ease: 'none', duration: 1 }, 0)
    .fromTo('.reveal__orbit--two', { rotation: 25 }, { rotation: -35, ease: 'none', duration: 1 }, 0)
    .to('.reveal__copy', { yPercent: -8, opacity: 0.45, ease: 'none', duration: 0.6 }, 0.45);

  var slides = gsap.utils.toArray('.sequence__slide');
  var sequence = gsap.timeline({
    scrollTrigger: { trigger: '.sequence', start: 'top top', end: '+=220%', scrub: 0.12, pin: '[data-sequence-scene]', anticipatePin: 1 }
  });
  sequence.to('.sequence__visual', { scale: 1.12, rotation: 10, ease: 'none', duration: 3 }, 0)
    .to('.sequence__ring', { scale: 1.22, rotation: 50, ease: 'none', duration: 3 }, 0)
    .to('.sequence__progress i', { backgroundPosition: '0% 0', ease: 'none', duration: 3 }, 0)
    .to(slides[0], { autoAlpha: 0, y: -30, duration: 0.28 }, 0.78)
    .fromTo(slides[1], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 1.04)
    .to(slides[1], { autoAlpha: 0, y: -30, duration: 0.28 }, 1.78)
    .fromTo(slides[2], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 2.04);

  gsap.fromTo('.editorial__image-wrap img', { yPercent: -5 }, {
    yPercent: 5, ease: 'none',
    scrollTrigger: { trigger: '.editorial', start: 'top bottom', end: 'bottom top', scrub: 0.2 }
  });

  gsap.from('.product__visual', {
    scale: 0.9, opacity: 0, duration: 0.9, ease: 'power2.out',
    scrollTrigger: { trigger: '.product', start: 'top 72%', once: true }
  });

  gsap.timeline({
    scrollTrigger: { trigger: '.closing', start: 'top top', end: '+=60%', scrub: 0.12, pin: '.closing__inner', anticipatePin: 1 }
  }).fromTo('.closing h2', { scale: 0.82, yPercent: 25 }, { scale: 1, yPercent: 0, ease: 'none', duration: 1 }, 0)
    .fromTo('.closing__flower', { rotation: -40, scale: 0.8 }, { rotation: 40, scale: 1.25, ease: 'none', duration: 1 }, 0);

  window.addEventListener('load', function () { ScrollTrigger.refresh(); }, { once: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
})();
