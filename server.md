---
layout: default
title: Server & Welt
nav_order: 3
permalink: /server.html
---

<!-- AUTO_UPDATED_START -->
<p class="np-last-updated">Zuletzt aktualisiert: 10.07.2026 17:40 Uhr</p>
<!-- AUTO_UPDATED_END -->

{% include wip_banner.html %}


<section class="echo-page-box echo-page-box-server">
  <div class="echo-page-image">
    <img
      src="{{ site.baseurl }}/assets/images/echo/echo-server.png"
      alt="ECHO erklärt Server und Welt von NewPath"
      width="512"
      height="512"
      loading="lazy"
      decoding="async">
  </div>

  <div class="echo-page-content">
    <p class="echo-page-kicker">ECHO – Der Wegbegleiter</p>
    <h2>Alles Wichtige zum laufenden Serverbetrieb.</h2>
    <p>
      Hier findest du die wichtigsten Informationen zum laufenden Serverbetrieb:
      Zugang, Versionen, Neustarts und später auch Live-Status oder Weltkarte.
    </p>
  </div>
</section>

<section class="np-page-section np-server-section np-server-dashboard">
  <div class="np-section-header">
    <h1 class="np-title">Server & Welt</h1>
  </div>

  <div class="np-server-dashboard-main-grid">
    <section class="np-server-status-hero np-server-status-discord" data-np-server-status data-server-address="newpath.minecraft.best" aria-label="Aktueller Serverstatus">
      <div class="np-server-status-header">
        <div>
          <h2>NewPath Serverstatus</h2>
        </div>
        <span class="np-server-live-dot" data-np-status-dot aria-hidden="true"></span>
      </div>

      <div class="np-server-status-values">
        <div class="np-server-status-value">
          <small>Status</small>
          <strong data-np-status-label>Wird geladen …</strong>
        </div>

        <div class="np-server-status-value">
          <small>Spieler</small>
          <strong data-np-status-players>–</strong>
        </div>
      </div>

      <div class="np-server-address-line">
        <small>IP-Adresse</small>
        <div class="np-server-address-actions">
          <code>newpath.minecraft.best</code>
          <button
            class="np-server-copy-hero-button np-server-copy-status-button"
            type="button"
            data-server-ip="newpath.minecraft.best"
            onclick="navigator.clipboard.writeText(this.dataset.serverIp); this.querySelector('.np-server-copy-hero-label').textContent='IP kopiert'; setTimeout(() => this.querySelector('.np-server-copy-hero-label').textContent='Server-IP kopieren', 1800);">
            <span class="np-server-copy-hero-icon" aria-hidden="true"></span>
            <span class="np-server-copy-hero-label">Server-IP kopieren</span>
          </button>
        </div>
      </div>

      <div class="np-server-status-footer">
        <span data-np-status-updated>Letzte Aktualisierung: –</span>
        <button class="np-server-refresh" type="button" data-np-status-refresh>
          Aktualisieren
        </button>
      </div>
    </section>

    <article class="np-server-dashboard-card np-server-restart-card">
      <h2>Automatische Restarts</h2>
      <p>
        Regelmäßige Neustarts helfen dabei, den Server langfristig stabil zu halten. Alle Zeiten in deutscher Zeit (MEZ/MESZ).
      </p>

      <div class="np-server-time-list">
        <span>05:00 Uhr</span>
        <span>17:00 Uhr</span>
      </div>
    </article>
  </div>

  <article class="np-server-dashboard-card np-server-map-card np-bluemap-card">
    <div class="np-bluemap-head">
      <div>
        <h2>Live-Weltkarte</h2>
        <p>
          Die BlueMap zeigt die aktuelle NewPath-Welt direkt im Browser. Du kannst die Karte bewegen,
          zoomen und die BlueMap-Funktionen innerhalb der eingebetteten Ansicht nutzen.
        </p>
      </div>

      <a class="np-bluemap-open" href="https://map.newpath-mc.de" target="_blank" rel="noopener">
        Karte im Vollbild öffnen
      </a>
    </div>

    <div class="np-bluemap-frame">
      <iframe
        src="https://map.newpath-mc.de"
        title="NewPath BlueMap Weltkarte"
        loading="lazy"
        allowfullscreen>
      </iframe>
    </div>
  </article>

  <article class="np-server-dashboard-card np-world-downloads-card" id="welt-downloads">
    <div class="np-world-downloads-head">
      <div>
        <p class="np-card-kicker">Welt-Archiv</p>
        <h2>Archivierte Welten</h2>
        <p>
          Hier werden zukünftig ältere NewPath-Welten verlinkt. Die Weltdateien liegen nicht im
          Website-Repo, sondern werden extern bereitgestellt, zum Beispiel über Google Drive.
        </p>
      </div>

      <span class="np-world-downloads-status">Download-Archiv</span>
    </div>

    {% assign world_downloads = site.data["world-downloads"].items | default: empty %}

    <p class="np-world-download-note">
      Hinweis: Archivierte Welten sollten immer mit der angegebenen Modpack-Version geöffnet werden,
      damit fehlende Mods, Blöcke oder Weltgenerierungsdaten vermieden werden.
    </p>

    {% if world_downloads.size > 0 %}
      <div class="np-world-download-list">
        {% for world in world_downloads %}
          <article class="np-world-download-card">
            <div class="np-world-download-card-head">
              <h3>{{ world.title }}</h3>
            </div>

            <dl class="np-world-download-meta">
              <div>
                <dt>Weltstand</dt>
                <dd>{{ world.world_date }}</dd>
              </div>
              <div>
                <dt>Modpack-Version</dt>
                <dd>{{ world.modpack_version }}</dd>
              </div>
              <div>
                <dt>Dateigröße</dt>
                <dd>{{ world.file_size }}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{{ world.status }}</dd>
              </div>
            </dl>

            <div class="np-world-download-actions">
              {% if world.download_url and world.available %}
                <a
                  class="np-world-download-button"
                  href="{{ world.download_url }}"
                  target="_blank"
                  rel="noopener">
                  {{ world.button_label | default: "Welt herunterladen" }}
                </a>
              {% else %}
                <span class="np-world-download-button np-world-download-button-disabled">Download folgt</span>
              {% endif %}
            </div>
          </article>
        {% endfor %}
      </div>
    {% else %}
      <div class="np-world-download-empty">
        <p class="np-card-kicker">Noch leer</p>
        <h3>Noch keine Welt-Downloads eingetragen</h3>
        <p>
          Der Archivbereich ist vorbereitet. Sobald eine alte NewPath-Welt veröffentlicht wird,
          erscheint sie hier als Download-Karte mit Weltstand, benötigter Modpack-Version und externem Link.
        </p>
      </div>
    {% endif %}

  </article>
</section>

<script src="{{ site.baseurl }}/assets/js/np-server-status.js" defer></script>
