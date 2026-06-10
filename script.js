/* ============================================================
   PORTFOLIO BRUNO ALVES — SCRIPT.JS
   JavaScript vanilla (aucune dépendance).
   Modules :
     1. Année automatique du footer
     2. Dark mode (bascule + persistance localStorage)
     3. Menu burger mobile (ouverture/fermeture + fermeture au clic lien)
     4. Filtrage des projets par statut
     5. Expand/collapse des détails de projet
     6. Scroll reveal (apparition au défilement)
   Le code s'exécute une fois le DOM chargé.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================================
     1. ANNÉE AUTOMATIQUE DU FOOTER
     Évite d'avoir à mettre à jour l'année à la main.
     ========================================================== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ==========================================================
     2. DARK MODE
     - Au chargement : applique le thème enregistré, sinon
       respecte la préférence système (prefers-color-scheme).
     - Au clic : bascule le thème et le mémorise.
     ========================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  const root = document.documentElement; // <html>

  // Détermine le thème initial
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next); // persistance
    });
  }


  /* ==========================================================
     3. MENU BURGER MOBILE
     - Bascule la classe .is-open sur le burger et la nav.
     - Met à jour aria-expanded pour l'accessibilité.
     - Se referme quand on clique sur un lien de navigation.
     ========================================================== */
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");

  if (burger && navLinks) {
    // Ouverture / fermeture au clic sur le burger
    burger.addEventListener("click", () => {
      const isOpen = burger.classList.toggle("is-open");
      navLinks.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
      // Met à jour le label pour les lecteurs d'écran
      burger.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    });

    // Fermeture quand on clique sur un lien (navigation mobile)
    navLinks.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        burger.classList.remove("is-open");
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Ouvrir le menu");
      });
    });
  }


  /* ==========================================================
     4. FILTRAGE DES PROJETS PAR STATUT
     - Chaque bouton .filter a un data-filter (all | done | wip).
     - Chaque carte a un data-status (done | wip).
     - On affiche/masque les cartes via la classe .is-hidden.
     ========================================================== */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".card");

  filters.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
      // Met à jour l'état actif des boutons
      filters.forEach((b) => b.classList.remove("is-active"));
      filterBtn.classList.add("is-active");

      const filterValue = filterBtn.getAttribute("data-filter");

      // Affiche ou masque chaque carte selon le filtre
      cards.forEach((card) => {
        const status = card.getAttribute("data-status");
        const show = filterValue === "all" || status === filterValue;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });


  /* ==========================================================
     5. EXPAND / COLLAPSE DES DÉTAILS DE PROJET
     - Chaque bouton .card__expand contrôle le bloc .card__details
       voisin dans la même carte.
     - Bascule l'attribut hidden et aria-expanded, et change le
       libellé du bouton (Détails / Réduire).
     ========================================================== */
  const expandBtns = document.querySelectorAll(".card__expand");

  expandBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Récupère le bloc détails dans la même carte
      const card = btn.closest(".card");
      const details = card.querySelector(".card__details");
      if (!details) return;

      const isExpanded = btn.getAttribute("aria-expanded") === "true";

      // Bascule l'affichage
      details.hidden = isExpanded;
      btn.setAttribute("aria-expanded", String(!isExpanded));
      btn.textContent = isExpanded ? "Détails" : "Réduire";
    });
  });


  /* ==========================================================
     6. SCROLL REVEAL
     - Utilise IntersectionObserver : ajoute .is-visible quand
       l'élément entre dans le viewport (apparition en fondu).
     - Cible les éléments rendus invisibles par le CSS au départ.
     - Si IntersectionObserver n'est pas supporté, tout est
       rendu visible immédiatement (fallback).
     ========================================================== */
  const revealEls = document.querySelectorAll(
    ".section__head, .about__grid, .card, .skillset, .contact__inner"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // on n'observe qu'une fois
          }
        });
      },
      {
        threshold: 0.12,           // déclenche à 12% visible
        rootMargin: "0px 0px -40px 0px",
      }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback : pas d'observer -> tout visible
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

});
