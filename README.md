# Bruno Alves — Portfolio

Portfolio bilingue (FR / EN) — Cybersécurité, Systèmes & Réseaux.
En ligne : https://burnba.github.io/portfolio/

HTML5 sémantique, CSS pur (variables), JavaScript vanilla. Aucun framework, aucune étape de build.

## Structure

```
index.html          structure de la page, textes FR du premier affichage, sprite d'icônes
content.js          tout le contenu et les traductions FR / EN (parcours, projets, compétences…)
style.css           design system (tokens CSS) et mise en page, responsive
script.js           langue, rendu du contenu, WebGL, topologie, constellation, palette…
assets/favicon.svg  icône d'onglet
assets/og-image.png aperçu de partage (1200 × 630)
.nojekyll           sert les fichiers tels quels sur GitHub Pages
```

## Modifier le contenu

Tout se passe dans `content.js` :

- **Ajouter un projet** : copier un objet du tableau `projects` (statut `"done"` ou `"wip"`).
- **Ajouter une expérience** : copier un objet du tableau `experiences` (le premier est le plus récent).
- **Ajouter une compétence** : l'ajouter dans `items` de la bonne catégorie de `skills`.
- **Texte d'interface** : clés de `ui.fr` / `ui.en`. Si une clé est aussi écrite en dur dans
  `index.html` (attribut `data-i18n`), garder le même texte français aux deux endroits.

Un texte peut être une chaîne simple (identique dans les deux langues) ou un objet `{ fr: "…", en: "…" }`.

## Fonctionnalités

- Objet en chrome liquide en WebGL qui réagit au curseur (repli CSS sans WebGL)
- Schéma interactif de l'infrastructure du showroom HP
- Parcours en timeline filtrable par domaine
- Constellation des compétences
- Palette de commandes : <kbd>Ctrl</kbd> + <kbd>K</kbd> (ou <kbd>/</kbd>)
- Langue et préférence d'animation mémorisées ; `prefers-reduced-motion` respecté

## Tester en local

```
python -m http.server 8000   # puis http://localhost:8000
```
