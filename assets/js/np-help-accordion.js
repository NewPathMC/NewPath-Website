// Öffnet verlinkte Akkordeons auf der Modpack-Hilfe automatisch.
// Beispiel: /modpack-hilfe/#whitelist-zugang
(function () {
  function getHeaderOffset() {
    var header = document.querySelector(".site-header, .np-site-header, header");
    var headerHeight = header ? header.getBoundingClientRect().height : 0;
    return Math.max(72, Math.round(headerHeight + 24));
  }

  function openDetailsFromHash(shouldScroll) {
    if (!window.location.hash || window.location.hash.length < 2) {
      return;
    }

    var targetId = decodeURIComponent(window.location.hash.slice(1));
    var target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    var details = target.tagName && target.tagName.toLowerCase() === "details"
      ? target
      : target.closest("details");

    if (details) {
      details.open = true;
    }

    if (shouldScroll) {
      window.setTimeout(function () {
        var y = target.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
        window.scrollTo({
          top: Math.max(0, y),
          behavior: "smooth"
        });
      }, 80);
    }
  }

  window.addEventListener("DOMContentLoaded", function () {
    openDetailsFromHash(true);
  });

  window.addEventListener("hashchange", function () {
    openDetailsFromHash(true);
  });
})();
