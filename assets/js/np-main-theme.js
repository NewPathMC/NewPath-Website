(() => {
  const PLACEHOLDERS = new Set([
    "",
    "YOUTUBE_LINK_HIER_EINFÜGEN",
    "YOUTUBE_LINK_HIER_EINFUEGEN",
    "YOUTUBE_EMBED_URL_HIER_EINFÜGEN",
    "YOUTUBE_EMBED_URL_HIER_EINFUEGEN"
  ]);

  const getVideoId = (url) => {
    const patterns = [
      /youtu\.be\/([A-Za-z0-9_-]{6,})/,
      /youtube\.com\/watch\?.*?[?&]v=([A-Za-z0-9_-]{6,})/,
      /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
      /youtube-nocookie\.com\/embed\/([A-Za-z0-9_-]{6,})/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return "";
  };

  const buildEmbedUrl = (rawUrl) => {
    const url = (rawUrl || "").trim();

    if (PLACEHOLDERS.has(url)) {
      return "";
    }

    const videoId = getVideoId(url);

    if (videoId) {
      return `https://www.youtube-nocookie.com/embed/${videoId}`;
    }

    if (url.includes("youtube-nocookie.com/embed/")) {
      return url;
    }

    return url;
  };

  document.querySelectorAll("[data-np-main-theme]").forEach((card) => {
    const frame = card.querySelector("[data-np-main-theme-frame]");
    const embedUrl = buildEmbedUrl(card.dataset.npMainThemeUrl);

    if (!frame) {
      return;
    }

    if (!embedUrl) {
      card.classList.add("is-missing-url");
      return;
    }

    const separator = embedUrl.includes("?") ? "&" : "?";
    const iframe = document.createElement("iframe");

    iframe.src = `${embedUrl}${separator}rel=0`;
    iframe.title = "NewPath – Echoes of the Wild Main Theme";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;

    frame.replaceChildren(iframe);
    card.classList.remove("is-missing-url");
    card.classList.add("is-loaded");
  });
})();
