document.addEventListener("DOMContentLoaded", function () {
  const isRulePage = document.body.classList.contains("np-page-rules") ||
    window.location.pathname.endsWith("/regelwerk/") ||
    window.location.pathname.endsWith("/regelwerk");

  if (!isRulePage) {
    return;
  }

  const scriptElement = document.currentScript || document.querySelector('script[src*="np-rule-changes.js"]');
  const scriptSrc = scriptElement ? scriptElement.getAttribute("src") || "" : "";
  const baseUrl = scriptSrc.includes("assets/js/np-rule-changes.js")
    ? scriptSrc.split("assets/js/np-rule-changes.js")[0]
    : "/";

  function normalizeText(value) {
    return (value || "")
      .replace(/\s+/g, " ")
      .replace(/\u00a0/g, " ")
      .trim()
      .toLowerCase();
  }

  function formatDate(value) {
    if (!value) {
      return "";
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleString("de-DE", {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function hasChanges(data) {
    return Boolean(
      (data.added && data.added.length) ||
      (data.edited && data.edited.length) ||
      (data.removed && data.removed.length)
    );
  }

  function markInlineChanges(data) {
    const candidates = Array.from(document.querySelectorAll(
      ".np-rules-section .np-rule-block li, .np-rules-section .np-rule-block p, .np-rules-section .np-rule-block h2, .np-rules-section .np-rule-block h3"
    ));

    const changes = [];

    (data.added || []).forEach(function (change) {
      changes.push({ text: change.text, type: "added" });
    });

    (data.edited || []).forEach(function (change) {
      changes.push({ text: change.text, type: "edited" });
    });

    changes.forEach(function (change) {
      const changeText = normalizeText(change.text);

      if (!changeText || changeText.length < 12) {
        return;
      }

      const target = candidates.find(function (element) {
        if (!element.closest(".np-rule-block")) {
          return false;
        }

        const elementText = normalizeText(element.textContent);
        return elementText === changeText || elementText.includes(changeText) || changeText.includes(elementText);
      });

      if (!target) {
        return;
      }

      target.classList.add("np-rule-change-highlight", "np-rule-change-" + change.type);

      if (!target.querySelector(":scope > .np-rule-change-badge")) {
        const badge = document.createElement("span");
        badge.className = "np-rule-change-badge np-rule-change-badge-" + change.type;
        badge.textContent = change.type === "added" ? "Hinzugefügt" : "Geändert";
        target.appendChild(badge);
      }
    });
  }

  function createSummary(data) {
    const rulesSection = document.querySelector(".np-rules-section");

    if (!rulesSection || document.querySelector(".np-rule-change-summary")) {
      return;
    }

    const summary = document.createElement("section");
    summary.className = "np-rule-change-summary";
    summary.setAttribute("aria-label", "Letzte Änderungen im Regelwerk");

    const addedCount = data.added ? data.added.length : 0;
    const editedCount = data.edited ? data.edited.length : 0;
    const removedCount = data.removed ? data.removed.length : 0;
    const generatedAt = formatDate(data.generated_at);

    const removedItems = (data.removed || [])
      .slice(0, 8)
      .map(function (change) {
        return "<li>" + escapeHtml(change.text) + "</li>";
      })
      .join("");

    summary.innerHTML = `
      <div class="np-rule-change-summary-head">
        <h2>Letzte Regelwerksänderung</h2>
      </div>
      <div class="np-rule-change-summary-meta">
        <div class="np-rule-change-summary-stats">
          <span><strong>${addedCount}</strong> neu</span>
          <span><strong>${editedCount}</strong> geändert</span>
          <span><strong>${removedCount}</strong> entfernt</span>
        </div>
        ${generatedAt ? `<p class="np-rule-change-summary-date">Stand: ${generatedAt} Uhr</p>` : ""}
      </div>
      ${removedItems ? `<div class="np-rule-change-removed-box"><strong>Entfernte Passagen:</strong><ul>${removedItems}</ul></div>` : ""}
    `;

    rulesSection.parentNode.insertBefore(summary, rulesSection);
  }

  function escapeHtml(value) {
    return (value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  fetch(baseUrl + "assets/data/rule-changes.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Keine Änderungsdaten gefunden.");
      }
      return response.json();
    })
    .then(function (data) {
      if (!hasChanges(data)) {
        return;
      }

      markInlineChanges(data);
      createSummary(data);
      document.body.classList.add("np-rule-changes-active");
    })
    .catch(function () {
      // Ohne Änderungsdaten bleibt das Regelwerk ganz normal sichtbar.
    });
});
