/* ============================================================
   Semantic JS — Minimal Theme Switcher
   ============================================================
   Handles [data-theme-switcher] links:
     - "light" / "dark" → sets <html data-theme="...">
     - "auto" → removes data-theme, lets CSS prefers-color-scheme decide
   Persists choice in localStorage ("semantic-theme").
   Highlights active link with aria-current="true".
   ============================================================ */

(function () {
  "use strict";

  var STORAGE_KEY = "semantic-theme";
  var html = document.documentElement;

  /* Apply a theme and persist it */
  function applyTheme(theme) {
    if (theme === "auto") {
      html.removeAttribute("data-theme");
    } else {
      html.setAttribute("data-theme", theme);
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      /* localStorage may be unavailable (private browsing, etc.) */
    }
    updateActiveLink(theme);
  }

  /* Highlight the active theme link */
  function updateActiveLink(activeTheme) {
    var links = document.querySelectorAll("[data-theme-switcher]");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.getAttribute("data-theme-switcher") === activeTheme) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  }

  /* Attach click handlers to all theme switcher links */
  function initSwitchers() {
    var links = document.querySelectorAll("[data-theme-switcher]");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (e) {
        e.preventDefault();
        var theme = this.getAttribute("data-theme-switcher");
        applyTheme(theme);
      });
    }
  }

  /* On load: restore saved theme or default to "auto" */
  function init() {
    var saved;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      saved = null;
    }
    applyTheme(saved || "auto");
    initSwitchers();
  }

  /* Run when DOM is ready */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
