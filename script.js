(function () {
  /* Quiet entrance: each block rises into place once, staggered within its parent */
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  items.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList.contains('reveal');
    });
    el.style.setProperty('--index', siblings.indexOf(el));
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* Keyboard shortcut for the footer hint: E opens a new email */
  document.addEventListener('keydown', function (e) {
    if (e.key.toLowerCase() !== 'e' || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(input|textarea|select)$/i.test(t.tagName))) return;
    window.location.href = 'mailto:hello@jamiereyes.dev';
  });
})();