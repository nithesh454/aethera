# 🎨 Design System — AI Automation Startup (Skeuomorphic)

## Brand Identity
- **Brand Name**: Aethera / NithAI *(choose one)*
- **Tagline**: "We Build AI Systems That Work While You Sleep"
- **Style**: Skeuomorphic — realistic, tactile, premium leather & paper feel
- **Audience**: Small business owners who want trust + premium feel

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-deep` | `#1C1008` | Page background (dark mahogany) |
| `--bg-surface` | `#F5ECD7` | Cards, paper surfaces |
| `--bg-leather` | `#2D1810` | Section backgrounds |
| `--accent-gold` | `#C9A84C` | Brass accents, highlights |
| `--accent-red` | `#8B1A1A` | Wax seals, CTA stamps |
| `--accent-green` | `#3B5E3A` | Success states, checkmarks |
| `--text-dark` | `#2C1A0E` | Text on light surfaces |
| `--text-light` | `#F0E6D3` | Text on dark surfaces |
| `--text-muted` | `#8B7355` | Muted/secondary text |
| `--shadow-deep` | `rgba(0,0,0,0.6)` | Card shadows |

---

## Typography

| Role | Font | Weight | Style |
|------|------|--------|-------|
| Display/H1 | Playfair Display | 700 | Embossed, serif |
| H2/H3 | Libre Baskerville | 600 | Refined serif |
| Body | Courier Prime | 400 | Typewriter feel |
| Labels/Tags | Special Elite | 400 | Ink stamp feel |
| Prices | Abril Fatface | 400 | Bold display |

**Google Fonts import:**
```
Playfair+Display:wght@400;700|Libre+Baskerville:wght@400;600|Courier+Prime|Special+Elite|Abril+Fatface
```

---

## Texture Library

### Leather Texture (CSS)
```css
.texture-leather {
  background-color: #2D1810;
  background-image: 
    repeating-linear-gradient(
      45deg,
      rgba(0,0,0,0.03) 0px,
      rgba(0,0,0,0.03) 1px,
      transparent 1px,
      transparent 6px
    ),
    repeating-linear-gradient(
      -45deg,
      rgba(0,0,0,0.03) 0px,
      rgba(0,0,0,0.03) 1px,
      transparent 1px,
      transparent 6px
    );
}
```

### Paper Texture (CSS)
```css
.texture-paper {
  background-color: #F5ECD7;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
}
```

### Embossed Text (CSS)
```css
.text-embossed {
  color: #2C1A0E;
  text-shadow: 
    1px 1px 1px rgba(255,255,255,0.6),
    -1px -1px 1px rgba(0,0,0,0.4);
}

.text-embossed-light {
  color: #F0E6D3;
  text-shadow:
    1px 1px 2px rgba(0,0,0,0.8),
    -1px -1px 1px rgba(255,220,150,0.2);
}
```

### Brass Button (CSS)
```css
.btn-brass {
  background: linear-gradient(145deg, #D4A843, #A07830, #C9A84C);
  border: 2px solid #8B6914;
  border-radius: 6px;
  box-shadow: 
    0 4px 8px rgba(0,0,0,0.5),
    inset 0 1px 0 rgba(255,220,100,0.4),
    inset 0 -1px 0 rgba(0,0,0,0.3);
  font-family: 'Special Elite', cursive;
  color: #1C1008;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.1s ease;
}

.btn-brass:active {
  transform: translateY(2px);
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.5),
    inset 0 2px 4px rgba(0,0,0,0.3);
}
```

### Stitched Card (CSS)
```css
.card-stitched {
  background: #F5ECD7;
  border-radius: 8px;
  padding: 24px;
  border: 2px solid #C9A84C;
  outline: 6px solid transparent;
  outline-offset: -10px;
  box-shadow:
    0 8px 24px rgba(0,0,0,0.5),
    inset 0 0 0 4px #F5ECD7,
    inset 0 0 0 6px rgba(139,103,69,0.3);
  background-image: repeating-linear-gradient(
    transparent, transparent 27px,
    rgba(139,103,69,0.15) 27px, rgba(139,103,69,0.15) 28px
  );
}
```

---

## Shadows & Depth System

```css
/* Level 1 — Flat paper */
--shadow-1: 2px 4px 8px rgba(0,0,0,0.3);

/* Level 2 — Raised card */
--shadow-2: 4px 8px 20px rgba(0,0,0,0.5);

/* Level 3 — Floating element */
--shadow-3: 8px 16px 40px rgba(0,0,0,0.6);

/* Inset — Pressed/recessed */
--shadow-inset: inset 2px 2px 6px rgba(0,0,0,0.4), inset -1px -1px 3px rgba(255,255,255,0.1);
```

---

## Animation Tokens

```css
/* Page load stagger */
.reveal { 
  opacity: 0; 
  transform: translateY(16px);
  animation: revealUp 0.6s ease forwards;
}
.reveal:nth-child(1) { animation-delay: 0.1s; }
.reveal:nth-child(2) { animation-delay: 0.2s; }
.reveal:nth-child(3) { animation-delay: 0.3s; }

@keyframes revealUp {
  to { opacity: 1; transform: translateY(0); }
}

/* Card hover lift */
.card-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-lift:hover {
  transform: translateY(-4px) rotate(0deg);
  box-shadow: var(--shadow-3);
}

/* Stamp press */
@keyframes stampPress {
  0% { transform: scale(1.2) rotate(-5deg); opacity: 0; }
  60% { transform: scale(0.95) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
```

---

## Component Patterns

### Price Tag (Manila Tag)
```html
<div class="price-tag">
  <span class="price-amount">₹4,999</span>
  <span class="price-label">Starting from</span>
  <div class="tag-hole"></div>
  <div class="tag-string"></div>
</div>
```

### Rubber Stamp Badge
```html
<div class="stamp-badge stamp-red">FEATURED</div>
<div class="stamp-badge stamp-green">LIVE</div>
<div class="stamp-badge stamp-gold">BEST VALUE</div>
```

### Section Divider
```html
<div class="divider-ornamental">
  <span>✦</span><hr/><span>✦</span>
</div>
```

---

## Page Layout Rules

1. **Max width**: 1200px centered
2. **Section padding**: 80px top/bottom
3. **Card gap**: 24px
4. **Border radius**: 8px (cards), 4px (buttons), 50% (badges)
5. **Every section** alternates between `--bg-deep` and `--bg-leather`
6. **Images** always have white photo-border frame (8px white + shadow)

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { ... }

/* Tablet */
@media (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```
