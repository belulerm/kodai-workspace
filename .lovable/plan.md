

## Performance Analysis: Welcome Page Load

### Root Cause

The slow welcome page is caused by one primary bottleneck: **the AuthGuard blocks all rendering until the Supabase session check completes**. Here is the exact sequence:

```text
1. Browser loads main bundle
2. i18n initializes (synchronous, fast)
3. App renders → AuthGuard mounts
4. AuthGuard sets loading=true → shows spinner
5. supabase.auth.getSession() fires (network round-trip ~200-800ms)
6. loading=false → AuthPage finally renders
```

The user sees nothing but a spinner ("Duke ngarkuar KodAI...") for the entire duration of that network call. On slow connections or cold starts, this can take several seconds.

### What is Already Optimized (Do Not Touch)

- **Route-level code splitting** — Already implemented. `Dashboard`, `Workspace`, `Onboarding`, and `NotFound` are all `React.lazy()` imports. This is correct and working.
- **Rollup chunk splitting** — Already configured with `react-vendor`, `monaco-vendor`, and `ui-vendor` manual chunks.
- **Intent-based prefetching** — Already wired to `ChallengeCard` hover/focus events.
- **Auth page is statically imported** — `AuthPage` is imported directly in `AuthGuard.tsx`, so it's in the main bundle. This is correct for instant rendering once auth resolves.

### What Needs to Change

Only **one targeted fix** is needed — no restructuring required:

#### Fix: Optimistic Auth Rendering

Instead of showing a spinner while waiting for `getSession()`, render the Auth page immediately as the default state, then swap to children if a session is found.

**Current flow:**
```text
loading=true  →  spinner  →  getSession resolves  →  AuthPage or children
```

**Proposed flow:**
```text
loading=true  →  AuthPage (instant)  →  getSession resolves  →  stay on AuthPage or swap to children
```

**Implementation in `AuthGuard.tsx`:**
- Change the `loading` state behavior: instead of showing a spinner, show `<AuthPage />` while loading
- When `getSession()` resolves with a valid session, set `authenticated=true` and render children
- When it resolves with no session, the user is already looking at the login form — zero perceived delay

**Specific change:**
```typescript
// Replace the loading spinner block (lines 49-57) with:
if (loading || !authenticated) return <AuthPage />;
```

This single line eliminates the spinner entirely. The Auth page renders on first paint. If the user has a valid session, it flashes briefly then transitions to the dashboard — but for unauthenticated users (the majority of first visits), the page appears instantly.

#### Secondary: Google Fonts Blocking

Line 1 of `index.css` imports Google Fonts with a render-blocking `@import`. This adds ~100-300ms to first paint.

**Fix:** Move the font `<link>` tags to `index.html` `<head>` with `display=swap` (already set in the URL) and add `rel="preconnect"` for `fonts.googleapis.com` and `fonts.gstatic.com`. Remove the `@import` from CSS.

### What NOT to Do

- Do not add more lazy loading — it's already done
- Do not restructure routing — the guard pattern is correct
- Do not add image lazy loading — the Auth page has no images, only CSS and icons
- Do not touch `useAppStore`, `OnboardingGuard`, or the Supabase client

### Summary

| Change | File | Impact |
|--------|------|--------|
| Show AuthPage during loading instead of spinner | `AuthGuard.tsx` | Eliminates perceived load time for unauthenticated users |
| Move Google Fonts to `<link>` with preconnect | `index.html` + `index.css` | ~100-300ms faster first paint |

Two files, two small changes, no risk to existing functionality.

