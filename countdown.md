---
layout: null
title: Website-Release
permalink: /countdown.html
---
{% assign website_release = site.data["website-release"] %}
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ website_release.title }} | NewPath</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" href="{{ site.baseurl }}/favicon.ico">
  <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/newpath.css">
</head>
<body class="np-website-release-page">
  <div
    id="np-website-release-gate-config"
    data-np-website-release-config
    data-np-website-release-target="{{ website_release.target_date }}"
    data-np-website-release-countdown-path="{{ website_release.countdown_path | relative_url }}"
    data-np-website-release-home-path="{{ website_release.home_path | relative_url }}"
    hidden>
  </div>

  <main class="np-website-release-shell" aria-label="Website-Release Countdown">
    <section
      class="np-website-release-card"
      data-np-website-release-countdown
      data-np-website-release-target="{{ website_release.target_date }}"
      data-np-website-release-done="{{ website_release.done_label | escape }}"
      data-np-website-release-soon="{{ website_release.no_date_label | default: 'Bald' | escape }}">
      <div class="np-website-release-logo">
        <img
          src="{{ site.baseurl }}/assets/images/logo.png"
          alt="NewPath – Echoes of the Wild Logo"
          width="512"
          height="512"
          decoding="async">
      </div>

      <div class="np-website-release-content">
        <p class="np-website-release-kicker">{{ website_release.kicker }}</p>
        <h1>{{ website_release.title }}</h1>
        <p class="np-website-release-subtitle">{{ website_release.subtitle }}</p>
        <p class="np-website-release-description">{{ website_release.description }}</p>

        <div class="np-website-release-countdown-grid" aria-label="Countdown bis zum Website-Release">
          <span>
            <strong data-np-website-days>--</strong>
            <small>Tage</small>
          </span>
          <span>
            <strong data-np-website-hours>--</strong>
            <small>Std</small>
          </span>
          <span>
            <strong data-np-website-minutes>--</strong>
            <small>Min</small>
          </span>
          <span>
            <strong data-np-website-seconds>--</strong>
            <small>Sek</small>
          </span>
        </div>

        <p class="np-website-release-soon" data-np-website-soon>{{ website_release.no_date_label | default: "Bald" }}</p>
        <p class="np-website-release-date">{{ website_release.date_label }}</p>

        <div class="np-website-release-actions">
          <a href="{{ website_release.discord_url }}" target="_blank" rel="noopener">
            {{ website_release.discord_label }}
          </a>
        </div>
      </div>
    </section>
  </main>

  <script src="{{ site.baseurl }}/assets/js/np-website-release-gate.js" defer></script>
</body>
</html>
