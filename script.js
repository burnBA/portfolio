/* ==========================================================================
   BA·OS 2K — Comportements (JavaScript vanilla, sans dépendance)

   Modules (chacun initialisé en bas du fichier) :
     1. Utilitaires          — sélecteurs, stockage sûr, toast
     2. Langue (FR/EN)       — applique le dictionnaire assets/i18n.js
     3. Thème & effets       — clair / sombre / auto, CRT on/off
     4. Paramètres d'affichage (dialogue)
     5. Menu « BA »          — ouverture, fermeture, piège de focus
     6. Fenêtres             — réduire, agrandir, fermer, restaurer
     7. Fenêtre active       — scroll spy (barre des tâches + menu)
     8. Apparition au scroll — scroll reveal
     9. Accueil & terminal   — barre de chargement, lecture du terminal
    10. Projets              — filtres par tag + « Afficher plus »
    11. Divers               — copie de l'email, horloge, année

   Principe : le site reste complet et lisible sans JS. Le script n'ajoute
   que des améliorations (amélioration progressive).
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. UTILITAIRES
     ------------------------------------------------------------------------ */
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var root = document.documentElement;

  // L'utilisateur a-t-il demandé de réduire les animations ?
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Le système est-il en thème sombre ?
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  // localStorage peut lever une erreur (navigation privée, stockage bloqué) :
  // on l'enveloppe pour que le site fonctionne dans tous les cas.
  var store = {
    get: function (key) {
      try { return window.localStorage.getItem(key); } catch (e) { return null; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem(key, value); } catch (e) { /* ignoré */ }
    }
  };

  var I18N = window.BAOS_I18N || { en: {}, ui: { fr: {}, en: {} } };
  var lang = 'fr'; // langue courante (mise à jour par setLang)

  // Texte d'interface dans la langue courante
  function t(key) {
    var dict = I18N.ui[lang] || I18N.ui.fr;
    return dict[key];
  }

  // Petite notification en bas à droite (annoncée aux lecteurs d'écran)
  var toastEl = $('#toast');
  var toastTimer = null;
  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-visible'); }, 2800);
  }


  /* ------------------------------------------------------------------------
     2. LANGUE (FR/EN)
     Le HTML contient le français. Au démarrage, on mémorise ce texte d'origine
     pour chaque élément [data-i18n], puis on remplace par l'anglais au besoin.
     Attributs traduits via data-i18n-attr="aria-label:cle;title:cle2".
     ------------------------------------------------------------------------ */
  var i18nNodes = $$('[data-i18n]').map(function (el) {
    return { el: el, key: el.getAttribute('data-i18n'), fr: el.innerHTML };
  });

  var i18nAttrs = [];
  $$('[data-i18n-attr]').forEach(function (el) {
    el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
      var parts = pair.split(':');
      var attr = parts[0].trim();
      i18nAttrs.push({ el: el, attr: attr, key: (parts[1] || '').trim(), fr: el.getAttribute(attr) });
    });
  });

  var langToggle = $('#lang-toggle');
  var metaDescription = $('meta[name="description"]');

  function setLang(next, persist) {
    lang = next === 'en' ? 'en' : 'fr';
    var en = I18N.en || {};

    i18nNodes.forEach(function (n) {
      n.el.innerHTML = (lang === 'en' && en[n.key] !== undefined) ? en[n.key] : n.fr;
    });
    i18nAttrs.forEach(function (a) {
      var value = (lang === 'en' && en[a.key] !== undefined) ? en[a.key] : a.fr;
      if (value !== null) a.el.setAttribute(a.attr, value);
    });

    root.setAttribute('lang', lang);
    document.title = t('title');
    if (metaDescription) metaDescription.setAttribute('content', t('description'));

    // Le bouton propose toujours l'AUTRE langue
    if (langToggle) {
      langToggle.textContent = t('langToggleShort');
      langToggle.setAttribute('aria-label', t('langToggle'));
      langToggle.setAttribute('lang', t('langToggleLang'));
    }

    if (persist) store.set('baos-lang', lang);

    // Les modules qui affichent des textes dynamiques se mettent à jour
    document.dispatchEvent(new CustomEvent('baos:langchange'));
  }

  function initLang() {
    var saved = store.get('baos-lang');
    var browser = (navigator.languages && navigator.languages[0]) || navigator.language || 'fr';
    // Choix mémorisé, sinon langue du navigateur (anglais si le navigateur est en anglais)
    var initial = saved || (/^en\b/i.test(browser) ? 'en' : 'fr');
    setLang(initial, false);

    if (langToggle) {
      langToggle.addEventListener('click', function () {
        setLang(lang === 'fr' ? 'en' : 'fr', true);
      });
    }
  }


  /* ------------------------------------------------------------------------
     3. THÈME & EFFETS
     theme : 'auto' (suit le système), 'light' ou 'dark' — mémorisé.
     Le script inline du <head> a déjà appliqué le thème pour éviter un flash.
     ------------------------------------------------------------------------ */
  var themeToggle = $('#theme-toggle');
  var metaThemeColor = $('meta[name="theme-color"]');

  function getThemePref() {
    var saved = store.get('baos-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'auto';
  }

  // Thème réellement affiché (résout « auto » selon le système)
  function effectiveTheme() {
    var pref = getThemePref();
    if (pref === 'auto') return systemDark.matches ? 'dark' : 'light';
    return pref;
  }

  function applyTheme(pref) {
    if (pref === 'light' || pref === 'dark') {
      root.setAttribute('data-theme', pref);
      store.set('baos-theme', pref);
    } else {
      root.removeAttribute('data-theme');
      store.set('baos-theme', 'auto');
    }
    refreshThemeUi();
  }

  function refreshThemeUi() {
    var dark = effectiveTheme() === 'dark';
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', dark ? t('themeToLight') : t('themeToDark'));
    }
    if (metaThemeColor) metaThemeColor.setAttribute('content', dark ? '#120E1F' : '#4C1D95');
  }

  function getCrt() {
    return store.get('baos-crt') === 'off' ? 'off' : 'on';
  }

  function applyCrt(value) {
    if (value === 'off') root.setAttribute('data-crt', 'off');
    else root.removeAttribute('data-crt');
    store.set('baos-crt', value);
  }

  function initTheme() {
    refreshThemeUi();
    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        applyTheme(effectiveTheme() === 'dark' ? 'light' : 'dark');
      });
    }
    // Si le visiteur est en mode « auto », suivre les changements du système
    var onSystemChange = function () { if (getThemePref() === 'auto') refreshThemeUi(); };
    if (systemDark.addEventListener) systemDark.addEventListener('change', onSystemChange);
    else if (systemDark.addListener) systemDark.addListener(onSystemChange);

    document.addEventListener('baos:langchange', refreshThemeUi);
  }


  /* ------------------------------------------------------------------------
     4. PARAMÈTRES D'AFFICHAGE (élément <dialog> natif)
     Les valeurs ne sont appliquées qu'au clic sur « OK » ; « Annuler »,
     la croix ou Échap ferment sans rien changer.
     ------------------------------------------------------------------------ */
  var settingsDialog = $('#settings-dialog');

  function openSettings() {
    if (!settingsDialog || typeof settingsDialog.showModal !== 'function') return;
    var form = $('form', settingsDialog);
    // Pré-remplit le formulaire avec l'état actuel
    $$('input[name="theme"]', form).forEach(function (input) { input.checked = input.value === getThemePref(); });
    $('input[name="crt"]', form).checked = getCrt() === 'on';
    $$('input[name="lang"]', form).forEach(function (input) { input.checked = input.value === lang; });
    closeStartMenu(false);
    settingsDialog.showModal();
  }

  function initSettings() {
    if (!settingsDialog) return;

    // Navigateur sans <dialog> : on masque les accès au dialogue
    if (typeof settingsDialog.showModal !== 'function') {
      $$('#settings-open, [data-open-settings]').forEach(function (btn) { btn.hidden = true; });
      return;
    }

    $$('#settings-open, [data-open-settings]').forEach(function (btn) {
      btn.addEventListener('click', openSettings);
    });

    settingsDialog.addEventListener('close', function () {
      if (settingsDialog.returnValue !== 'ok') return;
      var form = $('form', settingsDialog);
      var themeInput = $('input[name="theme"]:checked', form);
      var langInput = $('input[name="lang"]:checked', form);
      applyTheme(themeInput ? themeInput.value : 'auto');
      applyCrt($('input[name="crt"]', form).checked ? 'on' : 'off');
      if (langInput && langInput.value !== lang) setLang(langInput.value, true);
      toast(t('settingsSaved'));
    });
  }


  /* ------------------------------------------------------------------------
     5. MENU « BA » (façon menu Démarrer ; sert de menu burger sur mobile)
     - Échap ferme et rend le focus au bouton
     - le focus reste dans le menu tant qu'il est ouvert (Tab / Maj+Tab)
     - un clic hors du menu ou sur un lien le ferme
     ------------------------------------------------------------------------ */
  var startButton = $('#start-button');
  var startMenu = $('#start-menu');

  function focusables(container) {
    return $$('a[href], button:not([disabled]):not([hidden]), input, [tabindex]:not([tabindex="-1"])', container)
      .filter(function (el) { return el.offsetParent !== null; });
  }

  function openStartMenu() {
    startMenu.hidden = false;
    startButton.setAttribute('aria-expanded', 'true');
    var first = focusables(startMenu)[0];
    if (first) first.focus();
  }

  function closeStartMenu(returnFocus) {
    if (!startMenu || startMenu.hidden) return;
    startMenu.hidden = true;
    startButton.setAttribute('aria-expanded', 'false');
    if (returnFocus) startButton.focus();
  }

  function initStartMenu() {
    if (!startButton || !startMenu) return;

    startButton.addEventListener('click', function () {
      if (startMenu.hidden) openStartMenu();
      else closeStartMenu(true);
    });

    startMenu.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeStartMenu(true);
        return;
      }
      if (event.key !== 'Tab') return;
      var items = focusables(startMenu);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Échap fonctionne aussi quand le focus est sur le bouton « BA »
    startButton.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeStartMenu(true);
    });

    // Clic en dehors du menu
    document.addEventListener('pointerdown', function (event) {
      if (startMenu.hidden) return;
      if (startMenu.contains(event.target) || startButton.contains(event.target)) return;
      closeStartMenu(false);
    });

    // Un lien du menu (section, email, réseaux) ferme le menu
    $$('a', startMenu).forEach(function (link) {
      link.addEventListener('click', function () { closeStartMenu(false); });
    });
  }


  /* ------------------------------------------------------------------------
     6. FENÊTRES : réduire, agrandir, fermer, restaurer
     ------------------------------------------------------------------------ */
  var windows = $$('[data-window]');

  // Nom affiché d'une fenêtre (celui de sa barre de titre)
  function windowName(win) {
    var file = $('.window__file', win);
    return file ? file.textContent.trim() : win.id;
  }

  // Met à jour le bouton de la barre des tâches d'une fenêtre fermée/ouverte
  function markTask(id, closed) {
    $$('.task[data-task="' + id + '"]').forEach(function (task) {
      task.classList.toggle('is-closed', closed);
    });
  }

  function setMinimized(win, minimized) {
    win.classList.toggle('is-minimized', minimized);
    var btn = $('[data-action="minimize"]', win);
    if (btn) {
      btn.setAttribute('aria-expanded', String(!minimized));
      btn.setAttribute('aria-label', minimized ? t('expand') : t('minimize'));
    }
  }

  function setMaximized(win, maximized) {
    win.classList.toggle('is-maximized', maximized);
    var btn = $('[data-action="maximize"]', win);
    if (btn) {
      btn.setAttribute('aria-pressed', String(maximized));
      btn.setAttribute('aria-label', maximized ? t('restore') : t('maximize'));
      var use = $('use', btn);
      if (use) use.setAttribute('href', maximized ? '#g-restore' : '#g-max');
    }
  }

  function closeWindow(win) {
    win.hidden = true;
    markTask(win.id, true);
    toast(t('closed')(windowName(win)));
    // Le focus ne doit pas se perdre : on le place sur le bouton de tâche correspondant
    var task = $('.task[data-task="' + win.id + '"]');
    if (task && task.offsetParent !== null) task.focus();
    else if (startButton) startButton.focus();
  }

  // Rouvre une fenêtre fermée et la déplie si elle était réduite
  function restoreWindow(win) {
    if (!win) return;
    if (win.hidden) {
      win.hidden = false;
      markTask(win.id, false);
      win.classList.add('is-visible'); // pas d'animation d'apparition à refaire
    }
    if (win.classList.contains('is-minimized')) setMinimized(win, false);
  }

  function initWindows() {
    windows.forEach(function (win) {
      $$('[data-action]', win).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var action = btn.getAttribute('data-action');
          if (action === 'minimize') setMinimized(win, !win.classList.contains('is-minimized'));
          if (action === 'maximize') setMaximized(win, !win.classList.contains('is-maximized'));
          if (action === 'close') closeWindow(win);
        });
      });

      // Double-clic sur la barre de titre = agrandir / restaurer (comme sur un vrai OS)
      var bar = $('.window__titlebar', win);
      if (bar && $('[data-action="maximize"]', win)) {
        bar.addEventListener('dblclick', function (event) {
          if (event.target.closest('button')) return;
          setMaximized(win, !win.classList.contains('is-maximized'));
        });
      }
    });

    // Tout lien interne vers une fenêtre (ou un élément qu'elle contient) la restaure
    document.addEventListener('click', function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;
      var target = document.getElementById(link.getAttribute('href').slice(1));
      if (!target) return;
      restoreWindow(target.closest('[data-window]'));
    });

    // Même chose si l'on arrive directement sur une URL avec ancre
    var initial = window.location.hash && document.getElementById(window.location.hash.slice(1));
    if (initial) restoreWindow(initial.closest('[data-window]'));

    // Les libellés dynamiques des boutons suivent la langue
    document.addEventListener('baos:langchange', function () {
      windows.forEach(function (win) {
        if (win.classList.contains('is-minimized')) setMinimized(win, true);
        if (win.classList.contains('is-maximized')) setMaximized(win, true);
      });
    });
  }


  /* ------------------------------------------------------------------------
     7. FENÊTRE ACTIVE (scroll spy)
     La fenêtre qui traverse le milieu de l'écran devient « active » :
     barre de titre violette + bouton enfoncé dans la barre des tâches.
     ------------------------------------------------------------------------ */
  function setActive(id) {
    windows.forEach(function (win) { win.classList.toggle('is-active', win.id === id); });
    $$('[data-task]').forEach(function (link) {
      if (link.getAttribute('data-task') === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) {
      root.classList.remove('js'); // repli : barres de titre toutes actives
      return;
    }
    setActive('accueil');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' }); // bande étroite au milieu de l'écran
    windows.forEach(function (win) { observer.observe(win); });
  }


  /* ------------------------------------------------------------------------
     8. APPARITION AU SCROLL
     ------------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('.reveal');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // une seule fois
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    items.forEach(function (el) { observer.observe(el); });
  }


  /* ------------------------------------------------------------------------
     9. ACCUEIL & TERMINAL
     ------------------------------------------------------------------------ */

  // Barre de chargement : 0 → 100 % en moins d'une seconde (instantané si mouvement réduit)
  function initLoader() {
    var loader = $('.loader');
    if (!loader) return;
    var fill = $('.loader__fill', loader);
    var value = $('.loader__value', loader);
    if (reducedMotion.matches) return; // reste à 100 % (état du HTML)

    var duration = 900;
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var progress = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - progress, 3); // décélération
      var percent = Math.round(eased * 100);
      // Remplissage par paliers de 10 px pour l'effet « segments »
      fill.style.setProperty('--progress', percent + '%');
      value.textContent = percent + ' %';
      if (progress < 1) window.requestAnimationFrame(frame);
    }
    fill.style.setProperty('--progress', '0%');
    window.requestAnimationFrame(frame);
  }

  // Terminal : les lignes s'affichent une à une, une seule fois, quand il devient visible
  function initTerminal() {
    var terminal = $('#terminal');
    if (!terminal) return;
    var lines = $$('.t-line', terminal);
    var finish = function () {
      terminal.classList.remove('is-playing');
      terminal.classList.add('is-played');
    };

    if (reducedMotion.matches || !('IntersectionObserver' in window)) {
      finish();
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      terminal.classList.add('is-playing');
      // Fin de la dernière animation → état final figé
      var last = lines[lines.length - 1];
      if (last) last.addEventListener('animationend', finish, { once: true });
      setTimeout(finish, lines.length * 380 + 600); // filet de sécurité
    }, { threshold: 0.35 });
    observer.observe(terminal);
  }


  /* ------------------------------------------------------------------------
     10. PROJETS : filtres par tag + « Afficher plus »
     - data-status sur chaque carte : "done" (Fait) ou "wip" (En cours)
     - les cartes [data-extra] restent masquées tant qu'on n'a pas déplié
     ------------------------------------------------------------------------ */
  function initProjects() {
    var grid = $('#programs');
    if (!grid) return;
    var cards = $$('.program', grid);
    var filterButtons = $$('[data-filter]');
    var moreButton = $('#programs-more');
    var emptyMessage = $('#programs-empty');
    var status = $('#projects-status');
    var currentFilter = 'all';
    var expanded = false;
    var announce = false; // pas d'annonce au chargement initial

    function render() {
      var visible = 0;
      cards.forEach(function (card) {
        var matches = currentFilter === 'all' || card.getAttribute('data-status') === currentFilter;
        var allowed = expanded || !card.hasAttribute('data-extra');
        var show = matches && allowed;
        var wasHidden = card.hidden;
        card.hidden = !show;
        if (show) {
          visible += 1;
          // Petite animation pour les cartes qui réapparaissent
          if (wasHidden && !reducedMotion.matches) {
            card.classList.remove('is-entering');
            void card.offsetWidth; // relance l'animation
            card.classList.add('is-entering');
          }
        }
      });

      emptyMessage.hidden = visible !== 0;

      // Le bouton « Afficher plus » n'a de sens que si des cartes « extra » correspondent au filtre
      var extrasForFilter = cards.filter(function (card) {
        return card.hasAttribute('data-extra') &&
          (currentFilter === 'all' || card.getAttribute('data-status') === currentFilter);
      }).length;
      moreButton.hidden = extrasForFilter === 0;
      moreButton.setAttribute('aria-expanded', String(expanded));
      $('span', moreButton).textContent = expanded ? t('less') : t('more');

      if (announce && status) status.textContent = t('projectsCount')(visible);
    }

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentFilter = btn.getAttribute('data-filter');
        filterButtons.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
        announce = true;
        render();
      });
    });

    moreButton.addEventListener('click', function () {
      expanded = !expanded;
      announce = true;
      render();
      // En dépliant, on amène le focus sur la première carte révélée
      if (expanded) {
        var firstExtra = cards.filter(function (c) { return c.hasAttribute('data-extra') && !c.hidden; })[0];
        if (firstExtra) {
          firstExtra.setAttribute('tabindex', '-1');
          firstExtra.focus({ preventScroll: false });
        }
      }
    });

    // Retour au texte dynamique dans la bonne langue
    document.addEventListener('baos:langchange', function () {
      announce = false;
      render();
    });

    render();
  }


  /* ------------------------------------------------------------------------
     11. DIVERS : copie de l'email, horloge de Genève, année du pied de page
     ------------------------------------------------------------------------ */
  function initCopy() {
    $$('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy');
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(
            function () { toast(t('copied')); },
            function () { toast(t('copyFailed')); }
          );
        } else {
          toast(t('copyFailed'));
        }
      });
    });
  }

  function initClock() {
    var clock = $('#clock');
    if (!clock) return;
    function tick() {
      var now = new Date();
      try {
        clock.textContent = new Intl.DateTimeFormat(t('locale'), {
          hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Zurich'
        }).format(now);
      } catch (e) {
        clock.textContent = now.toTimeString().slice(0, 5);
      }
      clock.setAttribute('datetime', now.toISOString());
    }
    tick();
    setInterval(tick, 15000);
    document.addEventListener('baos:langchange', tick);
  }

  function initYear() {
    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  }


  /* ------------------------------------------------------------------------
     DÉMARRAGE
     L'ordre compte : la langue d'abord (les autres modules lisent t()).
     ------------------------------------------------------------------------ */
  initLang();
  initTheme();
  initSettings();
  initStartMenu();
  initWindows();
  initScrollSpy();
  initReveal();
  initLoader();
  initTerminal();
  initProjects();
  initCopy();
  initClock();
  initYear();
})();
