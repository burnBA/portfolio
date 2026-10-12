/* ==========================================================================
   Bruno Alves — Portfolio · script.js
   JavaScript vanilla, sans dépendance. Chaque module est indépendant :
   si l'un échoue, le reste du site fonctionne (et sans JS, tout le contenu
   reste lisible en français).

   1. Utilitaires
   2. Traductions (FR / EN)
   3. Langue : application + mémorisation
   4. Intro (séquence de boot)
   5. Navigation : menu mobile, section active, progression
   6. Apparition au scroll
   7. Topologie réseau animée (canvas du hero)
   8. Horloge de Genève
   9. Reflet chrome sur les cartes projet
   10. Copie de l'adresse e-mail
   11. Terminal interactif
   12. Initialisation
   ========================================================================== */

(() => {
  "use strict";

  /* 1. UTILITAIRES --------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Accès au stockage protégé (navigation privée, cookies bloqués…)
  const store = {
    get(area, key) { try { return window[area].getItem(key); } catch { return null; } },
    set(area, key, val) { try { window[area].setItem(key, val); } catch { /* ignoré */ } },
  };

  // Échappe le HTML (sécurité : les saisies du terminal ne sont jamais interprétées)
  const escapeHTML = (s) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));


  /* 2. TRADUCTIONS ---------------------------------------------------------
     Le français est écrit directement dans le HTML (langue par défaut,
     bon pour le référencement et lisible sans JS). Au chargement, on capture
     ces textes FR depuis le DOM ; l'anglais est défini ci-dessous.
     Clés = valeurs des attributs data-i18n / data-i18n-aria / data-i18n-title. */
  const EN = {
    "intro.skip": "Click or press any key to skip",
    "a11y.skip": "Skip to content",
    "a11y.home": "Bruno Alves — home",
    "a11y.menu": "Open menu",
    "a11y.nav": "Main navigation",
    "a11y.newtab": " (opens in a new tab)",

    "nav.about": "About",
    "nav.path": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    "term.open": "Open the terminal",
    "term.close": "Close the terminal",
    "term.help": "Type help to list commands. Press Escape to close.",

    "hero.role": "Bachelor student in Cybersecurity, Systems &amp; Networks",
    "hero.tagsLabel": "Specialties",
    "hero.tag1": "Infrastructure &amp; hardening",
    "hero.status": "Seeking a work-study apprenticeship in Geneva — on-site, hybrid or remote",
    "hero.cta1": "View projects",
    "hero.cta2": "Get in touch",
    "hero.hint": "Tip: press <kbd>/</kbd> to open the terminal",
    "hero.readout": "OPEN · WORK-STUDY",

    "about.title": "About",
    "about.p1": "Bachelor student in cybersecurity, systems and networks at the <strong>Geneva Institute of Technology</strong>, with diverse hands-on experience: infrastructure and virtualisation at <strong>HP</strong>, AI applied to cybersecurity at <strong>Cybersherpa</strong>, and IT support at the <strong>IOC</strong>.",
    "about.p2": "I am looking for a work-study apprenticeship in Geneva. Versatile, autonomous and field-oriented, I work comfortably in French and English, with end users and technical teams alike.",
    "about.p3": "My profile is deliberately twofold: <strong>cybersecurity</strong> as my specialty (Active Directory security, pentesting, Blue Team) and <strong>general IT</strong> (infrastructure, networking, support) as my foundation.",

    "spec.edu": "Education",
    "spec.focus": "Specialty",
    "spec.base": "Foundation",
    "spec.baseVal": "Infrastructure · Networking · Support",
    "spec.mode": "Availability",
    "spec.modeVal": "On-site · Hybrid · Remote",
    "spec.zone": "Location",
    "spec.zoneVal": "Geneva, Switzerland",
    "spec.seek": "Seeking",
    "spec.seekVal": "Work-study apprenticeship",

    "path.title": "Experience",
    "path.h1.date": "May – Jun 2026",
    "path.h1.role": "Cybersecurity &amp; AI Solutions Intern",
    "path.h1.place": "Geneva",
    "path.h1.desc": "Designed a multi-agent pipeline for attack surface analysis. Modular architecture based on the open SKILL.md format, the Hermes Agent engine and a self-hosted Hermes Workspace console. Swiss legal framework built in as a design constraint (art. 143bis SCC). Final demonstration to the team.",
    "path.h2.date": "Apr – May 2026",
    "path.h2.role": "Infrastructure &amp; Network Technician Intern",
    "path.h2.desc": "Deployed an OPNsense firewall, VLAN segmentation, migration from VMware ESXi to Proxmox VE, full documentation.",
    "path.h3.date": "Mar – Apr 2026",
    "path.h3.role": "IT Support Technician",
    "path.h3.abbr": "International Olympic Committee",
    "path.h3.place": "Lausanne · via Stefanini",
    "path.h3.desc": "Headquarters Tech Bar (~600 staff), ~20 interventions a day. Entra ID, Intune, hardware/software, BIOS, drivers, networking. Ticket tracking and escalation in ServiceNow. Support in French and English.",
    "path.h4.date": "Mar 2022 – Feb 2026",
    "path.h4.role": "Auxiliary Security Officer",
    "path.h4.place": "Geneva · alongside my studies",
    "path.h4.desc": "Sensitive sites (jewellers, luxury watchmakers, banks), events (Watches &amp; Wonders four years running, Concours Hippique International), incident management and de-escalation, fire protocols, first-aid training.",
    "path.h5.date": "Jun 2018 – Feb 2020",
    "path.h5.role": "Volunteer · Spokesperson",
    "path.h5.place": "Geneva · UN-accredited association",
    "path.h5.desc": "Spoke at dozens of events; spokesperson in Room XX of the Palais des Nations before delegations, NGOs and UN leadership.",

    "projects.title": "Projects",
    "tag.done": "Done",
    "tag.wip": "In progress",
    "stack.agents": "AI agents",

    "p1.title": "Infrastructure &amp; virtualisation — HP Showroom",
    "p1.metricsLabel": "Key figures",
    "p1.m1": "VMs migrated",
    "p1.unit": "TB",
    "p1.m2": "of data",
    "p1.m3": "HPE ProLiant servers",
    "p1.m4": "data loss",
    "p1.desc1": "Migrated ~150 VMs (over 30 TB) from VMware ESXi to Proxmox VE via QEMU, live and during weekend maintenance windows, across 4 HPE ProLiant servers. Migration checklist and systematic backup before every cutover: zero data loss.",
    "p1.desc2": "OPNsense firewall, VLANs (Users / IoT / Printers), TrueNAS iSCSI storage, 3CX telephony. Documented the architecture, IP addressing plan and recovery procedure.",
    "p1.topoTitle": "Simplified topology: OPNsense segments the Users, IoT and Printers VLANs; a 4-node Proxmox cluster connected to TrueNAS storage over iSCSI.",
    "p1.vlanPrint": "VLAN Printers",

    "p2.title": "Multi-agent attack surface analysis pipeline — Cybersherpa",
    "p2.desc": "Modular SKILL.md architecture, Hermes Agent and a self-hosted Hermes Workspace, with Swiss legal constraints built in from the design stage.",
    "p2.flowLabel": "Architecture",
    "p2.note": "// legal framework: art. 143bis SCC built into the design",

    "p3.title": "IT &amp; security automation with AI agents",
    "p3.desc": "Personal lab built on Hermes Workspace: automating infrastructure, security and administration tasks. Architecture and scripts in place, optimisation underway.",
    "p3.build": "architecture [ok] · scripts [ok] · optimisation [..]",

    "p4.title": "Personal system utilities",
    "p4.desc": "Automated customisation scripts (wallpaper, Windows &amp; Linux boot screen), Linux settings customisation through a scripted interface, on-demand script launchers.",

    "skills.title": "Skills",
    "skills.g1": "Systems &amp; Networks",
    "skills.g2": "Virtualisation &amp; Storage",
    "skills.ha": "HA cluster",
    "skills.g4": "Cybersecurity",
    "skills.c1": "AD hardening",
    "skills.c2": "Attack surface analysis",
    "skills.c3": "AI agents applied to security",
    "skills.c4": "Controlled labs",
    "skills.g5": "Scripting &amp; automation",
    "skills.c5": "Administration scripts",
    "skills.langs": "Languages",
    "lang.pt": "Portuguese",
    "lang.native": "native",
    "lang.fr": "French",
    "lang.en": "English",
    "lang.es": "Spanish",
    "lang.esLvl": "spoken · B2 written",
    "lang.it": "Italian",
    "lang.itLvl": "spoken · B1 written",

    "hobbies.title": "// offline",
    "hobbies.h1": "Hiking, climbing &amp; via ferrata",
    "hobbies.h2": "Team sports &amp; combat sports",
    "hobbies.h3": "Mechanics &amp; motorsport",
    "hobbies.h4": "Technology &amp; cybersecurity",

    "contact.title": "Contact",
    "contact.lead": "Looking for a work-study apprentice in cybersecurity, infrastructure or networking in Geneva? Write to me — I reply quickly, in French or English.",
    "contact.copy": "copy",

    "footer.loc": "Geneva",
    "footer.hint": "type <kbd>/</kbd> then <code>help</code>",
  };

  // Métadonnées de page par langue
  const META = {
    fr: {
      title: "Bruno Alves — Cybersécurité, Systèmes & Réseaux",
      desc: "Bruno Alves — étudiant Bachelor Cybersécurité, Systèmes & Réseaux au GIT (Genève). Infrastructure, durcissement Active Directory, pentest et Blue Team. En recherche d'alternance à Genève.",
    },
    en: {
      title: "Bruno Alves — Cybersecurity, Systems & Networks",
      desc: "Bruno Alves — Bachelor student in Cybersecurity, Systems & Networks at GIT (Geneva). Infrastructure, Active Directory hardening, pentesting and Blue Team. Seeking a work-study apprenticeship in Geneva.",
    },
  };

  // Textes dynamiques (générés par JS) dans les deux langues
  const UI = {
    fr: {
      copied: "› adresse copiée dans le presse-papiers",
      copyFail: "› copie impossible : sélectionnez l'adresse manuellement",
      copiedBtn: "copié ✓",
    },
    en: {
      copied: "› address copied to clipboard",
      copyFail: "› copy failed: please select the address manually",
      copiedBtn: "copied ✓",
    },
  };

  const FR = {}; // rempli depuis le DOM au démarrage
  let lang = "fr";


  /* 3. LANGUE -------------------------------------------------------------- */
  // Mémorise les textes français présents dans le HTML
  function captureFrench() {
    $$("[data-i18n]").forEach((el) => { FR[el.dataset.i18n] ??= el.innerHTML; });
    $$("[data-i18n-aria]").forEach((el) => { FR[el.dataset.i18nAria] ??= el.getAttribute("aria-label"); });
    $$("[data-i18n-title]").forEach((el) => { FR[el.dataset.i18nTitle] ??= el.getAttribute("title"); });
  }

  function setLang(next, { persist = true } = {}) {
    lang = next === "en" ? "en" : "fr";
    const dict = lang === "en" ? EN : FR;

    $$("[data-i18n]").forEach((el) => {
      const v = dict[el.dataset.i18n];
      if (v != null) el.innerHTML = v; // contenu interne uniquement (aucune saisie utilisateur)
    });
    $$("[data-i18n-aria]").forEach((el) => {
      const v = dict[el.dataset.i18nAria];
      if (v != null) el.setAttribute("aria-label", v);
    });
    $$("[data-i18n-title]").forEach((el) => {
      const v = dict[el.dataset.i18nTitle];
      if (v != null) el.setAttribute("title", v);
    });

    document.documentElement.lang = lang;
    document.title = META[lang].title;
    $('meta[name="description"]')?.setAttribute("content", META[lang].desc);

    $$(".lang-switch button").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));

    if (persist) store.set("localStorage", "ba-lang", lang);
  }

  function initLang() {
    captureFrench();
    // Français par défaut ; seul un choix explicite mémorisé passe en anglais
    setLang(store.get("localStorage", "ba-lang") === "en" ? "en" : "fr", { persist: false });
    $$(".lang-switch button").forEach((b) =>
      b.addEventListener("click", () => setLang(b.dataset.lang)));
  }


  /* 4. INTRO --------------------------------------------------------------- */
  function initIntro() {
    const intro = $("#intro");
    const root = document.documentElement;
    if (!intro || root.classList.contains("intro-seen") || reducedMotion.matches) {
      root.classList.add("intro-seen");
      return;
    }

    const log = $("#intro-log");
    const lines = lang === "en"
      ? ["> init sigil.ba ............ <span class=ok>ok</span>",
         "> mount /infra /net /sec ... <span class=ok>ok</span>",
         "> harden ad.tier0 .......... <span class=ok>ok</span>",
         "> handshake recruiter ...... <span class=ok>ready</span>"]
      : ["> init sigil.ba ............ <span class=ok>ok</span>",
         "> mount /infra /net /sec ... <span class=ok>ok</span>",
         "> harden ad.tier0 .......... <span class=ok>ok</span>",
         "> handshake recruteur ...... <span class=ok>prêt</span>"];

    let i = 0;
    const timers = [];
    const step = () => {
      if (i < lines.length) {
        log.innerHTML += lines[i++] + "\n";
        timers.push(setTimeout(step, 260));
      } else {
        timers.push(setTimeout(finish, 450));
      }
    };

    let done = false;
    function finish() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      intro.classList.add("is-done");
      store.set("sessionStorage", "ba-intro-seen", "1");
      setTimeout(() => root.classList.add("intro-seen"), 650);
      window.removeEventListener("keydown", finish);
    }

    // Passer l'intro : clic ou n'importe quelle touche
    intro.addEventListener("click", finish);
    window.addEventListener("keydown", finish);
    timers.push(setTimeout(step, 500));
    timers.push(setTimeout(finish, 3200)); // filet de sécurité
  }


  /* 5. NAVIGATION ---------------------------------------------------------- */
  function initNav() {
    const toggle = $("#nav-toggle");
    const nav = $("#site-nav");

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", lang === "en" ? "Open menu" : "Ouvrir le menu");
    };

    toggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label",
        open ? (lang === "en" ? "Close menu" : "Fermer le menu")
             : (lang === "en" ? "Open menu" : "Ouvrir le menu"));
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); toggle.focus(); }
    });

    // Lien actif selon la section visible
    const links = new Map($$('.site-nav a[href^="#"]').map((a) => [a.getAttribute("href").slice(1), a]));
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => { a.classList.remove("is-active"); a.removeAttribute("aria-current"); });
        const a = links.get(en.target.id);
        if (a) { a.classList.add("is-active"); a.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

    // Barre de progression (requestAnimationFrame pour rester fluide)
    const bar = $("#progress-bar");
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      ticking = false;
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }


  /* 6. APPARITION AU SCROLL ------------------------------------------------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));
  }


  /* 7. TOPOLOGIE RÉSEAU ANIMÉE ---------------------------------------------
     Des nœuds dérivent lentement ; ceux qui sont proches sont reliés.
     Régulièrement, un « paquet » vert parcourt un lien.
     Pause automatique hors écran / onglet masqué ; image fixe si mouvement réduit. */
  function initNetwork() {
    const canvas = $("#hero-net");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    const LINK = 150;
    let w, h, dpr, nodes = [], packets = [], raf = null, visible = true, lastPacket = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Densité proportionnelle à la surface, plafonnée pour la performance
      const count = Math.min(70, Math.round((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() < 0.12 ? 2.4 : 1.3, // quelques « serveurs » plus gros
      }));
      packets = [];
      if (reducedMotion.matches) draw(0);
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const edges = [];

      // Liens
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            edges.push([a, b]);
            ctx.strokeStyle = `rgba(169, 139, 255, ${0.22 * (1 - d / LINK)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      // Nœuds
      for (const n of nodes) {
        ctx.fillStyle = n.r > 2 ? "rgba(230, 222, 255, 0.85)" : "rgba(195, 175, 255, 0.55)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }

      if (reducedMotion.matches) return;

      // Nouveau paquet toutes les ~700 ms sur un lien au hasard
      if (t - lastPacket > 700 && edges.length) {
        const [a, b] = edges[(Math.random() * edges.length) | 0];
        packets.push({ a, b, p: 0 });
        lastPacket = t;
      }
      packets = packets.filter((pk) => (pk.p += 0.012) < 1);
      for (const pk of packets) {
        const x = pk.a.x + (pk.b.x - pk.a.x) * pk.p;
        const y = pk.a.y + (pk.b.y - pk.a.y) * pk.p;
        ctx.fillStyle = "#c6ff3d";
        ctx.shadowColor = "#c6ff3d";
        ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.arc(x, y, 1.8, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Déplacement (rebond sur les bords)
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
    }

    function loop(t) {
      draw(t);
      raf = requestAnimationFrame(loop);
    }
    function start() { if (!raf && visible && !document.hidden && !reducedMotion.matches) raf = requestAnimationFrame(loop); }
    function stop() { if (raf) cancelAnimationFrame(raf); raf = null; }

    new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop(); }).observe(canvas);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    reducedMotion.addEventListener?.("change", () => { stop(); resize(); start(); });

    let rt;
    addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 150); });
    resize();
    start();
  }


  /* 8. HORLOGE DE GENÈVE --------------------------------------------------- */
  function initClock() {
    const el = $("#clock");
    if (!el) return;
    const fmt = new Intl.DateTimeFormat("fr-CH", {
      timeZone: "Europe/Zurich", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZoneName: "short",
    });
    const tick = () => { el.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 1000);
  }


  /* 9. REFLET CHROME SUR LES CARTES ---------------------------------------- */
  function initCardSheen() {
    if (!matchMedia("(hover: hover)").matches) return;
    $$(".project").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }


  /* 10. COPIE DE L'E-MAIL --------------------------------------------------- */
  function initCopy() {
    const btn = $("#copy-email");
    const status = $("#copy-status");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        status.textContent = UI[lang].copied;
        btn.textContent = UI[lang].copiedBtn;
      } catch {
        status.textContent = UI[lang].copyFail;
      }
      setTimeout(() => {
        btn.innerHTML = (lang === "en" ? EN : FR)["contact.copy"];
        status.textContent = "";
      }, 2600);
    });
  }


  /* 11. TERMINAL INTERACTIF ------------------------------------------------
     Une façon ludique (et 100 % optionnelle) de parcourir le profil.
     Ouverture : touche « / », Ctrl/⌘ + K, ou le bouton >_ de l'en-tête.     */
  function initTerminal() {
    const dlg = $("#terminal");
    const out = $("#term-out");
    const form = $("#term-form");
    const input = $("#term-input");
    if (!dlg || typeof dlg.showModal !== "function") {
      $("#term-open")?.setAttribute("hidden", "");
      return;
    }

    const history = [];
    let hIndex = 0;

    // Réponses des commandes, dans les deux langues
    const T = {
      fr: {
        welcome: 'Session ouverte. Tapez <span class="hl">help</span> pour la liste des commandes.',
        help:
`<span class="hl">whoami</span>       qui suis-je
<span class="hl">skills</span>       compétences techniques
<span class="hl">projects</span>     projets
<span class="hl">experience</span>   parcours
<span class="hl">contact</span>      me joindre
<span class="hl">goto</span> &lt;section&gt;  about · path · projects · skills · contact
<span class="hl">lang</span> fr|en    changer de langue
<span class="hl">nmap</span> bruno   scanner le candidat
<span class="hl">clear</span>        effacer · <span class="hl">exit</span> fermer`,
        whoami: "Bruno Alves — étudiant Bachelor Cybersécurité, Systèmes & Réseaux (GIT, Genève).\nSpécialité : AD Security · Pentest · Blue Team. Socle : infra, réseau, support.\n<span class=\"ok\">Statut : en recherche d'alternance à Genève.</span>",
        experience: "01  Cybersherpa   stage cybersécurité & IA      mai–juin 2026\n02  HP            stage infra & réseau          avr.–mai 2026\n03  CIO           support IT (Tech Bar)         mars–avr. 2026\n04  Protectas     agent de sécurité             2022–2026\n05  IYSMUN        porte-parole (ONU)            2018–2020",
        projects: '[<span class="ok">fait</span>]     Infrastructure & virtualisation — HP Showroom\n[<span class="ok">fait</span>]     Pipeline multi-agents de surface d\'attaque — Cybersherpa\n[<span class="hl">en cours</span>] Automatisation IT & sécurité avec agents IA\n[<span class="ok">fait</span>]     Utilitaires système personnels',
        nmap: 'Starting Nmap scan on bruno.alves (gva.ch)\nPORT      STATE     SERVICE\n22/tcp    <span class="ok">open</span>      curiosity\n443/tcp   <span class="ok">open</span>      motivation\n389/tcp   <span class="ok">open</span>      ad-hardening\n3389/tcp  filtered  rdp (durci, évidemment)\n\nHost is up. Recommandation : <span class="hl">sudo hire bruno</span>',
        hire: '[sudo] mot de passe pour recruteur : ********\n<span class="ok">Accès accordé.</span> Redirection vers la section contact…',
        unknown: (c) => `commande introuvable : ${c} — tapez <span class="hl">help</span>`,
        goto: (s) => `→ ${s}`,
        gotoErr: "section inconnue. Choix : about · path · projects · skills · contact",
        langOk: "langue : français",
        langErr: "usage : lang fr|en",
        sudo: "Permission refusée. Essayez plutôt : sudo hire bruno",
      },
      en: {
        welcome: 'Session opened. Type <span class="hl">help</span> to list commands.',
        help:
`<span class="hl">whoami</span>       who am I
<span class="hl">skills</span>       technical skills
<span class="hl">projects</span>     projects
<span class="hl">experience</span>   experience
<span class="hl">contact</span>      reach me
<span class="hl">goto</span> &lt;section&gt;  about · path · projects · skills · contact
<span class="hl">lang</span> fr|en    switch language
<span class="hl">nmap</span> bruno   scan the candidate
<span class="hl">clear</span>        clear · <span class="hl">exit</span> close`,
        whoami: "Bruno Alves — Bachelor student in Cybersecurity, Systems & Networks (GIT, Geneva).\nSpecialty: AD Security · Pentest · Blue Team. Foundation: infra, networking, support.\n<span class=\"ok\">Status: seeking a work-study apprenticeship in Geneva.</span>",
        experience: "01  Cybersherpa   cybersecurity & AI intern     May–Jun 2026\n02  HP            infra & network intern        Apr–May 2026\n03  IOC           IT support (Tech Bar)         Mar–Apr 2026\n04  Protectas     security officer              2022–2026\n05  IYSMUN        spokesperson (UN)             2018–2020",
        projects: '[<span class="ok">done</span>]        Infrastructure & virtualisation — HP Showroom\n[<span class="ok">done</span>]        Multi-agent attack surface pipeline — Cybersherpa\n[<span class="hl">in progress</span>] IT & security automation with AI agents\n[<span class="ok">done</span>]        Personal system utilities',
        nmap: 'Starting Nmap scan on bruno.alves (gva.ch)\nPORT      STATE     SERVICE\n22/tcp    <span class="ok">open</span>      curiosity\n443/tcp   <span class="ok">open</span>      motivation\n389/tcp   <span class="ok">open</span>      ad-hardening\n3389/tcp  filtered  rdp (hardened, obviously)\n\nHost is up. Recommendation: <span class="hl">sudo hire bruno</span>',
        hire: '[sudo] password for recruiter: ********\n<span class="ok">Access granted.</span> Redirecting to the contact section…',
        unknown: (c) => `command not found: ${c} — type <span class="hl">help</span>`,
        goto: (s) => `→ ${s}`,
        gotoErr: "unknown section. Options: about · path · projects · skills · contact",
        langOk: "language: English",
        langErr: "usage: lang fr|en",
        sudo: "Permission denied. Try: sudo hire bruno",
      },
    };

    const skillsText = () => {
      const lines = $$(".skill-group:not(.skill-group--langs)").map((g) => {
        const title = $("h3", g).textContent.trim();
        const items = $$(".chips li", g).map((li) => li.textContent.trim()).join(", ");
        return `<span class="hl">${escapeHTML(title)}</span>\n  ${escapeHTML(items)}`;
      });
      return lines.join("\n");
    };

    const contactText = () =>
      'mail      <a href="mailto:bruno.alves@git.swiss">bruno.alves@git.swiss</a>\n' +
      'github    <a href="https://github.com/burnBA" target="_blank" rel="noopener noreferrer">github.com/burnBA</a>\n' +
      'linkedin  <a href="https://www.linkedin.com/in/bruno-alves-256067211/" target="_blank" rel="noopener noreferrer">linkedin.com/in/bruno-alves-256067211</a>';

    const SECTIONS = ["about", "path", "projects", "skills", "contact"];

    function print(cmd, html, cls = "res") {
      if (cmd !== null) {
        const c = document.createElement("div");
        c.className = "cmd";
        c.textContent = cmd; // saisie affichée en texte brut, jamais en HTML
        out.appendChild(c);
      }
      if (html) {
        const r = document.createElement("div");
        r.className = cls;
        r.innerHTML = html; // contenu défini par le site uniquement
        out.appendChild(r);
      }
      out.scrollTop = out.scrollHeight;
    }

    function goTo(id) {
      dlg.close();
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
      // Place le focus sur le titre de la section (utile au clavier / lecteur d'écran)
      const h = $("h2", target);
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
    }

    function run(raw) {
      const line = raw.trim();
      const t = T[lang];
      if (!line) return print("", "");
      const [cmd, ...args] = line.toLowerCase().split(/\s+/);

      switch (cmd) {
        case "help": case "?": return print(line, t.help);
        case "whoami": return print(line, t.whoami);
        case "skills": return print(line, skillsText());
        case "projects": return print(line, t.projects);
        case "experience": case "path": case "traceroute": return print(line, t.experience);
        case "contact": return print(line, contactText());
        case "nmap": return print(line, t.nmap);
        case "clear": out.innerHTML = ""; return;
        case "exit": case "quit": return dlg.close();
        case "lang":
          if (args[0] === "fr" || args[0] === "en") {
            setLang(args[0]);
            return print(line, T[lang].langOk, "res ok");
          }
          return print(line, t.langErr, "res err");
        case "goto": case "cd": {
          const s = (args[0] || "").replace(/^[#~/.]+/, "");
          if (SECTIONS.includes(s)) { print(line, t.goto(s)); return setTimeout(() => goTo(s), 250); }
          return print(line, t.gotoErr, "res err");
        }
        case "sudo":
          if (args.join(" ") === "hire bruno") {
            print(line, t.hire);
            return setTimeout(() => goTo("contact"), 1100);
          }
          return print(line, t.sudo, "res err");
        default:
          return print(line, t.unknown(escapeHTML(cmd)), "res err");
      }
    }

    function open() {
      if (dlg.open) return;
      if (!out.childElementCount) print(null, T[lang].welcome);
      dlg.showModal();
      input.focus();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = input.value;
      if (v.trim()) { history.push(v); hIndex = history.length; }
      input.value = "";
      run(v);
    });

    // Historique avec les flèches ↑ / ↓, autocomplétion avec Tab
    const COMMANDS = ["help", "whoami", "skills", "projects", "experience", "contact", "goto", "lang", "nmap", "clear", "exit"];
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp" && history.length) {
        e.preventDefault(); hIndex = Math.max(0, hIndex - 1); input.value = history[hIndex];
      } else if (e.key === "ArrowDown" && history.length) {
        e.preventDefault(); hIndex = Math.min(history.length, hIndex + 1); input.value = history[hIndex] ?? "";
      } else if (e.key === "Tab" && input.value.trim() && !input.value.includes(" ")) {
        const match = COMMANDS.find((c) => c.startsWith(input.value.trim().toLowerCase()));
        if (match) { e.preventDefault(); input.value = match + " "; }
      }
    });

    // Clic sur le fond (backdrop) = fermeture
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    $("#term-open").addEventListener("click", open);
    $("#term-close").addEventListener("click", () => dlg.close());
    dlg.addEventListener("close", () => $("#term-open").focus({ preventScroll: true }));

    // Raccourcis globaux (ignorés pendant la saisie dans un champ)
    document.addEventListener("keydown", (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) ||
                     document.activeElement?.isContentEditable;
      if (!document.documentElement.classList.contains("intro-seen")) return;
      if ((e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) ||
          (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey))) {
        e.preventDefault();
        open();
      }
    });
  }


  /* 12. INITIALISATION ------------------------------------------------------ */
  function init() {
    const modules = [initLang, initIntro, initNav, initReveal, initNetwork, initClock, initCardSheen, initCopy, initTerminal];
    modules.forEach((fn) => {
      try { fn(); } catch (err) { console.error(`[portfolio] ${fn.name} :`, err); }
    });
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
