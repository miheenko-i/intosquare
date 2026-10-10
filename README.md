# IntoSquare — launch website

Public website: https://intosquare.app/

A React prelaunch landing page for the IntoSquare Figma plugin and Chrome extension. The visual direction takes cues from Public.com: a clear oversized introduction, product-led illustrations, generous whitespace, quiet cards and a short story. A header toggle switches between light and dark themes and remembers the choice locally. The initial preference follows the visitor’s system. The website interface is monochrome: black, neutral grays and white. Sample designs inside the illustration cards use color. All illustrations are original HTML/CSS; the logo is the vector used in the plugins. TikTok Sans and its OFL license are bundled locally. Headings use -0.03em tracking. The sticky header uses a translucent blurred backdrop. Lenis is bundled locally for smooth wheel scrolling and anchor navigation; touch scrolling remains native and reduced-motion preferences disable the smoothing. Illustration motion pauses outside the viewport; scroll reveals and all animations respect reduced-motion preferences.

Free includes 5 successful imports total to one Squarespace site. Pro is $15 per month or $68 every six months, with unlimited imports/sites and Site Styles. Get Pro opens the shared IntoSquare account page and hosted FastSpring checkout. Live sales require FastSpring store activation.

## Develop and publish

Requires Node.js 22.16 or newer.

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build:pages
```

The build prerenders the page and embeds its font, styles and script in `docs/index.html`. GitHub Pages serves `main /docs`; preserve `docs/CNAME` for intosquare.app. `dist/IntoSquare.html` is the standalone output. Preview uses port 4173 unless PORT is set. No analytics or external font requests are included.

## Privacy policy

The public privacy notice is available at https://intosquare.app/privacy/. Edit `src/privacy.html` and run `npm run build:pages` to regenerate `docs/privacy/index.html`. The footer and launch form link to this page. It is a standalone document that remains readable without JavaScript. The notice covers the website, Figma plugin, Chrome extension and account API; keep it aligned with shipped functionality and Chrome Web Store disclosures.

## Signup flow

The website POSTs to our Google Apps Script web app, configured in `waitlist.config.json` (or overridden by `INTOSQUARE_WAITLIST_ENDPOINT` at build time). This is a public endpoint, not a secret key.

1. Validate the address, release-only consent and honeypot.
2. Acquire a script lock and check for duplicate addresses.
3. Save the email, UTC signup date, consent and source in the private Subscribers sheet.
4. Send a notification to **hello@intosquare.app** from the Google account that owns the script.
5. Mark the notification sent, or leave it pending for the hourly retry trigger.
6. Return explicit JSON acknowledgement; only then show success in the browser.

The sheet is never publicly shared and the web app has no subscriber-reading endpoint. Duplicate submissions do not resend successful notifications. Input is stored as text to prevent spreadsheet formula execution. Requests have a size cap, a honeypot and a global cap of 20 new signups per minute. This is basic abuse protection, not a CAPTCHA or strong bot defense.

Google's daily mail quota applies. A saved signup is successful even when the notification is queued. Pending mail retries hourly through `retryPendingNotifications`; check the Notification column and Apps Script execution history if delivery stops. A crash after mail acceptance but before writing the sent marker can result in a repeated notification. Mail acceptance does not prove inbox delivery.

The site does not send the October announcement automatically. Export the real subscriber addresses into the eventual mailing service when ready. The clearly named `intosquare-form-test@example.com` row is a test, not a subscriber; exclude it from any mailing export.

## Updating the backend

`google-apps-script/Code.gs` is the public source template for the deployed script. Set SHEET_ID to your private spreadsheet ID inside the Google Apps Script editor before deployment; do not commit that private configuration. The deployed editor contains the configured equivalent. Deploy as a **Web app**, execute as owner, access **Anyone**. This exposes only the validated write endpoint, not the private spreadsheet. Owner authorization is required for Sheets and email. Keep the existing deployment ID when releasing a new version; otherwise update the frontend endpoint and rebuild.

Install one time-driven trigger for `retryPendingNotifications`, main deployment, hourly. Do not install duplicate triggers. Notification emails go only to the fixed business inbox; visitors receive only the later launch announcement.

## Main files and checks

- `src/components/landing/Promo.tsx`: story, illustrations, pricing, FAQ and interactive demos.
- `src/promo.css`: responsive layout, type hierarchy and reduced-motion styling.
- `src/components/landing/Waitlist.tsx`: accessible form and states.
- `src/lib/waitlist.ts`: validation and acknowledged submission.
- `src/config/launch.ts`: launch and pricing constants.
- `google-apps-script/Code.gs`: private-sheet storage and notification handler.
- `tests/signup-backend.test.mjs`: storage, recipient, duplicates, invalid inputs, failures, retries, formula safety and rate limit.
- `tests/waitlist.test.ts`: frontend transport and failure handling.

The form uses a CORS-readable simple POST, never `no-cors` or simulated success. It times out after 20 seconds and preserves the entered address on errors. The unconfigured build disables signup.
