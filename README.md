# BA·OS 2K — Portfolio de Bruno Alves

Portfolio personnel (cybersécurité, systèmes & réseaux · Genève), publié sur GitHub Pages :
**https://burnba.github.io/portfolio/**

Direction artistique : **Y2K × anciens systèmes d'exploitation**. Le site imite un bureau
d'ordinateur de l'an 2000 : chaque section est une fenêtre, la navigation passe par une
barre des tâches et un menu « BA », le contact est une boîte de dialogue et la partie
cyber s'affiche dans un terminal. Aucun logo ni élément de marque d'éditeur n'est reproduit.

## Structure

```
index.html            Page unique, HTML5 sémantique, textes en français
style.css             Design system (variables CSS) + composants + responsive
script.js             Interactions (JavaScript vanilla, aucune dépendance)
assets/
  i18n.js             Version anglaise + textes dynamiques FR/EN
  favicon.svg         Monogramme « BA » en pixel art
  favicon-32.png
  apple-touch-icon.png
tools/
  generate-icons.py   Génère le sprite d'icônes (dans index.html) et les favicons
```

## Fonctionnalités

- Fenêtres réduire / agrandir / fermer, restaurables depuis la barre des tâches
- Barre des tâches avec fenêtre active (scroll spy) et horloge de Genève
- Menu « BA » façon menu Démarrer (= menu burger sur mobile), accessible au clavier
- Filtrage des projets par statut (Tous / Fait / En cours) + « Afficher plus »
- Thèmes « Lavande » (clair) et « Minuit » (sombre), automatique selon le système,
  réglables dans « Paramètres d'affichage » (avec les effets CRT et la langue)
- Bilingue FR / EN (choix mémorisé, langue du navigateur par défaut)
- Animations : apparition au scroll, terminal tapé ligne par ligne, barre de chargement
- Accessibilité : contrastes AA, focus visibles, `prefers-reduced-motion` respecté,
  contenu complet sans JavaScript

## Design system (résumé)

| Rôle | Valeur |
|---|---|
| Polices | Unbounded (titres) · Manrope (texte) · VT323 (UI OS, terminal, ≥ 18px) |
| Violets | `#4C1D95` · `#7C3AED` · `#A78BFA` · `#C4B5FD` |
| Verts | `#B6FF3B` acide (décor, focus) · `#7CFF6B` néon (terminal) · `#2E7D0F` (texte sur clair) |
| Encre | `#1B1530` (texte) · `#5B5470` (secondaire) |
| Rayons | `0` pour tout l'univers OS · `999px` pour tags et blobs |
| Espacements | grille de 4px (`--space-1` à `--space-10`) |

Tous les tokens sont en tête de `style.css` (section 1) et redéfinis pour le thème
sombre (section 2).

## Modifier le contenu

- **Texte français** : directement dans `index.html`.
- **Texte anglais** : la clé `data-i18n="…"` de l'élément, dans `assets/i18n.js`.
- **Nouveau projet** : copier un `<article class="program">` dans `#programs`, avec
  `data-status="done"` (Fait) ou `data-status="wip"` (En cours). Ajouter `data-extra`
  pour le placer dans la partie « Afficher plus ».
- **Icônes** : éditer les grilles ASCII de `tools/generate-icons.py`, puis
  `python3 tools/generate-icons.py` (nécessite Pillow).

## Tester en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement (GitHub Pages)

1. Pousser la branche `main` sur `github.com/burnBA/portfolio`.
2. *Settings → Pages* : source **Deploy from a branch**, branche `main`, dossier `/ (root)`.
3. Le site est servi à `https://burnba.github.io/portfolio/` (tous les chemins sont relatifs).
