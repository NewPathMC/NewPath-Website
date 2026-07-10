(() => {
  const pad = (value) => String(value).padStart(2, "0");

  const setValue = (root, selector, value) => {
    const element = root.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  };

  const setWaitingState = (root) => {
    const soonLabel = root.dataset.npReleaseCountdownSoon || "Bald";
    root.classList.add("is-waiting");

    const soonElement = root.querySelector("[data-np-countdown-soon]");
    if (soonElement) {
      soonElement.textContent = soonLabel;
    }
  };

  const updateCountdown = (root) => {
    const targetRaw = (root.dataset.npReleaseCountdownTarget || "").trim();
    const doneLabel = root.dataset.npReleaseCountdownDone || "Gestartet";
    const titleEl = root.querySelector(".np-release-countdown-title");

    if (!targetRaw) {
      setWaitingState(root);
      return;
    }

    const target = new Date(targetRaw);

    if (Number.isNaN(target.getTime())) {
      setWaitingState(root);
      return;
    }

    const now = new Date();
    const diff = target.getTime() - now.getTime();

    root.classList.remove("is-waiting");

    if (diff <= 0) {
      root.classList.add("is-finished");
      if (titleEl) {
        titleEl.textContent = doneLabel;
      }

      setValue(root, "[data-np-countdown-days]", "00");
      setValue(root, "[data-np-countdown-hours]", "00");
      setValue(root, "[data-np-countdown-minutes]", "00");
      setValue(root, "[data-np-countdown-seconds]", "00");
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setValue(root, "[data-np-countdown-days]", String(days));
    setValue(root, "[data-np-countdown-hours]", pad(hours));
    setValue(root, "[data-np-countdown-minutes]", pad(minutes));
    setValue(root, "[data-np-countdown-seconds]", pad(seconds));
  };

  document.querySelectorAll("[data-np-release-countdown]").forEach((root) => {
    updateCountdown(root);
    window.setInterval(() => updateCountdown(root), 1000);
  });
})();
