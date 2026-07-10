(() => {
  const pad = (value) => String(value).padStart(2, "0");
  let redirected = false;

  const normalizePath = (path) => {
    if (!path) return "/";
    try {
      const url = new URL(path, window.location.origin);
      path = url.pathname;
    } catch (_) {
      // keep path as given
    }

    if (!path.startsWith("/")) {
      path = `/${path}`;
    }

    if (path.length > 1 && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    return path || "/";
  };

  const redirectOnce = (path) => {
    if (redirected) return;
    redirected = true;
    window.location.replace(path);
  };

  const setText = (root, selector, value) => {
    const element = root.querySelector(selector);
    if (element) {
      element.textContent = value;
    }
  };

  const parseTarget = (targetRaw) => {
    const value = (targetRaw || "").trim();
    if (!value) return null;

    const target = new Date(value);
    if (Number.isNaN(target.getTime())) return null;

    return target;
  };

  const isReleased = (target) => {
    return target ? Date.now() >= target.getTime() : false;
  };

  const updateCountdownDisplays = (targetRaw, target) => {
    document.querySelectorAll("[data-np-website-release-countdown]").forEach((root) => {
      const rootTargetRaw = (root.dataset.npWebsiteReleaseTarget || targetRaw || "").trim();
      const rootTarget = parseTarget(rootTargetRaw) || target;
      const soonLabel = root.dataset.npWebsiteReleaseSoon || "Bald";

      if (!rootTargetRaw || !rootTarget) {
        root.classList.add("is-waiting");
        const soonElement = root.querySelector("[data-np-website-soon]");
        if (soonElement) {
          soonElement.textContent = soonLabel;
        }
        return;
      }

      const diff = rootTarget.getTime() - Date.now();
      root.classList.remove("is-waiting");

      if (diff <= 0) {
        root.classList.add("is-finished");

        setText(root, "[data-np-website-days]", "00");
        setText(root, "[data-np-website-hours]", "00");
        setText(root, "[data-np-website-minutes]", "00");
        setText(root, "[data-np-website-seconds]", "00");
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setText(root, "[data-np-website-days]", String(days));
      setText(root, "[data-np-website-hours]", pad(hours));
      setText(root, "[data-np-website-minutes]", pad(minutes));
      setText(root, "[data-np-website-seconds]", pad(seconds));
    });
  };

  const config = document.querySelector("[data-np-website-release-config]");
  if (!config) return;

  const targetRaw = (config.dataset.npWebsiteReleaseTarget || "").trim();
  const target = parseTarget(targetRaw);
  const countdownPath = normalizePath(config.dataset.npWebsiteReleaseCountdownPath || "/countdown/");
  const homePath = normalizePath(config.dataset.npWebsiteReleaseHomePath || "/");
  const currentPath = normalizePath(window.location.pathname);
  const isCountdownPage = currentPath === countdownPath;

  updateCountdownDisplays(targetRaw, target);

  if (isReleased(target) && isCountdownPage) {
    redirectOnce(homePath);
    return;
  }

  const interval = window.setInterval(() => {
    updateCountdownDisplays(targetRaw, target);

    if (isReleased(target) && normalizePath(window.location.pathname) === countdownPath) {
      window.clearInterval(interval);
      redirectOnce(homePath);
    }
  }, 1000);
})();
