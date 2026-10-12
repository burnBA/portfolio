"""
Génère les icônes pixel art du site (outil de développement, non chargé par le site).

- Sprite SVG (icônes 16x16, glyphes 8x8 des boutons de fenêtre, monogramme « BA »)
  injecté dans index.html entre les marqueurs <!--SPRITE:START--> et <!--SPRITE:END-->.
- Favicons : assets/favicon.svg, assets/favicon-32.png, assets/apple-touch-icon.png.

Usage (depuis la racine du dépôt) :  python3 tools/generate-icons.py
Dépendance : Pillow (pip install pillow) pour les PNG.
Pour modifier une icône : éditer sa grille ASCII ci-dessous (16 caractères x 16 lignes),
chaque lettre correspond à une couleur du design system (voir COLORS).
"""
import os, re

OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # racine du dépôt

COLORS = {  # lettre -> remplissage (variables CSS avec repli)
    'k': 'var(--ico-k,#1B1530)', 'w': 'var(--ico-w,#FFFFFF)', 'l': 'var(--ico-l,#C4B5FD)',
    'v': 'var(--ico-v,#7C3AED)', 'g': 'var(--ico-g,#B6FF3B)', 'c': 'var(--ico-c,#D9D5E6)',
    'd': 'var(--ico-d,#0B0814)',
}

ICONS = {
 'i-computer': ["................","..kkkkkkkkkkkk..","..kcccccccccck..","..kckkkkkkkkck..","..kckvvvvvvkck..","..kckvgvvvvkck..","..kckvvvvvvkck..","..kckvvvvlvkck..","..kckkkkkkkkck..","..kcccccccccck..","..kkkkkkkkkkkk..","......kddk......","....kkkkkkkk....","....kcccccck....","....kkkkkkkk....","................"],
 'i-notepad': ["................","...kkkkkkkkkk...","...kvvvvvvvvk...","...kwwwwwwwwk...","...kwkkkkkkwk...","...kwwwwwwwwk...","...kwkkkkkwwk...","...kwwwwwwwwk...","...kwkkkkkkwk...","...kwwwwwwwwk...","...kwkkkkwwwk...","...kwwwwwwwwk...","...kwwwwwwggk...","...kwwwwwwwwk...","...kkkkkkkkkk...","................"],
 'i-log': ["................","..kkkkkkkk......","..kwwwwwwkk.....","..kwwwwwwkwk....","..kwwwwwwkkkk...","..kwwwwwwwwwk...","..kwgwkkkkkwk...","..kwwwwwwwwwk...","..kwgwkkkkwwk...","..kwwwwwwwwwk...","..kwgwkkkkkwk...","..kwwwwwwwwwk...","..kwgwkkkwwwk...","..kwwwwwwwwwk...","..kkkkkkkkkkk...","................"],
 'i-folder': ["................","................",".kkkkk..........",".kllllk.........",".klllllkkkkkkkk.",".kllllllllllllk.",".kkkkkkkkkkkkkk.",".kvvvvvvvvvvvvk.",".kvlvvvvvvvvvvk.",".kvvvvvvvvvvvvk.",".kvvvvvvvvvvvvk.",".kvvvvvvvvvvggk.",".kvvvvvvvvvvvvk.",".kkkkkkkkkkkkkk.","................","................"],
 'i-panel': ["................",".kkkkkkkkkkkkkk.",".kvvvvvvvvvvvvk.",".kkkkkkkkkkkkkk.",".kccccccccccccc.".replace('c.', 'k.'),".kckggkkkkkkkck.",".kcccccccccccck.",".kckkkkkkvvkkck.",".kcccccccccccck.",".kckkkkggkkkkck.",".kcccccccccccck.",".kkkkkkkkkkkkkk.","................","................","................","................"],
 'i-terminal': ["................",".kkkkkkkkkkkkkk.",".kvvvvvvvvvvwwk.",".kkkkkkkkkkkkkk.",".kddddddddddddk.",".kdgddddddddddk.",".kddgdddddddddk.",".kdgdggggdddddk.",".kddddddddddddk.",".kddddddddddddk.",".kkkkkkkkkkkkkk.","................","................","................","................","................"],
 'i-star': [".......k........","......kgk.......","......kgk.......",".....kgggk......","....kgggggk.....","..kkgggggggkk...","kkgggggwgggggkk.","kgggggwwwgggggk.","kkgggggwgggggkk.","..kkgggggggkk...","....kgggggk.....",".....kgggk......","......kgk.......","......kgk.......",".......k........","................"],
 'i-mail': ["................","................","................",".kkkkkkkkkkkkkk.",".kkwwwwwwwwwwkk.",".kwkwwwwwwwwkwk.",".kwwkwwwwwwkwwk.",".kwwwkwwwwkwwwk.",".kwwwwkkkkwwwwk.",".kwwwwwwwwwwwwk.",".kwwwwwwwwwwvvk.",".kwwwwwwwwwwvvk.",".kkkkkkkkkkkkkk.","................","................","................"],
 'i-info': ["................",".....kkkkkk.....","...kkvvvvvvkk...","..kvvvvwwvvvvk..",".kvvvvvwwvvvvvk.",".kvvvvvvvvvvvvk.","kvvvvvwwwvvvvvvk","kvvvvvvwwvvvvvvk","kvvvvvvwwvvvvvvk","kvvvvvvwwvvvvvvk",".kvvvvvwwvvvvvk.",".kvvvvwwwwvvvvk.","..kvvvvvvvvvvk..","...kkvvvvvvkk...",".....kkkkkk.....","................"],
 'i-shield': ["................","....kkkkkkkk....","..kkvvvvvvvvkk..","..kvvvvvvvvvvk..","..kvvvvggvvvvk..","..kvvvgwwgvvvk..","..kvvgwwwwgvvk..","..kvvvgwwgvvvk..","..kvvvvggvvvvk..","...kvvvvvvvvk...","...kvvvvvvvvk...","....kvvvvvvk....",".....kvvvvk.....","......kvvk......",".......kk.......","................"],
 'i-server': ["................","..kkkkkkkkkkkk..","..kcccccccccck..","..kcgccckkkkck..","..kcccccccccck..","..kkkkkkkkkkkk..","..kcccccccccck..","..kcgccckkkkck..","..kcccccccccck..","..kkkkkkkkkkkk..","..kcccccccccck..","..kcvccckkkkck..","..kcccccccccck..","..kkkkkkkkkkkk..","...kk......kk...","................"],
 'i-robot': [".......g........",".......k........","...kkkkkkkkkk...","...kcccccccck...","...kcggccggck...","...kcggccggck...","...kcccccccck...","...kckkkkkkck...","...kcccccccck...","...kkkkkkkkkk...",".....kvvvvk.....","...kkvvvvvvkk...","...kvvvvvvvvk...","...kvvlvvvvvk...","...kkkkkkkkkk...","................"],
 'i-floppy': ["................",".kkkkkkkkkkkkkk.",".kvkccccccckvvk.",".kvkccccckckvvk.",".kvkccccckckvvk.",".kvkccccccckvvk.",".kvvkkkkkkkvvvk.",".kvvvvvvvvvvvvk.",".kvvkkkkkkkkvvk.",".kvkwwwwwwwwkvk.",".kvkwkkkkkkwkvk.",".kvkwwwwwwwwkvk.",".kvkwkkkkwwwkvk.",".kvkwwwwwwwwkvk.",".kkkkkkkkkkkkkk.","................"],
 'i-contrast': ["................","................",".....kkkkkk.....","...kkwwwkkkkk...","..kwwwwwkkkkkk..","..kwwwwwkkkkkk..",".kwwwwwwkkkkkkk.",".kwwwwwwkkkkkkk.",".kwwwwwwkkkkkkk.",".kwwwwwwkkkkkkk.","..kwwwwwkkkkkk..","..kwwwwwkkkkkk..","...kkwwwkkkkk...",".....kkkkkk.....","................","................"],
}

# Petits glyphes 8x8 des boutons de fenêtre (couleur = currentColor)
GLYPHS = {
 'g-min': ["........","........","........","........","........","........","kkkkkk..","kkkkkk.."],
 'g-max': ["kkkkkkkk","kkkkkkkk","k......k","k......k","k......k","k......k","k......k","kkkkkkkk"],
 'g-restore': ["..kkkkkk","..kkkkkk","..k....k","kkkkkk.k","kkkkkk.k","k....kkk","k....k..","kkkkkk.."],
 'g-close': ["kk....kk",".kk..kk.","..kkkk..","...kk...","..kkkk..",".kk..kk.","kk....kk","........"],
}

def runs(grid, ch):
    """Fusionne les pixels d'une couleur en rectangles horizontaux -> chemin SVG."""
    d = []
    for y, row in enumerate(grid):
        x = 0
        while x < len(row):
            if row[x] == ch:
                s = x
                while x < len(row) and row[x] == ch:
                    x += 1
                d.append(f"M{s} {y}h{x-s}v1h-{x-s}z")
            else:
                x += 1
    return ''.join(d)

def check(name, grid, w):
    assert len(grid) == w, (name, len(grid))
    for r in grid:
        assert len(r) == w, (name, r, len(r))

def symbol(name, grid, size, palette=True):
    check(name, grid, size)
    parts = []
    for ch in sorted(set(''.join(grid)) - {'.'}):
        style = f' style="fill:{COLORS[ch]}"' if palette else ' fill="currentColor"'
        parts.append(f'<path{style} d="{runs(grid, ch)}"/>')
    return f'<symbol id="{name}" viewBox="0 0 {size} {size}">{"".join(parts)}</symbol>'

# ---------- Monogramme BA ----------
B = ["XXXX.","X...X","X...X","XXXX.","X...X","X...X","X...X","XXXX."]
A = [".XXX.","X...X","X...X","X...X","XXXXX","X...X","X...X","X...X"]
MONO_COL = {
    'H': '#C4B5FD', 'K': '#1B1530', 'D': '#4C1D95', 'V': '#7C3AED',
    'S': '#1B1530', 'W': '#FFFFFF', 'M': '#B9B6C8', 'L': '#E8E6F0', 'G': '#B6FF3B',
}
def mono_grid():
    g = [['D' if y < 8 else 'V' for x in range(16)] for y in range(16)]
    for i in range(16):
        g[0][i] = 'H'; g[i][0] = 'H'; g[15][i] = 'K'; g[i][15] = 'K'
    def letter(pattern, ox, oy):
        for y, row in enumerate(pattern):          # ombre portée +1/+1
            for x, ch in enumerate(row):
                if ch == 'X': g[oy+y+1][ox+x+1] = 'S'
        for y, row in enumerate(pattern):          # remplissage chrome
            tone = 'W' if y < 3 else ('M' if y == 3 else 'L')
            for x, ch in enumerate(row):
                if ch == 'X': g[oy+y][ox+x] = tone
    letter(B, 2, 4); letter(A, 8, 4)
    for (x, y) in [(13,1),(12,2),(13,2),(14,2),(13,3)]:
        g[y][x] = 'G'
    return [''.join(r) for r in g]

MONO = mono_grid()

def mono_paths():
    return ''.join(f'<path fill="{MONO_COL[ch]}" d="{runs(MONO, ch)}"/>' for ch in sorted(set(''.join(MONO))))

# Étincelle vectorielle Y2K (fond d'écran, puces)
SPARKLE = '<symbol id="i-sparkle" viewBox="0 0 24 24"><path fill="currentColor" d="M12 0C12.8 7.6 16.4 11.2 24 12C16.4 12.8 12.8 16.4 12 24C11.2 16.4 7.6 12.8 0 12C7.6 11.2 11.2 7.6 12 0Z"/></symbol>'

sprite = ['<svg class="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">']
sprite.append(f'<symbol id="i-monogram" viewBox="0 0 16 16">{mono_paths()}</symbol>')
sprite.append(SPARKLE)
for n, g in ICONS.items():
    sprite.append(symbol(n, g, 16))
for n, g in GLYPHS.items():
    sprite.append(symbol(n, g, 8, palette=False))
sprite.append('</svg>')
sprite_svg = '\n'.join(sprite)
index_path = os.path.join(OUT, 'index.html')
html = open(index_path, encoding='utf-8').read()
html = re.sub(r'<!--SPRITE:START-->.*?<!--SPRITE:END-->',
              lambda m: '<!--SPRITE:START-->\n' + sprite_svg + '\n  <!--SPRITE:END-->', html, flags=re.S)
open(index_path, 'w', encoding='utf-8').write(html)

# Favicon SVG autonome
fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges">'
       '<title>BA</title>' + mono_paths() + '</svg>\n')
open(os.path.join(OUT, 'assets', 'favicon.svg'), 'w').write(fav)

# PNG (32 px, et 180 px avec marge pour iOS)
from PIL import Image
def hexrgb(h): h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
img = Image.new('RGBA', (16, 16))
for y, row in enumerate(MONO):
    for x, ch in enumerate(row):
        img.putpixel((x, y), hexrgb(MONO_COL[ch]) + (255,))
img.resize((32, 32), Image.NEAREST).save(os.path.join(OUT, 'assets', 'favicon-32.png'))
apple = Image.new('RGBA', (180, 180), hexrgb('#4C1D95') + (255,))
apple.paste(img.resize((160, 160), Image.NEAREST), (10, 10))
apple.save(os.path.join(OUT, 'assets', 'apple-touch-icon.png'))
print('Icônes générées :', len(ICONS), 'icônes,', len(GLYPHS), 'glyphes, monogramme + favicons.')
