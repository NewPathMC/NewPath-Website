(() => {
  const pad = (value) => String(value).padStart(2, "0");

  const updateCountdown = (root) => {
    const targetRaw = root.dataset.npReleaseCountdownTarget;
    const doneLabel = root.dataset.npReleaseCountdownDone || "Gestartet";
    const target = new Date(targetRaw);

    const daysEl = root.querySelector("[data-np-countdown-days]");
    const hoursEl = root.querySelector("[data-np-countdown-hours]");
    const minutesEl = root.querySelector("[data-np-countdown-minutes]");
    const secondsEl = root.querySelector("[data-np-countdown-seconds]");
    const titleEl = root.querySelector(".np-release-countdown-title");

    if (Number.isNaN(target.getTime())) {
      root.classList.add("is-invalid");
      return;
    }

    const now = new Date();
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) {
      root.classList.add("is-finished");
      if (titleEl) {
        titleEl.textContent = doneLabel;
      }
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (daysEl) daysEl.textContent = String(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minutesEl) minutesEl.textContent = pad(minutes);
    if (secondsEl) secondsEl.textContent = pad(seconds);
  };

  document.querySelectorAll("[data-np-release-countdown]").forEach((root) => {
    updateCountdown(root);
    window.setInterval(() => updateCountdown(root), 1000);
  });
})();
