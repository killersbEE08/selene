// Selene site — tiny progressive-enhancement helpers (no dependencies)
(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "\u2715" : "\u2630";
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "\u2630";
      }
    });
  }

  // Reveal-on-scroll
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealables.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  // Current year in footer
  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());

  // Scroll progress bar + nav elevation (rAF-batched, single passive listener)
  var bar = document.getElementById("scroll-progress");
  var nav = document.querySelector(".nav");
  var ticking = false;
  function updateScroll() {
    var h = document.documentElement;
    if (bar) {
      var scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.transform = "scaleX(" + Math.min(1, Math.max(0, scrolled)) + ")";
    }
    if (nav) nav.classList.toggle("scrolled", h.scrollTop > 12);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); }
  }, { passive: true });
  updateScroll();

  // FAQ accordion
  var qas = document.querySelectorAll(".qa");
  qas.forEach(function (qa) {
    var btn = qa.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var open = qa.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  // Count-up for hero stats
  var nums = document.querySelectorAll(".stat .n");
  if (nums.length && "IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var seen = new WeakSet();
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || seen.has(e.target)) return;
        seen.add(e.target);
        var el = e.target;
        var target = parseInt(el.textContent, 10) || 0;
        var start = null, dur = 1100;
        el.textContent = "0";
        function tick(t) {
          if (start === null) start = t;
          var p = Math.min(1, (t - start) / dur);
          el.textContent = String(Math.round(target * (0.5 - Math.cos(Math.PI * p) / 2)));
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = String(target);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (n) { cio.observe(n); });
  }
})();
