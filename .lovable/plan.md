

## Dark Tech / Cyber-Minimalist Visual Overhaul

With the user's corrections applied. 12 files modified, 0 new files.

---

### 1. Design Tokens — `src/index.css`

Replace CSS custom properties with the new palette:

| Token | Old | New |
|-------|-----|-----|
| `--background` | `220 20% 7%` | `0 0% 2%` (#050505) |
| `--foreground` | `210 20% 90%` | `0 0% 93%` |
| `--card` | `220 18% 10%` | `0 0% 6%` (#0F0F0F) |
| `--primary` | `187 80% 48%` (cyan) | `4 85% 59%` (#FF3B2F red) |
| `--primary-foreground` | `220 20% 7%` | `0 0% 100%` (white on red) |
| `--secondary` | `220 16% 16%` | `0 0% 12%` (#1F1F1F) |
| `--muted` | `220 14% 14%` | `0 0% 10%` |
| `--muted-foreground` | `215 12% 50%` | `220 9% 64%` (#9CA3AF) |
| `--border` | `220 14% 18%` | `0 0% 12%` (#1F1F1F) |
| `--ring` | cyan | match new red primary |
| `--accent` | **keep** green (functional XP color) | unchanged |
| `--destructive` | stays red | unchanged |
| Sidebar vars | match new palette | updated |

Update utility classes:
- `.glow-cyan` → `.glow-primary` using red HSL values
- Keep `.glow-green` for XP
- `.text-gradient-cyan` → `.text-gradient-primary` with red gradient
- Keep `.text-gradient-green`
- Rename `--glow-cyan` token to `--glow-primary`

**Background engine** — add to `@layer base` body rules:

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  will-change: transform;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background: radial-gradient(circle at 40% 30%, hsl(4 85% 59% / 0.06), transparent 60%);
  pointer-events: none;
  will-change: transform;
}
```

Add glass-card utility (per correction #3 — dual-border approach, NO backdrop-blur):
```css
.glass-card {
  background: #0F0F0F;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 0 20px rgba(255,59,47,0.02);
}
```

---

### 2. `tailwind.config.ts` — No structural changes

Colors already reference CSS vars. No edits needed.

---

### 3. Landing Page — `src/pages/Landing.tsx`

**Spacing**: All sections from `py-16 sm:py-20` → `py-24 sm:py-32`

**Hero headline**: `text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight tracking-tighter`

**Replace** all `text-gradient-cyan` → `text-gradient-primary`, `glow-cyan` → `glow-primary`

**Feature cards** (3 items — under the 6-card blur threshold, but per correction #2, use solid bg anyway since we're on a scrolling page):
- Replace `border-border bg-card` with `bg-[#0F0F0F] border border-white/5 shadow-[0_0_20px_rgba(255,59,47,0.02)]`
- Hover: `hover:border-primary/60 hover:-translate-y-1 transition-all duration-300`
- Add numbered overlay: relative container with `<span className="absolute -left-2 -top-6 text-[8rem] font-bold text-white/[0.03] leading-none select-none pointer-events-none">0{i+1}</span>`

**Course cards**: Same solid glass treatment — `bg-[#0F0F0F] border border-white/5 shadow-[0_0_20px_rgba(255,59,47,0.02)]`, no blur

**FAQ items**: Same solid card style

**Sticky header**: Only place that gets `backdrop-blur-md` (per correction #2)

---

### 4. Hero Editor — `src/components/landing/HeroEditor.tsx`

- Replace `glow-cyan` with red corner accent: `border-2 border-[#1F1F1F] border-t-primary border-l-primary`
- Custom Monaco theme on mount:

```typescript
onMount={(editor, monaco) => {
  monaco.editor.defineTheme('kodai-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#050505',
      'editor.lineHighlightBackground': '#111111',
      'editor.selectionBackground': '#FF3B2F33',
      'editorCursor.foreground': '#FF3B2F',
      'editorLineNumber.activeForeground': '#FF3B2F',
    },
  });
  monaco.editor.setTheme('kodai-dark');
}}
```

---

### 5. Workspace CodeEditor — `src/components/workspace/CodeEditor.tsx`

Same custom `kodai-dark` theme definition in `onMount`, with identical colors:
- `editor.background`: `#050505`
- `editor.lineHighlightBackground`: `#111111`
- `editor.selectionBackground`: `#FF3B2F33`
- `editorCursor.foreground`: `#FF3B2F`
- `editorLineNumber.activeForeground`: `#FF3B2F`

Replace `theme="vs-dark"` with `theme="kodai-dark"` (set via onMount).

---

### 6. Auth Page — `src/pages/Auth.tsx`

- Logo badge: `glow-cyan` → `glow-primary`, `border-primary/30 bg-primary/5`
- Form card: `border-border bg-card` → `bg-[#0F0F0F] border border-white/5 shadow-[0_0_20px_rgba(255,59,47,0.02)]`
- Inputs: `bg-muted border-border` → `bg-black/30 border-white/10`

---

### 7. Onboarding — `src/pages/Onboarding.tsx`

- Main card: `border-border bg-card` → `bg-[#0F0F0F] border border-white/5 shadow-[0_0_20px_rgba(255,59,47,0.02)]`
- Step circles already use `border-primary bg-primary` which inherits red

---

### 8. Dashboard — `src/pages/Dashboard.tsx`

- Logo badge: `glow-cyan` → `glow-primary`
- Stat cards: replace `glow-cyan` with glass-card style — `bg-[#0F0F0F] border border-white/5 shadow-[0_0_20px_rgba(255,59,47,0.02)]`
- Header: keep `backdrop-blur-xl` (sticky — allowed per correction #2)

---

### 9. ChallengeCard — `src/components/ChallengeCard.tsx`

- Replace `hover:glow-cyan` → `hover:border-primary/40 hover:-translate-y-1 transition-all duration-300`
- Card bg uses existing `bg-card` which inherits the new `#0F0F0F`

---

### 10. WaitlistForm — `src/components/landing/WaitlistForm.tsx`

- Section inherits new bg. Primary button color inherits red automatically.
- Waitlist table already has the email CHECK constraint from a previous migration — confirmed present.

---

### Performance note on backdrop-blur (correction #2)

`backdrop-blur` is applied ONLY to the sticky nav headers (`Landing.tsx` header, `Dashboard.tsx` header). All content cards use solid `bg-[#0F0F0F]` with the dual-border shadow approach. Zero blur on scrolling content.

### Files touched

| File | Type |
|------|------|
| `src/index.css` | Token overhaul + background engine + utilities |
| `src/pages/Landing.tsx` | Spacing, glass cards, numbered features, headline sizing |
| `src/components/landing/HeroEditor.tsx` | Red corner accent, kodai-dark Monaco theme |
| `src/components/landing/WaitlistForm.tsx` | Inherit new styling |
| `src/components/workspace/CodeEditor.tsx` | kodai-dark Monaco theme |
| `src/pages/Auth.tsx` | Glass card, dark inputs |
| `src/pages/Onboarding.tsx` | Glass card |
| `src/pages/Dashboard.tsx` | Glass stat cards, red glow |
| `src/components/ChallengeCard.tsx` | Hover lift, remove cyan glow |

### Untouched
- Routing, store, RLS, validation logic, i18n content — all preserved

