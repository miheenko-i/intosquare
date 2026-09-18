# IntoSquare — release landing page

Public website: https://miheenko-i.github.io/intosquare/

A pre-launch page built from the supplied IntoSquare React project. It keeps the original Figma/Fluid Engine illustration and illustrated three-step workflow. The page uses a dark, warm-neutral palette, fluid full-width layout, and responsive typography.

## Develop

Requires Node.js 22.16 or newer.

```sh
npm ci
npm run dev
npm run typecheck
npm test
```

Set `PORT` to override the local preview port (default 4173).

## Build and publish

```sh
npm run build:pages
```

Commit the updated source and `docs/index.html` to `main`. GitHub Pages serves `main /docs` and publishes automatically on commits. The standalone output is also generated as `dist/IntoSquare.html`.

The build pre-renders the React page, so its information and illustrations remain readable without JavaScript. Signup requires JavaScript. The page has no analytics or externally loaded fonts.

## Email signup configuration

Email collection is **not active** until a real form endpoint is supplied. While `endpoint` is empty, the public form is disabled and says “Signups open soon.” It does not store visitor addresses or simulate successful subscriptions.

Set the public HTTPS endpoint in `waitlist.config.json`, or use the `INTOSQUARE_WAITLIST_ENDPOINT` environment variable at build time. Never put a secret key into this file.

The current adapter POSTs JSON containing `email`, a subject, and consent to one release announcement. It expects a successful HTTP response plus explicit JSON `{ "ok": true }` or `{ "success": true }`. The provider's CORS and activation settings must allow the live GitHub Pages origin; provider-specific setup must be verified before enabling collection.

After configuration, run the checks, rebuild with `npm run build:pages`, and commit the updated `docs/index.html`. Subscription success appears only after an acknowledged provider response. Errors keep the entered address available for retry. Requests time out after 15 seconds and duplicate clicks are blocked.

The site collects requests; sending the release announcement will be handled separately in the selected email service.

## Main files

- `src/components/landing/Hero.tsx`: compact introduction and original illustration.
- `src/components/landing/DemoFrame.tsx`: Figma → native Squarespace blocks.
- `src/components/landing/HowItWorks.tsx`: original illustrated workflow.
- `src/components/landing/Waitlist.tsx`: accessible signup and submission states.
- `src/lib/waitlist.ts`: email validation and provider response handling.
- `src/waitlist.css`: visual changes and fluid sizing.
- `src/styles.css`: original illustration utilities and tokens.
- `waitlist.config.json`: public form endpoint.

## Verification

Build and TypeScript checks pass. Email transport tests cover validation, provider success/rejection, missing configuration, network errors, and release-only consent without sending real email. Browser layout checks passed at 320, 390, 768, 1024, 1440, and 2560 CSS pixels, with no horizontal overflow or console errors.

Visual references: [SV Design Studio](https://www.behance.net/gallery/219233941/SV-Design-Studio) and [Brandon Mercer](https://www.behance.net/gallery/175856917/Brandon-Mercer). Reference images are not copied into the website.
