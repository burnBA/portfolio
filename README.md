# Bruno Alves — Portfolio

Portfolio bilingue (FR / EN) — Cybersécurité, Systèmes & Réseaux.
HTML5 sémantique, CSS pur (variables), JavaScript vanilla. Aucune dépendance, aucun build.

## Structure
```
index.html        contenu (FR par défaut) + sprite SVG du sigil
style.css         design system (tokens CSS) et mise en page
script.js         langue, intro, topologie animée, terminal, etc.
assets/sigil.svg  monogramme BA (favicon)
assets/fonts/     Unbounded, Manrope, JetBrains Mono (SIL OFL, auto-hébergées)
.nojekyll         désactive Jekyll sur GitHub Pages
```

## Modifier le contenu
- Texte français : directement dans `index.html` (attributs `data-i18n`).
- Texte anglais : objet `EN` en haut de `script.js`, même clé.

## Tester en local
Les polices exigent un serveur HTTP (pas `file://`) :
```
python -m http.server 8000   # puis http://localhost:8000
```

## Terminal
Touche `/` ou Ctrl+K : `help`, `whoami`, `skills`, `projects`, `experience`,
`contact`, `goto <section>`, `lang fr|en`, `nmap bruno`, `clear`, `exit`.
