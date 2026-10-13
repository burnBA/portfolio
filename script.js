/* ==========================================================================
   script.js — Bruno Alves · Portfolio
   --------------------------------------------------------------------------
   JavaScript vanilla, aucune dépendance. Le contenu vient de content.js.

    1. Outils (sélecteurs, stockage sécurisé, traduction)
    2. Langue (FR / EN) et préférence d'animation
    3. Rendu : parcours, projets, topologie, compétences, langues, intérêts
    4. En-tête, navigation, menu mobile, progression de lecture
    5. Apparitions au scroll
    6. Parcours : filtres et timeline animée
    7. Projets : détails dépliables
    8. Topologie réseau interactive
    9. Constellation des compétences
   10. Palette de commandes (Ctrl + K)
   11. Copie de l'e-mail et notifications
   12. Objet en chrome liquide (WebGL)
   13. Easter eggs
   14. Initialisation
   ========================================================================== */
(function () {
  'use strict';

  const C = window.CONTENT;
  if (!C) return; // content.js absent : on laisse le HTML statique

  /* ========================================================================
     1. OUTILS
     ======================================================================== */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const root = document.documentElement;

  /** Stockage protégé : certains navigateurs (mode privé, cookies bloqués) lèvent une exception. */
  const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignoré */ } }
  };

  /** Échappe le texte injecté dans les gabarits HTML. */
  const esc = (str) => String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /** Icône du sprite SVG défini dans index.html. */
  const icon = (name, cls = 'icon') => `<svg class="${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;

  /** Normalise une chaîne pour la recherche (minuscules, sans accents). */
  const norm = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

  /* ========================================================================
     2. LANGUE & ANIMATIONS
     ======================================================================== */
  const state = {
    lang: root.lang === 'en' ? 'en' : 'fr',
    motion: !root.classList.contains('motion-off'),
    filter: 'all',
    openProjects: new Set(),
    topoActive: null,
    firstRender: true
  };

  /** Traduction d'une clé d'interface. */
  const t = (key) => (C.ui[state.lang] && C.ui[state.lang][key]) || C.ui.fr[key] || key;

  /** Choisit la bonne langue dans un champ { fr, en } (ou renvoie la chaîne telle quelle). */
  const pick = (val) => (val && typeof val === 'object' && !Array.isArray(val)) ? (val[state.lang] || val.fr) : val;

  /** Applique la langue à tout le document. */
  function applyLanguage(lang, persist) {
    state.lang = lang === 'en' ? 'en' : 'fr';
    root.lang = state.lang;
    if (persist) store.set('ba-lang', state.lang);

    // Textes statiques
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    // Attributs : data-i18n-attr="placeholder:clé,aria-label:clé"
    $$('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(',').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });

    // Métadonnées (titre, description, Open Graph)
    const meta = C.meta[state.lang];
    document.title = meta.title;
    const setMeta = (sel, val) => { const m = $(sel); if (m) m.setAttribute('content', val); };
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:locale"]', meta.locale);

    // Sélecteur de langue
    $$('.lang-switch [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang)));
    $('.wordmark').setAttribute('aria-label', state.lang === 'en' ? 'Bruno Alves — home' : 'Bruno Alves — accueil');
    const menuBtn = $('.menu-toggle');
    if (menuBtn) $('.visually-hidden', menuBtn).textContent = t(menuBtn.getAttribute('aria-expanded') === 'true' ? 'nav.close' : 'nav.menu');

    updateMotionButton();
    renderAll();
  }

  /** Active / coupe les animations (mémorisé). */
  function setMotion(on, persist) {
    state.motion = on;
    root.classList.toggle('motion-off', !on);
    if (persist) store.set('ba-motion', on ? 'on' : 'off');
    updateMotionButton();
    chrome.onMotionChange();
    constellation.onMotionChange();
  }

  function updateMotionButton() {
    const btn = $('[data-toggle-motion]');
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(!state.motion));
    $('span', btn).textContent = t(state.motion ? 'footer.motion.on' : 'footer.motion.off');
  }

  /* ========================================================================
     3. RENDU DU CONTENU
     ======================================================================== */
  function renderAll() {
    renderTimeline();
    renderProjects();
    renderSkills();
    renderLanguages();
    renderInterests();
    if (state.firstRender) {
      state.firstRender = false;
      reveal.observeAll();
    }
    timeline.update();
  }

  /** Classe d'apparition uniquement au premier rendu (pas de clignotement au changement de langue). */
  const rv = () => (state.firstRender ? ' reveal' : '');

  /* ---- Parcours ---- */
  function renderTimeline() {
    const list = $('#timeline-list');
    list.innerHTML = C.experiences.map((xp) => {
      const tags = xp.tags.map((tag) => `<li class="chip">${esc(t('exp.filter.' + tag))}</li>`).join('');
      const bullets = pick(xp.bullets).map((b) => `<li>${esc(b)}</li>`).join('');
      return `
        <li class="tl-item${rv()}" id="exp-${xp.id}" data-tags="${xp.tags.join(' ')}">
          <div class="tl-meta">
            <span class="tl-period">${esc(pick(xp.period))}</span>
            <span class="tl-mode">${esc(pick(xp.mode))}</span>
          </div>
          <span class="tl-dot" aria-hidden="true"></span>
          <article class="tl-card card">
            <h3 class="tl-role">${esc(pick(xp.role))}</h3>
            <p class="tl-org">
              <strong>${esc(pick(xp.org))}</strong>
              <span class="tl-place">${icon('pin')}${esc(pick(xp.place))}</span>
            </p>
            <ul class="tl-tags">${tags}</ul>
            <ul class="bullets">${bullets}</ul>
          </article>
        </li>`;
    }).join('');
    timeline.applyFilter();
  }

  /* ---- Projets ---- */
  function renderProjects() {
    const grid = $('#projects-grid');
    grid.innerHTML = C.projects.map((p) => {
      const open = state.openProjects.has(p.id);
      const status = p.status === 'wip'
        ? `<span class="status status-wip"><span class="status-dot" aria-hidden="true"></span>${esc(t('proj.status.wip'))}</span>`
        : `<span class="status status-done">${icon('check')}${esc(t('proj.status.done'))}</span>`;
      const details = pick(p.details).map(([term, text]) => `<div><dt>${esc(term)}</dt><dd>${esc(text)}</dd></div>`).join('');
      const stack = p.stack.map((s) => `<li class="chip">${esc(s)}</li>`).join('');
      return `
        <article class="project card${p.featured ? ' is-featured' : ''}${rv()}" id="proj-${p.id}" aria-labelledby="proj-${p.id}-title">
          <div class="project-body">
            <div class="project-top">
              <span class="project-icon">${icon(p.icon)}</span>
              ${status}
            </div>
            <h3 class="project-title" id="proj-${p.id}-title">${esc(pick(p.title))}</h3>
            <p class="project-summary">${esc(pick(p.summary))}</p>
            <ul class="stack" aria-label="${esc(t('proj.stack'))}">${stack}</ul>
            <button class="project-toggle" type="button" aria-expanded="${open}" aria-controls="proj-${p.id}-details" data-project="${p.id}">
              <span>${esc(t(open ? 'proj.less' : 'proj.more'))}</span>${icon('chevron')}
            </button>
            <div class="project-details${open ? ' is-open' : ''}" id="proj-${p.id}-details" role="region" aria-labelledby="proj-${p.id}-title">
              <div><dl class="details-list">${details}</dl></div>
            </div>
          </div>
          ${p.featured ? topologyMarkup() : ''}
        </article>`;
    }).join('');
    topology.bind();
  }

  /* ---- Topologie (SVG) ---- */
  const TOPO_H = 56; // hauteur d'un nœud

  function topologyMarkup() {
    const T = C.topology;
    const byId = Object.fromEntries(T.nodes.map((n) => [n.id, n]));

    const zones = T.zones.map((z) => `
      <rect class="topo-zone" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="16"/>
      <text class="topo-zone-label" x="${z.x + 12}" y="${z.y + z.h - 10}">${esc(t(z.label))}</text>`).join('');

    // Liens orthogonaux : bas du parent → palier → haut de l'enfant
    const links = T.links.map(([a, b, kind]) => {
      const A = byId[a], B = byId[b];
      const y1 = A.y + TOPO_H / 2, y2 = B.y - TOPO_H / 2, mid = Math.round((y1 + y2) / 2);
      const d = A.x === B.x ? `M${A.x} ${y1}V${y2}` : `M${A.x} ${y1}V${mid}H${B.x}V${y2}`;
      const cls = kind === 'migration' ? ' is-migration' : '';
      return `<path class="topo-link${cls}" data-a="${a}" data-b="${b}" d="${d}"/><path class="topo-flow${cls}" d="${d}"/>`;
    }).join('');

    const nodes = T.nodes.map((n) => {
      const label = pick(n.label), sub = pick(n.sub);
      const x0 = n.x - n.w / 2, y0 = n.y - TOPO_H / 2;
      const cls = ['topo-node', n.ghost ? 'is-ghost' : '', n.accent ? 'accent-' + n.accent : '', state.topoActive === n.id ? 'is-active' : ''].join(' ');
      // Nœuds étroits : icône au-dessus, texte centré ; sinon icône à gauche
      const inner = n.w < 110
        ? `<use class="topo-icon" href="#i-${n.icon}" x="${n.x - 8}" y="${y0 + 7}" width="16" height="16"/>
           <text class="topo-label" x="${n.x}" y="${n.y + 9}" text-anchor="middle" font-size="12.5">${esc(label)}</text>
           <text class="topo-sub" x="${n.x}" y="${n.y + 22}" text-anchor="middle">${esc(sub)}</text>`
        : `<use class="topo-icon" href="#i-${n.icon}" x="${x0 + 12}" y="${n.y - 10}" width="20" height="20"/>
           <text class="topo-label" x="${x0 + 40}" y="${n.y - 1}">${esc(label)}</text>
           <text class="topo-sub" x="${x0 + 40}" y="${n.y + 14}">${esc(sub)}</text>`;
      return `
        <g class="${cls}" data-node="${n.id}" role="button" tabindex="0"
           aria-pressed="${state.topoActive === n.id}" aria-label="${esc(label + ' — ' + sub)}">
          <rect x="${x0}" y="${y0}" width="${n.w}" height="${TOPO_H}" rx="12"/>
          ${inner}
        </g>`;
    }).join('');

    return `
      <div class="topology${state.topoActive ? ' has-active' : ''}">
        <div class="topology-head mono">
          <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
          <span>${esc(t('topo.title'))}</span>
        </div>
        <p class="topology-swipe">${esc(t('topo.swipe'))} →</p>
        <div class="topology-scroll">
          <svg viewBox="0 0 560 560" role="group" aria-label="${esc(t('topo.label'))}">
            ${zones}${links}${nodes}
          </svg>
        </div>
        <div class="topology-panel" aria-live="polite">${topologyPanel(state.topoActive)}</div>
      </div>`;
  }

  function topologyPanel(id) {
    const n = id && C.topology.nodes.find((x) => x.id === id);
    if (!n) return `<p class="topo-hint">${esc(t('topo.hint'))}</p>`;
    return `<h4>${esc(pick(n.label))} <span>${esc(pick(n.sub))}</span></h4><p>${esc(pick(n.detail))}</p>`;
  }

  /* ---- Compétences ---- */
  function renderSkills() {
    const wrap = $('#skill-groups');
    wrap.innerHTML = C.skills.map((g, gi) => `
      <section class="skill-group card${rv()}" data-group="${g.id}">
        <h3 class="skill-group-title">
          <button class="skill-group-head" type="button" aria-pressed="false" data-group-btn="${g.id}">
            ${icon(g.icon)}
            <span class="label">${esc(pick(g.label))}</span>
            <span class="count" aria-hidden="true">${String(g.items.length).padStart(2, '0')}</span>
          </button>
        </h3>
        <ul class="skill-chips">
          ${g.items.map((it, i) => `<li class="chip" data-skill="${gi}-${i}">${esc(pick(it))}</li>`).join('')}
        </ul>
      </section>`).join('');
    constellation.build();
  }

  /* ---- Langues ---- */
  const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  function renderLanguages() {
    $('#lang-list').innerHTML = C.languages.map((l) => {
      const levels = l.levels.map((lv) => {
        const rank = CEFR.indexOf(lv.level);
        const steps = CEFR.map((_, i) => `<i class="${i <= rank ? 'on' : ''}${i === rank ? ' top' : ''}"></i>`).join('');
        const kind = lv.kind ? t(lv.kind === 'oral' ? 'lang.oral' : 'lang.written') : '';
        return `
          <div class="cefr">
            <span class="cefr-kind">${esc(kind)}</span>
            <span class="cefr-steps" aria-hidden="true">${steps}</span>
            <span class="cefr-level">${lv.level}</span>
          </div>`;
      }).join('');
      return `
        <li class="lang-item">
          <div>
            <span class="lang-name">${esc(pick(l.name))}</span>
            ${l.note ? `<span class="lang-note">${esc(pick(l.note))}</span>` : ''}
          </div>
          <div class="lang-levels">${levels}</div>
        </li>`;
    }).join('');
  }

  /* ---- Centres d'intérêt ---- */
  function renderInterests() {
    $('#interest-list').innerHTML = C.interests.map((it) => `
      <li><span class="interest-icon">${icon(it.icon)}</span><span>${esc(pick(it.label))}</span></li>`).join('');
  }

  /* ========================================================================
     4. EN-TÊTE, NAVIGATION, MENU MOBILE
     ======================================================================== */
  const header = {
    init() {
      this.el = $('.site-header');
      this.bar = $('.scroll-progress span');
      this.nav = $('#site-nav');
      this.toggle = $('.menu-toggle');

      // Lien actif selon la section visible
      const links = $$('.site-nav a');
      const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            links.forEach((a) => {
              if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
              else a.removeAttribute('aria-current');
            });
          });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach((s) => io.observe(s));
        // Dans le hero : aucun lien actif
        const hero = $('#hero');
        new IntersectionObserver(([e]) => { if (e.isIntersecting) links.forEach((a) => a.removeAttribute('aria-current')); },
          { rootMargin: '-45% 0px -50% 0px' }).observe(hero);
      }

      // Menu mobile
      this.toggle.addEventListener('click', () => this.setMenu(this.toggle.getAttribute('aria-expanded') !== 'true'));
      this.nav.addEventListener('click', (e) => { if (e.target.closest('a')) this.setMenu(false); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.nav.classList.contains('is-open')) { this.setMenu(false); this.toggle.focus(); } });
      window.matchMedia('(min-width: 961px)').addEventListener('change', (m) => { if (m.matches) this.setMenu(false); });
    },

    setMenu(open) {
      this.nav.classList.toggle('is-open', open);
      this.toggle.setAttribute('aria-expanded', String(open));
      $('use', this.toggle).setAttribute('href', open ? '#i-close' : '#i-menu');
      $('.visually-hidden', this.toggle).textContent = t(open ? 'nav.close' : 'nav.menu');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) { const first = $('a', this.nav); if (first) first.focus(); }
    },

    onScroll() {
      const y = window.scrollY;
      this.el.classList.toggle('is-scrolled', y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      this.bar.style.transform = `scaleX(${max > 0 ? clamp(y / max, 0, 1) : 0})`;
    }
  };

  /* ========================================================================
     5. APPARITIONS AU SCROLL
     ======================================================================== */
  const reveal = {
    io: null,
    init() {
      if (!('IntersectionObserver' in window)) return;
      this.io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); this.io.unobserve(e.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    },
    observeAll() {
      const els = $$('.reveal:not(.is-visible)');
      if (!this.io) { els.forEach((el) => el.classList.add('is-visible')); return; }
      // Décalage en cascade pour les éléments d'un même groupe
      els.forEach((el) => {
        const siblings = el.parentElement ? $$(':scope > .reveal', el.parentElement) : [];
        const i = siblings.indexOf(el);
        if (i > 0) el.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
        this.io.observe(el);
      });
    }
  };

  /* ========================================================================
     6. PARCOURS : FILTRES & TIMELINE
     ======================================================================== */
  const timeline = {
    init() {
      this.rail = $('.timeline');
      this.fill = $('.timeline-fill');
      $$('.filters [data-filter]').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.filter = btn.dataset.filter;
          $$('.filters [data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
          this.applyFilter();
          this.update();
        });
      });
    },

    applyFilter() {
      let visible = 0;
      $$('.tl-item').forEach((li) => {
        const show = state.filter === 'all' || li.dataset.tags.split(' ').includes(state.filter);
        li.classList.toggle('is-hidden', !show);
        if (show) visible++;
      });
      const empty = $('#timeline-empty');
      if (empty) empty.hidden = visible > 0;
    },

    /** Remplit le rail selon le défilement et allume l'entrée courante. */
    update() {
      if (!this.rail) return;
      const vh = window.innerHeight;
      const rect = this.rail.getBoundingClientRect();
      const progress = clamp((vh * 0.6 - rect.top) / Math.max(rect.height, 1), 0, 1);
      this.fill.style.transform = `scaleY(${progress})`;
      let current = null;
      $$('.tl-item:not(.is-hidden)').forEach((li) => {
        if (li.getBoundingClientRect().top < vh * 0.6) current = li;
      });
      $$('.tl-item').forEach((li) => li.classList.toggle('is-current', li === current));
    }
  };

  /* ========================================================================
     7. PROJETS : DÉTAILS DÉPLIABLES (délégation d'événements)
     ======================================================================== */
  function initProjects() {
    $('#projects-grid').addEventListener('click', (e) => {
      const btn = e.target.closest('.project-toggle');
      if (!btn) return;
      const id = btn.dataset.project;
      const open = btn.getAttribute('aria-expanded') !== 'true';
      open ? state.openProjects.add(id) : state.openProjects.delete(id);
      btn.setAttribute('aria-expanded', String(open));
      $('span', btn).textContent = t(open ? 'proj.less' : 'proj.more');
      $('#' + btn.getAttribute('aria-controls')).classList.toggle('is-open', open);
    });
  }

  /* ========================================================================
     8. TOPOLOGIE RÉSEAU INTERACTIVE
     ======================================================================== */
  const topology = {
    /** Relie les événements après chaque rendu (le SVG est reconstruit au changement de langue). */
    bind() {
      const box = $('.topology');
      if (!box) return;
      const select = (id) => {
        state.topoActive = state.topoActive === id ? null : id;
        this.paint(box);
      };
      $$('.topo-node', box).forEach((g) => {
        g.addEventListener('click', () => select(g.dataset.node));
        g.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(g.dataset.node); }
        });
        g.addEventListener('mouseenter', () => this.light(box, g.dataset.node));
        g.addEventListener('mouseleave', () => this.light(box, state.topoActive));
      });
      this.light(box, state.topoActive);
      // Sur petit écran, le schéma défile horizontalement : on le centre d'emblée
      const sc = $('.topology-scroll', box);
      if (sc && sc.scrollWidth > sc.clientWidth) sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2;
    },

    paint(box) {
      $$('.topo-node', box).forEach((g) => {
        const on = g.dataset.node === state.topoActive;
        g.classList.toggle('is-active', on);
        g.setAttribute('aria-pressed', String(on));
      });
      box.classList.toggle('has-active', !!state.topoActive);
      $('.topology-panel', box).innerHTML = topologyPanel(state.topoActive);
      this.light(box, state.topoActive);
    },

    /** Allume les liens connectés au nœud survolé ou sélectionné. */
    light(box, id) {
      box.classList.toggle('has-active', !!id);
      $$('.topo-link', box).forEach((p) => p.classList.toggle('is-lit', !!id && (p.dataset.a === id || p.dataset.b === id)));
    }
  };

  /* ========================================================================
     9. CONSTELLATION DES COMPÉTENCES
     ======================================================================== */
  const constellation = {
    active: null,
    pinned: false,
    hovering: false,
    visible: false,
    timer: null,

    // Liens transversaux entre compétences de domaines différents (libellés FR ou neutres)
    cross: [['Wireshark', 'TCP/IP'], ['BloodHound', 'AD DS'], ['PowerShell', 'AD DS'], ['Entra ID', 'AD DS'], ['Proxmox VE', 'Linux'], ['Durcissement AD', 'GPO']],

    build() {
      const svg = $('#constellation');
      if (!svg) return;
      const W = 640, H = 560, cx = W / 2, cy = H / 2 + 6, R = 172;
      const rand = mulberry32(7); // pseudo-aléatoire déterministe : même ciel à chaque visite
      const pos = {}; // position de chaque compétence, par libellé FR
      let out = `<defs>
          <linearGradient id="cst-chrome" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#9f9ab4"/>
            <stop offset=".7" stop-color="#e6ddff"/><stop offset="1" stop-color="#b59cff"/>
          </linearGradient>
        </defs>`;

      // Fond étoilé
      for (let i = 0; i < 80; i++) {
        out += `<circle class="cst-bgstar" cx="${(rand() * W).toFixed(1)}" cy="${(rand() * H).toFixed(1)}" r="${(rand() * 0.9 + 0.2).toFixed(2)}" opacity="${(rand() * 0.4 + 0.1).toFixed(2)}"/>`;
      }
      // Sigil central discret
      out += `<g fill="none" stroke="rgba(205,188,255,.18)">
          <circle cx="${cx}" cy="${cy}" r="46"/><circle cx="${cx}" cy="${cy}" r="30" stroke-dasharray="2 5"/>
          <path d="M${cx} ${cy - 46}L${cx + 40} ${cy + 23}H${cx - 40}Z"/></g>`;

      const clusters = C.skills.map((g, gi) => {
        const ang = (-90 + gi * 72) * Math.PI / 180;
        const hx = cx + Math.cos(ang) * R, hy = cy + Math.sin(ang) * R;
        const n = g.items.length;
        const r = 62 + n * 3.2;
        const spread = Math.min(300, n * 40) * Math.PI / 180;
        let links = '', stars = '', labels = '';
        g.items.forEach((it, i) => {
          const a = ang - spread / 2 + (n === 1 ? spread / 2 : (spread * i) / (n - 1)) + (rand() - 0.5) * 0.12;
          const rr = r + (rand() - 0.5) * 14;
          const x = hx + Math.cos(a) * rr, y = hy + Math.sin(a) * rr;
          const label = pick(it);
          pos[typeof it === 'string' ? it : it.fr] = [x, y];
          // Étiquette : côté extérieur ; basculée si elle sortait du cadre
          const w = label.length * 6.7;
          let anchor = Math.cos(a) > 0.25 ? 'start' : Math.cos(a) < -0.25 ? 'end' : 'middle';
          let lx = x + (anchor === 'start' ? 9 : anchor === 'end' ? -9 : 0);
          const ly = y + (anchor === 'middle' ? (Math.sin(a) > 0 ? 17 : -10) : 4);
          if (anchor === 'start' && lx + w > W - 6) { anchor = 'end'; lx = x - 9; }
          if (anchor === 'end' && lx - w < 6) { anchor = 'start'; lx = x + 9; }
          if (anchor === 'middle') lx = clamp(lx, w / 2 + 6, W - w / 2 - 6);
          links += `<line class="cst-link" x1="${hx.toFixed(1)}" y1="${hy.toFixed(1)}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
          stars += `<circle class="cst-star" data-skill="${gi}-${i}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2"/>`;
          labels += `<text class="cst-label" data-skill="${gi}-${i}" x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" paint-order="stroke" stroke="#0d0b15" stroke-width="4" stroke-linejoin="round">${esc(label)}</text>`;
        });
        // Libellé du domaine sous (ou sur) le nœud central de l'amas
        const hubLabelY = Math.sin(ang) < -0.5 ? hy + 30 : hy - 22;
        return `
          <line class="cst-hublink" x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}"/>
          <g class="cst-cluster" data-cluster="${g.id}">
            ${links}${stars}
            <circle class="cst-hub-ring" cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="13"/>
            <circle class="cst-hub-core" cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="7"/>
            <text class="cst-hub-label" x="${hx.toFixed(1)}" y="${hubLabelY.toFixed(1)}" text-anchor="middle" paint-order="stroke" stroke="#0d0b15" stroke-width="5" stroke-linejoin="round">${esc(pick(g.label))}</text>
            ${labels}
          </g>`;
      });

      // Liens transversaux (en pointillés, sous les amas)
      const cross = this.cross.filter(([a, b]) => pos[a] && pos[b]).map(([a, b]) =>
        `<line x1="${pos[a][0].toFixed(1)}" y1="${pos[a][1].toFixed(1)}" x2="${pos[b][0].toFixed(1)}" y2="${pos[b][1].toFixed(1)}" stroke="rgba(196,255,69,.16)" stroke-dasharray="2 5"/>`).join('');

      svg.innerHTML = out + cross + clusters.join('');
      this.bindGroups();
      this.setActive(this.active || C.skills[0].id);
    },

    bindGroups() {
      $$('.skill-group').forEach((sec) => {
        const id = sec.dataset.group;
        sec.addEventListener('mouseenter', () => { this.hovering = true; this.setActive(id); });
        sec.addEventListener('mouseleave', () => { this.hovering = false; });
        sec.addEventListener('focusin', () => this.setActive(id));
        $('.skill-group-head', sec).addEventListener('click', () => {
          this.pinned = !(this.pinned && this.active === id);
          this.setActive(id);
        });
        $$('.chip', sec).forEach((chip) => {
          const k = chip.dataset.skill;
          chip.addEventListener('mouseenter', () => this.hot(k, true));
          chip.addEventListener('mouseleave', () => this.hot(k, false));
        });
      });
    },

    setActive(id) {
      this.active = id;
      $$('.cst-cluster').forEach((g) => g.classList.toggle('is-active', g.dataset.cluster === id));
      const fig = $('.constellation');
      if (fig) fig.classList.add('has-active');
      $$('.skill-group').forEach((sec) => {
        const on = sec.dataset.group === id;
        sec.classList.toggle('is-active', on);
        $('.skill-group-head', sec).setAttribute('aria-pressed', String(on && this.pinned));
      });
    },

    hot(key, on) {
      $$(`#constellation [data-skill="${key}"]`).forEach((el) => el.classList.toggle('is-hot', on));
    },

    /** Défilement automatique des domaines quand la section est visible. */
    init() {
      const fig = $('.constellation');
      if (!fig || !('IntersectionObserver' in window)) return;
      new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; this.onMotionChange(); }, { threshold: 0.3 }).observe(fig);
    },

    onMotionChange() {
      clearInterval(this.timer);
      if (!state.motion || !this.visible) return;
      this.timer = setInterval(() => {
        if (this.pinned || this.hovering || document.hidden) return;
        const ids = C.skills.map((g) => g.id);
        this.setActive(ids[(ids.indexOf(this.active) + 1) % ids.length]);
      }, 3600);
    }
  };

  /** Petit générateur pseudo-aléatoire déterministe. */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let r = Math.imul(a ^ (a >>> 15), 1 | a);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ========================================================================
     10. PALETTE DE COMMANDES
     ======================================================================== */
  const palette = {
    items: [],
    index: 0,
    lastFocus: null,

    init() {
      this.el = $('#palette');
      this.input = $('#palette-input');
      this.list = $('#palette-list');
      this.output = $('#palette-output');

      $$('[data-open-palette]').forEach((b) => b.addEventListener('click', () => this.open()));
      $$('[data-close-palette]', this.el).forEach((b) => b.addEventListener('click', () => this.close()));

      document.addEventListener('keydown', (e) => {
        const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); this.isOpen() ? this.close() : this.open(); }
        else if (e.key === '/' && !typing && !this.isOpen()) { e.preventDefault(); this.open(); }
      });

      this.input.addEventListener('input', () => { this.index = 0; this.output.hidden = true; this.render(); });
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); this.move(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); this.move(-1); }
        else if (e.key === 'Enter') { e.preventDefault(); this.run(this.items[this.index]); }
        else if (e.key === 'Escape') { e.preventDefault(); this.close(); }
        else if (e.key === 'Tab') { e.preventDefault(); this.move(e.shiftKey ? -1 : 1); } // focus maintenu dans la boîte
      });
      this.list.addEventListener('click', (e) => {
        const li = e.target.closest('[data-index]');
        if (li) this.run(this.items[+li.dataset.index]);
      });
      this.list.addEventListener('mousemove', (e) => {
        const li = e.target.closest('[data-index]');
        if (li && +li.dataset.index !== this.index) { this.index = +li.dataset.index; this.highlight(); }
      });
    },

    isOpen() { return !this.el.hidden; },

    open() {
      this.lastFocus = document.activeElement;
      this.el.hidden = false;
      this.input.value = '';
      this.output.hidden = true;
      this.index = 0;
      this.render();
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => this.input.focus());
    },

    close() {
      this.el.hidden = true;
      document.body.style.overflow = '';
      if (this.lastFocus && this.lastFocus.focus) this.lastFocus.focus();
    },

    /** Liste des commandes, reconstruite à chaque ouverture (suit la langue). */
    commands() {
      const go = (hash) => () => { this.close(); const el = $(hash); if (el) { el.scrollIntoView({ behavior: state.motion ? 'smooth' : 'auto' }); history.replaceState(null, '', hash); } };
      const nav = [
        ['nav.about', '#about', 'sparkle', 'about profil profile'],
        ['nav.experience', '#experience', 'briefcase', 'experience parcours timeline stage internship'],
        ['nav.projects', '#projects', 'server', 'projets projects hp proxmox topologie'],
        ['nav.skills', '#skills', 'shield', 'skills competences constellation'],
        ['nav.languages', '#languages', 'language', 'langues languages interets interests'],
        ['nav.contact', '#contact', 'mail', 'contact email linkedin alternance']
      ].map(([key, hash, ic, kw]) => ({ group: 'palette.group.nav', label: t(key), icon: ic, kw, meta: hash, action: go(hash) }));

      const actions = [
        { label: t('palette.lang'), icon: 'language', kw: 'langue language english francais fr en', meta: state.lang === 'fr' ? 'EN' : 'FR',
          action: () => { this.close(); applyLanguage(state.lang === 'fr' ? 'en' : 'fr', true); } },
        { label: t('palette.copy'), icon: 'copy', kw: 'copier copy email mail', meta: C.links.email, action: () => { this.close(); copyEmail(); } },
        { label: t('palette.mail'), icon: 'mail', kw: 'email mail ecrire write', action: () => { this.close(); window.location.href = 'mailto:' + C.links.email; } },
        { label: t('palette.motion'), icon: 'motion', kw: 'animations motion effets effects', action: () => { this.close(); setMotion(!state.motion, true); toast(t(state.motion ? 'toast.motion.on' : 'toast.motion.off')); } },
        { label: t('palette.top'), icon: 'arrow-up', kw: 'haut top accueil home', action: go('#hero') }
      ].map((c) => ({ group: 'palette.group.actions', ...c }));

      const links = [
        { label: 'LinkedIn', icon: 'network', kw: 'linkedin profil', meta: '↗', action: () => { this.close(); window.open(C.links.linkedin, '_blank', 'noopener'); } },
        { label: 'GitHub', icon: 'branch', kw: 'github', meta: '↗', action: () => { this.close(); window.open(C.links.github, '_blank', 'noopener'); } }
      ].map((c) => ({ group: 'palette.group.links', ...c }));

      return [...nav, ...actions, ...links];
    },

    render() {
      const q = norm(this.input.value.trim());
      const tokens = q.split(/\s+/).filter(Boolean);
      let items = this.commands().filter((c) => tokens.every((tk) => norm(c.label + ' ' + c.kw).includes(tk)));

      // Commandes « terminal » cachées (easter egg) : apparaissent seulement si on les tape
      const term = terminal.match(this.input.value.trim());
      if (term) items = [{ group: 'palette.group.secret', label: '$ ' + this.input.value.trim(), icon: 'terminal', meta: '↵', action: () => this.print(term()) }, ...items];

      this.items = items;
      this.index = clamp(this.index, 0, Math.max(items.length - 1, 0));

      if (!items.length) {
        this.list.innerHTML = `<li class="palette-empty" role="presentation">${esc(t('palette.empty'))}</li>`;
        this.input.removeAttribute('aria-activedescendant');
        return;
      }
      let html = '', group = null;
      items.forEach((c, i) => {
        if (c.group !== group) { group = c.group; html += `<li class="palette-group" role="presentation">${esc(t(group))}</li>`; }
        html += `<li class="palette-item" role="option" id="pal-${i}" data-index="${i}" aria-selected="${i === this.index}">
            ${icon(c.icon)}<span>${esc(c.label)}</span>${c.meta ? `<span class="meta">${esc(c.meta)}</span>` : ''}</li>`;
      });
      this.list.innerHTML = html;
      this.highlight();
    },

    move(step) {
      if (!this.items.length) return;
      this.index = (this.index + step + this.items.length) % this.items.length;
      this.highlight();
    },

    highlight() {
      $$('.palette-item', this.list).forEach((li) => li.setAttribute('aria-selected', String(+li.dataset.index === this.index)));
      const cur = $('#pal-' + this.index);
      if (cur) { this.input.setAttribute('aria-activedescendant', cur.id); cur.scrollIntoView({ block: 'nearest' }); }
    },

    run(cmd) { if (cmd) cmd.action(); },

    print(text) {
      this.output.textContent = text;
      this.output.hidden = false;
    }
  };

  /* ========================================================================
     11. COPIE DE L'E-MAIL & NOTIFICATIONS
     ======================================================================== */
  let toastTimer = null;
  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('is-visible'), 3200);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(C.links.email);
      toast(t('contact.copied'));
    } catch (e) {
      toast(t('contact.copyFail'));
    }
  }

  /* ========================================================================
     12. OBJET EN CHROME LIQUIDE — WebGL (raymarching de métaballes)
     ------------------------------------------------------------------------
     Trois sphères fusionnent (smooth-min) et une quatrième suit le curseur.
     La surface reflète un « studio » procédural (bandes de lumière, softbox
     violette et verte) avec un léger film iridescent sur les bords.
     Pause automatique hors écran / onglet masqué ; image fixe si animations
     coupées ; repli CSS (.blob-fallback) si WebGL est indisponible.
     ======================================================================== */
  const chrome = {
    running: false,
    visible: true,
    raf: 0,
    t0: performance.now(),
    mouse: [0, 0],
    target: [0, 0],

    VERT: 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}',

    FRAG: `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      uniform vec2 uRes;
      uniform float uTime;
      uniform vec4 uRot;          // cos/sin du lacet et du tangage
      uniform vec3 uA, uB, uC, uM; // centres des métaballes (uM = curseur)

      float smin(float a, float b, float k) {
        float h = clamp(.5 + .5 * (b - a) / k, 0., 1.);
        return mix(b, a, h) - k * h * (1. - h);
      }

      float map(vec3 p) {
        float dm = length(p - uM) - .24;              // goutte attirée par le curseur
        vec3 q = p;
        q.xz = vec2(uRot.x * q.x - uRot.y * q.z, uRot.y * q.x + uRot.x * q.z);
        q.yz = vec2(uRot.z * q.y - uRot.w * q.z, uRot.w * q.y + uRot.z * q.z);
        float d = smin(length(q - uA) - .62, length(q - uB) - .5, .55);
        d = smin(d, length(q - uC) - .42, .55);
        d = smin(d, dm, .45);
        d += .04 * sin(3.1 * q.x + uTime * 1.3) * sin(2.7 * q.y - uTime * 1.1) * sin(2.9 * q.z + uTime * .9);
        return d;
      }

      vec3 nrm(vec3 p) {
        vec2 e = vec2(.0015, 0.);
        return normalize(vec3(map(p + e.xyy) - map(p - e.xyy),
                              map(p + e.yxy) - map(p - e.yxy),
                              map(p + e.yyx) - map(p - e.yyx)));
      }

      // Environnement « studio » procédural reflété par le chrome
      vec3 env(vec3 r) {
        float y = r.y;
        vec3 col = mix(vec3(.09, .08, .15), vec3(.34, .29, .5), smoothstep(-.7, .05, y));
        col += vec3(.55, .52, .68) * smoothstep(.12, 0., abs(y + .5)) * .7;  // bande basse argentée
        col = mix(col, vec3(.93, .91, 1.), smoothstep(-.02, .32, y) * .85);
        col = mix(col, vec3(.09, .07, .18), smoothstep(.42, 1., y));
        col += vec3(1.) * smoothstep(.05, 0., abs(y + .02)) * .55;
        col += vec3(.6, .4, 1.) * pow(max(dot(r, normalize(vec3(-.9, .2, .45))), 0.), 6.) * 1.4;
        col += vec3(.72, 1., .27) * pow(max(dot(r, normalize(vec3(.95, -.35, .3))), 0.), 9.) * 1.1;
        col += vec3(1.) * pow(max(dot(r, normalize(vec3(.35, .8, .6))), 0.), 70.) * 2.6;
        return col;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - .5 * uRes) / uRes.y;
        vec3 ro = vec3(0., 0., 3.9);
        vec3 rd = normalize(vec3(uv, -1.25));
        float t = 2., minD = 9.;
        bool hit = false;
        for (int i = 0; i < 72; i++) {
          vec3 p = ro + rd * t;
          float d = map(p);
          minD = min(minD, d);
          if (d < .0012) { hit = true; break; }
          t += d;
          if (t > 6.) break;
        }
        if (hit) {
          vec3 p = ro + rd * t;
          vec3 n = nrm(p);
          vec3 r = reflect(rd, n);
          float fres = pow(1. - max(dot(n, -rd), 0.), 2.4);
          vec3 col = env(r) * (.8 + .32 * fres) + vec3(.05, .045, .08);
          vec3 iri = .55 + .45 * cos(6.2831 * (vec3(0., .33, .67) + fres * 1.4 + uTime * .04));
          col = mix(col, col * iri * 1.45, .4 * fres);
          col += vec3(.5, .32, 1.) * pow(fres, 4.) * .5;
          gl_FragColor = vec4(col, 1.);
        } else {
          // Halo violet autour de l'objet (alpha prémultiplié)
          float g = exp(-minD * 7.) * .42;
          gl_FragColor = vec4(vec3(.45, .28, 1.) * g, g);
        }
      }`,

    init() {
      this.wrap = $('.hero-visual');
      this.canvas = $('#chrome-canvas');
      if (!this.canvas) return;
      const gl = this.canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
      if (!gl) return; // le repli CSS reste affiché
      this.gl = gl;

      const sh = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
      };
      const vs = sh(gl.VERTEX_SHADER, this.VERT), fs = sh(gl.FRAGMENT_SHADER, this.FRAG);
      if (!vs || !fs) return;
      const prog = gl.createProgram();
      gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
      gl.useProgram(prog);

      // Triangle plein écran
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, 'p');
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      this.u = {};
      ['uRes', 'uTime', 'uRot', 'uA', 'uB', 'uC', 'uM'].forEach((n) => { this.u[n] = gl.getUniformLocation(prog, n); });

      this.resize();
      window.addEventListener('resize', () => { this.resize(); if (!this.running) this.draw(this.now()); });

      // Le curseur (ou le doigt) attire une goutte de chrome
      window.addEventListener('pointermove', (e) => {
        const r = this.wrap.getBoundingClientRect();
        this.target = [
          clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1.4, 1.4),
          clamp(-(((e.clientY - r.top) / r.height) * 2 - 1), -1.4, 1.4)
        ];
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([e]) => { this.visible = e.isIntersecting; this.onMotionChange(); }).observe(this.wrap);
      }
      document.addEventListener('visibilitychange', () => this.onMotionChange());

      this.draw(this.now());
      this.wrap.classList.add('webgl-ready');
      this.onMotionChange();
    },

    now() { return state.motion ? (performance.now() - this.t0) / 1000 : 2.4; },

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const size = this.canvas.getBoundingClientRect();
      // Plafond de pixels pour rester fluide sur les petites machines
      const scale = Math.min(dpr, 820 / Math.max(size.width, 1));
      this.canvas.width = Math.max(1, Math.round(size.width * scale));
      this.canvas.height = Math.max(1, Math.round(size.height * scale));
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    },

    draw(time) {
      const gl = this.gl, u = this.u;
      // Lissage du curseur (inertie « liquide »)
      this.mouse[0] += (this.target[0] - this.mouse[0]) * 0.06;
      this.mouse[1] += (this.target[1] - this.mouse[1]) * 0.06;
      const [mx, my] = state.motion ? this.mouse : [0.35, 0.2];
      const yaw = mx * 0.6 + time * 0.15, pitch = -my * 0.45;
      gl.uniform2f(u.uRes, this.canvas.width, this.canvas.height);
      gl.uniform1f(u.uTime, time);
      gl.uniform4f(u.uRot, Math.cos(yaw), Math.sin(yaw), Math.cos(pitch), Math.sin(pitch));
      gl.uniform3f(u.uA, Math.sin(time * 0.7) * 0.42, Math.cos(time * 0.9) * 0.28, Math.sin(time * 0.5) * 0.2);
      gl.uniform3f(u.uB, -Math.cos(time * 0.6 + 1) * 0.48, Math.sin(time * 0.8 + 2) * 0.36, Math.cos(time * 0.7) * 0.25);
      gl.uniform3f(u.uC, Math.sin(time * 0.5 + 4) * 0.3, -Math.sin(time * 0.6) * 0.45, Math.cos(time * 0.9 + 1) * 0.3);
      gl.uniform3f(u.uM, mx * 0.95, my * 0.85, 0.55);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },

    loop() {
      if (!this.running) return;
      this.draw(this.now());
      this.raf = requestAnimationFrame(() => this.loop());
    },

    /** Démarre ou arrête la boucle selon visibilité et préférence d'animation. */
    onMotionChange() {
      if (!this.gl) return;
      const shouldRun = state.motion && this.visible && !document.hidden;
      if (shouldRun && !this.running) { this.running = true; this.loop(); }
      else if (!shouldRun && this.running) { this.running = false; cancelAnimationFrame(this.raf); }
      if (!state.motion) this.draw(this.now()); // image fixe soignée
    }
  };

  /* ========================================================================
     13. EASTER EGGS — pour les profils techniques
     ======================================================================== */
  const terminal = {
    /** Renvoie une fonction produisant la sortie si la saisie est une commande connue. */
    match(input) {
      const cmd = norm(input).split(/\s+/)[0];
      const fr = state.lang === 'fr';
      const map = {
        help: () => (fr
          ? 'Commandes disponibles :\n  whoami   qui suis-je\n  nmap     scanner le profil\n  ping     tester la disponibilité\n  sudo     élever ses privilèges\n  ls       lister les sections'
          : 'Available commands:\n  whoami   who am I\n  nmap     scan the profile\n  ping     check availability\n  sudo     escalate privileges\n  ls       list sections'),
        whoami: () => t('egg.whoami'),
        sudo: () => t('egg.sudo'),
        ping: () => `PING bruno (git.swiss)\n${t('egg.ping')}\n--- 1 packet transmitted, 1 received, 0% packet loss ---`,
        ls: () => ['about/', 'experience/', 'projects/', 'skills/', 'languages/', 'contact/'].join('   '),
        nmap: () => (fr
          ? `Starting Nmap ( https://nmap.org )\nNmap scan report for bruno.alves (Genève, CH)\nHost is up — disponible pour une alternance.\n\nPORT      STATE     SERVICE     VERSION\n53/tcp    open      domain      AD DS · DNS · DHCP · GPO\n88/tcp    open      kerberos    durcissement AD · Tiering Model\n443/tcp   open      https       Entra ID · Intune · Microsoft 365\n3389/tcp  filtered  ms-wbt      bloqué par OPNsense, comme il se doit\n8006/tcp  open      proxmox     Proxmox VE (≈150 VM migrées)\n\nService Info: Langues: pt, fr, en, es, it\nNmap done: 1 IP address (1 host up)`
          : `Starting Nmap ( https://nmap.org )\nNmap scan report for bruno.alves (Geneva, CH)\nHost is up — available for a work-study position.\n\nPORT      STATE     SERVICE     VERSION\n53/tcp    open      domain      AD DS · DNS · DHCP · GPO\n88/tcp    open      kerberos    AD hardening · Tiering Model\n443/tcp   open      https       Entra ID · Intune · Microsoft 365\n3389/tcp  filtered  ms-wbt      blocked by OPNsense, as it should be\n8006/tcp  open      proxmox     Proxmox VE (≈150 VMs migrated)\n\nService Info: Languages: pt, fr, en, es, it\nNmap done: 1 IP address (1 host up)`)
      };
      return map[cmd] || null;
    }
  };

  /** Code Konami (↑↑↓↓←→←→BA) : bascule le mode « phosphore ». */
  function initKonami() {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === seq[pos] ? pos + 1 : (key === seq[0] ? 1 : 0);
      if (pos === seq.length) {
        pos = 0;
        const on = root.classList.toggle('phosphor');
        if (on) toast(t('egg.konami'));
      }
    });
  }

  /** Message discret dans la console du navigateur. */
  function consoleHello() {
    const fr = state.lang === 'fr';
    try {
      console.log('%c Bruno Alves %c cyber · sys · net ',
        'background:#cdbcff;color:#0b0a12;font-weight:700;padding:4px 6px;border-radius:4px 0 0 4px',
        'background:#c4ff45;color:#0b0a12;padding:4px 6px;border-radius:0 4px 4px 0');
      console.log(fr
        ? 'Vous inspectez le code source ? Bon réflexe de reconnaissance.\nEssayez Ctrl + K puis « nmap », ou le code Konami.\nContact : bruno.alves@git.swiss'
        : 'Inspecting the source? Good recon instinct.\nTry Ctrl + K then “nmap”, or the Konami code.\nContact: bruno.alves@git.swiss');
    } catch (e) { /* console indisponible */ }
  }

  /* ========================================================================
     14. INITIALISATION
     ======================================================================== */
  function init() {
    reveal.init();
    header.init();
    timeline.init();
    constellation.init();
    initProjects();
    palette.init();

    // Langue : boutons FR / EN
    $$('.lang-switch [data-lang]').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.lang !== state.lang) applyLanguage(b.dataset.lang, true);
    }));

    // Copie de l'e-mail
    $$('[data-copy-email]').forEach((b) => b.addEventListener('click', copyEmail));

    // Bouton d'animations (pied de page)
    const motionBtn = $('[data-toggle-motion]');
    if (motionBtn) motionBtn.addEventListener('click', () => {
      setMotion(!state.motion, true);
      toast(t(state.motion ? 'toast.motion.on' : 'toast.motion.off'));
    });

    // Suivre la préférence système si le visiteur n'a rien choisi explicitement
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.addEventListener) mq.addEventListener('change', (e) => { if (!store.get('ba-motion')) setMotion(!e.matches, false); });

    // Année du pied de page
    const year = $('#year');
    if (year) year.textContent = new Date().getFullYear();

    applyLanguage(state.lang, false); // rendu complet dans la langue mémorisée
    chrome.init();

    // Défilement : un seul gestionnaire, cadencé par requestAnimationFrame
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { header.onScroll(); timeline.update(); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    initKonami();
    consoleHello();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
